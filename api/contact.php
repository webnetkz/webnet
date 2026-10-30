<?php
declare(strict_types=1);

const TARGET_CHAT_ID = '643910578';
const MAX_BODY_BYTES = 12000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(array $body, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength)
        : substr($value, 0, $maxLength);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(['ok' => false, 'message' => 'Метод не поддерживается.'], 405);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://webnet.kz', 'https://www.webnet.kz'];
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    respond(['ok' => false, 'message' => 'Недопустимый источник запроса.'], 403);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if (!str_starts_with($contentType, 'application/json') || $contentLength > MAX_BODY_BYTES) {
    respond(['ok' => false, 'message' => 'Некорректный формат запроса.'], 400);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > MAX_BODY_BYTES) {
    respond(['ok' => false, 'message' => 'Не удалось прочитать данные формы.'], 400);
}

try {
    $input = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(['ok' => false, 'message' => 'Не удалось прочитать данные формы.'], 400);
}

if (!is_array($input)) {
    respond(['ok' => false, 'message' => 'Некорректные данные формы.'], 400);
}

// Hidden field: legitimate visitors leave it empty.
if (clean($input['website'] ?? '', 200) !== '') {
    respond(['ok' => true]);
}

$name = clean($input['name'] ?? '', 80);
$contact = clean($input['contact'] ?? '', 120);
$service = clean($input['service'] ?? '', 100) ?: 'Не указано';
$message = clean($input['message'] ?? '', 2000);
$consent = ($input['consent'] ?? false) === true;

if (strlen($name) < 2 || strlen($message) < 5 || !$consent) {
    respond(['ok' => false, 'message' => 'Проверьте обязательные поля и согласие.'], 400);
}

if (preg_match('/^\d{10,15}$/D', $contact) !== 1) {
    respond(['ok' => false, 'message' => 'Введите номер телефона: только 10–15 цифр.'], 400);
}

$token = trim((string) getenv('TELEGRAM_BOT_TOKEN'));
if ($token === '') {
    $secretFile = dirname(__DIR__, 2) . '/private/telegram_bot_token';
    if (is_readable($secretFile)) {
        $token = trim((string) file_get_contents($secretFile));
    }
}

if ($token === '') {
    respond(['ok' => false, 'message' => 'Канал отправки временно недоступен.'], 503);
}

$text = implode("\n", [
    '🔔 Новая заявка с webnet.kz',
    '',
    "Имя: {$name}",
    "Телефон: {$contact}",
    "Услуга: {$service}",
    '',
    'Задача:',
    $message,
]);

$request = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
if ($request === false) {
    respond(['ok' => false, 'message' => 'Сервис связи временно недоступен.'], 502);
}

curl_setopt_array($request, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
        'chat_id' => TARGET_CHAT_ID,
        'text' => $text,
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

$result = curl_exec($request);
$status = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
$error = curl_errno($request);
curl_close($request);

if ($result === false || $error !== 0 || $status < 200 || $status >= 300) {
    respond(['ok' => false, 'message' => 'Не удалось отправить заявку. Свяжитесь с нами по телефону.'], 502);
}

respond(['ok' => true, 'message' => 'Заявка отправлена. Мы свяжемся с вами.']);
