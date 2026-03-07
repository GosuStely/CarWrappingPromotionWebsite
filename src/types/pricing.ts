export interface PricingFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceNote?: string;
  popular?: boolean;
  features: PricingFeature[];
  cta: string;
  color: 'default' | 'neon' | 'gold';
}
