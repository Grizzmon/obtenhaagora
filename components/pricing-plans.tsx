'use client'

import { Check, Zap, Sparkles, Crown, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    id: 'start',
    name: 'Bank Pix Start',
    subtitle: 'Básico',
    icon: Zap,
    oldPrice: '999',
    price: '319',
    features: [
      'Acesso a apenas uma chave PIX',
      'Sistema antibloqueios',
      'Limite de 5.000,00MZN de SAC ',
      'Saque via M-Pesa',
      'Suporte por WhatsApp',
      'Garantia de Devoluçao de 7 dias',
    ],
    checkoutUrl: 'https://pay.kambafy.com/checkout/8e10e34b-8134-4456-9dce-efb470f3dd9b',
    highlighted: false,
    badge: null,
  },
  {
    id: 'promax',
    name: 'Bank Pix Pro',
    subtitle: 'Profissional',
    icon: Sparkles,
    oldPrice: '1579',
    price: '719',
    features: [
      'Crie mais de 10 chaves pix diferentes',
      'Limite de SAC de 50.000,00MZN',
      'Sistema ante bloqueio, uso Definitivo',
      'Saque M-Pesa e e-Mola',
      'Suporte prioritário 24h',
      'Atualizaçao automatica do app',
      'Garantia de Devoluçao de 30 dias',
    ],
    checkoutUrl: 'https://pay.kambafy.com/checkout/e8ab6f89-80dc-49c1-b937-c19c3a704ba8',
    highlighted: true,
    badge: 'MAIS USADO',
  },
  {
    id: 'ultra',
    name: 'Bank Pix Ultra',
    subtitle: 'Premium',
    icon: Crown,
    oldPrice: '3799',
    price: '1099',
    features: [
      'Crie e Recrie quantas chaves quiser',
      'Sistema ante bloqueio, uso Definitivo',
      'Sem limites de SAC',
      'Saque no M-pesa, E-mola e Banco',
      'Suporte prioritario 24h',
      'Garantia de Devoluçao de 90 dias',
      'Atualizaçoes automaticas do app',
    ],
    checkoutUrl: 'https://pay.kambafy.com/checkout/7ee14786-af98-49e1-a3b9-272d5857c3d0',
    highlighted: false,
    badge: null,
  },
]

declare global {
  interface Window {
    fbq: (track: string, event: string, params?: Record<string, unknown>) => void
  }
}

export function PricingPlans() {
  const handleTrack = (plan: typeof plans[0]) => {
    if (typeof window === 'undefined' || !window.fbq) return
    const cleanPrice = parseFloat(plan.price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0
    window.fbq('track', 'InitiateCheckout', {
      content_name: plan.name,
      value: cleanPrice,
      currency: 'MZN',
    })
  }

  return (
    <section className="w-full px-4 py-12 md:py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Escolha Seu Plano
          </h2>
          <p className="text-muted-foreground">
            Ative o seu sistema PIX e comece a faturar hoje
          </p>
        </div>

        {/* ALERTA VISÍVEL COM EFEITO PULSE */}
        <div className="mb-10 p-5 bg-yellow-50 border-2 border-yellow-400 rounded-2xl flex items-center gap-4 max-w-2xl mx-auto animate-pulse shadow-md">
            <div className="bg-yellow-400 p-2 rounded-full text-white shrink-0">
                <AlertTriangle size={24} />
            </div>
            <p className="text-sm md:text-base text-yellow-900 font-bold leading-tight italic">
                ⚠️ ATENÇÃO: Na página de pagamento, insira o número da sua conta M-Pesa ou e-Mola que tem saldo (mesmo que seja diferente do seu WhatsApp).
            </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 bg-card border-2 ${
                plan.highlighted ? 'border-primary shadow-lg' : 'border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-primary text-white">
                  <plan.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground line-through">De {plan.oldPrice} MZN</p>
                  <p className="text-3xl font-bold text-primary">
                    {plan.price} <span className="text-lg font-normal">MZN</span>
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleTrack(plan)}>
                  <Button className="w-full py-6 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-md">
                    {plan.highlighted ? 'QUERO MEU PIX AGORA' : 'OBTER ACESSO'}
                  </Button>
                </a>
                <p className="text-[11px] text-center text-muted-foreground font-medium italic uppercase">
                  Confirme o PIN no seu celular após clicar.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
