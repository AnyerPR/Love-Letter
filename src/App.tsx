import React, { useState, useEffect } from 'react';
import { LoveLetterData } from './types';
import { THEMES, INITIAL_DEFAULT_LETTER } from './data/presets';
import {
  saveLetterToLocalStorage,
  loadLetterFromLocalStorage,
  decodeLetterFromUrl,
} from './utils/storage';
import { FloatingParticles } from './components/FloatingParticles';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroCover } from './components/HeroCover';
import { LiveCounter } from './components/LiveCounter';
import { TypewriterLetter } from './components/TypewriterLetter';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { QuotesSection } from './components/QuotesSection';
import { VouchersSection } from './components/VouchersSection';
import { TimelineSection } from './components/TimelineSection';
import { ReasonsSection } from './components/ReasonsSection';
import { ShareModal } from './components/ShareModal';
import { BuilderWizard } from './components/builder/BuilderWizard';
import { MagicEnvelope } from './components/MagicEnvelope';

const initialUrlData = typeof window !== 'undefined' ? decodeLetterFromUrl() : null;

export default function App() {
  const [letterData, setLetterData] = useState<LoveLetterData>(() => {
    if (initialUrlData) return initialUrlData;
    return loadLetterFromLocalStorage() || INITIAL_DEFAULT_LETTER;
  });
  const [activeView, setActiveView] = useState<'presentation' | 'builder'>('presentation');
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [isSharedRecipient, setIsSharedRecipient] = useState<boolean>(!!initialUrlData);
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);

  useEffect(() => {
    // Check if opened via URL share payload on mount
    const urlData = decodeLetterFromUrl();
    if (urlData) {
      setLetterData(urlData);
      setActiveView('presentation');
      setIsSharedRecipient(true);
      setEnvelopeOpened(false);
    }
  }, []);

  const handleUpdateLetterData = (updated: LoveLetterData) => {
    const next = { ...updated, updatedAt: new Date().toISOString() };
    setLetterData(next);
    saveLetterToLocalStorage(next);
  };

  const handleRedeemVoucher = (voucherId: string) => {
    const updatedVouchers = letterData.vouchers.map((v) =>
      v.id === voucherId
        ? { ...v, redeemed: true, redeemedAt: new Date().toISOString() }
        : v
    );
    handleUpdateLetterData({
      ...letterData,
      vouchers: updatedVouchers,
    });
  };

  const currentTheme = letterData.theme || THEMES['rose-gold'];

  // If viewing as shared recipient and envelope is not yet opened, show Magic Envelope!
  if (isSharedRecipient && !envelopeOpened) {
    return (
      <MagicEnvelope
        partnerName={letterData.basicInfo.partnerName}
        creatorName={letterData.basicInfo.creatorName}
        onOpen={() => setEnvelopeOpened(true)}
      />
    );
  }

  return (
    <div
      className={`min-h-screen relative text-slate-100 bg-gradient-to-b ${currentTheme.bgGradient} transition-colors duration-700 font-${currentTheme.fontFamily}`}
    >
      {/* Floating Particles background */}
      <FloatingParticles type={currentTheme.particles || 'hearts'} />

      {/* Global Fixed Navbar */}
      <Navbar
        creatorName={letterData.basicInfo.creatorName}
        partnerName={letterData.basicInfo.partnerName}
        theme={currentTheme}
        activeView={activeView}
        isSharedRecipient={isSharedRecipient}
        onToggleView={() =>
          setActiveView(activeView === 'presentation' ? 'builder' : 'presentation')
        }
        onOpenShare={() => setShareModalOpen(true)}
      />

      {/* Main View Router */}
      {activeView === 'builder' ? (
        <BuilderWizard
          data={letterData}
          onChange={handleUpdateLetterData}
          onFinish={() => setActiveView('presentation')}
        />
      ) : (
        <main className="relative z-20 space-y-4">
          {/* Cover Screen */}
          <HeroCover
            basicInfo={letterData.basicInfo}
            theme={currentTheme}
            onStartStory={() => {
              const counterEl = document.getElementById('counter');
              if (counterEl) {
                counterEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Time Counter */}
          <LiveCounter
            startDate={letterData.basicInfo.startDate}
            partnerName={letterData.basicInfo.partnerName}
            theme={currentTheme}
          />

          {/* Typewriter Letter */}
          <TypewriterLetter
            letter={letterData.letter}
            partnerName={letterData.basicInfo.partnerName}
            theme={currentTheme}
          />

          {/* Photo Gallery */}
          <GallerySection photos={letterData.gallery} theme={currentTheme} />

          {/* Videos */}
          <VideoSection videos={letterData.videos} theme={currentTheme} />

          {/* Special Quotes */}
          <QuotesSection quotes={letterData.quotes} theme={currentTheme} />

          {/* Interactive Love Coupons (Vales) */}
          <VouchersSection
            vouchers={letterData.vouchers}
            theme={currentTheme}
            onRedeemVoucher={handleRedeemVoucher}
          />

          {/* Milestone Timeline */}
          <TimelineSection timeline={letterData.timeline} theme={currentTheme} />

          {/* Reasons Why I Love You */}
          <ReasonsSection reasons={letterData.reasons} theme={currentTheme} />

          {/* Footer */}
          <footer className="py-12 border-t border-rose-500/10 text-center text-xs text-rose-300/60 font-serif-elegant relative z-20">
            <p>Hecho con ❤️ en Love Letter</p>
            <p className="mt-1 text-[10px] text-rose-300/40">
              {letterData.basicInfo.partnerName && letterData.basicInfo.creatorName
                ? `${letterData.basicInfo.partnerName} & ${letterData.basicInfo.creatorName} — Para siempre`
                : 'Una experiencia romántica digital'}
            </p>
          </footer>
        </main>
      )}

      {/* Persistent Audio Player */}
      <AudioPlayer config={letterData.audio} />

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          data={letterData}
          onClose={() => setShareModalOpen(false)}
          onLoadPreset={(preset) => handleUpdateLetterData(preset)}
          onImportJson={(imported) => handleUpdateLetterData(imported)}
          onPreviewEnvelope={() => {
            setIsSharedRecipient(true);
            setEnvelopeOpened(false);
          }}
        />
      )}
    </div>
  );
}

