import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { siteConfig } from '@/config/site';

interface ConfigState {
  // Identity
  personName: string;
  personNameDisplay: string;
  profileImage: string;
  birthdayAge: string;
  birthdayDate: string;
  
  // Messages
  heroLine1: string;
  heroLine2: string;
  cakeHeading: string;
  cardTeaser: string;
  cardMessage: string;
  finalMessage: string;
  
  // Gallery
  galleryTitle: string;
  gallerySubheading: string;
  memories: Array<{ image: string; caption: string }>;
  
  // Actions
  updateConfig: (updates: Partial<ConfigState>) => void;
  resetConfig: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      personName: siteConfig.personName,
      personNameDisplay: siteConfig.personNameDisplay,
      profileImage: siteConfig.profileImage,
      birthdayAge: String(siteConfig.age),
      birthdayDate: siteConfig.hero.dateBadge,
      
      heroLine1: siteConfig.hero.line1,
      heroLine2: siteConfig.hero.line2,
      cakeHeading: siteConfig.cake.heading,
      cardTeaser: siteConfig.card.coverTeaser,
      cardMessage: siteConfig.card.messageBody,
      finalMessage: siteConfig.final.message,
      
      galleryTitle: siteConfig.gallery.title,
      gallerySubheading: siteConfig.gallery.subheading,
      memories: siteConfig.gallery.memories.map(m => ({ ...m })),
      
      updateConfig: (updates) => set((state) => ({ ...state, ...updates })),
      resetConfig: () => set({
        personName: siteConfig.personName,
        personNameDisplay: siteConfig.personNameDisplay,
        profileImage: siteConfig.profileImage,
        birthdayAge: String(siteConfig.age),
        birthdayDate: siteConfig.hero.dateBadge,
        heroLine1: siteConfig.hero.line1,
        heroLine2: siteConfig.hero.line2,
        cakeHeading: siteConfig.cake.heading,
        cardTeaser: siteConfig.card.coverTeaser,
        cardMessage: siteConfig.card.messageBody,
        finalMessage: siteConfig.final.message,
        galleryTitle: siteConfig.gallery.title,
        gallerySubheading: siteConfig.gallery.subheading,
        memories: siteConfig.gallery.memories.map(m => ({ ...m })),
      }),
    }),
    {
      name: 'birthday-config',
    }
  )
);
