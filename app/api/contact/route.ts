import { env } from "cloudflare:workers";

const TARGET_CHAT_ID = "643910578";
const MAX_BODY_BYTES = 12_000;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== requestUrl.origin) {
    return json({ ok: false, message: "Недопустимый источник запроса." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!contentType.startsWith("application/json") || contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: "Некорректный формат запроса." }, 400);
  }

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, message: "Не удалось прочитать данные формы." }, 400);
  }

  // Hidden field: real visitors leave it empty, simple form bots usually fill it.
  if (clean(input.website, 200)) return json({ ok: true });

  const name = clean(input.name, 80);
  const contact = clean(input.contact, 120);
  const service = clean(input.service, 100) || "Не указано";
  const message = clean(input.message, 2_000);
  const consent = input.consent === true;

  if (name.length < 2 || contact.length < 3 || message.length < 5 || !consent) {
    return json({ ok: false, message: "Проверьте обязательные поля и согласие." }, 400);
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return json({ ok: false, message: "Канал отправки временно недоступен." }, 503);
  }

  const text = [
    "🔔 Новая заявка с webnet.kz",
    "",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Услуга: ${service}`,
    "",
    "Задача:",
    message,
  ].join("\n");

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: TARGET_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      return json({ ok: false, message: "Не удалось отправить заявку. Попробуйте связаться по телефону." }, 502);
    }

    return json({ ok: true, message: "Заявка отправлена. Мы свяжемся с вами." });
  } catch {
    return json({ ok: false, message: "Сервис связи временно недоступен." }, 502);
  }
}
