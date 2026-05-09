/* ───────────────────────────────────────────────────────────────────────────
   2 KAYIP KARTI GERİ YÜKLE — Kurye Güven Skoru + Hangi Kredi D2C
   Kullanım: experianinnovation.netlify.app açıkken DevTools → Console
            tüm bu dosyayı kopyala-yapıştır → Enter
   ─────────────────────────────────────────────────────────────────────────── */
(async () => {
  const db = firebase.database();
  const snap = await db.ref('appData').once('value');
  const data = snap.val();
  if (!data) { console.error('appData boş — durduruldu'); return; }

  const ideas = Array.isArray(data.ideas) ? [...data.ideas] : [];

  const have = (title) => ideas.some(i => (i.title || '').trim().toLowerCase() === title.toLowerCase());
  const uuid = () => 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const tCreate1 = Date.parse('2026-04-18') || Date.now();
  const tCreate2 = Date.parse('2026-04-27') || Date.now();
  const now     = Date.now();

  const newIdeas = [];

  // ── 1) Kurye Güven Skoru ───────────────────────────────────────────────
  if (!have('Kurye Güven Skoru')) {
    newIdeas.push({
      id: uuid(),
      title: 'Kurye Güven Skoru',
      tagline: 'E-ticaret ve yemek pazaryerleri için kurye seçiminde risk, güvenilirlik ve davranış skorlama hizmeti',
      description: '',
      stageId: 'solution',
      createdAt: tCreate2, updatedAt: now,
      owner: '', tags: [],
      nextStep: 'Pazaryerleri ile görüşme yapılması gerekiyor.',
      stageData: {},
      canvases: [{
        id: uuid(),
        name: 'Experian Business Canvas (import)',
        templateId: 'experian',
        sections: [
          { id: 'jtbd', name: 'JTBD', content: '' },
          { id: 'problem-solution', name: 'Problem & Solution', content:
            'PROBLEM\n' +
            'Pazaryerleri işe aldıkları kurye adayı hakkında sistematik bilgiye sahip değiller\n' +
            'Kurye müşteriyle doğrudan temas ediyor; kötü davranış, hırsızlık, geç teslimat marka itibarına ve müşteri kaybına yol açıyor\n' +
            'Yüksek turnover (%40+ yıllık) ek risk oluşturuyor\n\n' +
            '✓ ÇÖZÜM\n' +
            'Her kurye adayı için Kurye Güven Skoru: Esnaf kurye olarak şahıs şirketi…' },
          { id: 'business-partners', name: 'Business Partners', content:
            'Yemek platformları — Yemeksepeti, Trendyol Go, Getir\n' +
            'Hızlı ticaret — HepsiJet, Trendyol Express, Banabi\n' +
            'Son-kilometre kargo — PTT Kurye, Aras, MNG, Yurtiçi\n' +
            'Bağımsız kurye platformları — Vigo, Paket Taxi' },
          { id: 'data-partners', name: 'Data Partners', content:
            'EGM — TCKN sorgusu  Kişiye yazılan trafik cezaları, ehliyet durumu, sürücü sicili\n' +
            'EGM — VKN / Plaka  Şahıs şirketine kayıtlı araca yazılan trafik cezaları (plaka bazlı)\n' +
            'E-devlet / Adli Sicil  Sabıka kaydı özeti (KVKK uyumlu, kurye rızasıyla)\n' +
            'KKB  Bireysel kredi davranışı, temerrüt, gecikme geçmişi\n' +
            'GİB — VKN  Şahıs şirketi vergi sicili, esnaf statüsü' },
          { id: 'user-journey', name: 'User Journey', type: 'journey', content: '', steps: [] },
          { id: 'market-size', name: 'Market Size', content:
            '500K Aktif Motokurye Sayısı*\n' +
            '200K Yıllık İşe Alım İşlemi\n\n' +
            '*Tüm Anadolu Motosikletli Kuryeler Federasyonu 2025' },
          { id: 'experian-strategy', name: 'Experian Strategy Relevance', content:
            'Hem kuryeler şahıs şirketi olduğu için KOBİ skorlama, hem de kuryelerin bireysel skorlaması sonradan D2C app\'e eklenebilir.' },
          { id: 'northstar', name: 'Northstar Feature', content: '' },
          { id: 'monetization', name: 'Monetization', content: '' },
        ],
      }],
    });
  }

  // ── 2) Hangi Kredi D2C ─────────────────────────────────────────────────
  if (!have('Hangi Kredi D2C')) {
    const ideaId = uuid();
    newIdeas.push({
      id: ideaId,
      title: 'Hangi Kredi D2C',
      tagline: 'Hangi Kredi üzerinden son tüketiciye skorlama ve Experian insightları sunmak',
      description: '',
      stageId: 'solution',
      createdAt: tCreate2, updatedAt: now,
      owner: '', tags: ['#D2C'],
      nextStep:
        'Son Workshop 28.04\'te tamamlayacağız.\n' +
        '11 Nisan haftasında Simge\'ye final durumu anlatacağız.',
      stageData: {
        solution: {
          notes: [{
            id: uuid(),
            stageId: 'solution',
            text: 'Örnek Experian ekranı',
            author: '',
            createdAt: tCreate2,
          }],
          evaluation: null,
        },
      },
      canvases: [],
    });
  }

  if (!newIdeas.length) {
    console.log('Her iki kart da zaten mevcut — değişiklik yapılmadı.');
    return;
  }

  const next = { ...data, ideas: [...ideas, ...newIdeas], updatedAt: now };
  await db.ref('appData').set(next);
  console.log('✅ Geri yüklendi:', newIdeas.map(i => i.title));
})();
