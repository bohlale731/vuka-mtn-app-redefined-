import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vuka | Simple, everyday mobile services',
  description: 'Buy airtime, data and bundles in a few simple steps.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>
}
