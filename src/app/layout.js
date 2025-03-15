import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from '../app/provider'; 



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TU-Vpn",
  description: "Generated by create next app",
};

export default function  RootLayout({ children }) {
  return (
    <html lang="en">
       <ReduxProvider> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </ReduxProvider>
      
    </html>
  );
}

