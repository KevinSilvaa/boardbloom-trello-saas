import { Medal } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { headingFont } from '@/utils/heading-font'
import { textFont } from '@/utils/text-font'

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          headingFont.className,
        )}
      >
        <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal className="mr-2 size-6" />
          <p>No 1 Task Managment</p>
        </div>

        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          BoardBloom helps your team moves
        </h1>

        <span className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 py-2 pb-4 text-3xl text-white md:text-6xl">
          foward and faster
        </span>
      </div>

      <span
        className={cn(
          'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
          textFont.className,
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your teams works is unique. All
        of this you can do with <span className="font-bold">BoardBloom</span>
      </span>

      <Button size="lg" asChild className="mt-6">
        <Link href="/sign-up">Get BoardBloom for free</Link>
      </Button>
    </div>
  )
}
