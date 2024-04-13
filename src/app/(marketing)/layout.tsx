import { ReactNode } from 'react'

import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-slate-100">
      <Navbar />
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  )
}
