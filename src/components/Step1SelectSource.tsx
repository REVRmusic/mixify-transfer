import React, { useState, useMemo } from 'react';
import { Platform, PlatformCategory } from '../types';
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
  BeatportIcon 
} from './BrandIcons';
import { 
  Search, 
  FileText, 
  UploadCloud, 
  Link2, 
  Radio, 
  Disc, 
  Headphones, 
  Music, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface Step1Props {
  onSelectSource: (platform: Platform) => void;
}

export const Step1SelectSource: React.FC<Step1Props> = ({ onSelectSource }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlatformCategory>('all');

  const filteredPlatforms = useMemo(() => {
    return PLATFORMS.filter(p => {
      const matchesSearch = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const renderPlatformIcon = (platform: Platform) => {
    switch (platform.id) {
      case 'spotify':
        return <SpotifyIcon className="w-7 h-7 text-[#1DB954]" />;
      case 'deezer':
        return <DeezerIcon className="w-7 h-7 text-[#A238FF]" />;
      case 'apple-music':
        return <AppleMusicIcon className="w-7 h-7 text-[#FC3C44]" />;
      case 'youtube-music':
      case 'youtube':
        return <YouTubeIcon className="w-7 h-7 text-[#FF0000]" />;
      case 'tidal':
        return <TidalIcon className="w-7 h-7 text-[#00FFFF]" />;
      case 'amazon-music':
        return <AmazonMusicIcon className="w-7 h-7 text-[#25D1DA]" />;
      case 'soundcloud':
        return <SoundCloudIcon className="w-7 h-7 text-[#FF5500]" />;
      case 'qobuz':
        return <QobuzIcon className="w-7 h-7 text-[#0070BA]" />;
      case 'beatport':
        return <BeatportIcon className="w-7 h-7 text-[#00FF95]" />;
      case 'itunes':
        return <AppleMusicIcon className="w-7 h-7 text-[#EA4CC0]" />;
      case 'pandora':
        return <Radio className="w-7 h-7 text-[#005483]" />;
      case 'anghami':
        return <Music className="w-7 h-7 text-[#9B51E0]" />;
      case 'kkbox':
        return <Disc className="w-7 h-7 text-[#00A0E9]" />;
      case 'lastfm':
        return <Headphones className="w-7 h-7 text-[#D51007]" />;
      case 'soundmachine':
        return <Disc className="w-7 h-7 text-[#3498DB]" />;
      case 'boomplay':
        return <Music className="w-7 h-7 text-[#FF6B00]" />;
      case 'audiomack':
        return <Music className="w-7 h-7 text-[#FFA200]" />;
      case 'file':
        return <UploadCloud className="w-7 h-7 text-[#00F5A0]" />;
      case 'text':
        return <FileText className="w-7 h-7 text-[#00D9F5]" />;
      case 'url':
        return <Link2 className="w-7 h-7 text-[#3B82F6]" />;
      default:
        return <Music className="w-7 h-7 text-white" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Title & Personal Manifesto */}
      <div className="text-center mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121522] border border-white/10 text-xs text-[#00F5A0] font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Outil libre, sans publicité & 100% gratuit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          D'où proviennent vos <span className="bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent">playlists</span> ?
        </h1>
        <p className="text-xs sm:text-sm text-mixify-muted mt-2 leading-relaxed">
          Sélectionnez votre service source pour exporter ou convertir votre musique en quelques secondes, sans aucune limite de volume.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#11131E] border border-white/5 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              activeCategory === 'all'
                ? 'bg-[#1D2132] text-white shadow'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            Tous ({PLATFORMS.length})
          </button>
          <button
            onClick={() => setActiveCategory('popular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              activeCategory === 'popular'
                ? 'bg-[#1D2132] text-white shadow'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            Streaming (8)
          </button>
          <button
            onClick={() => setActiveCategory('dj')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              activeCategory === 'dj'
                ? 'bg-[#1D2132] text-white shadow'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            DJ & Hi-Res (11)
          </button>
          <button
            onClick={() => setActiveCategory('files')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              activeCategory === 'files'
                ? 'bg-[#1D2132] text-white shadow'
                : 'text-mixify-muted hover:text-white'
            }`}
          >
            Fichiers & Liens (3)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-mixify-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer une plateforme..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#11131E] border border-white/10 text-white placeholder-mixify-subtle text-xs focus:outline-none focus:border-[#00F5A0] focus:ring-1 focus:ring-[#00F5A0] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-mixify-muted hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Modern Platform Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {filteredPlatforms.map((platform) => {
          const isSpotify = platform.id === 'spotify';
          return (
            <button
              key={platform.id}
              onClick={() => onSelectSource(platform)}
              className="group relative flex flex-col items-center justify-between p-5 rounded-2xl bg-[#0F121C] hover:bg-[#151928] border border-white/[0.06] hover:border-[#00F5A0]/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 text-center"
            >
              {/* Top Tag */}
              <span className="text-[10px] font-medium text-mixify-muted group-hover:text-mixify-subtle mb-3">
                {platform.tag}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#171B2A] border border-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                {renderPlatformIcon(platform)}
              </div>

              {/* Name */}
              <div className="w-full">
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#00F5A0] transition line-clamp-1">
                  {platform.name}
                </span>

                {isSpotify && (
                  <span className="inline-block mt-1 text-[9px] text-[#1DB954] font-medium bg-[#1DB954]/10 px-1.5 py-0.5 rounded">
                    Compatibilité Spotify *
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Spotify Compliance Legal Disclaimer */}
      <div className="mt-10 text-center max-w-xl p-4 rounded-2xl bg-[#101320] border border-white/5">
        <p className="text-[11px] text-mixify-muted leading-relaxed">
          * <strong className="text-white">Compatibilité Spotify</strong> : compte Spotify Premium requis. Les limites de cadence d'API appliquées par les plateformes musicales sont des contraintes strictement techniques (slots API limités) visant à préserver l'intégrité de vos playlists, et en aucun cas commerciales.
        </p>
      </div>
    </div>
  );
};
