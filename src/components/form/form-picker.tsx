/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/utils/cn'

import { FormErrors } from './form-errors'

type FormPickerProps = {
  id: string
  errors?: Record<string, string[] | undefined>
}

export function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus()

  const [images, setImages] = useState<Record<string, any>[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

  function handleSelectImage(imageId: string) {
    if (pending) {
      return null
    }

    setSelectedImageId(imageId)
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const imagesResult = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })

        if (imagesResult && imagesResult.response) {
          const newImages = imagesResult.response as Record<string, any>[]
          setImages(newImages)
        } else {
          console.error('Failed to get images on unsplash')
        }
      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="size-6 animate-spin text-sky-700" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleSelectImage(image.id)}
            className={cn(
              'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50',
            )}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              onChange={() => handleSelectImage(image.id)}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              src={image.urls.thumb}
              alt="Unsplash image"
              className="rounded-sm object-cover"
            />

            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex size-full items-center justify-center bg-black/30">
                <Check className="size-4 text-white" />
              </div>
            )}

            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[8px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>

      <FormErrors id="image" errors={errors} />
    </div>
  )
}
