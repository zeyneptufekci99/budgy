import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/context/auth-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budgy",
  description: "A simple personal finance tracker",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
