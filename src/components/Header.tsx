import React from 'react';
import { TransferStep } from '../types';
import { MixifyLogoMark } from './BrandIcons';
import { ArrowLeft, RotateCcw, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentStep: TransferStep;
  onBack: () => void;
  onReset: () => void;
  onOpenFaq: () => void;
}

const STEPS = [
  { step: 1, label: 'Source' },
  { step: 2, label: 'Import' },
  { step: 3, label: 'Playlists' },
  { step: 4, label: 'Destination' },
  { step: 5, label: 'Sync' },
];

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onBack,
  onReset,
  onOpenFaq,
}) => {
  return (
    <header className="w-full sticky top-0 z-40 bg-[#08090E]/90 backdrop-blur-xl border-b border-white/[0.06]">
      {/* Top subtle emerald gradient line */}
      <div className="w-full h-0.5 bg-[#141724]">
        <div
          className="h-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,245,160,0.8)]"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          {currentStep > 1 && currentStep < 5 && (
            <button
              onClick={onBack}
              aria-label="Retour à l'étape précédente"
              className="p-1.5 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-[#00F5A0]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </button>
          )}

          <a
            href="https://mixify.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#00F5A0] rounded-xl p-1"
          >
            <MixifyLogoMark className="w-8 h-8 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-white">
                  Portamento<span className="text-[#00F5A0] font-semibold text-xs ml-1">by Mixify</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00F5A0]/15 text-[#00F5A0] border border-[#00F5A0]/30 hidden xs:inline-block">
                  100% Gratuit
                </span>
              </div>
              <span className="text-[10px] text-mixify-muted">mixify.fr • Passerelle musicale universelle</span>
            </div>
          </a>
        </div>

        {/* Center: Studio Steps Indicator */}
        <nav aria-label="Progression du transfert" className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#11131E] border border-white/[0.06]">
          {STEPS.map((item) => {
            const isActive = currentStep === item.step;
            const isDone = currentStep > item.step;
            return (
              <div
                key={item.step}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#1D2132] text-white shadow-sm font-semibold'
                    : isDone
                    ? 'text-[#00F5A0]'
                    : 'text-mixify-subtle'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-[#00F5A0] animate-pulse' : isDone ? 'bg-[#00F5A0]' : 'bg-mixify-subtle'
                  }`}
                />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Right: Reset & Helpful Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFaq}
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F5A0]" />
            <span>Aide & FAQ</span>
          </button>

          {currentStep > 1 && (
            <button
              onClick={onReset}
              aria-label="Recommencer depuis le début"
              className="p-2 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition focus-visible:ring-2 focus-visible:ring-[#00F5A0]"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
