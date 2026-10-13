import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebNet — технологии для роста бизнеса",
  description: "Разработка ПО, дизайн, автоматизация, ИИ и бизнес-процессы.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
