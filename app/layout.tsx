import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GlobalStyles } from "./components";
import React from 'react';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniella',
  description: 'Go out with me Daniella',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><GlobalStyles />{children}</body>
    </html>
  )
}
