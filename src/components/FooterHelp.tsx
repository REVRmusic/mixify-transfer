import React from 'react';
import { MixifyLogoMark, StudioEqualizer } from './BrandIcons';
import { ShieldCheck, Mail, Heart, ExternalLink, HelpCircle } from 'lucide-react';

interface FooterHelpProps {
  onOpenFaq: () => void;
  onOpenContact: () => void;
}

export const FooterHelp: React.FC<FooterHelpProps> = ({
  onOpenFaq,
  onOpenContact,
}) => {
  return (
    <footer className="w-full mt-auto py-12 px-4 border-t border-white/[0.06] bg-[#06070B] text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Equalizer & Brand Mark */}
        <div className="flex items-center gap-2 mb-4">
          <MixifyLogoMark className="w-7 h-7" />
          <span className="font-extrabold text-base text-white tracking-tight">
            Mixify<span className="text-[#00F5A0] font-semibold text-xs ml-1">Transfer</span>
          </span>
        </div>

        {/* Personal Mission Statement */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
          La musique vous appartient, partout et sans barrières.
        </h3>
        <p className="text-xs sm:text-sm text-mixify-muted max-w-lg mb-6 leading-relaxed">
          Mixify Transfer est un projet indépendant créé pour libérer vos bibliothèques musicales sans aucun abonnement payant ni revente de données.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <span className="px-3 py-1 rounded-full bg-[#11131E] border border-white/5 text-[11px] text-[#00F5A0] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]" />
            100% Gratuit & Illimité
          </span>
          <span className="px-3 py-1 rounded-full bg-[#11131E] border border-white/5 text-[11px] text-[#00D9F5] font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#00D9F5]" />
            Respect de la vie privée
          </span>
          <span className="px-3 py-1 rounded-full bg-[#11131E] border border-white/5 text-[11px] text-white font-medium flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            Par la communauté Mixify
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={onOpenFaq}
            className="px-5 py-2.5 rounded-2xl bg-[#141828] hover:bg-[#1C2236] text-white font-semibold text-xs border border-white/10 transition flex items-center gap-2"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00F5A0]" />
            <span>Foire aux questions</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-2xl bg-[#141828] hover:bg-[#1C2236] text-white font-semibold text-xs border border-white/10 transition flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5 text-[#00D9F5]" />
            <span>Contacter le support</span>
          </button>
        </div>

        {/* Legal & Mixify Links */}
        <div className="text-[11px] text-mixify-subtle flex flex-col sm:flex-row items-center justify-center gap-2 pt-6 border-t border-white/5 w-full">
          <span>© {new Date().getFullYear()} Mixify (mixify.fr). Tous droits réservés.</span>
          <span className="hidden sm:inline">•</span>
          <a
            href="https://mixify.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1"
          >
            <span>Découvrir l'écosystème Mixify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="hidden sm:inline">•</span>
          <span>Contact : support@mixify.fr</span>
        </div>
      </div>
    </footer>
  );
};
