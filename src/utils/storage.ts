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

  // Cover image: Keep web URLs or reasonably sized base64 images (<120KB)
  if (copy.basicInfo?.coverImage) {
    const cover = copy.basicInfo.coverImage;
    if (cover.startsWith('blob:') || (cover.startsWith('data:') && cover.length > 120000)) {
      copy.basicInfo.coverImage =
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80';
    }
  }

  // Gallery photos: Keep web URLs or reasonably sized base64 images
  if (Array.isArray(copy.gallery)) {
    copy.gallery = copy.gallery.map((g: any) => {
      const url = g.url || '';
      if (url.startsWith('blob:') || (url.startsWith('data:') && url.length > 120000)) {
        return {
          ...g,
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        };
      }
      return g;
    });
  }

  // Videos: Web URLs (like YouTube/Vimeo) are kept intact.
  if (Array.isArray(copy.videos)) {
    copy.videos = copy.videos.map((v: any) => {
      const url = v.url || '';
      if (url.startsWith('data:') || url.startsWith('blob:')) {
        return {
          ...v,
          url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
        };
      }
      return v;
    });
  }

  // Audio: Web URLs or presets are kept intact.
  if (copy.audio?.url) {
    const url = copy.audio.url;
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      copy.audio.url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    }
  }

  return copy;
}

function compactEncode(clean: any): any {
  return {
    v: 2,
    b: [
      clean.basicInfo?.partnerName || '',
      clean.basicInfo?.creatorName || '',
      clean.basicInfo?.startDate || '',
      clean.basicInfo?.title || '',
      clean.basicInfo?.subtitle || '',
      clean.basicInfo?.coverImage || '',
    ],
    l: [
      clean.letter?.text || '',
      clean.letter?.typewriterSpeed || 'medium',
      clean.letter?.paperStyle || 'cream',
      clean.letter?.signature || '',
    ],
    g: (clean.gallery || []).map((item: any) => [
      item.id || '',
      item.url || '',
      item.caption || '',
      item.date || '',
    ]),
    vi: (clean.videos || []).map((item: any) => [
      item.id || '',
      item.url || '',
      item.title || '',
      item.description || '',
    ]),
    q: (clean.quotes || []).map((item: any) => [
      item.id || '',
      item.quote || '',
      item.author || '',
      item.category || '',
    ]),
    u: (clean.vouchers || []).map((item: any) => [
      item.id || '',
      item.title || '',
      item.description || '',
      item.emoji || '💖',
      item.color || 'from-rose-500 to-pink-500',
      item.redeemed ? 1 : 0,
      item.redeemedAt || '',
    ]),
    t: (clean.timeline || []).map((item: any) => [
      item.id || '',
      item.title || '',
      item.date || '',
      item.description || '',
      item.iconName || 'Heart',
      item.photoUrl || '',
    ]),
    r: (clean.reasons || []).map((item: any) => [
      item.id || '',
      item.number || 1,
      item.reason || '',
      item.icon || 'Heart',
    ]),
    a: [
      clean.audio?.sourceType || 'preset',
      clean.audio?.presetId || '',
      clean.audio?.url || 'synth',
      clean.audio?.title || 'Música Romántica',
      clean.audio?.artist || 'Melodía de fondo',
      clean.audio?.autoPlay ? 1 : 0,
    ],
    th: clean.theme?.id || 'rose-gold',
  };
}

function unpackCompact(obj: any): LoveLetterData {
  if (!obj || typeof obj !== 'object') return INITIAL_DEFAULT_LETTER;

  if (obj.v !== 2) {
    const data = obj as LoveLetterData;
    if (data.theme && data.theme.id && THEMES[data.theme.id]) {
      data.theme = THEMES[data.theme.id];
    } else if (!data.theme || !data.theme.id) {
      data.theme = THEMES['rose-gold'];
    }
    return data;
  }

  const [partnerName, creatorName, startDate, title, subtitle, coverImage] = obj.b || [];
  const [letterText, typewriterSpeed, paperStyle, signature] = obj.l || [];
  const [sourceType, presetId, audioUrl, audioTitle, audioArtist, autoPlay] = obj.a || [];
  const themeId = obj.th || 'rose-gold';

  return {
    id: obj.id || 'letter_' + Date.now(),
    basicInfo: {
      partnerName: partnerName || 'Mi Amor',
      creatorName: creatorName || 'Tu Pareja',
      startDate: startDate || new Date().toISOString().split('T')[0],
      title: title || 'Nuestra Historia de Amor',
      subtitle: subtitle || 'Un viaje inolvidable juntos',
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    },
    letter: {
      text: letterText || '',
      typewriterSpeed: typewriterSpeed || 'medium',
      paperStyle: paperStyle || 'cream',
      signature: signature || creatorName || 'Con todo mi amor',
    },
    gallery: (obj.g || []).map(([id, url, caption, date]: any) => ({
      id: id || String(Math.random()),
      url: url || '',
      caption: caption || '',
      date: date || '',
    })),
    videos: (obj.vi || []).map(([id, url, videoTitle, description]: any) => ({
      id: id || String(Math.random()),
      url: url || '',
      title: videoTitle || '',
      description: description || '',
    })),
    quotes: (obj.q || []).map(([id, quote, author, category]: any) => ({
      id: id || String(Math.random()),
      quote: quote || '',
      author: author || '',
      category: category || '',
    })),
    vouchers: (obj.u || []).map(([id, voucherTitle, description, emoji, color, redeemed, redeemedAt]: any) => ({
      id: id || String(Math.random()),
      title: voucherTitle || '',
      description: description || '',
      emoji: emoji || '💖',
      color: color || 'from-rose-500 to-pink-500',
      redeemed: Boolean(redeemed),
      redeemedAt: redeemedAt || undefined,
    })),
    timeline: (obj.t || []).map(([id, eventTitle, date, description, iconName, photoUrl]: any) => ({
      id: id || String(Math.random()),
      title: eventTitle || '',
      date: date || '',
      description: description || '',
      iconName: iconName || 'Heart',
      photoUrl: photoUrl || '',
    })),
    reasons: (obj.r || []).map(([id, num, reason, icon]: any) => ({
      id: id || String(Math.random()),
      number: num || 1,
      reason: reason || '',
      icon: icon || 'Heart',
    })),
    audio: {
      sourceType: sourceType || 'preset',
      presetId: presetId || undefined,
      url: audioUrl || 'synth',
      title: audioTitle || 'Música Romántica',
      artist: audioArtist || 'Melodía de fondo',
      autoPlay: Boolean(autoPlay),
    },
    theme: THEMES[themeId] || THEMES['rose-gold'],
    createdAt: obj.createdAt || new Date().toISOString(),
    updatedAt: obj.updatedAt || new Date().toISOString(),
  };
}

export async function shortenUrl(longUrl: string): Promise<string> {
  if (!longUrl) return longUrl;

  const tinyUrlEndpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

  // 1. Direct TinyURL API call
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(tinyUrlEndpoint, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) {
      const short = (await response.text()).trim();
      if (short && short.startsWith('http')) {
        return short;
      }
    }
  } catch (err) {
    console.warn('Direct TinyURL API failed:', err);
  }

  // 2. AllOrigins CORS Proxy to TinyURL API (guarantees CORS headers in browser)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(tinyUrlEndpoint)}`;
    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) {
      const short = (await response.text()).trim();
      if (short && short.startsWith('http')) {
        return short;
      }
    }
  } catch (err) {
    console.warn('AllOrigins TinyURL proxy failed:', err);
  }

  // 3. Fallback shortener (clck.ru)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(
      `https://clck.ru/--?url=${encodeURIComponent(longUrl)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    if (response.ok) {
      const short = (await response.text()).trim();
      if (short && short.startsWith('http')) {
        return short;
      }
    }
  } catch (err) {
    console.warn('clck.ru shortener failed:', err);
  }

  return longUrl;
}

export function encodeLetterToUrl(data: LoveLetterData): string {
  try {
    const clean = cleanDataForSharing(data);
    const compactObj = compactEncode(clean);
    const json = JSON.stringify(compactObj);
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
        jsonStr = LZString.decompressFromEncodedURIComponent(legacyParam);
        if (!jsonStr) {
          jsonStr = decodeURIComponent(atob(legacyParam));
        }
      }
    }

    if (!jsonStr) return null;

    const parsed = JSON.parse(jsonStr);
    return unpackCompact(parsed);
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
