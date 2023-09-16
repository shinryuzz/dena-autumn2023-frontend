import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./_components/providers";
import MainContainer from "./_components/MainContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D team",
  description: "DeNA Autumn Hackathon 2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContainer>
          <Providers>{children}</Providers>
        </MainContainer>
      </body>
    </html>
  );
}
