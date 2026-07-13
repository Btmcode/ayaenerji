export interface Competitor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  backlinkEstimate: number;
  speedPerformance: "Hızlı" | "Orta" | "Yavaş";
  localKeywordsCount: number;
  servicesCoverage: string[]; // List of services they offer
  notes: string;
  isYours?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  checklistItems: string[];
  popularKeywords: string[];
  buyerIntentScore: number; // 1 to 100
}

export interface MarketingTask {
  id: string;
  category: "GMB" | "SEO" | "AI_SEARCH" | "ADS"; // GMB (Google Maps), Website SEO, Generative Engine (AI), Ads/Local
  title: string;
  description: string;
  isCompleted: boolean;
  importance: "Kritik" | "Yüksek" | "Orta";
  actionRequired: string;
}

export interface ReachEstimate {
  districtName: string;
  population: number;
  monthlySearchVolume: number;
  expectedClicks: number;
  expectedCalls: number;
  recommendedAdSpend: number;
  estimatedRevenue: number;
}

export interface AdminSettings {
  companyName: string;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  webhookUrl?: string;
  githubRepoUrl?: string;
  githubBranch?: string;
  githubToken?: string;
  email?: string;
  adminEmail?: string;
  adminPassword?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role?: string;
}
