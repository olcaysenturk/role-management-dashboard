# Role Management Dashboard

Bu proje, bir sağlık kuruluşu için geliştirdiğim, kullanıcı ve rol yönetimini basitleştiren dinamik ve yüksek performanslı bir yönetim panelidir. Teknik değerlendirmede belirtilen ihtiyaçlar doğrultusunda projenin mimarisini ölçeklenebilir, sürdürülebilir ve erişilebilir (A11y) olacak şekilde kurguladım.

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları takip edebilirsiniz:

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

Projenin yapılandırması için `.env` dosyasını kullandım. Gerekli temel değişkenler şunlardır:

*   `NEXT_PUBLIC_APP_TITLE`: Uygulamanın başlığı.
*   `NEXT_PUBLIC_APP_URL`: Sitemap ve canonical link üretimi için ana adres.
*   `NEXT_PUBLIC_APP_DESCRIPTION`: Varsayılan SEO açıklaması.

---

## 🛠️ Teknoloji Tercihlerim ve Nedenleri

Projede modern frontend standartlarını yansıtan şu araçları ve kütüphaneleri tercih ettim:

* **Next.js (App Router):** Modern sayfa yönetimi ve Server/Client ayrımı avantajlarından dolayı seçtim.
* **TypeScript:** Güçlü tür güvenliği ile çalışma zamanı hatalarını önlemek için projeye dahil ettim.
* **Tailwind CSS:** Tutarlı ve hızlı bir tasarım sistemi (Design System) kurmak için kullandım.
* **Headless UI:** Erişilebilirlik (A11y/ARIA) standartlarını hazır sunduğu için Modal ve Dropdown gibi kritik bileşenlerde tercih ettim.
* **Zod:** Form verilerini doğrulamak ve tür güvenliğini garantilemek için kullandım.
* **Jest & React Testing Library:** Kritik UI birimlerini test etmek ve erişilebilirlik standartlarını doğrulamak için sisteme entegre ettim.

### State Yönetimi Stratejim
* **Redux Toolkit:** Kullanıcı listesi gibi sıklıkla güncellenen ve CRUD operasyonları içeren "iş mantığı" (domain state) verileri için **Redux**'ı tercih ettim.
* **Context API:** Dil tercihi ve çeviri metinleri gibi seyrek değişen UI state'leri için **Context API** (`useLanguage`) kullanarak "doğru işe doğru araç" prensibini uyguladım.

---

## 🧪 Test Yaklaşımım

Projede **"Birim Test" (Unit Testing)** yaklaşımını benimsedim. Özellikle tekrar kullanılabilir UI bileşenlerinin farklı koşullarda (hata, disabled, kullanıcı etkileşimi) beklediğim şekilde davranıp davranmadığını denetliyorum. Testlerimde görsel sonuçların yanı sıra ekran okuyucular için kritik olan ARIA niteliklerinin doğruluğuna da odaklandım.

---

## 📁 Klasör Yapısı ve Mimari Düzen

Bileşenlerin yeniden kullanılabilirliğini yüksek tutmak ve projenin ileride kolayca büyümesini sağlamak adına şu dizin yapısını oluşturdum:

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

Okunabilirliği artırmak için şu standartları takip ettim:
* **PascalCase:** React bileşenleri için kullandım (Örn: `UserFormModal.tsx`).
* **kebab-case:** Dosya ve klasör adlarında, dosya sistemi uyumluluğu için tercih ettim.
* **Absolute Imports:** `@/` alias yapısı ile daha temiz bir import hiyerarşisi sağladım.
* **Conventional Commits:** Versiyon geçmişini anlamlı kılmak için standart commit mesajlarını kullandım.

---

## ⏱️ Geliştirme Süreci
Mimari tasarım, geliştirme, SEO çalışmaları ve test yazımı dahil tüm süreci yaklaşık **6 saat** içerisinde tamamladım.

---

## 🛠️ Veri Yönetimi (Data Handling)

Uygulamada gerçek bir backend entegrasyonuna hazır, asenkron bir veri akışı simüle ettim:
* **Yerel Dosya Tabanlı Veritabanı (Local JSON DB):** Verileri yönetmek için sadece bellekte tutulan geçici bir yapı yerine, `src/data/users.json` dosyasını düşük gecikmeli bir yerel veritabanı olarak kurguladım.
* **API Katmanı (Next.js Route Handlers):** Veri alışverişini standart Next.js API rotaları (`/api/users`) üzerinden yönetiyorum. Bu rotalar, Node.js `fs` modülünü kullanarak dosyadan veri okuma (**GET**) ve dosyaya yeni veri yazma (**POST/PUT/DELETE**) işlemlerini asenkron olarak gerçekleştirir.
* **Veri Kalıcılığı (Persistence):** Bu mimari sayesinde uygulama kapatılsa veya sayfa yenilense dahi veriler `users.json` içerisinde güvenli bir şekilde saklanmaya devam eder; bu da projeye gerçek bir backend deneyimi kazandırır.
* **Veri Yazma ve Okuma:** UI katmanında Redux Thunk'lar kullanarak bu API endpoint'leri ile iletişim kuran, hata kontrolleri yapılmış temiz bir veri akışı sağladım.
* **Asenkron İşlemler:** `Redux Thunk` kullanarak API çağrılarını `setTimeout` ile simüle ettim; böylece "loading" ve hata durumlarını yönetebildim.
* **Sayfalama (Pagination):** Yüksek performans ihtiyacı için kullanıcı listesini sayfalama yapısı üzerine kurguladım.
* **Hata Yönetimi:** Zod ile isim kontrollerini form aşamasında yakalayıp kullanıcıya anlık geri bildirim verdim.

---

## 🚀 SEO ve Mobil Deneyim

Projeyi arama motoru uyumlu ve mobil odaklı olacak şekilde geliştirdim:
* **Dinamik Metadata:** Her sayfa için dile duyarlı başlık ve açıklamalar kurguladım.
* **Server-Side Rewrites:** Kullanıcı deneyimini bozmamak adına `/` adresini `/user-management` rotasına bağladım.
* **Mobil Uyumluluk:** Tam ekran hamburger menü ile mobil performansı ve kullanılabilirliği optimize ettim.
* **Web App Altyapısı (PWA):** `manifest.ts` desteği ile uygulamanın mobil cihazlara eklenebilir olmasını sağladım.

---

### Mimarideki Tercihim Üzerine Kısa Bir Not
Bu projede tam teşekküllü bir `Feature-Sliced Design` yerine daha sade bir **Domain-based UI Grouping** yapısını tercih ettim. Bunun nedenini, aşırı mühendislikten (over-engineering) kaçınarak işi basit (KISS) ama bir sürükle-bırak operasyonuyla daha büyük bir yapıya taşınabilecek kadar modüler tutma isteğim olarak özetleyebilirim.
