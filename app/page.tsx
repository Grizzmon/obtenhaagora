import { HeroSlider } from '@/components/hero-slider'
import { SocialProof } from '@/components/social-proof'
import { PricingPlans } from '@/components/pricing-plans'
import { Guarantee } from '@/components/guarantee'
import { Footer } from '@/components/footer'

export default function BankPixLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Social Proof Section - Provas */}
      <SocialProof />

      {/* Guarantee Section */}
      <Guarantee />

      {/* Footer */}
      <Footer />
    </main>
  )
}
