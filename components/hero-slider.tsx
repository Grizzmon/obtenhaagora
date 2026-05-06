'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const slides = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SLIDE1-S3SzIF8DXVBfsvUggh6hn7usNQW3Wu.png',
    alt: 'BankPix - Simples, Rápido e Seguro: PIX na palma da sua mão',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SLIDE2-seMXc23B6DwiywZOAA8JdJFniHigsi.png',
    alt: 'BankPix - Suporte 24 horas para te ajudar sempre',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SLIDE3-TnCg8J6f3L4lXqn0L8XmGW3piGQ6cO.png',
    alt: 'BankPix - Nunca foi tão fácil ter PIX em Moçambique',
  },
]

export function HeroSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="w-full overflow-hidden bg-background">
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-none w-full min-w-0"
            >
              <div className="relative w-full aspect-[16/10] md:aspect-[16/7]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 py-4 bg-background">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? 'w-6 bg-primary'
                : 'w-2 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
