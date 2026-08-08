import React, { useState } from 'react';
import { Gift, CheckCircle2, Heart, Sparkles, X } from 'lucide-react';
import { VoucherItem, ThemeConfig } from '../types';
import { triggerHeartConfetti, triggerCelebrationBurst } from '../utils/confetti';
import { soundFx } from '../utils/audio';

interface VouchersSectionProps {
  vouchers: VoucherItem[];
  theme: ThemeConfig;
  onRedeemVoucher: (id: string) => void;
}

export const VouchersSection: React.FC<VouchersSectionProps> = ({
  vouchers,
  theme,
  onRedeemVoucher,
}) => {
  const [selectedRedeemedVoucher, setSelectedRedeemedVoucher] = useState<VoucherItem | null>(null);

  if (!vouchers || vouchers.length === 0) return null;

  const handleRedeem = (voucher: VoucherItem) => {
    if (voucher.redeemed) return;
    soundFx.playRomanticChime();
    triggerHeartConfetti();
    triggerCelebrationBurst();
    onRedeemVoucher(voucher.id);
    setSelectedRedeemedVoucher({ ...voucher, redeemed: true });
  };

  return (
    <section id="vouchers" className="py-20 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Gift className="w-4 h-4 text-rose-400" />
          <span>Regalos & Cupones Especiales</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white mb-3">
          Vales Románticos Personalizados
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto">
          Haz clic en cualquier vale cuando desees canjearlo en la vida real ❤️
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`group relative rounded-3xl p-6 transition-all duration-300 transform hover:-translate-y-2 border shadow-2xl flex flex-col justify-between overflow-hidden ${
              voucher.redeemed
                ? 'bg-slate-900/60 border-slate-700/50 opacity-80'
                : 'bg-slate-900/80 backdrop-blur-xl border-rose-500/30 hover:border-rose-400/60'
            }`}
          >
            {/* Top banner accent */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${voucher.color || 'from-rose-500 to-pink-500'}`} />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-5xl p-3 bg-slate-950/60 rounded-2xl border border-white/10 shadow-inner select-none">
                  {voucher.emoji || '🎁'}
                </span>
                {voucher.redeemed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Canjeado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Disponible
                  </span>
                )}
              </div>

              <h3 className="text-xl font-serif-elegant font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                {voucher.title}
              </h3>
              <p className="text-sm text-rose-100/80 leading-relaxed mb-6">
                {voucher.description}
              </p>
            </div>

            <button
              onClick={() => handleRedeem(voucher)}
              disabled={voucher.redeemed}
              className={`w-full py-3 px-4 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                voucher.redeemed
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700/50'
                  : `bg-gradient-to-r ${voucher.color || 'from-rose-500 to-pink-500'} text-white shadow-lg hover:brightness-110 active:scale-95`
              }`}
            >
              {voucher.redeemed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>¡Vale Canjeado!</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Canjear Vale Ahora</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Redemption Celebration Modal */}
      {selectedRedeemedVoucher && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-8 max-w-md w-full text-center relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setSelectedRedeemedVoucher(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-4xl mb-6 shadow-xl shadow-rose-500/40 animate-bounce">
              {selectedRedeemedVoucher.emoji}
            </div>

            <h3 className="text-2xl font-serif-elegant font-bold text-white mb-2">
              ¡Vale Canjeado con Éxito! 🎉
            </h3>
            <p className="text-rose-200/90 text-sm mb-6">
              Has canjeado el vale de <strong className="text-white font-semibold">"{selectedRedeemedVoucher.title}"</strong>. ¡Prepárate para disfrutar de este momento especial juntos!
            </p>

            <button
              onClick={() => setSelectedRedeemedVoucher(null)}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-500/30 transition-colors"
            >
              ¡Entendido, a disfrutar! ❤️
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
