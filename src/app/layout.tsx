import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Notification from '@/components/Notification'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { EdgeStoreProvider } from './lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RESTAURANT',
  description: 'BEST FOOD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <AuthProvider>
            <Notification />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </EdgeStoreProvider>
        </body>
    </html>
  )
}