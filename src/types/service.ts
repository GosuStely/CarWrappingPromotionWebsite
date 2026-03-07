export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice: number;
  popular?: boolean;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  services: Service[];
}
