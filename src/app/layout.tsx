import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/english-app";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little English | Piccole parole, grandi scoperte",
  description:
    "Un piccolo mondo di minigiochi per scoprire colori, animali, oggetti, verbi, cibi e numeri in inglese. Senza account e senza salvataggi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${nunito.variable} ${jakarta.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
