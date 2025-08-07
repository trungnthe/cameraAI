import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalHeader from './components/conditional-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CameraAI',
  description: 'Boost productivity by 300% with our intelligent project management platform. Automate tasks, collaborate seamlessly, and deliver projects faster than ever.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConditionalHeader/>
        {children}
      </body>
    </html>
  )
}