export interface Affiliator {
  id: string;
  code: string;
  name: string;
  phone: string;
  area: string;
  isDefault?: boolean;
}

export const STORAGE_KEY_AFFILIATORS = 'dlp_affiliators_list_v2';
export const STORAGE_KEY_SELECTED_AFF = 'dlp_selected_aff_id_v2';

export const INITIAL_AFFILIATORS: Affiliator[] = [
  {
    id: 'pusat',
    code: 'PUSAT',
    name: 'Admin Dapur Pusat (Iket Ijo Bintaro)',
    phone: '085964245547',
    area: 'Pusat Bintaro & Seluruh Area Antar',
    isDefault: true,
  },
  {
    id: 'aff-sektor9',
    code: 'AFF-01',
    name: 'Afiliator Bu Ratna (Sektor 7, 8, 9)',
    phone: '081298765432',
    area: 'Sektor 7, 8, 9, Emerald & Discovery',
  },
  {
    id: 'aff-plaza',
    code: 'AFF-02',
    name: 'Agen Bintaro Plaza & Pondok Ranji (Pak Dedi)',
    phone: '081387654321',
    area: 'Bintaro Plaza, Sektor 1 - 3, Pondok Ranji',
  },
  {
    id: 'aff-graha',
    code: 'AFF-03',
    name: 'Afiliator Graha Raya & CBD (Mba Sari)',
    phone: '081987654321',
    area: 'Graha Raya, Silkwood, CBD Bintaro',
  },
];

export function formatPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '62' + digits.slice(1);
  }
  if (digits.startsWith('62')) {
    return digits;
  }
  return '62' + digits;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('62')) {
    return '0' + digits.slice(2);
  }
  return digits;
}

export function getStoredAffiliators(): Affiliator[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AFFILIATORS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return INITIAL_AFFILIATORS;
}

export function saveStoredAffiliators(affiliators: Affiliator[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_AFFILIATORS, JSON.stringify(affiliators));
  } catch (e) {
    // ignore
  }
}

export function getInitialSelectedAffiliator(): Affiliator {
  const list = getStoredAffiliators();
  
  // Check URL query param first (e.g. ?aff=aff-sektor9 or ?aff=AFF-01 or ?aff=081298765432)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const affParam = params.get('aff') || params.get('agen') || params.get('afiliator');
    if (affParam) {
      const normalizedParam = affParam.trim().toLowerCase();
      const matched = list.find(
        (a) =>
          a.id.toLowerCase() === normalizedParam ||
          a.code.toLowerCase() === normalizedParam ||
          a.phone.replace(/\D/g, '') === normalizedParam.replace(/\D/g, '') ||
          a.name.toLowerCase().includes(normalizedParam)
      );
      if (matched) {
        try {
          localStorage.setItem(STORAGE_KEY_SELECTED_AFF, matched.id);
        } catch (e) {
          // ignore
        }
        return matched;
      }
    }

    // Check previously selected in localStorage
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_SELECTED_AFF);
      if (savedId) {
        const found = list.find((a) => a.id === savedId);
        if (found) return found;
      }
    } catch (e) {
      // ignore
    }
  }

  // Fallback to default or first
  return list.find((a) => a.isDefault) || list[0] || INITIAL_AFFILIATORS[0];
}
