import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import Nav from './components/navigation'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time Manager',
  description: '登録された日付に利用されているツールへメッセージを自動発信します。ドメイン、レンタルサーバーなど、他サービスにおける契約更新のタスク管理としてご利用ください。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
          <Header />
          <Nav />
          {children}
          <Footer />
        </body>
    </html>
  )
}
