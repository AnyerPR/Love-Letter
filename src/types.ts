export type ThemeId = 'rose-gold' | 'midnight-romance' | 'pastel-sunset' | 'emerald-passion' | 'classic-crimson';

export type FontPairing = 'serif-elegant' | 'modern-sans' | 'romantic-script' | 'classic-cinzel';

export type ParticleType = 'hearts' | 'sparkles' | 'petals' | 'glow';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accentColor: string; // Tailwind color class or hex
  accentBg: string;
  textColor: string;
  mutedText: string;
  fontFamily: FontPairing;
  particles: ParticleType;
  heroOverlay: string;
}

export interface BasicInfo {
  creatorName: string;
  partnerName: string;
  startDate: string; // ISO string YYYY-MM-DDTHH:mm
  title: string;
  subtitle: string;
  coverImage: string;
}

export interface LetterContent {
  text: string;
  typewriterSpeed: 'slow' | 'medium' | 'fast' | 'instant';
  paperStyle: 'cream' | 'dark-velvet' | 'vintage-parchment' | 'modern-minimal';
  signature: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
}

export interface VideoItem {
  id: string;
  url: string; // Direct link or YouTube/Vimeo link
  title: string;
  description?: string;
}

export interface AudioConfig {
  sourceType: 'preset' | 'url' | 'upload';
  presetId?: string;
  url?: string;
  title: string;
  artist: string;
  autoPlay: boolean;
}

export interface QuoteItem {
  id: string;
  quote: string;
  author?: string;
  category?: string;
}

export interface VoucherItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  redeemed: boolean;
  redeemedAt?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  iconName: string; // Lucide icon name
  photoUrl?: string;
}

export interface ReasonItem {
  id: string;
  number: number;
  reason: string;
  icon?: string;
}

export interface LoveLetterData {
  id: string;
  basicInfo: BasicInfo;
  letter: LetterContent;
  gallery: PhotoItem[];
  videos: VideoItem[];
  audio: AudioConfig;
  quotes: QuoteItem[];
  vouchers: VoucherItem[];
  timeline: TimelineEvent[];
  reasons: ReasonItem[];
  theme: ThemeConfig;
  createdAt: string;
  updatedAt: string;
}
