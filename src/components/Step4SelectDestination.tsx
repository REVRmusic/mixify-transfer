import React, { useState } from 'react';
import { Platform, Playlist, TransferPreferences } from '../types';
import { PLATFORMS } from '../data/platforms';
import { 
  SpotifyIcon, 
  DeezerIcon, 
  AppleMusicIcon, 
  YouTubeIcon, 
  TidalIcon, 
  AmazonMusicIcon, 
  SoundCloudIcon, 
  QobuzIcon, 
  BeatportIcon,
  StudioEqualizer
} from './BrandIcons';
import { 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  ChevronRight, 
  Play, 
  Lock, 
  Globe, 
  FileDown, 
  CheckCircle2,
  Info,
  Sliders,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface Step4Props {
  sourcePlatform: Platform;
  destinationPlatform: Platform | null;
  selectedPlaylists: Playlist[];
  onBack: () => void;
  onSelectDestination: (platform: Platform) => void;
  onStartTransfer: () => void;
  onEditPlaylist: (playlist: Playlist) => void;
}

export const Step4SelectDestination: React.FC<Step4Props> = ({
  sourcePlatform,
  destinationPlatform,
  selectedPlaylists,
  onBack,
  onSelectDestination,
  onStartTransfer,
  onEditPlaylist,
}) => {
  const [preferences, setPreferences] = useState<TransferPreferences>({
    autoMatchExactOnly: false,
    removeDuplicates: true,
    isPrivatePlaylist: true,
  });

  const totalTracks = selectedPlaylists.reduce((acc, p) => acc + p.trackCount, 0);

  // If destination is not chosen yet, show clean destination picker
  if (!destinationPlatform) {
    const availableDestinations = PLATFORMS.filter(p => p.id !== sourcePlatform.id);

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5A0] hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modifier la sélection</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Vers où souhaitez-vous <span className="text-[#00F5A0]">transférer</span> ?
          </h1>
          <p className="text-xs sm:text-sm text-mixify-muted mt-2">
            Choisissez la plateforme de destination pour vos {selectedPlaylists.length} playlist(s) ({totalTracks} titres).
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {availableDestinations.map(platform => (
            <button
              key={platform.id}
              onClick={() => onSelectDestination(platform)}
              className="group flex flex-col items-center justify-between p-5 rounded-2xl bg-[#0F121C] hover:bg-[#151928] border border-white/[0.06] hover:border-[#00F5A0]/40 transition-all duration-200 hover:-translate-y-1 text-center"
            >
              <span className="text-[10px] text-mixify-muted mb-2">{platform.tag}</span>
              <div className="w-12 h-12 rounded-2xl bg-[#171B2A] border border-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {platform.id === 'spotify' && <SpotifyIcon className="w-7 h-7 text-[#1DB954]" />}
                {platform.id === 'deezer' && <DeezerIcon className="w-7 h-7 text-[#A238FF]" />}
                {platform.id === 'apple-music' && <AppleMusicIcon className="w-7 h-7 text-[#FC3C44]" />}
                {platform.id === 'youtube-music' && <YouTubeIcon className="w-7 h-7 text-[#FF0000]" />}
                {platform.id === 'tidal' && <TidalIcon className="w-7 h-7 text-[#00FFFF]" />}
                {platform.id === 'amazon-music' && <AmazonMusicIcon className="w-7 h-7 text-[#25D1DA]" />}
                {platform.id === 'soundcloud' && <SoundCloudIcon className="w-7 h-7 text-[#FF5500]" />}
                {platform.id === 'file' && <FileDown className="w-7 h-7 text-[#00F5A0]" />}
                {!['spotify', 'deezer', 'apple-music', 'youtube-music', 'tidal', 'amazon-music', 'soundcloud', 'file'].includes(platform.id) && (
                  <span className="text-xl">🎵</span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#00F5A0] line-clamp-1">
                {platform.name}
              </span>
              {platform.id === 'spotify' && (
                <span className="text-[9px] text-[#1DB954] mt-1 bg-[#1DB954]/10 px-1.5 py-0.5 rounded font-medium">
                  Premium requis
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const renderPlatformBadge = (p: Platform) => {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#151928] border border-white/10">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
        <span className="text-sm font-bold text-white">{p.name}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Studio Routing Visual */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 flex-wrap">
        {renderPlatformBadge(sourcePlatform)}
        <div className="flex items-center gap-2 text-[#00F5A0]">
          <StudioEqualizer active={true} className="h-5" />
          <ArrowRight className="w-4 h-4" />
        </div>
        {renderPlatformBadge(destinationPlatform)}
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Prêt à synchroniser vos <span className="text-[#00F5A0]">playlists</span>
        </h1>
        <p className="text-xs sm:text-sm text-mixify-muted mt-1">
          Vérifiez votre sélection avant le lancement de la création sur votre compte.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="w-full max-w-2xl bg-[#0F121C] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
        {/* 100% Free Unlimited Indicator (Zero paywall / no fake credits) */}
        <div className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#00F5A0]/10 via-[#00D9F5]/10 to-[#3B82F6]/10 border border-[#00F5A0]/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00F5A0]/20 text-[#00F5A0] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">
                100% Gratuit & Illimité
              </div>
              <div className="text-[11px] text-mixify-muted">
                {totalTracks} morceaux prêts à être transférés sans restriction.
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectDestination(null as any)}
            className="text-xs font-semibold text-[#00D9F5] hover:underline whitespace-nowrap"
          >
            Changer de cible
          </button>
        </div>

        {/* Selected Playlists List */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-bold text-mixify-muted uppercase tracking-wider mb-2">
            Contenu à transférer ({selectedPlaylists.length})
          </div>

          <div className="divide-y divide-white/5 max-h-[220px] overflow-y-auto pr-1">
            {selectedPlaylists.map(playlist => (
              <div
                key={playlist.id}
                className="flex items-center justify-between py-3 px-2 hover:bg-white/[0.02] rounded-xl transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#141828] border border-white/10 flex-shrink-0">
                    <img src={playlist.coverUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#00F5A0] transition truncate">
                      {playlist.title}
                    </div>
                    <div className="text-[11px] text-mixify-muted">
                      {playlist.trackCount} titres {playlist.durationStr && `• ${playlist.durationStr}`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onEditPlaylist(playlist)}
                  aria-label="Modifier la playlist"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-mixify-muted hover:text-white transition flex items-center gap-1.5 text-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Modifier</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Transfer Preferences */}
        <div className="pt-5 border-t border-white/5 space-y-3">
          <div className="text-xs font-bold text-mixify-muted uppercase tracking-wider mb-1 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#00F5A0]" />
            <span>Options de synchronisation</span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#141828] hover:bg-[#181D30] cursor-pointer transition">
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Éliminer les doublons</div>
              <div className="text-[10px] text-mixify-muted">Ne pas ajouter de morceau déjà présent dans la destination</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.removeDuplicates}
              onChange={(e) => setPreferences({ ...preferences, removeDuplicates: e.target.checked })}
              className="accent-[#00F5A0] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#141828] hover:bg-[#181D30] cursor-pointer transition">
            <div className="text-left">
              <div className="text-xs font-semibold text-white">Créer en playlist privée</div>
              <div className="text-[10px] text-mixify-muted">Accessible uniquement depuis votre profil</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.isPrivatePlaylist}
              onChange={(e) => setPreferences({ ...preferences, isPrivatePlaylist: e.target.checked })}
              className="accent-[#00F5A0] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Spotify Compliance Notice if Spotify is destination */}
        {destinationPlatform.id === 'spotify' && (
          <div className="mt-5 p-3.5 rounded-2xl bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-start gap-2.5 text-xs text-white">
            <Info className="w-4 h-4 text-[#1DB954] flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#1DB954]">Compatibilité Spotify :</strong> Compte Spotify Premium requis. Les slots d'API et limitations de cadence sont des contraintes strictement techniques prévenant tout blocage de flux de distribution musicale.
            </div>
          </div>
        )}
      </div>

      {/* Launch Button */}
      <button
        onClick={onStartTransfer}
        className="w-full max-w-md py-4 px-8 rounded-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] hover:opacity-95 text-[#08090E] font-extrabold text-base shadow-xl shadow-emerald-500/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Démarrer le transfert gratuit ({totalTracks} titres)</span>
      </button>
    </div>
  );
};
