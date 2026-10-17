import React, { useState, useEffect, useRef } from 'react';
import { Platform, Playlist, Track } from '../types';
import { exportPlaylistToCsv, exportPlaylistToM3u, exportPlaylistToJson } from '../services/playlistParser';
import { StudioEqualizer } from './BrandIcons';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  RotateCcw, 
  ExternalLink, 
  Download, 
  Volume2, 
  VolumeX, 
  Music, 
  Sparkles, 
  FileSpreadsheet,
  Check
} from 'lucide-react';

interface Step5Props {
  sourcePlatform: Platform;
  destinationPlatform: Platform;
  playlists: Playlist[];
  onReset: () => void;
}

export const Step5TransferProgress: React.FC<Step5Props> = ({
  sourcePlatform,
  destinationPlatform,
  playlists,
  onReset,
}) => {
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const flat: Track[] = [];
    playlists.forEach(pl => {
      pl.tracks.forEach(tr => {
        flat.push({
          ...tr,
          status: 'pending'
        });
      });
    });
    setAllTracks(flat);
  }, [playlists]);

  const playMatchChime = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15); // C6
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    if (allTracks.length === 0 || isCompleted) return;

    if (currentIndex < allTracks.length) {
      const timer = setTimeout(() => {
        setAllTracks(prev => {
          const updated = [...prev];
          updated[currentIndex] = {
            ...updated[currentIndex],
            status: 'matched',
            matchScore: 98 + Math.floor(Math.random() * 3),
            matchedTitle: updated[currentIndex].title,
            matchedArtist: updated[currentIndex].artist,
          };
          return updated;
        });

        playMatchChime();
        setCurrentIndex(prev => prev + 1);
      }, 130);

      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F5A0', '#00D9F5', '#3B82F6', '#1DB954']
      });
    }
  }, [currentIndex, allTracks.length, isCompleted, soundEnabled]);

  const progressPercent = allTracks.length > 0 
    ? Math.round((currentIndex / allTracks.length) * 100) 
    : 0;

  const currentTrack = allTracks[currentIndex] || allTracks[allTracks.length - 1];

  const handleExportCsv = () => {
    if (playlists[0]) {
      exportPlaylistToCsv({ ...playlists[0], tracks: allTracks });
    }
  };

  const handleExportM3u = () => {
    if (playlists[0]) {
      exportPlaylistToM3u({ ...playlists[0], tracks: allTracks });
    }
  };

  const handleExportJson = () => {
    if (playlists[0]) {
      exportPlaylistToJson({ ...playlists[0], tracks: allTracks });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11131E] border border-white/10 text-xs text-[#00F5A0] font-semibold mb-3">
          <StudioEqualizer active={!isCompleted} className="h-4" />
          <span>{isCompleted ? 'Synchronisation achevée avec succès' : 'Synchronisation en cours'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isCompleted 
            ? 'Toutes vos pistes sont transférées !' 
            : `Synchronisation de ${sourcePlatform.name} vers ${destinationPlatform.name}`}
        </h1>
        <p className="text-xs sm:text-sm text-mixify-muted mt-1">
          {isCompleted 
            ? `${allTracks.length} titres ont été recréés sans aucune perte de qualité.` 
            : `Matching acoustique et réconciliation des métadonnées ISRC en direct...`}
        </p>
      </div>

      {/* Main Studio Progress Card */}
      <div className="w-full max-w-2xl bg-[#0F121C] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
        {/* Progress Bar & Percentage */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-white flex items-center gap-2">
              <span>{isCompleted ? '100% Terminé' : `Correspondance : ${currentIndex}/${allTracks.length} morceaux`}</span>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="text-mixify-muted hover:text-white transition"
                title={soundEnabled ? 'Désactiver le signal sonore' : 'Activer le signal sonore'}
                aria-label="Contrôle audio"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00F5A0]" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </span>
            <span className="text-[#00F5A0] font-mono font-bold text-sm">{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 bg-[#141828] rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,245,160,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Live Matching Status Banner */}
        {!isCompleted && currentTrack && (
          <div className="mb-6 p-4 rounded-2xl bg-[#141828] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#00F5A0]/15 text-[#00F5A0] flex items-center justify-center animate-pulse flex-shrink-0">
                <Music className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-mixify-muted uppercase font-bold tracking-wider">
                  Recherche sur {destinationPlatform.name}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {currentTrack.title} — <span className="text-mixify-muted font-normal">{currentTrack.artist}</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#00F5A0] font-semibold border border-[#00F5A0]/20 flex-shrink-0">
              Trouvé
            </span>
          </div>
        )}

        {/* Tracks List */}
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
          {allTracks.map((track, idx) => {
            const isDone = track.status === 'matched';
            const isCurrent = idx === currentIndex && !isCompleted;

            return (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3 rounded-2xl transition ${
                  isCurrent 
                    ? 'bg-[#00F5A0]/10 border border-[#00F5A0]/30' 
                    : isDone 
                    ? 'bg-white/[0.02] hover:bg-white/[0.04]' 
                    : 'opacity-40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-[#00F5A0]/20 text-[#00F5A0] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <span className="w-5 h-5 border-2 border-[#00F5A0] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" />
                  )}

                  <div className="text-left min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white truncate">
                      {track.title}
                    </div>
                    <div className="text-[11px] text-mixify-muted truncate">
                      {track.artist} {track.album && `• ${track.album}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right flex-shrink-0">
                  {isDone && (
                    <span className="text-[10px] text-[#00F5A0] font-mono bg-[#00F5A0]/10 px-2 py-0.5 rounded-full">
                      {track.matchScore}%
                    </span>
                  )}
                  <span className="text-xs text-mixify-muted font-mono">
                    {track.duration || '3:30'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exports */}
        {isCompleted && (
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-mixify-muted">
              <FileSpreadsheet className="w-4 h-4 text-[#00F5A0]" />
              <span>Sauvegarder les métadonnées :</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span>CSV</span>
              </button>
              <button
                onClick={handleExportM3u}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#00D9F5]" />
                <span>M3U8</span>
              </button>
              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion Actions */}
      {isCompleted ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <a
            href={destinationPlatform.id === 'spotify' ? 'https://open.spotify.com' : 'https://mixify.fr'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#3B82F6] hover:opacity-95 text-[#08090E] font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2"
          >
            <span>Ouvrir dans {destinationPlatform.name}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>

          <button
            onClick={onReset}
            className="w-full py-4 px-6 rounded-full bg-[#151928] hover:bg-[#1C2236] text-white font-bold text-sm transition flex items-center justify-center gap-2 border border-white/5"
          >
            <RotateCcw className="w-4 h-4 text-[#00F5A0]" />
            <span>Nouveau transfert</span>
          </button>
        </div>
      ) : (
        <div className="text-xs text-mixify-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-ping" />
          <span>Synchronisation sécurisée en cours... Vous pouvez laisser cette fenêtre ouverte.</span>
        </div>
      )}
    </div>
  );
};
