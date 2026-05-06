'use client'

import { Shield, Lock, CheckCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full px-4 py-8 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Pagamentos Seguros</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4 text-primary" />
            <span>Dados Criptografados</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Empresa Verificada</span>
          </div>
        </div>

        {/* Logo and tagline */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-1">
            <span className="text-primary">Bank</span>
            <span className="text-foreground">Pix</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            PIX na palma da sua mão • Moçambique
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BankPix. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
