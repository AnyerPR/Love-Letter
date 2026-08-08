import LZString from 'lz-string';
import { LoveLetterData } from '../types';
import { INITIAL_DEFAULT_LETTER, THEMES } from '../data/presets';

const STORAGE_KEY = 'love_letter_saved_data_v1';

export function saveLetterToLocalStorage(data: LoveLetterData): void {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonString);
  } catch (err) {
    console.warn('Could not save to localStorage:', err);
  }
}

export function loadLetterFromLocalStorage(): LoveLetterData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as LoveLetterData;
    // Re-attach theme config object if missing full details
    if (parsed.theme && parsed.theme.id && THEMES[parsed.theme.id]) {
      parsed.theme = THEMES[parsed.theme.id];
    }
    return parsed;
  } catch (err) {
    console.warn('Could not parse localStorage letter:', err);
    return null;
  }
}

function cleanDataForSharing(data: LoveLetterData): any {
  // Deep clone data
  const copy: any = JSON.parse(JSON.stringify(data));

  // Strip heavy repetitive theme object, keeping only theme id
  if (copy.theme && copy.theme.id) {
    copy.theme = { id: copy.theme.id };
  }

  // Replace base64 data URLs with lightweight romantic placeholders so URLs stay tiny
  if (copy.basicInfo?.coverImage?.startsWith('data:')) {
    copy.basicInfo.coverImage =
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80';
  }

  if (Array.isArray(copy.gallery)) {
    copy.gallery = copy.gallery.map((g: any) => {
      if (g.url?.startsWith('data:')) {
        return {
          ...g,
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        };
      }
      return g;
    });
  }

  if (Array.isArray(copy.videos)) {
    copy.videos = copy.videos.map((v: any) => {
      if (v.url?.startsWith('data:')) {
        return {
          ...v,
          url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
        };
      }
      return v;
    });
  }

  if (copy.audio?.url?.startsWith('data:')) {
    copy.audio.url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }

  return copy;
}

export async function shortenUrl(longUrl: string): Promise<string> {
  if (!longUrl) return longUrl;
  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    if (response.ok) {
      const short = await response.text();
      if (short && short.trim().startsWith('http')) {
        return short.trim();
      }
    }
  } catch (err) {
    console.warn('TinyURL shortener failed:', err);
  }

  try {
    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`
    );
    if (response.ok) {
      const json = await response.json();
      if (json.shorturl) {
        return json.shorturl;
      }
    }
  } catch (err) {
    console.warn('is.gd shortener failed:', err);
  }

  return longUrl;
}

export function encodeLetterToUrl(data: LoveLetterData): string {
  try {
    const clean = cleanDataForSharing(data);
    const json = JSON.stringify(clean);
    const compressed = LZString.compressToEncodedURIComponent(json);
    
    const origin = window.location.origin;
    const url = new URL(origin + window.location.pathname);
    url.searchParams.set('l', compressed);
    return url.toString();
  } catch (err) {
    console.error('Failed to encode letter to URL:', err);
    return window.location.href;
  }
}

export function decodeLetterFromUrl(): LoveLetterData | null {
  try {
    let queryString = window.location.search;
    if (!queryString && window.location.hash) {
      const hash = window.location.hash;
      if (hash.includes('?')) {
        queryString = hash.substring(hash.indexOf('?'));
      } else if (hash.includes('l=')) {
        queryString = '?' + hash.substring(hash.indexOf('l='));
      }
    }

    const params = new URLSearchParams(queryString);
    let compressedParam = params.get('l');
    let jsonStr: string | null = null;

    if (compressedParam) {
      jsonStr = LZString.decompressFromEncodedURIComponent(compressedParam);
      if (!jsonStr) {
        jsonStr = LZString.decompressFromEncodedURIComponent(decodeURIComponent(compressedParam));
      }
    }

    if (!jsonStr) {
      const legacyParam = params.get('letter');
      if (legacyParam) {
        // Try LZString decompress first
        jsonStr = LZString.decompressFromEncodedURIComponent(legacyParam);
        if (!jsonStr) {
          // Legacy base64 fallback
          jsonStr = decodeURIComponent(atob(legacyParam));
        }
      }
    }

    if (!jsonStr) return null;

    const data = JSON.parse(jsonStr) as LoveLetterData;
    if (data.theme && data.theme.id && THEMES[data.theme.id]) {
      data.theme = THEMES[data.theme.id];
    } else if (!data.theme || !data.theme.id) {
      data.theme = THEMES['rose-gold'];
    }
    return data;
  } catch (err) {
    console.warn('Failed to decode letter from URL:', err);
    return null;
  }
}

export function exportLetterAsJson(data: LoveLetterData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `carta-de-amor-${data.basicInfo.partnerName.toLowerCase().replace(/\s+/g, '-')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
