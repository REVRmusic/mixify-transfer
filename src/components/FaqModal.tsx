import React, { useState } from 'react';
import { X, ChevronDown, HelpCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Que signifie « Portamento » et pourquoi est-ce 100% gratuit ?',
    a: 'En musique, le portamento désigne la transition fluide et continue d\'une note à une autre sans rupture. L\'application Portamento a été conçue par l\'écosystème Mixify (mixify.fr) pour faire glisser vos playlists entre toutes les plateformes musicales, gratuitement, sans abonnement caché, sans faux crédits et sans revente de données.'
  },
  {
    q: 'Quels sont les prérequis pour la compatibilité Spotify ?',
    a: 'Pour la compatibilité Spotify, un compte Spotify Premium actif est requis par Spotify pour autoriser la création et la synchronisation de playlists via leur infrastructure d\'API.'
  },
  {
    q: 'Y a-t-il une limite sur le nombre de morceaux transférés ?',
    a: 'Non, aucune limite commerciale ! Les seules temporisations techniques observées sont imposées par les slots d\'API des distributeurs musicaux afin d\'éviter la saturation des requêtes et préserver l\'intégrité de vos morceaux.'
  },
  {
    q: 'Mes morceaux d\'origine sur la source risquent-ils d\'être modifiés ?',
    a: 'Jamais. Portamento opère en lecture seule sur votre service source. Vos playlists sources restent exactement dans leur état d\'origine.'
  },
  {
    q: 'Quels formats d\'export et d\'import sont supportés ?',
    a: 'Vous pouvez importer et exporter au format CSV, M3U, M3U8, JSON ou texte brut. Cela vous permet également de créer des copies de sauvegarde locales de toutes vos playlists.'
  }
];

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-[#0F121C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Fermer la FAQ"
          className="absolute right-5 top-5 p-2 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#00F5A0]/15 text-[#00F5A0] flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Questions fréquentes</h2>
            <p className="text-xs text-mixify-muted">Transparence, gratuité et fonctionnement technique</p>
          </div>
        </div>

        <div className="divide-y divide-white/5 space-y-2">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="pt-3">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-2 font-semibold text-xs sm:text-sm text-white hover:text-[#00F5A0] transition gap-3"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-mixify-muted transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="text-xs text-mixify-muted leading-relaxed pb-3 pt-1">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-mixify-muted">Un problème particulier ?</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
