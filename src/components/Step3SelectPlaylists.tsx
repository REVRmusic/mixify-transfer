import React, { useState, useMemo } from 'react';
import { Platform, Playlist } from '../types';
import { 
  ArrowLeft, 
  Search, 
  Heart, 
  Disc, 
  User, 
  ChevronRight, 
  Check, 
  ListMusic, 
  Clock, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

interface Step3Props {
  sourcePlatform: Platform;
  playlists: Playlist[];
  onBack: () => void;
  onConfirmSelection: (selected: Playlist[]) => void;
  onInspectPlaylist: (playlist: Playlist) => void;
  onSwitchAccount: () => void;
}

export const Step3SelectPlaylists: React.FC<Step3Props> = ({
  sourcePlatform,
  playlists: initialPlaylists,
  onBack,
  onConfirmSelection,
  onInspectPlaylist,
  onSwitchAccount,
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categories states
  const [allSelected, setAllSelected] = useState(true);
  const [favTracksSelected, setFavTracksSelected] = useState(false);
  const [favAlbumsSelected, setFavAlbumsSelected] = useState(true);
  const [favArtistsSelected, setFavArtistsSelected] = useState(true);

  const handleToggleAll = () => {
    const nextState = !allSelected;
    setAllSelected(nextState);
    setFavTracksSelected(nextState);
    setFavAlbumsSelected(nextState);
    setFavArtistsSelected(nextState);
    setPlaylists(prev => prev.map(p => ({ ...p, selected: nextState })));
  };

  const handleTogglePlaylist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaylists(prev =>
      prev.map(p => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const filteredPlaylists = useMemo(() => {
    if (!searchQuery.trim()) return playlists;
    const q = searchQuery.toLowerCase();
    return playlists.filter(p => p.title.toLowerCase().includes(q));
  }, [playlists, searchQuery]);

  // Statistics
  const selectedPlaylists = useMemo(() => {
    return playlists.filter(p => p.selected);
  }, [playlists]);

  const totalSelectedTracks = useMemo(() => {
    let count = 0;
    playlists.forEach(p => {
      if (p.selected) count += p.trackCount;
    });
    if (favAlbumsSelected) count += 12;
    if (favArtistsSelected) count += 10;
    return count;
  }, [playlists, favAlbumsSelected, favArtistsSelected]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Title Header */}
      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F5A0] hover:underline uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Étape précédente</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Quels éléments souhaitez-vous <span className="text-[#00F5A0]">transférer</span> ?
        </h1>
        <p className="text-xs sm:text-sm text-mixify-muted mt-1">
          Sélectionnez les playlists, favoris et albums à synchroniser. Transfert 100% illimité et gratuit.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="w-full bg-[#0F121C] border border-white/[0.08] rounded-3xl p-5 sm:p-7 shadow-2xl mb-8">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/5 gap-3">
          <div className="flex items-center gap-3.5">
            <button
              onClick={handleToggleAll}
              role="checkbox"
              aria-checked={allSelected}
              aria-label="Sélectionner ou désélectionner tout"
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition focus-visible:ring-2 focus-visible:ring-[#00F5A0] ${
                allSelected ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20 bg-transparent'
              }`}
            >
              {allSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#171B2A] border border-white/10 flex items-center justify-center text-[#00F5A0] font-bold text-xs">
                {sourcePlatform.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Bibliothèque complète</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5A0]/15 text-[#00F5A0] font-semibold">
                    Compte Mixify
                  </span>
                </div>
                <div className="text-xs text-mixify-muted">
                  {playlists.length} playlists détectées • {totalSelectedTracks} titres sélectionnés
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onSwitchAccount}
            className="text-xs text-[#00D9F5] hover:underline font-medium transition self-start sm:self-auto"
          >
            Changer de profil
          </button>
        </div>

        {/* Favorite Categories */}
        <div className="py-2 divide-y divide-white/5">
          {/* Titres favoris */}
          <div className="flex items-center justify-between py-3 px-1 hover:bg-white/[0.02] rounded-xl transition">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setFavTracksSelected(!favTracksSelected)}
                role="checkbox"
                aria-checked={favTracksSelected}
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  favTracksSelected ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20 bg-transparent'
                }`}
              >
                {favTracksSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-white">Coups de cœur & Titres favoris</div>
                <div className="text-[11px] text-mixify-muted">Morceaux marqués d'un cœur</div>
              </div>
            </div>
            <span className="text-xs text-mixify-muted">Automatique</span>
          </div>

          {/* Albums favoris */}
          <div className="flex items-center justify-between py-3 px-1 hover:bg-white/[0.02] rounded-xl transition">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setFavAlbumsSelected(!favAlbumsSelected)}
                role="checkbox"
                aria-checked={favAlbumsSelected}
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  favAlbumsSelected ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20 bg-transparent'
                }`}
              >
                {favAlbumsSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00F5A0] flex items-center justify-center">
                <Disc className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-white">Albums favoris sauvegardés</div>
                <div className="text-[11px] text-mixify-muted">12 albums complets</div>
              </div>
            </div>
            <span className="text-xs text-mixify-muted">12 albums</span>
          </div>

          {/* Artistes favoris */}
          <div className="flex items-center justify-between py-3 px-1 hover:bg-white/[0.02] rounded-xl transition">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setFavArtistsSelected(!favArtistsSelected)}
                role="checkbox"
                aria-checked={favArtistsSelected}
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  favArtistsSelected ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20 bg-transparent'
                }`}
              >
                {favArtistsSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-white">Artistes suivis</div>
                <div className="text-[11px] text-mixify-muted">10 artistes suivis</div>
              </div>
            </div>
            <span className="text-xs text-mixify-muted">10 artistes</span>
          </div>
        </div>

        {/* Playlists Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 pb-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-[#00F5A0]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Listes de lecture ({playlists.length})
            </span>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-mixify-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une playlist..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder-mixify-subtle focus:outline-none focus:border-[#00F5A0]"
            />
          </div>
        </div>

        {/* Playlists Items */}
        <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onInspectPlaylist(pl)}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition cursor-pointer group border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  onClick={(e) => handleTogglePlaylist(pl.id, e)}
                  role="checkbox"
                  aria-checked={pl.selected}
                  aria-label={`Sélectionner ${pl.title}`}
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition flex-shrink-0 ${
                    pl.selected ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20 bg-transparent'
                  }`}
                >
                  {pl.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-[#141828] border border-white/10">
                  <img src={pl.coverUrl} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#00F5A0] transition truncate">
                    {pl.title}
                  </div>
                  <div className="text-[11px] text-mixify-muted flex items-center gap-2 mt-0.5">
                    <span>{pl.trackCount} morceaux</span>
                    {pl.durationStr && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {pl.durationStr}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-mixify-muted group-hover:text-white transition flex-shrink-0">
                <span className="text-[11px] hidden sm:inline px-2 py-0.5 rounded-md bg-white/5 text-[#00F5A0] group-hover:bg-[#00F5A0]/20 font-medium">
                  Gérer les titres
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Button */}
      <button
        onClick={() => onConfirmSelection(selectedPlaylists)}
        disabled={selectedPlaylists.length === 0 && !favAlbumsSelected && !favArtistsSelected}
        className="w-full max-w-md py-4 px-8 rounded-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] hover:opacity-95 text-[#08090E] font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <span>Choisir la plateforme de destination</span>
        <span className="text-xs bg-[#08090E]/20 px-2.5 py-0.5 rounded-full font-bold">
          {totalSelectedTracks} titres
        </span>
      </button>
    </div>
  );
};
