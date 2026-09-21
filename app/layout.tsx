import type { Metadata, Viewport } from "next";

import "./globals.css";
import { SketchDefs } from "@/components/sketch/SketchDefs";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BBB",
  description:
    "《브레이킹 배드》 다섯 시즌 62편의 줄거리, 제목의 의미, 비하인드 스토리를 흑백 연필 드로잉과 함께 정리한 읽을거리.",
  applicationName: "BBB",
  authors: [{ name: "LJH2026" }],
};

export const viewport: Viewport = {
  themeColor: "#151412",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The app is dark only — there is no theme switch, so the class is fixed
    // here rather than negotiated at runtime.
    <html lang="ko" className="dark">
      <body className="font-sans antialiased">
        <SketchDefs />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
