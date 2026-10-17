import { Playlist, Track } from '../types';

export function parseRawTextToTracks(text: string): Track[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const tracks: Track[] = [];

  lines.forEach((line, index) => {
    // Strip leading numbers like "1.", "01 -", etc.
    const cleanLine = line.replace(/^\d+[\s.\-_)]+/, '').trim();
    if (!cleanLine) return;

    let artist = 'Artiste inconnu';
    let title = cleanLine;

    if (cleanLine.includes(' - ')) {
      const parts = cleanLine.split(' - ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    } else if (cleanLine.includes(' — ')) {
      const parts = cleanLine.split(' — ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' — ').trim();
    } else if (cleanLine.includes(',')) {
      const parts = cleanLine.split(',');
      title = parts[0].trim();
      artist = parts[1]?.trim() || 'Artiste inconnu';
    }

    tracks.push({
      id: `custom-track-${index + 1}`,
      title,
      artist,
      duration: '3:30',
      status: 'pending'
    });
  });

  return tracks;
}

export function parseM3uContent(content: string): Track[] {
  const lines = content.split(/\r?\n/);
  const tracks: Track[] = [];
  let currentTitle = '';
  let currentArtist = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      const info = line.substring(8);
      const commaIndex = info.indexOf(',');
      if (commaIndex !== -1) {
        const titlePart = info.substring(commaIndex + 1).trim();
        if (titlePart.includes(' - ')) {
          const parts = titlePart.split(' - ');
          currentArtist = parts[0].trim();
          currentTitle = parts.slice(1).join(' - ').trim();
        } else {
          currentTitle = titlePart;
          currentArtist = 'Inconnu';
        }
      }
    } else if (line && !line.startsWith('#')) {
      tracks.push({
        id: `m3u-${tracks.length + 1}`,
        title: currentTitle || line.replace(/\.[^/.]+$/, ''),
        artist: currentArtist || 'Artiste',
        duration: '3:45',
        status: 'pending'
      });
      currentTitle = '';
      currentArtist = '';
    }
  }

  return tracks;
}

export function parseCsvContent(content: string): Track[] {
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];

  const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const titleIdx = headers.findIndex(h => h.includes('titre') || h.includes('title') || h.includes('track') || h.includes('name'));
  const artistIdx = headers.findIndex(h => h.includes('artiste') || h.includes('artist'));
  const albumIdx = headers.findIndex(h => h.includes('album'));

  const tracks: Track[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(col => col.trim().replace(/^["']|["']$/g, ''));
    if (row.length === 0 || !row[0]) continue;

    const title = titleIdx !== -1 && row[titleIdx] ? row[titleIdx] : row[0];
    const artist = artistIdx !== -1 && row[artistIdx] ? row[artistIdx] : (row[1] || 'Artiste inconnu');
    const album = albumIdx !== -1 && row[albumIdx] ? row[albumIdx] : undefined;

    tracks.push({
      id: `csv-${i}`,
      title,
      artist,
      album,
      duration: '3:20',
      status: 'pending'
    });
  }

  return tracks;
}

export async function parseFileToPlaylist(file: File): Promise<Playlist> {
  const text = await file.text();
  let tracks: Track[] = [];
  const fileName = file.name.replace(/\.[^/.]+$/, '');

  if (file.name.endsWith('.m3u') || file.name.endsWith('.m3u8')) {
    tracks = parseM3uContent(text);
  } else if (file.name.endsWith('.csv')) {
    tracks = parseCsvContent(text);
  } else if (file.name.endsWith('.json')) {
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        tracks = data.map((item, idx) => ({
          id: `json-${idx}`,
          title: item.title || item.name || `Titre ${idx + 1}`,
          artist: item.artist || item.artistName || 'Artiste inconnu',
          album: item.album,
          duration: item.duration || '3:30',
          status: 'pending' as const
        }));
      } else if (data.tracks && Array.isArray(data.tracks)) {
        tracks = data.tracks.map((item: any, idx: number) => ({
          id: `json-${idx}`,
          title: item.title || item.name || `Titre ${idx + 1}`,
          artist: item.artist || item.artistName || 'Artiste inconnu',
          album: item.album,
          duration: item.duration || '3:30',
          status: 'pending' as const
        }));
      }
    } catch {
      tracks = parseRawTextToTracks(text);
    }
  } else {
    tracks = parseRawTextToTracks(text);
  }

  return {
    id: `file-playlist-${Date.now()}`,
    title: fileName || 'Playlist importée depuis fichier',
    trackCount: tracks.length,
    selectedCount: tracks.length,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    tracks,
    selected: true
  };
}

export function exportPlaylistToCsv(playlist: Playlist): void {
  const headers = 'Titre,Artiste,Album,Duree,Statut\n';
  const rows = playlist.tracks.map(t => 
    `"${t.title.replace(/"/g, '""')}","${t.artist.replace(/"/g, '""')}","${(t.album || '').replace(/"/g, '""')}","${t.duration || ''}","${t.status}"`
  ).join('\n');

  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${playlist.title.replace(/[^a-z0-9]/gi, '_')}.csv`);
}

export function exportPlaylistToM3u(playlist: Playlist): void {
  let m3u = '#EXTM3U\n';
  playlist.tracks.forEach(t => {
    m3u += `#EXTINF:-1,${t.artist} - ${t.title}\n${t.artist} - ${t.title}.mp3\n`;
  });

  const blob = new Blob([m3u], { type: 'audio/x-mpegurl;charset=utf-8;' });
  downloadBlob(blob, `${playlist.title.replace(/[^a-z0-9]/gi, '_')}.m3u`);
}

export function exportPlaylistToJson(playlist: Playlist): void {
  const jsonStr = JSON.stringify(playlist, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
  downloadBlob(blob, `${playlist.title.replace(/[^a-z0-9]/gi, '_')}.json`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
