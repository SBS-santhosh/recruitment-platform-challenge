// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import { ConfigProvider } from 'antd';
import StoreProvider from '../store/StoreProvider'; // This should work now

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Internship Candidate Management",
  description: "Manage internship candidates application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}