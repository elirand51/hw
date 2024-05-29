import type { Metadata } from "next";
import {AppContextProvider} from "@/app/context/provider";
import {Alerts} from "@/app/components/alerts";
import "./globals.css";

export const metadata: Metadata = {
  title: "OTP App",
  description: "Generated and Verify OTP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AppContextProvider>
        <html
            lang="en"
        >
            <body suppressHydrationWarning={true}>
                <Alerts/>
                {children}
            </body>
        </html>
      </AppContextProvider>
  );
}
