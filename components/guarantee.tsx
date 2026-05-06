'use client'

import { Shield, Clock, Headphones, Lock, RefreshCw } from 'lucide-react'

const guarantees = [
  {
    icon: Clock,
    title: 'Suporte 24h',
    description: 'Atendimento disponível 24 horas por dia, 7 dias por semana.',
  },
  {
    icon: Shield,
    title: 'Pagamentos Seguros',
    description: 'Seus dados e transações protegidos com criptografia avançada.',
  },
  {
    icon: Headphones,
    title: 'Atendimento Rápido',
    description: 'Respostas ágeis e eficientes para suas dúvidas.',
  },
  {
    icon: Lock,
    title: 'Dados Protegidos',
    description: 'Segurança total das suas informações pessoais.',
  },
]

export function Guarantee() {
  return (
    <section className="w-full px-4 py-12 md:py-16 bg-card/50">
      <div className="max-w-4xl mx-auto">
        {/* Guarantee badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="relative rounded-2xl bg-gradient-to-r from-primary/10 via-card to-primary/10 border border-primary/30 p-6 md:p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(74,222,128,0.1),transparent_60%)]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 animate-float">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Garantia de <span className="text-primary">7 Dias</span>
            </h2>
            <p className="text-lg font-semibold text-primary mb-2">
              Ou Seu Dinheiro de Volta!
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              Não ficou satisfeito? Devolvemos <strong className="text-primary">100% do seu dinheiro</strong> em até 7 dias. 
              Sem perguntas, sem complicações.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
