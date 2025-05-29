import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockr",
  description: "AI Powered Mock Technical Interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en"> 
	<body
	  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
	>
	  <header>
	    <SignedOut>
	      <SignInButton/>
	    </SignedOut>
	    <SignedIn>
	      {/* <UserButton/> */}
	    </SignedIn>
	  </header>
	  <SidebarProvider>
	    <AppSidebar />
	    <SidebarTrigger />
	    {children}
	  </SidebarProvider>
	</body>
      </html>
    </ClerkProvider>
  );
}

