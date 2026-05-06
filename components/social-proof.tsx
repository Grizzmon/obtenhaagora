'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Star, Users, CheckCircle, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

const testimonials = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROVAS1-W7Vb5YuA3evoJzOiTOH0RGBvqRD12O.jpeg',
    alt: 'Dashboard BankPix mostrando saldo e chaves PIX cadastradas',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROVAS2-Qg6jxrO9xo7QSG2rgSjRHfX3oEf9L4.jpeg',
    alt: 'Comprovante de chave PIX criada com sucesso',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROVAS3-xTjvvPaMzNUu3aLVFvDlmqQ9opciEV.jpeg',
    alt: 'Comprovante de transferência PIX de R$10,00',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PROVAS4-CrjENuFS5rK4vUvGH16UZVmjC94pNq.jpeg',
    alt: 'Dashboard BankPix mostrando saldo de R$1.450,00',
  },
]

const stats = [
  { icon: Users, value: '5.000+', label: 'Clientes Ativos' },
  { icon: Zap, value: '50.000+', label: 'Transacoes' },
  { icon: CheckCircle, value: '99.9%', label: 'Uptime' },
]

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

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

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaApi])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: 'Prova Social',
              content_category: 'Landing Page',
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full px-4 py-12 md:py-16 bg-card/50">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Provas Reais de Clientes
          </h2>
          <p className="text-muted-foreground">
            Veja o que nossos clientes estao dizendo
          </p>
        </div>

        {/* Rating header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-xl font-semibold text-foreground">
            Avaliacao <span className="text-primary">5.0</span> de clientes reais
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-card border border-border"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-xl md:text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_80%] md:flex-[0_0_50%] min-w-0 px-2"
                >
                  <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-lg">
                    <div className="relative h-[450px] md:h-[500px]">
                      <Image
                        src={testimonial.src}
                        alt={testimonial.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 80vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
            aria-label="Proximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'w-6 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Ir para prova ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <CheckCircle className="inline-block w-4 h-4 mr-1 text-primary" />
            Clientes em todo Mocambique - Atendimento rapido e suporte real
          </p>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    fbq: (track: string, event: string, params?: Record<string, string>) => void
  }
}
