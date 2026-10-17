import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Assistance Portamento (Mixify)');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0F121C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-5 top-5 p-2 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#00D9F5]/15 text-[#00D9F5] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Contacter l'équipe Mixify</h2>
            <p className="text-xs text-mixify-muted">support@mixify.fr / contact@mixify.fr</p>
          </div>
        </div>

        {sent ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#00F5A0] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Message envoyé !</h3>
            <p className="text-xs text-mixify-muted max-w-xs mb-6">
              Notre équipe technique vous répondra directement à l'adresse indiquée.
            </p>
            <button
              onClick={() => { setSent(false); onClose(); }}
              className="px-6 py-2 rounded-full bg-[#00F5A0] text-[#08090E] text-xs font-bold"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Votre e-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre-nom@domaine.fr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-white placeholder-mixify-subtle text-xs focus:outline-none focus:border-[#00F5A0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Objet</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#141828] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00F5A0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Votre message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Précisez votre demande ou la playlist concernée..."
                className="w-full p-3 rounded-xl bg-[#141828] border border-white/10 text-white placeholder-mixify-subtle text-xs focus:outline-none focus:border-[#00F5A0]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-mixify-muted hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-[#08090E] text-xs font-bold flex items-center gap-2 hover:opacity-95 shadow-md shadow-emerald-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer au support</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
