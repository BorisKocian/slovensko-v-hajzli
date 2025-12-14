import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import '@/styles/globals.css'

const fredoka = Fredoka({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Slovensko v Hajzli',
  description: 'Splachovačka - hlasuj za politikov',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
