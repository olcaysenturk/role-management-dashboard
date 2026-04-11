# Role Management Dashboard

Bu proje, bir sağlık kuruluşu için geliştirilen, kullanıcı ve rol yönetimini basitleştiren dinamik ve yüksek performanslı bir yönetim panelidir. Teknik değerlendirmede belirtilen ihtiyaçlar doğrultusunda projenin mimarisi ölçeklenebilir, sürdürülebilir ve erişilebilir (A11y) olacak şekilde kurgulandı.

## 🚀 Kurulum ve Çalıştırma

### 📋 Önerilen Çalıştırma Ortamı

Projenin en stabil ve performanslı şekilde çalışması için aşağıdaki ortam ayarları önerilir:
* **Node.js:** `v20.x` veya `v22.x` (LTS sürümleri en stabil deneyimi sunar).
* **npm:** `v10.x` veya üzeri.
* **Minimum Gereksinim:** Node.js `v18.18.0` (Next.js 15+ mimarisi için zorunludur).

### 🔧 Kurulum Adımları

1. **Bağımlılıkların Yüklenmesi:**
   ```bash
   npm install
   ```

2. **Geliştirme Ortamının Başlatılması:**
   ```bash
   npm run dev
   ```

3. **Uygulamaya Erişim:**
   Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

4. **Testlerin Çalıştırılması:**
   ```bash
   npm test
   ```

---

## 🔐 Ortam Değişkenleri (Environment Variables)

Projenin yapılandırması için `.env` dosyası kullanıldı. Gerekli temel değişkenler şunlardır:

*   `NEXT_PUBLIC_APP_TITLE`: Uygulamanın başlığı.
*   `NEXT_PUBLIC_APP_URL`: Sitemap ve canonical link üretimi için ana adres.
*   `NEXT_PUBLIC_APP_DESCRIPTION`: Varsayılan SEO açıklaması.

---

## 🛠️ Teknoloji Tercihlerim ve Nedenleri

Projede modern frontend standartlarını yansıtan şu araçlar ve kütüphaneler tercih edildi:

* **Next.js (App Router):** Modern sayfa yönetimi ve Server/Client ayrımı avantajlarından dolayı seçildi.
* **TypeScript:** Güçlü tür güvenliği ile çalışma zamanı hatalarını önlemek için projeye dahil edildi.
* **Tailwind CSS:** Tutarlı ve hızlı bir tasarım sistemi (Design System) kurmak için kullanıldı.
* **Headless UI:** Erişilebilirlik (A11y/ARIA) standartlarını hazır sunduğu için Modal ve Dropdown gibi kritik bileşenlerde tercih edildi.
* **Zod:** Form verilerini doğrulamak ve tür güvenliğini garantilemek için kullanıldı.
* **Jest & React Testing Library:** Kritik UI birimlerini test etmek ve erişilebilirlik standartlarını doğrulamak için sisteme entegre edildi.

### State Yönetimi Stratejisi
* **Redux Toolkit:** Kullanıcı listesi gibi sıklıkla güncellenen ve CRUD operasyonları içeren "iş mantığı" (domain state) verileri için **Redux** tercih edildi.
* **Context API:** Dil tercihi ve çeviri metinleri gibi seyrek değişen UI state'leri için **Context API** (`useLanguage`) kullanılarak "doğru işe doğru araç" prensibi uygulandı.

---

## 🧪 Test Yaklaşımım

Projede **"Birim Test" (Unit Testing)** yaklaşımı benimsendi. Özellikle tekrar kullanılabilir UI bileşenlerinin farklı koşullarda (hata, disabled, kullanıcı etkileşimi) beklenen şekilde davranıp davranmadığı denetlenmektedir. Testlerde görsel sonuçların yanı sıra ekran okuyucular için kritik olan ARIA niteliklerinin doğruluğuna da odaklanıldı.

---

## 📁 Klasör Yapısı ve Mimari Düzen

Bileşenlerin yeniden kullanılabilirliğini yüksek tutmak ve projenin ileride kolayca büyümesini sağlamak adına aşağıdaki dizin yapısı oluşturuldu:

```text
src/
├── app/                  # Yönlendirme ve meta verileri yöneten sayfa katmanı
├── components/           # UI ve iş mantığına göre ayrılmış bileşenler
│   ├── ui/               # Ortak ve "dumb" bileşenler (Button, Input, Modal)
│   └── users/            # Kullanıcı yönetimi domeinine özel bileşenler
├── hooks/                # useLanguage gibi özel React hook'ları
├── lib/                  # Sabitler (i18n), validasyonlar ve yardımcılar
├── store/                # Redux Toolkit store yapılandırması ve thunk'lar
└── types/                # Global TypeScript tanımlamaları
```

---

## 🎨 İsimlendirme ve Kod Standartlarım

Okunabilirliği artırmak için şu standartlar takip edildi:
* **PascalCase:** React bileşenleri için kullanıldı (Örn: `UserFormModal.tsx`).
* **kebab-case:** Dosya ve klasör adlarında, dosya sistemi uyumluluğu için tercih edildi.
* **Absolute Imports:** `@/` alias yapısı ile daha temiz bir import hiyerarşisi sağlandı.
* **Conventional Commits:** Versiyon geçmişini anlamlı kılmak için standart commit mesajları kullanıldı.

---

## ⏱️ Geliştirme Süreci
Mimari tasarım, geliştirme, SEO çalışmaları ve test yazımı dahil tüm süreç yaklaşık **6 saat** içerisinde tamamlandı. Sonrasında dikkat edilen hatalar için fix düzenlemeleri yapıldı.

---

## 🛠️ Veri Yönetimi (Data Handling)

Uygulamada gerçek bir backend entegrasyonuna hazır, asenkron bir veri akışı simüle edildi:
* **Yerel Dosya Tabanlı Veritabanı (Local JSON DB):** Verileri yönetmek için sadece bellekte tutulan geçici bir yapı yerine, `src/data/users.json` dosyası düşük gecikmeli bir yerel veritabanı olarak kurgulandı.
* **API Katmanı (Next.js Route Handlers):** Veri alışverişi standart Next.js API rotaları (`/api/users`) üzerinden yönetilmektedir. Bu rotalar, Node.js `fs` modülünü kullanarak dosyadan veri okuma (**GET**) ve dosyaya yeni veri yazma (**POST/PUT/DELETE**) işlemlerini asenkron olarak gerçekleştirir.
* **Veri Kalıcılığı (Persistence):** Bu mimari sayesinde uygulama kapatılsa veya sayfa yenilense dahi veriler `users.json` içerisinde güvenli bir şekilde saklanmaya devam eder; bu da projeye gerçek bir backend deneyimi kazandırır.
* **Veri Yazma ve Okuma:** UI katmanında Redux Thunk'lar kullanarak bu API endpoint'leri ile iletişim kuran, hata kontrolleri yapılmış temiz bir veri akışı sağlandı.
* **Asenkron İşlemler:** `Redux Thunk` kullanarak API çağrılarını `setTimeout` ile simüle edildi; böylece "loading" ve hata durumları yönetilebildi.
* **Sayfalama (Pagination):** Yüksek performans ihtiyacı için kullanıcı listesi sayfalama yapısı üzerine kurgulandı.
* **Hata Yönetimi:** Zod ile isim kontrolleri form aşamasında yakalanıp kullanıcıya anlık geri bildirim verildi.

---

## 🚀 SEO ve Mobil Deneyim

Projeyi arama motoru uyumlu ve mobil odaklı olacak şekilde geliştirildi:
* **Dinamik Metadata:** Her sayfa için dile duyarlı başlık ve açıklamalar kurgulandı.
* **Server-Side Rewrites:** Kullanıcı deneyimini bozmamak adına `/` adresi `/user-management` rotasına bağlandı.
* **Mobil Uyumluluk:** Tam ekran hamburger menü ile mobil performansı ve kullanılabilirliği optimize edildi.
* **Web App Altyapısı (PWA):** `manifest.ts` desteği ile uygulamanın mobil cihazlara eklenebilir olması sağlandı.

---

### Mimarideki Tercihler Üzerine Kısa Bir Not
Bu projede tam teşekküllü bir `Feature-Sliced Design` yerine daha sade bir **Domain-based UI Grouping** yapısını tercih edildi. Bunun nedeni, aşırı mühendislikten (over-engineering) kaçınarak işi basit (KISS) ama bir sürükle-bırak operasyonuyla daha büyük bir yapıya taşınabilecek kadar modüler tutma isteği olarak özetlenebilir.
