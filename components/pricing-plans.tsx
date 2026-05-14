'use client'

import { Check, Zap, Sparkles, Crown, ShieldCheck } from 'lucide-react'
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
    // SEU NOVO LINK BÁSICO
    checkoutUrl: 'https://pay.tutora.co.mz/34a52a6f5e2e4c0f9c68b341c3cf7588',
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
    // SEU NOVO LINK PRO
    checkoutUrl: 'https://pay.tutora.co.mz/80910acdec2e4ee79c69e20342a06b48',
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
    
    // EVENTO PERSONALIZADO PARA VOCÊ IDENTIFICAR NO GERENCIADOR
    window.fbq('trackCustom', 'Acesso_Pagina_Vendas_BankPix', {
      content_name: plan.name,
      value: cleanPrice,
      currency: 'MZN',
      plano_tipo: plan.subtitle
    })
  }

  return (
    <section className="w-full px-4 py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 uppercase italic">
            Ative sua Conta
          </h2>
          <p className="text-muted-foreground font-medium">
            Escolha o nível de acesso para liberar suas chaves PIX e saques.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[32px] p-8 flex flex-col transition-all duration-500 bg-card border-[3px] ${
                plan.highlighted ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border opacity-90'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-4 bg-primary/10 text-primary">
                  <plan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{plan.name}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{plan.subtitle}</p>
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground line-through font-bold">De {plan.oldPrice} MZN</p>
                  <p className="text-4xl font-black text-primary">
                    {plan.price} <span className="text-base font-bold">MZN</span>
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm font-bold text-foreground/80 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleTrack(plan)}>
                  <Button className="w-full py-8 text-lg font-black bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-tighter">
                    ATIVAR MEU APP AGORA
                  </Button>
                </a>
                
                <div className="flex items-center justify-center gap-2 text-green-600">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Pagamento 100% Seguro</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] opacity-30">
              BankPix SSA • Sistema de Pagamentos Criptografado
           </p>
        </div>
      </div>
    </section>
  )
}
