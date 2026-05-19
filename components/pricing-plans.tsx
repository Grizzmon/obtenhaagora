'use client'

import { useEffect, useState } from 'react'
import { Check, Zap, Sparkles, Crown, ShieldCheck, AlertCircle } from 'lucide-react'
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
    checkoutUrl: 'https://pay.tutora.co.mz/5c847709b327447683e6507c2d521da1',
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
  const [isRemarketing, setIsRemarketing] = useState(false)
  
  useEffect(() => {
    // 1. Verifica se veio do Remarketing através da URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('origem') === 'remarketing') {
        setIsRemarketing(true)
      }
    }

    // 2. Dispara o evento de rastreio do pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'Abriu_Pagina_de_Planos', {
        origem: 'Botao_do_VSL'
      });
    }
  }, []);

  const handleTrack = (plan: typeof plans[0]) => {
    if (typeof window === 'undefined' || !window.fbq) return
    
    const cleanPrice = parseFloat(plan.price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0
    
    window.fbq('track', 'PageView');
    window.fbq('track', 'InitiateCheckout', {
      content_name: plan.name,
      value: cleanPrice,
      currency: 'MZN'
    });

    window.fbq('trackCustom', 'Escolheu_Plano_Especifico', {
      plano: plan.name,
      valor: cleanPrice
    });
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      
      {/* BANNER DE AVISO INTELIGENTE (Só renderiza se origem=remarketing) */}
      {isRemarketing && (
        <div className="w-full bg-primary/15 border-b border-primary/30 py-4 px-4 text-center transition-all duration-500 animate-in fade-in slide-in-from-top-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary animate-pulse flex-shrink-0" />
            <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-tight not-italic">
              Identificamos o seu cadastro ativo. Após a ativação do plano abaixo, sua conta será liberada na hora no app <span className="text-primary underline">seubancodigital.vercel.app</span>.
            </p>
          </div>
        </div>
      )}

      <section className="w-full px-4 py-12 md:py-20 text-left italic flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
              Ative sua Conta Agora
            </h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">
              Liberação oficial • SSA Moçambique
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-[40px] p-8 flex flex-col transition-all duration-500 bg-card border-[3px] shadow-2xl ${
                  plan.highlighted ? 'border-primary scale-105 z-10' : 'border-border opacity-95'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-[24px] mb-4 bg-primary/10 text-primary">
                    <plan.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">{plan.name}</h3>
                  <div className="mt-6">
                    <p className="text-[10px] text-muted-foreground line-through font-bold opacity-40 uppercase">De {plan.oldPrice} MZN</p>
                    <p className="text-4xl font-black text-primary italic">
                      {plan.price}<span className="text-sm ml-1 font-bold">MZN</span>
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 flex-shrink-0 text-green-500" />
                      <span className="text-[11px] font-black text-foreground/90 uppercase leading-tight italic">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <a 
                    href={plan.checkoutUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleTrack(plan)}
                  >
                    <Button className="w-full py-8 text-xl font-black bg-primary hover:bg-primary/90 text-white rounded-[24px] shadow-2xl transition-all active:scale-95 uppercase italic tracking-tighter">
                      ATIVAR MEU APP AGORA
                    </Button>
                  </a>
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-500/5 py-3 rounded-2xl border border-green-500/10 uppercase">
                     <ShieldCheck size={16} />
                     <span className="text-[9px] font-black tracking-widest">Pagamento Protegido</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
