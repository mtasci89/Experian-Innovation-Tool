# Experian Innovation Tool — Onboarding Notes

Internal innovation pipeline / Kanban app. Bu dosya yeni Claude Code session'larının hızlı toparlanması için.

## Stack
- **Tek dosya React** uygulaması (`index.html`) — Babel-standalone ile derleniyor, build step yok
- **Tailwind CDN** + custom `tailwind.config` (Experian renk paleti remap'i)
- **Firebase Realtime Database** (compat SDK 10.12.2) — `appData`, `appData_history`, `authConfig` node'ları
- **Firebase Anonymous Auth** — RTDB kuralları `auth != null` istiyor
- **pptxgenjs + xlsx** CDN'den — PPT/Excel export için
- **Netlify** static deploy — `main` branch'e push otomatik deploy tetikler
- **`_redirects`** — `/new-idea`, `/yenifikir`, `/submit` SPA rewrite'ları (public problem submission link'i)

## Önemli Dosyalar
- `index.html` — bütün uygulama (~4400 satır). React component'ler, reducer, Firebase sync, PPT export hepsi burada.
- `_redirects` — Netlify URL rewrite
- `database.rules.json` — Firebase RTDB security rules (referans; Console'a manuel paste edilmiş)
- `favicon.svg` — Experian brand mark (4 rounded squares)

## Mimari Kısa Özet
- `Root` component → `isSubmitRoute()` ile ya `App` (ana tool) ya `SubmitProblemPage` (public form) render eder
- `App` içinde `useReducer` global state'i tutar; her action sonrası `saveState(s)` Firebase'e yazar
- Firebase `ref.on('value')` ile remote değişiklikler `SYNC_FROM_FIREBASE` action'ı ile state'e sync olur
- **Auth-aware write gate**: `window.__authReady` flag'i + `onAuthStateChanged` ile `signInAnonymously` çözülmeden tetiklenen yazmalar kuyruklanır
- Save hatası olursa `window.__setSaveError` global bus → App'in tepesinde kırmızı sticky banner

## Rol Sistemi
- **Admin**: tam edit yetkisi (giriş ekranında admin şifresi)
- **Viewer**: sadece okuma + Problem kolonuna kart ekleyebilme; kendi eklediği kartı (viewerToken match'i) edit/delete edebilir
- **Public submitter**: `/new-idea` rotasından şifresiz problem kartı gönderir; localStorage'da `viewerToken` ile kim olduğu işaretlenir

## Pipeline Stage'ler (default)
Problem → Solution → Feedback → Test & Learn → Pilot → Scale. Renkleri Experian palette'ten (`#C1188B`, `#E80070`, `#77127B`, `#426DA9`, `#1D4F91`, `#122F58`). Settings → Pipeline'dan değiştirilebilir.

## Problem Form Soruları (5 adet — ilk 3'ü zorunlu)
1. Problem / Fırsat nedir?
2. Problemin sahibi hedef segment kimdir?
3. Fırsat ile hizmet edilecek kitle nedir?
4. Çözüm önerin varsa yazabilir misin?
5. Projenin gelişme sürecine dahil olmak ister misin?

## Geliştirme Akışı
1. Branch aç: `claude/<short-topic>`
2. `index.html`'i edit et (gerekirse `_redirects` veya başka dosyaları)
3. Commit + push
4. PR aç `main`'e karşı; merge sonrası Netlify otomatik deploy

> **`main` branch'ine direkt push YOK** — branch protection açık, PR şart.

## Firebase Console
- Proje: `innovation-tool-1eb65`
- Authentication → Sign-in method → **Anonymous etkin olmalı** (kapatılırsa uygulama yazma yapamaz)
- Realtime Database → Rules: `{ "rules": { ".read": "auth != null", ".write": "auth != null" } }`
- Web `apiKey` HTML içinde public — bu Firebase'de NORMAL; güvenlik kurallar + anon auth ile sağlanıyor

## Yaygın Tuzaklar
- **Veri kaybı tanısı**: Kullanıcı "değişiklik kaydolmadı" derse → DevTools console'da `[save]` veya `[anon-auth]` hatalarına bak. Genelde Anonymous Auth Console'da kapalı kalmış olur.
- **Firebase array → object dönüşümü**: RTDB array'leri `{0:..., 1:...}` formatına çevirir; `normalizeFirebaseData` bunu geri çevirir
- **User Journey section**: Auto-upgrade var — "User Journey" isimli section'lar otomatik `type: 'journey'` olur
- **Settings → Veri Yedekle / İçe Aktar**: Import şu an sadece localStorage'a yazıyor, Firebase'i override etmiyor (TODO: Firebase'e direkt push'a çevrilmeli)
- **localStorage backup**: Her save sonrası `innovation-tool-backup-YYYY-MM-DD` key'inde son 7 günün snapshot'ı saklanır — kurtarma için faydalı

## Recovery Tools
- Firebase'de `appData_history` node'unda her save'in immutable snapshot'ı tutulur (son 100 tane)
- Tarayıcıda localStorage'da günlük backup
- Settings → Data tab → Export ile JSON indirilebilir

## Branding
- Experian palette: `#1D4F91` (blue), `#E80070` (magenta), `#77127B` (purple), `#C1188B` (pink), `#426DA9` (mid blue)
- Tab başlığı: "Experian Innovation Pipeline"
- Favicon: 4 rounded squares (Experian brand mark)
