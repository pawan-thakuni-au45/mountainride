import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./lib/Provider";
import { Children } from "react";
import ReduxProvider from "./redux/ReduxProvider";
import InitUser from "./InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MountainRide",
  description: "Thi ish the app where you can come and start your booking for riding in mountains,deel the great expercince by walikng in mountains.",
};

export default function RootLayout({
  children,
}:Readonly<{
  children:React.ReactNode

}>) 
{
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <InitUser/>
          {children}
          </ReduxProvider>
          </Provider>
    
        </body>
    </html>
  );
}
