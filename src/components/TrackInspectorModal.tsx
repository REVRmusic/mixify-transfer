import React, { useState } from 'react';
import { Playlist, Track } from '../types';
import { X, Search, Check, Music, Clock } from 'lucide-react';

interface TrackInspectorModalProps {
  playlist: Playlist | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlaylist: (updated: Playlist) => void;
}

export const TrackInspectorModal: React.FC<TrackInspectorModalProps> = ({
  playlist,
  isOpen,
  onClose,
  onUpdatePlaylist,
}) => {
  if (!isOpen || !playlist) return null;

  const [search, setSearch] = useState('');
  const [editingTitle, setEditingTitle] = useState(playlist.title);
  const [tracks, setTracks] = useState<Track[]>(playlist.tracks);

  const filteredTracks = tracks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleTrack = (trackId: string) => {
    setTracks(prev =>
      prev.map(t =>
        t.id === trackId
          ? { ...t, status: t.status === 'unmatched' ? 'pending' : 'unmatched' }
          : t
      )
    );
  };

  const handleSelectAll = (select: boolean) => {
    setTracks(prev =>
      prev.map(t => ({ ...t, status: select ? 'pending' : 'unmatched' }))
    );
  };

  const handleSave = () => {
    onUpdatePlaylist({
      ...playlist,
      title: editingTitle,
      tracks,
      selectedCount: tracks.filter(t => t.status !== 'unmatched').length
    });
    onClose();
  };

  const activeCount = tracks.filter(t => t.status !== 'unmatched').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0F121C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          aria-label="Fermer l'inspecteur"
          className="absolute right-5 top-5 p-2 rounded-xl text-mixify-muted hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pr-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#141828] border border-white/10 flex-shrink-0">
            <img src={playlist.coverUrl} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="text-base sm:text-lg font-bold text-white bg-transparent border-b border-white/20 focus:border-[#00F5A0] focus:outline-none w-full"
            />
            <p className="text-xs text-mixify-muted mt-1">
              {activeCount}/{tracks.length} morceau(x) inclus dans la copie • Cliquez sur un titre pour l'inclure ou l'exclure
            </p>
          </div>
        </div>

        {/* Search & Bulk Toggle */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-mixify-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrer les morceaux..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141828] border border-white/10 text-xs text-white placeholder-mixify-subtle focus:outline-none focus:border-[#00F5A0]"
            />
          </div>

          <button
            onClick={() => handleSelectAll(activeCount < tracks.length)}
            className="text-xs text-[#00D9F5] hover:underline font-semibold whitespace-nowrap"
          >
            {activeCount < tracks.length ? 'Tout cocher' : 'Tout décocher'}
          </button>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 divide-y divide-white/5">
          {filteredTracks.map((track) => {
            const isIncluded = track.status !== 'unmatched';
            return (
              <div
                key={track.id}
                onClick={() => handleToggleTrack(track.id)}
                className="flex items-center justify-between py-2.5 px-2 hover:bg-white/[0.03] rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition flex-shrink-0 ${
                      isIncluded ? 'bg-[#00F5A0] border-[#00F5A0] text-[#08090E]' : 'border-white/20'
                    }`}
                  >
                    {isIncluded && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold truncate ${isIncluded ? 'text-white' : 'text-mixify-subtle line-through'}`}>
                      {track.title}
                    </div>
                    <div className="text-[11px] text-mixify-muted truncate">
                      {track.artist}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-mixify-muted font-mono flex-shrink-0">
                  {track.duration || '3:30'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-mixify-muted">
            {activeCount} morceau(x) sélectionnés
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-mixify-muted hover:text-white"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-[#08090E] text-xs font-bold hover:opacity-95 shadow-md shadow-emerald-500/20"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
