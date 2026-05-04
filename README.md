# Innovation Tool

Tek dosyalı (HTML + React + Firebase Realtime Database) inovasyon pipeline yönetim aracı.

## Çalıştırma

```bash
./start.sh
# veya
python3 -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` aç.

## Veri Mimarisi

- **Firebase Realtime Database** — `appData` ana kaynak, tüm tarayıcılar arası senkron.
- **`appData_history`** — her değişiklikte otomatik snapshot (son 100 sürüm Firebase'de tutulur).
- **localStorage `innovation-tool-v3`** — offline ayna.
- **localStorage `innovation-tool-backup-YYYY-MM-DD`** — son 7 günün günlük yedekleri.

## Veri Güvenliği

- Firebase'deki `appData` boş/null olursa otomatik olarak yerel yedekle **üzerine yazılmaz** — kullanıcıya sorulur.
- Her yazma `appData_history`'e immutable snapshot olarak eklenir; Firebase Console'dan geri yüklenebilir.
- Manuel export/import: Ayarlar → Veri sekmesinden JSON yedek alınabilir.

## Geri Yükleme (kayıp veri kurtarma)

1. Firebase Console → Realtime Database → `appData_history`
2. Kayıp tarihinden önceki bir snapshot seç → `data` alanını kopyala
3. `appData` node'unun değerini bu JSON ile değiştir
