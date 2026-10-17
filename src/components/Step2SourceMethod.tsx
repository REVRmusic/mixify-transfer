import React, { useState } from 'react';
import { Platform, Playlist } from '../types';
import { parseRawTextToTracks, parseFileToPlaylist } from '../services/playlistParser';
import { INITIAL_PLAYLISTS } from '../data/mockPlaylists';
import { 
  ArrowLeft, 
  Link2, 
  UploadCloud, 
  FileText, 
  LogIn, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Music
} from 'lucide-react';

interface Step2Props {
  sourcePlatform: Platform;
  onBack: () => void;
  onContinueWithAccount: () => void;
  onContinueWithUrl: (url: string, customPlaylist?: Playlist) => void;
  onContinueWithFile: (playlist: Playlist) => void;
  onContinueWithText: (playlist: Playlist) => void;
}

type MethodTab = 'account' | 'url' | 'file' | 'text';

export const Step2SourceMethod: React.FC<Step2Props> = ({
  sourcePlatform,
  onBack,
  onContinueWithAccount,
  onContinueWithUrl,
  onContinueWithFile,
  onContinueWithText,
}) => {
  // If platform is file/text/url, set that tab directly; otherwise default to account
  const initialTab: MethodTab = 
    sourcePlatform.id === 'file' ? 'file' : 
    sourcePlatform.id === 'text' ? 'text' : 
    sourcePlatform.id === 'url' ? 'url' : 'account';

  const [activeTab, setActiveTab] = useState<MethodTab>(initialTab);
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [rawText, setRawText] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleConnectAccount = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onContinueWithAccount();
    }, 700);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setUrlError('Veuillez saisir une URL valide');
      return;
    }

    try {
      new URL(urlInput);
      setUrlError('');
      const customPlaylist: Playlist = {
        id: `url-playlist-${Date.now()}`,
        title: `Playlist importée via ${sourcePlatform.name}`,
        trackCount: 21,
        selectedCount: 21,
        durationStr: '1h 28min',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
        selected: true,
        tracks: INITIAL_PLAYLISTS[0].tracks
      };
      onContinueWithUrl(urlInput, customPlaylist);
    } catch {
      setUrlError('Format d\'adresse URL non reconnu (ex: https://...)');
    }
  };

  const handleUseDemoUrl = () => {
    const demo = sourcePlatform.id === 'deezer' 
      ? 'https://www.deezer.com/fr/playlist/1111142221' 
      : sourcePlatform.id === 'spotify'
      ? 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
      : 'https://music.youtube.com/playlist?list=RDCLAK5uy_kmPRjHDECIcuVwnKUSx2ApA3v3SkaxGMo';
    setUrlInput(demo);
    setUrlError('');
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const playlist = await parseFileToPlaylist(files[0]);
      onContinueWithFile(playlist);
    } catch {
      setUrlError('Impossible de lire ce fichier.');
    }
  };

  const handleTextSubmit = () => {
    if (!rawText.trim()) return;
    const tracks = parseRawTextToTracks(rawText);
    const playlist: Playlist = {
      id: `text-playlist-${Date.now()}`,
      title: 'Liste de titres personnalisée',
      trackCount: tracks.length,
      selectedCount: tracks.length,
      durationStr: `${Math.round(tracks.length * 3.5)} min`,
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      tracks,
      selected: true
    };
    onContinueWithText(playlist);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5A0] hover:underline uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Changer de source</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Méthode d'importation depuis <span className="text-[#00F5A0]">{sourcePlatform.name}</span>
        </h1>
        <p className="text-xs sm:text-sm text-mixify-muted mt-1">
          Choisissez la façon dont vous souhaitez charger vos données musicales.
        </p>
      </div>

      {/* Main Studio Card */}
      <div className="w-full max-w-2xl bg-[#0F121C] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#151928] border border-white/5 mb-8">
          {sourcePlatform.supportsAccount && (
            <button
              onClick={() => setActiveTab('account')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
                activeTab === 'account'
                  ? 'bg-[#00F5A0] text-[#08090E] shadow-md font-bold'
                  : 'text-mixify-muted hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Compte</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('url')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'url'
                ? 'bg-[#00F5A0] text-[#08090E] shadow-md font-bold'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Lien Web</span>
          </button>

          <button
            onClick={() => setActiveTab('file')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'file'
                ? 'bg-[#00F5A0] text-[#08090E] shadow-md font-bold'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Fichier</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
              activeTab === 'text'
                ? 'bg-[#00F5A0] text-[#08090E] shadow-md font-bold'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Texte</span>
          </button>
        </div>

        {/* Tab 1: Account Connection */}
        {activeTab === 'account' && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#171B2A] border border-white/10 flex items-center justify-center mb-4 text-[#00F5A0]">
              <LogIn className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Synchroniser directement avec {sourcePlatform.name}
            </h3>
            <p className="text-xs text-mixify-muted max-w-sm mb-6 leading-relaxed">
              Récupérez automatiquement l'intégralité de vos playlists, favoris, artistes et albums sauvegardés en une seule étape.
            </p>

            <button
              onClick={handleConnectAccount}
              disabled={isConnecting}
              className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] hover:opacity-95 text-[#08090E] font-bold text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#08090E]/30 border-t-[#08090E] rounded-full animate-spin" />
                  <span>Connexion à {sourcePlatform.name}...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Accéder à mes playlists {sourcePlatform.name}</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-mixify-muted mt-3">
              Connexion sécurisée en lecture seule • Aucun mot de passe stocké
            </span>
          </div>
        )}

        {/* Tab 2: URL Paste */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="flex flex-col py-2">
            <label className="text-xs font-semibold text-white mb-2">
              Collez l'URL publique de la playlist {sourcePlatform.name} :
            </label>

            <div className="relative mb-3">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (urlError) setUrlError('');
                }}
                placeholder={sourcePlatform.urlPlaceholder || `https://.../playlist/...`}
                className="w-full px-4 py-3 rounded-2xl bg-[#141828] border border-white/10 text-white placeholder-mixify-subtle text-xs sm:text-sm focus:outline-none focus:border-[#00F5A0] transition"
              />
            </div>

            {urlError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mb-3">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{urlError}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-[#08090E] font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition"
              >
                Analyser et importer
              </button>
              <button
                type="button"
                onClick={handleUseDemoUrl}
                className="px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#00F5A0] transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exemple</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: File Upload */}
        {activeTab === 'file' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
              dragActive ? 'border-[#00F5A0] bg-[#00F5A0]/10' : 'border-white/10 bg-[#141828]/50'
            }`}
          >
            <UploadCloud className="w-12 h-12 text-[#00F5A0] mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white mb-1">
              Glissez votre fichier de playlist ici
            </h4>
            <p className="text-xs text-mixify-muted mb-4">
              Formats acceptés : .CSV, .JSON, .M3U, .M3U8, .TXT
            </p>
            <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition">
              <span>Choisir un fichier</span>
              <input
                type="file"
                accept=".csv,.json,.m3u,.m3u8,.txt"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>
        )}

        {/* Tab 4: Raw Text */}
        {activeTab === 'text' && (
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-white mb-2">
              Collez vos titres (un morceau par ligne) :
            </label>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={6}
              placeholder={`Daft Punk - One More Time\nMichael Jackson - Billie Jean\nEarth, Wind & Fire - September`}
              className="w-full p-4 rounded-2xl bg-[#141828] border border-white/10 text-white placeholder-mixify-subtle text-xs font-mono focus:outline-none focus:border-[#00F5A0] mb-3"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-mixify-muted">
                {rawText.split('\n').filter(l => l.trim()).length} ligne(s) détectée(s)
              </span>
              <button
                onClick={handleTextSubmit}
                disabled={!rawText.trim()}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-[#08090E] text-xs font-bold disabled:opacity-40 transition"
              >
                Générer la playlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
