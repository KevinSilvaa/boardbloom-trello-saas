import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utils/cn'
import { headingFont } from '@/utils/heading-font'

export function Logo() {
  return (
    <Link href="/">
      <div className="md: hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.svg"
          alt="Image by macrovector on Freepik"
          width={32}
          height={32}
        />
        <p
          className={cn('pt-1 text-lg text-neutral-700', headingFont.className)}
        >
          BoardBloom
        </p>
      </div>
    </Link>
  )
}
