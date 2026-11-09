# GuzelAI abonelik ve üretim altyapısı

## Canlıdaki durum
Paket seçimi ve marka özeti yalnızca e-posta teklifi hazırlar. Ödeme, gerçek abonelik, dosya yükleme veya sipariş kaydı başlatmaz. Mevcut AuthPage ve kredi sayaçları yerel demo durumudur; yetkilendirme veya faturalama kaynağı olarak kullanılmamalıdır. Üretim API'sinde platform GEMINI_API_KEY yapılandırılmamıştır.

## Hedef akış
1. Müşteri gerçek hesabını açar; doğrulanmış e-posta ve sunucu oturumu alır.
2. Markasını oluşturur; logo, ürün fotoğrafları, renkler, kullanım izinleri ve referansları özel nesne deposuna yükler.
3. Paket ve ek işleri seçer. Yazılı kapsam, aylık teslim adedi, revizyon, termin ve iptal koşullarını görür.
4. Türkiye'de abonelik kabul eden ödeme sağlayıcısı üzerinden tahsilat yapılır. Webhook, sağlayıcı imzası doğrulandıktan sonra idempotent biçimde veritabanına yazılır. Müşteri yalnızca doğrulanmış ödeme sonrası `active` olur.
5. Her iş `brief -> inceleme -> üretim -> müşteri onayı -> teslim` durumlarından geçer. Medya işleri asenkron kuyrukta yürütülür. Orijinal dosya, prompt, model sürümü, kullanım izni ve çıktı kaydedilir.
6. Müşteri paneli teslimleri indirir, revizyon ister, aboneliği yönetir. Yönetici paneli iş kuyruğu, maliyet ve onayları izler.

## Veri modeli (ilk sürüm)
users, organizations, memberships, brands, assets, plans, subscriptions, subscription_events, orders, briefs, jobs, deliverables, revision_requests, usage_ledger, audit_log.

## Güvenlik ve maliyet sınırları
- API anahtarı yalnızca sunucu Secret ortam değişkeninde; istemciye veya loglara geçmez.
- İş oluşturma ve dosya erişimi sunucu tarafında kullanıcı/organizasyon yetkisiyle denetlenir.
- Dosyalar özel depoda, süreli imzalı URL ile indirilir; tür, boyut ve virüs kontrolü uygulanır.
- Üretim başına harcama limiti, aylık kota, tekrar deneme, iptal ve kötüye kullanım koruması zorunludur.
- Google Gemini/Veo veya GPU worker aynı kuyruk arayüzüne bağlanabilir. API sağlayıcısı müşteriye görünmez.
- Gerçek fiyat ilanından önce örnek brieflerle ortalama üretim süresi, ret oranı, düzenleme emeği ve sağlayıcı maliyeti ölçülür.

## Sıradaki entegrasyon kapıları
- Gerçek kimlik ve veritabanı sağlayıcısı seçimi.
- Türkiye'de üye işyeri açılışı ve abonelik sözleşmesi; iyzico abonelik ürünü veya uygun PayTR tekrarlayan ödeme yetkisi.
- Özel nesne deposu ve üretim hesabı/anahtarı.
- Ödeme sandbox, webhook tekrarı, iptal, başarısız ödeme ve yetkisiz dosya erişimi testleri.
