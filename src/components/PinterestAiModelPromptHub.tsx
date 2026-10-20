import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Camera,
  Sun,
  Layers,
  ExternalLink,
  Sliders,
  Code2,
  Eye,
  UserCheck,
  Wand2,
  Users,
} from "lucide-react";

export interface ReverseEngineeredPinModel {
  id: string;
  pinNumber: string;
  title: string;
  category: "kadin" | "erkek" | "cocuk" | "teknik";
  categoryLabel: string;
  aiVerificationCode: string;
  imageUrl: string;
  pinterestUrl: string;
  styleTag: string;
  cameraSpec: string;
  lightingSpec: string;
  skinShaderSpec: string;
  reversePromptEn: string;
  reversePromptTrSummary: string;
  socialKombinReady: boolean;
  outfitRatioBadge: string;
}

export const PINTEREST_AI_MODELS: ReverseEngineeredPinModel[] = [
  {
    id: "halloween-party-couple-vampiric-noir",
    pinNumber: "HALLOWEEN PARTY COUPLE #01",
    title: "Cadılar Bayramı Parti Çift Kombini (Kadın & Erkek) • Vampiric Noir Deri Ceket, Bordo & Siyah Gece Şıklığı (%100 AI Çift Manken)",
    category: "kadin",
    categoryLabel: "🎃🥂 Kadın & Erkek Çift Parti Kombini (%100 AI Çift)",
    aiVerificationCode: "AI-SYNTH-HWCOUPLE01 • %100 Yapay Zeka Çift Manken (KOR x EFE x ADA x ALP)",
    imageUrl: "/pinterest-models/hw_couple1_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Halloween Night Party • Vampiric Noir Couple",
    cameraSpec: "85mm f/1.8 Prime • Tam Boy Yan Yana Çift Yürüyüşü (9:16)",
    lightingSpec: "Alacakaranlık Mum Fenerleri + Parlayan Balkabağı Parti Girişi Bokeh",
    skinShaderSpec: "Nano Banana Pro Çift Cilt Dokusu • Vampir Bordosu Dudak & Keskin Erkek Çene Hattı",
    reversePromptEn:
      "Vertical 9:16 photorealistic full-body fashion photograph (head to toe showing both models' shoes on stone pavement) of a 100% AI-generated glamorous young couple walking arm-in-arm mid-stride at a candlelit and pumpkin-lantern-lit Halloween Night Party courtyard entrance; she wears an oversized black belted leather biker jacket over a black gold-buckle party dress, cat-eye sunglasses, and burgundy Adidas Handball Spezial sneakers; he wears a sleek black leather bomber jacket over an oxblood burgundy turtleneck with silver layered chains, charcoal tailored trousers, rectangular sunglasses, and black-and-white retro sneakers, 85mm f/1.8 --ar 9:16",
    reversePromptTrSummary:
      "Konsept Ajanı KOR ve TikTok Viral Müzik Ajanı EFE iş birliğiyle üretilen Cadılar Bayramı Gece Partisi %100 AI Kadın & Erkek Çift Kombini: Kadın kemerli deri ceket, siyah tokalı parti elbisesi ve bordo Spezial; Erkek siyah deri bomber, gece yarısı bordo balıkçı triko, gümüş zincir ve antrasit pantolon.",
    socialKombinReady: true,
    outfitRatioBadge: "Cadılar Bayramı Parti Çift Kombini #1 • Kadın & Erkek (%100 AI)",
  },
  {
    id: "halloween-party-couple-gothic-oldmoney",
    pinNumber: "HALLOWEEN PARTY COUPLE #02",
    title: "Cadılar Bayramı Rooftop Parti Çift Kombini (Kadın & Erkek) • Gothic Old Money Peluş Deri & Antrasit (%100 AI Çift Manken)",
    category: "erkek",
    categoryLabel: "🎃🍷 Kadın & Erkek Rooftop Parti Çifti (%100 AI Çift)",
    aiVerificationCode: "AI-SYNTH-HWCOUPLE02 • %100 Yapay Zeka Çift Manken (KOR x EFE x ADA x ALP)",
    imageUrl: "/pinterest-models/hw_couple2_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Halloween Rooftop Party • Gothic Old Money Couple",
    cameraSpec: "85mm f/1.8 Prime • Tam Boy Malikane/Rooftop Teras Yürüyüşü (9:16)",
    lightingSpec: "Sıcak Kehribar Parti Işıkları + Balkabağı Fenerleri & Sonbahar Yaprakları",
    skinShaderSpec: "Nano Banana Pro Çift Cilt Dokusu • Doğal Gözenek & Sinematik Parti Kontrastı",
    reversePromptEn:
      "Vertical 9:16 photorealistic full-body fashion photograph (head to toe showing both models' shoes on stone terrace) of a 100% AI-generated stylish young couple walking side-by-side mid-stride at an upscale Halloween Rooftop Mansion Party entrance with warm string lights and glowing jack-o'-lanterns; she wears a dark brown shearling-lined leather moto jacket, midnight burgundy ribbed mock-neck knit, and charcoal belted pleated palazzo trousers; he wears a tailored black bomber coat, dark charcoal knit sweater, and anthracite pleated trousers, 85mm f/1.8 --ar 9:16",
    reversePromptTrSummary:
      "Cadılar Bayramı Rooftop / Malikane Partisi için KOR, ADA ve ALP üçlü uyumuyla hazırlanan %100 AI Kadın & Erkek Çift Kombini: Peluş deri mont, gece yarısı bordo triko, siyah kaşe bomber, antrasit palazzo/kuplu pantolon ve çift sneaker uyumu.",
    socialKombinReady: true,
    outfitRatioBadge: "Cadılar Bayramı Parti Çift Kombini #2 • Kadın & Erkek (%100 AI)",
  },
  {
    id: "aw27-halloween-women-dark-glamour",
    pinNumber: "2027 AW & HALLOWEEN #01",
    title: "2027 Sonbahar/Kış & Cadılar Bayramı Dark Glamour • Bordo Triko, Peluş Deri Mont & Antrasit Palazzo AI Manken",
    category: "kadin",
    categoryLabel: "🎃 Kadın AI Manken (2027 AW & Cadılar Bayramı)",
    aiVerificationCode: "AI-SYNTH-HW27W • %100 Yapay Zeka Sanal Manken (KOR x ADA x ALP)",
    imageUrl: "/pinterest-models/hw27_women_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "2027 AW Dark Glamour • Halloween Twilight",
    cameraSpec: "85mm f/1.8 Prime • Tam Boy Alacakaranlık Sokak Yürüyüşü",
    lightingSpec: "Alacakaranlık Mum Fenerleri + Sıcak Balkabağı Bokeh Işığı",
    skinShaderSpec: "Nano Banana Pro Cilt Dokusu • Gece Yarısı Bordo Dudak & Doğal Gözenek",
    reversePromptEn:
      "Vertical 9:16 photorealistic full-body street-style fashion photograph (head to toe showing shoes on stone pavement) of a gorgeous 100% AI-generated young female model walking mid-stride on a twilight cobblestone street with glowing candle lanterns and autumn pumpkins, wearing a dark brown shearling-lined leather moto coat, midnight burgundy ribbed mock-neck knit sweater, charcoal belted wide-leg palazzo trousers, sleek black cat-eye sunglasses, gold-buckle leather shoulder bag, and burgundy Adidas Handball Spezial gum-sole sneakers, shot on 85mm f/1.8 lens --ar 9:16",
    reversePromptTrSummary:
      "Konsept Ajanı KOR, Pinterest Ajanı ADA ve Link Ajanı ALP üçlü uyumuyla üretilen 2027 Sonbahar/Kış & Cadılar Bayramı Dark Glamour kadın AI mankeni: İçi peluş koyu kahve deri mont, bordo triko, antrasit palazzo ve bordo Adidas Spezial.",
    socialKombinReady: true,
    outfitRatioBadge: "2027 AW & Cadılar Bayramı • Kadın #1 (3K:2E:1Ç)",
  },
  {
    id: "aw27-halloween-men-noir-street",
    pinNumber: "2027 AW & HALLOWEEN #02",
    title: "2027 Sonbahar/Kış & Cadılar Bayramı Noir Erkek • Siyah Süet Bomber, Bordo Triko & Adidas Samba AI Manken",
    category: "erkek",
    categoryLabel: "🎃 Erkek AI Manken (2027 AW & Cadılar Bayramı)",
    aiVerificationCode: "AI-SYNTH-HW27M • %100 Yapay Zeka Erkek Manken (KOR x ADA x ALP)",
    imageUrl: "/pinterest-models/hw27_men_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "2027 AW Noir Gothic • Men's Streetwear",
    cameraSpec: "85mm f/1.8 Prime • Tam Boy Taş Bulvar Yürüyüşü",
    lightingSpec: "Kehribar Sokak Lambaları + Cadılar Bayramı Balkabağı Fener Bokeh",
    skinShaderSpec: "Nano Banana Pro Erkek Cilt Dokusu • Keskin Çene Hattı & Doğal Doku",
    reversePromptEn:
      "Vertical 9:16 photorealistic full-body street-style fashion photograph (head to toe showing shoes on stone pavement) of a charismatic 100% AI-generated young male fashion model walking mid-stride on an atmospheric twilight cobblestone boulevard with glowing Halloween pumpkin lanterns, wearing an open black suede bomber jacket, deep oxblood burgundy turtleneck sweater with subtle silver chain, charcoal tailored straight-leg trousers, black leather crossbody bag, rectangular sunglasses, and black-and-white Adidas Samba OG gum-sole sneakers, shot on 85mm f/1.8 lens --ar 9:16",
    reversePromptTrSummary:
      "Konsept Ajanı KOR, Pinterest Ajanı ADA ve Link Ajanı ALP üçlü uyumuyla üretilen 2027 Sonbahar/Kış & Cadılar Bayramı Noir Erkek AI mankeni: Siyah süet bomber ceket, bordo balıkçı triko, antrasit pantolon ve Adidas Samba OG.",
    socialKombinReady: true,
    outfitRatioBadge: "2027 AW & Cadılar Bayramı • Erkek #1 (3K:2E:1Ç)",
  },
  {
    id: "pin-01-nano-banana-yellow",
    pinNumber: "PIN #01",
    title: "Nano Banana Pro • 3D Balon Tipografi & Siyah Blazer AI Manken",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken (3/6 Kota)",
    aiVerificationCode: "AI-SYNTH-NB01 • %100 Yapay Zeka Sanal Manken",
    imageUrl: "/pinterest-models/pin_01.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Nano Banana Pro • Editorial Luxury",
    cameraSpec: "35mm f/2.0 Prime • Göz Hizası Dar Kabin Perspektifi",
    lightingSpec: "Sıcak Tavan Diffüzör + Parlak Folyo Yansıma (Specular Bounce)",
    skinShaderSpec: "Doğal Gözenekli Mat-Saten Cilt Dokusu • Sıfır Plastik Filtre",
    reversePromptEn:
      "Full-body editorial portrait of a 100% synthetic AI female fashion model wearing an oversized tailored black wool blazer, black turtleneck, and sleek dark oval sunglasses, standing inside a minimalist white room surrounded by giant glossy yellow 3D mylar foil balloon letters ('YELLOW'), holding a smartphone at chest level, realistic foil reflections and fabric drape, natural skin micro-texture, shot on 35mm lens, f/2.0, Nano Banana Pro / Flux.1 Dev realism --ar 9:16 --v 6.1",
    reversePromptTrSummary:
      "Dev sarı 3D folyo balon harflerle dolu minimalist beyaz odada siyah oversize blazer ve oval gözlük takan %100 AI sanal kadın manken; gerçekçi folyo yansımaları ve doğal cilt dokusu.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Kadın #1",
  },
  {
    id: "pin-03-nano-banana-raw-skin",
    pinNumber: "PIN #03",
    title: "Nano Banana • Mikro Gözenek, Ayva Tüyü & İris Gerçekçilik Referansı",
    category: "teknik",
    categoryLabel: "🔬 AI Cilt & Doku Mühendisliği",
    aiVerificationCode: "AI-SHADER-RAW03 • %100 Sentetik Biyo-Doku",
    imageUrl: "/pinterest-models/pin_03.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Raw Skin Micro-Pores • Vellus Hair",
    cameraSpec: "100mm f/2.8 Macro Lens • 4x Kadraj Bölünmüş Detay",
    lightingSpec: "Yanal Gün Işığı (T-Bölgesi Doğal Parlama + Subsurface Scattering)",
    skinShaderSpec: "Visible Pores + Peach Fuzz (Ayva Tüyü) + Doğal Göz Kılcalları",
    reversePromptEn:
      "4-panel extreme macro close-up dermatological beauty study of a 100% AI-generated female face: (1) raw unretouched cheek skin with visible micro-pores and fine golden peach fuzz (vellus hair) catching sunlight, (2) hazel-green iris with detailed limbal ring, natural sclera micro-capillaries and eyelashes, (3) natural unretouched lips with subtle vertical creases and soft diffused borders, (4) natural hairline and T-zone sheen, 100mm f/2.8 macro lens, subsurface scattering, zero plastic retouching --ar 3:4",
    reversePromptTrSummary:
      "AI mankenlerin yapay/plastik görünmesini engelleyen 4'lü makro cilt formülü: görünür gözenekler, güneş ışığında belli olan ince ayva tüyleri (peach fuzz), doğal iris halkası ve rötuşsuz dudak dokusu.",
    socialKombinReady: true,
    outfitRatioBadge: "Tüm AI Mankenlerde Zorunlu Cilt Standardı",
  },
  {
    id: "pin-05-dual-turnaround-model",
    pinNumber: "PIN #05",
    title: "Çift Açılı (Ön & 45° Profil) Tutarlı AI Manken Turnaround Referansı",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken (3/6 Kota)",
    aiVerificationCode: "AI-SYNTH-ID05 • Sabit Seed Sanal Manken",
    imageUrl: "/pinterest-models/pin_05.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Virtual Try-On Base • Identity Lock",
    cameraSpec: "85mm f/4.0 Stüdyo Portre • Sıfır Perspektif Bozulması",
    lightingSpec: "Çift Softbox + Beyaz Sonsuz Fon (Cyclorama Even Fill)",
    skinShaderSpec: "Akdeniz/Türk Sıcak Buğday Ten • Tutarlı Kemik Yapısı",
    reversePromptEn:
      "Split-screen dual-angle character turnaround sheet (front view and 45-degree side profile view) of the exact same 100% synthetic AI Mediterranean female fashion model, dark wavy shoulder-length hair, symmetrical facial bone structure, natural eyebrows, wearing neutral beige seamless studio basics on a clean off-white studio cyclorama background, soft shadowless commercial lighting, shot on 85mm lens, identical character seed consistency --ar 4:5",
    reversePromptTrSummary:
      "Sanal kıyafet giydirme (Virtual Try-On) ve 3 adımlı Reels yürüyüş videolarında yüz/vücut tutarlılığını koruyan çift açılı (Ön + 45° Yan) AI manken kimlik kartı.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Kadın #2",
  },
  {
    id: "pin-08-nine-camera-angles",
    pinNumber: "PIN #08",
    title: "9 Kamera Açısı Tek Sahne • Bej Crop & Jean Şort AI Sokak/Stüdyo Manken",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken (3/6 Kota)",
    aiVerificationCode: "AI-SYNTH-CAM08 • %100 Yapay Zeka Sanal Manken",
    imageUrl: "/pinterest-models/pin_08.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "9 Camera Angles • Multi-Shot Consistency",
    cameraSpec: "50mm f/2.2 • Tam Boy / Alt Açı / Üst Açı Tutarlı Kadraj",
    lightingSpec: "Sıcak Kum Beji Stüdyo + Yanal Anahtar Işık (Key Light)",
    skinShaderSpec: "Doğal Güneş Öpücüğü Ten (Warm Sun-Kissed Realism)",
    reversePromptEn:
      "Full-body studio fashion photograph of a smiling 100% AI-generated brunette female model with long wavy hair, wearing a fitted beige crew-neck cropped t-shirt, high-waisted vintage blue denim shorts, and clean white leather sneakers, standing confidently on a warm sand-toned cyclorama backdrop, directional soft key light, 50mm lens, multi-angle camera consistency --ar 9:16",
    reversePromptTrSummary:
      "Tek bir AI manken ve tek bir sahneden 9 farklı kamera açısı üretmek için kullanılan tam boy referans promptu.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Kadın #3",
  },
  {
    id: "ai-men-01-oldmoney-camel",
    pinNumber: "AI ERKEK #01",
    title: "Pيرest Old Money Erkek AI Manken • Camel Kaşe Kaban & Ekru Triko",
    category: "erkek",
    categoryLabel: "👔 Erkek AI Manken (2/6 Kota)",
    aiVerificationCode: "AI-SYNTH-MEN01 • %100 Yapay Zeka Erkek Manken",
    imageUrl: "/pinterest-models/men1_model_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Men's Old Money • Autumn Boulevard",
    cameraSpec: "85mm f/1.8 Prime • Tam Boy Sokak Yürüyüşü (Head-to-Toe)",
    lightingSpec: "Altın Saat (Golden Hour) Doğal Sokak Işığı + Yumuşak Bokeh",
    skinShaderSpec: "Nano Banana Pro Erkek Cilt Dokusu • Hafif Kirli Sakal & Doğal Gözenek",
    reversePromptEn:
      "Full-body 9:16 vertical street-style fashion photograph (head to toe showing shoes on stone pavement) of a handsome 100% AI-generated young male fashion model with textured dark brown hair, chiseled jawline, light stubble, and realistic skin pores, walking mid-stride towards the camera on a sunlit Nişantaşı boulevard with autumn trees in bokeh. Wearing a tailored camel double-breasted wool overcoat worn open, cream half-zip fine-knit sweater, charcoal pleated chino trousers, tortoise Ray-Ban sunglasses, silver chronograph watch, and white-brown leather sneakers, shot on 85mm f/1.8 lens --ar 9:16",
    reversePromptTrSummary:
      "Sosyal medya 3 Kadın : 2 Erkek : 1 Çocuk döngümüzün 1. Erkek başrol AI mankeni: Camel kaşe kaban, ekru triko kazak, antrasit chino pantolon ve deri sneaker ile Nişantaşı yürüyüş sekansı.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Erkek #1",
  },
  {
    id: "ai-men-02-smart-streetwear",
    pinNumber: "AI ERKEK #02",
    title: "Smart Streetwear Erkek AI Manken • Siyah Süet Bomber & Antrasit Jean",
    category: "erkek",
    categoryLabel: "👔 Erkek AI Manken (2/6 Kota)",
    aiVerificationCode: "AI-SYNTH-MEN02 • %100 Yapay Zeka Erkek Manken",
    imageUrl: "/pinterest-models/men2_model_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Men's Smart Street • Karaköy Vibe",
    cameraSpec: "85mm f/1.8 Prime • Dinamik Adım Sekansı (3-Frame Walk)",
    lightingSpec: "Akşamüstü Yanal Güneş + Arka Kontur Işığı (Rim Light)",
    skinShaderSpec: "Gerçekçi Erkek Cilt & Saç Teli Dokusu • Sıfır Yapay Parlama",
    reversePromptEn:
      "Full-body 9:16 vertical street-style fashion photograph (head to toe showing sneakers on cobblestone street) of a charismatic 100% AI-generated young male model with wavy chestnut hair and athletic build walking confidently mid-stride towards camera. Wearing a sleek black suede bomber jacket worn open over a heavyweight white crew-neck t-shirt, relaxed-fit vintage charcoal straight-leg denim jeans, black rectangular sunglasses, minimal black leather crossbody bag, and black-and-white Adidas Samba OG sneakers with gum sole, shot on 85mm f/1.8 --ar 9:16",
    reversePromptTrSummary:
      "Sosyal medya 3 Kadın : 2 Erkek : 1 Çocuk döngümüzün 2. Erkek başrol AI mankeni: Siyah süet bomber ceket, beyaz tişört, antrasit straight jean ve Adidas Samba ile şehir stili.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Erkek #2",
  },
  {
    id: "ai-kid-01-autumn-varsity",
    pinNumber: "AI ÇOCUK #01",
    title: "Sonbahar Kolej Stili Çocuk AI Manken • Peluş Kolej Ceket & Rahat Jean",
    category: "cocuk",
    categoryLabel: "🧸 Çocuk AI Manken (1/6 Kota)",
    aiVerificationCode: "AI-SYNTH-KID01 • %100 Yapay Zeka Çocuk Modeli (Kurgusal)",
    imageUrl: "/pinterest-models/kid1_model_step1.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Kids Preppy Varsity • Autumn Park",
    cameraSpec: "85mm f/2.0 • Katalog Kalitesinde Tam Boy Yürüyüş",
    lightingSpec: "Sıcak Sonbahar Park Gün Işığı + Altın Yaprak Bokeh",
    skinShaderSpec: "%100 Kurgusal AI Çocuk Karakteri • Doğal Pamuk & Peluş Kumaş Dokusu",
    reversePromptEn:
      "Full-body 9:16 vertical catalog-grade kids fashion photograph (head to toe showing sneakers on sunlit park path) of a 100% synthetic AI-generated 7-year-old child fashion model with wavy light-brown hair and cheerful smile walking mid-stride along an autumn park boulevard. Wearing a cozy beige-and-navy fleece varsity bomber jacket over a cream cotton crewneck sweatshirt, comfortable blue relaxed-fit kids denim jeans, cream knit beanie hat, mini pastel backpack, and white-navy velcro court sneakers, natural daylight, 85mm lens --ar 9:16",
    reversePromptTrSummary:
      "Sosyal medya 3 Kadın : 2 Erkek : 1 Çocuk döngümüzün Çocuk başrol AI modeli (%100 kurgusal yapay zeka üretimi): Bej-lacivert kolej bomber ceket, krem sweatshirt, rahat jean ve ortopedik sneaker.",
    socialKombinReady: true,
    outfitRatioBadge: "3 Kadın : 2 Erkek : 1 Çocuk Döngüsü • Çocuk #1",
  },
  {
    id: "pin-17-multi-angle-grid",
    pinNumber: "PIN #17",
    title: "9 & 12 Kamera Açısı Grid • Krem Blazer & İnci Kolye AI Manken",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken & Kamera Grid",
    aiVerificationCode: "AI-SYNTH-GRID17 • %100 Yapay Zeka Sanal Manken",
    imageUrl: "/pinterest-models/pin_17.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "/droneview • /extremecloseup • /lowangle",
    cameraSpec: "9 Eşzamanlı Kamera Açısı (/droneview, /topdown, /profile, /widefull)",
    lightingSpec: "Sıcak Altın İç Mekan Gün Işığı (Golden Indoor Daylight)",
    skinShaderSpec: "Doğal Çil & Gözenek Dokusu • Yüksek Tutarlılıklı Karakter",
    reversePromptEn:
      "9-panel multi-camera contact sheet of the exact same 100% AI-generated blonde female model wearing an oversized cream linen blazer over a white lace bralette and pearl choker necklace, captured from 9 distinct directorial camera angles: /droneview, /extremecloseup on green eyes, /lowangle, /highangle, /topdown, /profile, /widefull, /eyelevel, and /overshoulder, warm golden sunlight, 35mm film grain --ar 3:4",
    reversePromptTrSummary:
      "Tek bir AI mankeni 9 ayrı yönetmen açısıyla (/droneview, /extremecloseup, /lowangle, /profile) aynı karede üreten çoklu kamera matrisi promptu.",
    socialKombinReady: true,
    outfitRatioBadge: "Çoklu Açı Reels Kurgusu",
  },
  {
    id: "pin-18-bratz-3d-doll",
    pinNumber: "PIN #18",
    title: "Sokak Kombininden 3D Bratz Koleksiyon Bebek Üretici (AI Doll)",
    category: "kadin",
    categoryLabel: "🎮 3D AI Fashion Doll",
    aiVerificationCode: "AI-3D-DOLL18 • %100 Sentetik 3D Karakter",
    imageUrl: "/pinterest-models/pin_18.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "3D Stylized Bratz Doll • ChatGPT + Flux",
    cameraSpec: "50mm Isometric Toy Studio Lens • Beyaz Stüdyo Fon",
    lightingSpec: "Üç Noktalı Parlak Vinyl & Kumaş Stüdyo Işığı",
    skinShaderSpec: "Pürüzsüz Parlak 3D Koleksiyon Figürü (Subsurface Toy Shader)",
    reversePromptEn:
      "Generate a realistic 3D Bratz-inspired fashion doll render preserving the exact outfit, hairstyle, accessories, and pose: oversized black leather biker jacket, white cropped top, high-waisted baggy blue cargo denim jeans, platform sneakers, dark wavy hair with black sunglasses resting on top of head, glossy expressive 3D eyes, smooth vinyl toy skin shader, studio rim lighting on pure white background --ar 3:4",
    reversePromptTrSummary:
      "Herhangi bir kombin fotoğrafını kıyafetlerini, çantasını ve duruşunu birebir koruyarak 3 boyutlu Bratz tarzı moda ikonuna dönüştüren viral tersine mühendislik promptu.",
    socialKombinReady: true,
    outfitRatioBadge: "3D Avatar & Reels Kapak Varyasyonu",
  },
  {
    id: "pin-24-icy-steel-editorial",
    pinNumber: "PIN #24",
    title: "Soğuk Fütüristik Icy-Steel Yüksek Moda Editoryal AI Dönüşümü",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken (Editoryal)",
    aiVerificationCode: "AI-SYNTH-ED24 • %100 Yapay Zeka Editoryal Model",
    imageUrl: "/pinterest-models/pin_24.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Icy-Steel Editorial • Glass Diffusion",
    cameraSpec: "50mm f/2.0 • Tam Boy Alçak Perspektif (Hero Angle)",
    lightingSpec: "Buz Mavisi-Gri Degrade Arka Plan + Parlak Beyaz Zemin Halasyonu",
    skinShaderSpec: "Soğuk Gümüş Yansımalı Yüksek Kontrastlı Editoryal Cilt",
    reversePromptEn:
      "Transform into a cold futuristic high-fashion editorial with an icy steel-blue and blue-gray color grade, cool skin tones, deep charcoal shadows and crisp silver-white highlights. AI female model wearing a voluminous white off-shoulder blouse, black tailored shorts, sheer polka-dot tights, and pointed heels. Dark smoky blue-gray upper background fading smoothly into a bright luminous icy-white lower background with soft glass-like floor diffusion and subtle halation bloom --ar 3:4",
    reversePromptTrSummary:
      "Düz stüdyo çekimini buz mavisi-çelik grisi degrade fon ve alttan yükselen cam halasyonu ile lüks dergi kapağına dönüştüren tersine mühendislik promptu.",
    socialKombinReady: true,
    outfitRatioBadge: "Lüks Gece & Editoryal Kombin Şablonu",
  },
  {
    id: "pin-25-pixel-sort-dispersion",
    pinNumber: "PIN #25",
    title: "Optik Prizma & Pixel-Sort Cam Dağılımlı AI Podyum Modeli",
    category: "kadin",
    categoryLabel: "👗 Kadın AI Manken (Avant-Garde)",
    aiVerificationCode: "AI-SYNTH-PRISM25 • %100 Yapay Zeka Sanal Model",
    imageUrl: "/pinterest-models/pin_25.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Optical Glass Prism • Pixel-Sort Glitch",
    cameraSpec: "85mm Yan Profil Tam Boy Podyum Karesi",
    lightingSpec: "Karanlık Antrasit Stüdyo + Keskin Altın/Beyaz Kontur Işığı",
    skinShaderSpec: "Yatay Kristal Kırılmalı (Refraction Glitch) Sanatsal Moda Efekti",
    reversePromptEn:
      "Avant-garde high-fashion AI editorial full-body side profile of a model wearing an ivory silk puff-sleeve blouse, tailored cream shorts, and white architectural platform heels, with a dynamic horizontal optical glass prism pixel-sorting dispersion effect trailing from her silhouette, moody charcoal studio background, dramatic warm rim lighting --ar 3:4",
    reversePromptTrSummary:
      "Web sitesi hero bölümleri ve moda kampanyaları için modelin silüetinden yatay kristal cam prizma kırılmaları çıkaran sanatsal AI promptu.",
    socialKombinReady: true,
    outfitRatioBadge: "Web Hero & Kampanya Vitrini",
  },
  {
    id: "pin-11-22-lighting-bible",
    pinNumber: "PIN #11 & #22",
    title: "20 Sinematik Stüdyo Işık Kurulumu & 5-in-1 Reflektör Fizik Rehberi",
    category: "teknik",
    categoryLabel: "💡 20 Işık & Reflektör Prompt Sözlüğü",
    aiVerificationCode: "AI-LIGHT-LAB22 • Stüdyo Işık Motoru",
    imageUrl: "/pinterest-models/pin_22.jpg",
    pinterestUrl: "https://tr.pinterest.com/thezencirs/guzelaicom/",
    styleTag: "Rembrandt • Butterfly • Rim • Golden Hour",
    cameraSpec: "85mm Portre Referans • 20 Farklı Işık Açısı Karşılaştırması",
    lightingSpec: "Rembrandt, Butterfly, Loop, Split, Rim, Silver/Gold/Black Reflector",
    skinShaderSpec: "Işık Açısına Göre Değişen Gerçekçi Gözenek Gölgesi",
    reversePromptEn:
      "Lighting token dictionary for AI fashion models: [Rembrandt lighting with triangle cheek highlight] | [Butterfly Paramount beauty lighting from 45-degree top] | [Warm Gold bounce reflector fill light] | [Crisp Rim backlight separating hair from dark studio background] | [Golden hour low-angle street sunlight with long soft shadows]",
    reversePromptTrSummary:
      "Pinterest panosundaki 20 ışık tekniği (Rembrandt, Kelebek, Kontur, Altın Saat) ve 5'i 1 arada reflektörlerin AI promptlarındaki tam karşılıkları.",
    socialKombinReady: true,
    outfitRatioBadge: "Tüm Kombinlerde Işık Doğrulama Kılavuzu",
  },
];

interface AdvancedWebDesignTemplate {
  id: string;
  pinRef: string;
  title: string;
  subtitle: string;
  previewImage: string;
  accentColor: string;
  bgGradient: string;
  typographyPair: string;
  uiArchitecture: string;
  interactiveFeature: string;
  cssPromptSnippet: string;
}

const ADVANCED_WEB_TEMPLATES: AdvancedWebDesignTemplate[] = [
  {
    id: "web-tpl-theia-botanical",
    pinRef: "PIN #02 & #07 Referanslı",
    title: "THEIA • Kabartma Dokulu Botanik Lüks Moda & Kozmetik E-Ticaret",
    subtitle: "Zeytin Yeşili Dokulu Kağıt Shader + Holografik Serif Tipografi + AI Sanal Kabin",
    previewImage: "/pinterest-models/pin_02.jpg",
    accentColor: "#B794F4",
    bgGradient: "from-[#2D381E] via-[#3A4728] to-[#1E2614]",
    typographyPair: "Cormorant Garamond Semibold + Plus Jakarta Sans Mono",
    uiArchitecture: "3D Blind-Embossed SVG Rölyef Arka Plan + Asimetrik Lüks Ürün Kartları",
    interactiveFeature: "Mouse hareketine duyarlı kabartma gölge açısı ve tek tıkla AI manken üzerinde deneme çekmecesi.",
    cssPromptSnippet: `/* THEIA Botanical Embossed Luxury Surface */
.theia-embossed-card {
  background: radial-gradient(circle at 30% 20%, #465630 0%, #2d381e 100%);
  box-shadow: inset 2px 2px 5px rgba(255,255,255,0.14), inset -3px -3px 7px rgba(0,0,0,0.45);
  font-family: 'Cormorant Garamond', serif;
}`,
  },
  {
    id: "web-tpl-reveal-frosted",
    pinRef: "PIN #10 & #19 Referanslı",
    title: "REVEAL • Buzlu Cam (Frosted Glass) & Split-Diopter İnteraktif Vitrin",
    subtitle: "İmleçle Netleşen Buzlu Cam Katmanı + Yarı-Kadraj Sinematik Odak Kaydırma",
    previewImage: "/pinterest-models/pin_10.jpg",
    accentColor: "#38BDF8",
    bgGradient: "from-[#0F172A] via-[#1E293B] to-[#090D16]",
    typographyPair: "Syne ExtraBold + Inter Tight",
    uiArchitecture: "Dinamik WebGL Backdrop-Blur Maskesi + Keskin Dikdörtgen Bakış Penceresi",
    interactiveFeature: "Kullanıcı fareyi gezdirdikçe buzlu camın altındaki 2K AI manken ve 6 kombin parçası netleşir.",
    cssPromptSnippet: `/* REVEAL Frosted Glass Interactive Mask */
.reveal-frost-overlay {
  backdrop-filter: blur(22px) saturate(140%) contrast(115%);
  mask-image: radial-gradient(circle 140px at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%);
}`,
  },
  {
    id: "web-tpl-swiss-floating-3d",
    pinRef: "PIN #09 & #21 Referanslı",
    title: "SWISS 3D • Havada Asılı Ürün & Dev Tipografi Katmanlı E-Ticaret",
    subtitle: "Tipografinin Önüne ve Arkasına Geçen 3B Dekupe Ürün + Milimetrik CAD Izgarası",
    previewImage: "/pinterest-models/pin_09.jpg",
    accentColor: "#F43F5E",
    bgGradient: "from-[#BE123C] via-[#9F1239] to-[#4C0519]",
    typographyPair: "Anton / Bebas Neue + JetBrains Mono CAD Specs",
    uiArchitecture: "Z-Index 3 Katmanlı Derinlik (Arka Plan Grid -> Dev Başlık -> 3B Dekupe Ürün -> Ön Rozet)",
    interactiveFeature: "Sayfa kaydırıldıkça ürün 15° döner ve kenarlardaki milimetrik terzi ölçü çizgileri (CAD) canlanır.",
    cssPromptSnippet: `/* SWISS 3D Layered Depth Hero */
.swiss-hero-title { font-size: clamp(4rem, 11vw, 9.5rem); line-height: 0.86; z-index: 10; }
.swiss-floating-product { z-index: 20; filter: drop-shadow(0 28px 36px rgba(0,0,0,0.45)); transform: rotate(12deg); }`,
  },
  {
    id: "web-tpl-prism-runway",
    pinRef: "PIN #24 & #25 Referanslı",
    title: "PRISM • Icy-Steel & Optik Pixel-Sort AI Podyum Lookbook",
    subtitle: "Buz Çeliği Degrade Stüdyo + Yatay Prizma Dağılımı + Anında /go/{sku} Mağaza Kartları",
    previewImage: "/pinterest-models/pin_25.jpg",
    accentColor: "#93C5FD",
    bgGradient: "from-[#1E293B] via-[#334155] to-[#0F172A]",
    typographyPair: "Bodoni Moda Italic + Space Grotesk",
    uiArchitecture: "Tam Ekran Dikey 9:16 Podyum Oynatıcı + Sağ Panelde 6 Parça Canlı Stok/Fiyat Matrisi",
    interactiveFeature: "Her kombin geçişinde yatay cam prizma efekti çalışır; Kadın/Erkek/Çocuk filtreleriyle anında mağazaya yönlendirir.",
    cssPromptSnippet: `/* PRISM Icy-Steel Cyclorama & Floor Halation */
.prism-cyclorama {
  background: linear-gradient(180deg, #2b3544 0%, #56667a 58%, #eef4fa 100%);
  box-shadow: inset 0 -80px 120px rgba(255,255,255,0.65);
}`,
  },
];

export const PinterestAiModelPromptHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"board" | "builder" | "webdesigns">("board");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "kadin" | "erkek" | "cocuk" | "teknik">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive AI Model & Prompt Builder states
  const [builderGender, setBuilderGender] = useState<"kadin" | "erkek" | "cocuk">("kadin");
  const [builderStyle, setBuilderStyle] = useState<string>("Old Money & Quiet Luxury");
  const [builderCamera, setBuilderCamera] = useState<string>("85mm f/1.8 Tam Boy Sokak Yürüyüşü (9:16 Reels)");
  const [builderLighting, setBuilderLighting] = useState<string>("Golden Hour Doğal Sokak Işığı + Altın Reflektör");
  const [builderSkin, setBuilderSkin] = useState<string>("Nano Banana Pro Raw Skin (Görünür Gözenek + Ayva Tüyü)");
  const [builderOutfitNote, setBuilderOutfitNote] = useState<string>(
    "Camel kruvaze kaşe kaban, ekru yumuşak dokulu triko kazak, yüksek bel pileli pantolon, güneş gözlüğü, deri çanta ve sneaker"
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const filteredModels = PINTEREST_AI_MODELS.filter((m) =>
    categoryFilter === "all" ? true : m.category === categoryFilter
  );

  // Dynamically build the reverse-engineered prompt from user selections
  const subjectMap = {
    kadin:
      "a 100% synthetic AI-generated young Mediterranean female fashion model with voluminous wavy brunette hair, symmetrical bone structure, confident posture",
    erkek:
      "a 100% synthetic AI-generated handsome young male fashion model with textured dark brown hair, chiseled jawline, light stubble, confident masculine stride",
    cocuk:
      "a 100% synthetic AI-generated cheerful 7-year-old child fashion model with wavy light-brown hair, bright natural smile, catalog-grade kids fashion proportions",
  };

  const previewImgMap = {
    kadin: "/pinterest-models/pin_01.jpg",
    erkek: "/pinterest-models/men1_model_step1.jpg",
    cocuk: "/pinterest-models/kid1_model_step1.jpg",
  };

  const generatedMasterPrompt = `Full-body 9:16 vertical photorealistic fashion photograph (head to toe clearly showing footwear on the ground) of ${subjectMap[builderGender]}. Style concept: ${builderStyle}. Wearing: ${builderOutfitNote}. Skin & Texture Engineering: ${builderSkin}, natural subsurface scattering, zero plastic smoothing. Lighting setup: ${builderLighting}. Camera & Lens: ${builderCamera}, ultra-sharp fabric weave and stitching details, Flux.1 Pro / Midjourney v6.1 / Nano Banana Pro photorealism --ar 9:16 --v 6.1 --style raw`;

  const generatedNegativePrompt = `real celebrity face, plastic wax skin, airbrushed blur, cropped feet, missing shoes, extra fingers, deformed hands, watermark, text overlay, oversaturated neon, low resolution`;

  return (
    <section
      id="pinterest-ai-modeller"
      className="py-16 bg-gradient-to-b from-[#0B0E14] via-[#111622] to-[#0B0E14] text-white border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header & 3 Kadın : 2 Erkek : 1 Çocuk Official Policy Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>%100 YAPAY ZEKA SANAL MANKEN GARANTİSİ (GERÇEK KİŞİ DEĞİLDİR • TELİFSİZ)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Pinterest <span className="text-[#E65A7F]">@thezencirs/guzelaicom</span> AI Manken & Tersine Mühendislik Stüdyosu
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              Pinterest panomuzdaki tüm modellerin <strong>tersine mühendislik (reverse-engineering)</strong> ile çıkarılmış
              ışık, lens, cilt dokusu (<em>Nano Banana Pro Raw Skin</em>) ve çoklu açı promptları. Tüm mankenlerimiz{" "}
              <strong>%100 yapay zeka üretimi kurgusal karakterlerdir</strong> ve sosyal medya kombinlerimizde{" "}
              <span className="text-amber-300 font-bold">3 Kadın : 2 Erkek : 1 Çocuk (Kız/Erkek)</span> altın oranıyla paylaşılır.
            </p>
          </div>

          {/* 3 Kadın : 2 Erkek : 1 Çocuk Live Ratio Meter */}
          <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 min-w-[300px] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Sosyal Medya Kombin Kotası (6'lı Döngü)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                AKTİF KURAL
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#E65A7F]/15 border border-[#E65A7F]/30">
                <div className="text-xl font-black text-[#E65A7F]">3</div>
                <div className="text-[11px] font-bold text-white/90">👗 Kadın</div>
                <div className="text-[10px] text-white/50">%50 Kota</div>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/30">
                <div className="text-xl font-black text-sky-400">2</div>
                <div className="text-[11px] font-bold text-white/90">👔 Erkek</div>
                <div className="text-[10px] text-white/50">%33 Kota</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30">
                <div className="text-xl font-black text-amber-400">1</div>
                <div className="text-[11px] font-bold text-white/90">🧸 Çocuk</div>
                <div className="text-[10px] text-white/50">%17 Kota</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 3 Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab("board")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
                activeTab === "board"
                  ? "bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Pinterest Pano Mankenleri & Tersine Promptlar ({PINTEREST_AI_MODELS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
                activeTab === "builder"
                  ? "bg-gradient-to-r from-amber-400 to-[#E65A7F] text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>2. Canlı AI Manken & Prompt Oluşturucu Stüdyo</span>
            </button>
            <button
              onClick={() => setActiveTab("webdesigns")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${
                activeTab === "webdesigns"
                  ? "bg-gradient-to-r from-[#44BDBD] to-sky-500 text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Gelişmiş Web Sitesi Tasarımı Örnekleri ({ADVANCED_WEB_TEMPLATES.length})</span>
            </button>
          </div>

          <a
            href="https://tr.pinterest.com/thezencirs/guzelaicom/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition"
          >
            <span>Resmi Pinterest Panosunu Aç</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E65A7F]" />
          </a>
        </div>

        {/* TAB 1: PINTEREST BOARD AI MODELS & REVERSE-ENGINEERED PROMPTS */}
        {activeTab === "board" && (
          <div className="space-y-6">
            {/* Sub-filter by Category (3 Kadın : 2 Erkek : 1 Çocuk : Teknik) */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "✨ Tümü (Pano + 3K:2E:1Ç Kadro)" },
                { id: "kadin", label: "👗 Kadın AI Mankenler (3 Birim)" },
                { id: "erkek", label: "👔 Erkek AI Mankenler (2 Birim)" },
                { id: "cocuk", label: "🧸 Çocuk AI Mankenler (1 Birim)" },
                { id: "teknik", label: "🔬 Cilt, Işık & Kamera Mühendisliği" },
              ].map((flt) => (
                <button
                  key={flt.id}
                  onClick={() => setCategoryFilter(flt.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                    categoryFilter === flt.id
                      ? "bg-white text-[#0B0E14] border-white"
                      : "bg-white/5 text-white/75 border-white/15 hover:bg-white/10"
                  }`}
                >
                  {flt.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="rounded-3xl bg-[#151B28] border border-white/10 hover:border-[#E65A7F]/50 overflow-hidden flex flex-col justify-between transition shadow-xl group"
                >
                  <div>
                    {/* Image Header with AI Verification Badges */}
                    <div className="relative aspect-[3/4] bg-black overflow-hidden">
                      <img
                        src={model.imageUrl}
                        alt={model.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151B28] via-transparent to-black/40" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-black text-amber-300 border border-amber-400/30">
                          {model.pinNumber} • {model.categoryLabel}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-black text-[10px] font-mono font-black flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          %100 AI
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-[10px] font-mono text-white/90">
                          {model.aiVerificationCode}
                        </span>
                        <h3 className="text-base font-black text-white leading-snug">{model.title}</h3>
                      </div>
                    </div>

                    {/* Technical Reverse-Engineering Breakdown */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-white/75 leading-relaxed">{model.reversePromptTrSummary}</p>

                      <div className="grid grid-cols-1 gap-2 text-[11px] bg-black/30 p-3 rounded-2xl border border-white/5">
                        <div className="flex items-start gap-2">
                          <Camera className="w-3.5 h-3.5 text-[#44BDBD] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white/90">Kamera/Lens:</strong>{" "}
                            <span className="text-white/70">{model.cameraSpec}</span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white/90">Işık Kurgusu:</strong>{" "}
                            <span className="text-white/70">{model.lightingSpec}</span>
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#E65A7F] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white/90">Cilt & Doku:</strong>{" "}
                            <span className="text-white/70">{model.skinShaderSpec}</span>
                          </span>
                        </div>
                      </div>

                      {/* Reverse-Engineered Prompt Box */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase text-amber-300">
                          <span>Tersine Mühendislik Promptu (Flux / MJ / Nano Banana)</span>
                          <span>{model.outfitRatioBadge}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B0E14] border border-white/10 text-[11px] font-mono text-emerald-300/95 leading-relaxed max-h-28 overflow-y-auto select-all">
                          {model.reversePromptEn}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Buttons */}
                  <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(model.id, model.reversePromptEn)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E65A7F] to-[#44BDBD] text-white text-xs font-black flex items-center justify-center gap-1.5 hover:opacity-95 transition"
                    >
                      {copiedId === model.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Prompt Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Tersine Promptu Kopyala</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (model.category === "erkek") setBuilderGender("erkek");
                        else if (model.category === "cocuk") setBuilderGender("cocuk");
                        else setBuilderGender("kadin");
                        setBuilderOutfitNote(model.reversePromptTrSummary);
                        setActiveTab("builder");
                      }}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
                      title="Bu modeli Canlı AI Manken Oluşturucuda düzenle"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE AI MODEL & PROMPT BUILDER STUDIO */}
        {activeTab === "builder" && (
          <div
            id="ai-model-olusturucu"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#151B28] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Tersine Mühendislik Motoru v3.0
                </span>
                <h3 className="text-2xl font-black text-white">
                  Yapay Zeka Manken & Sosyal Medya Kombin Promptu Oluşturucu
                </h3>
                <p className="text-xs text-white/70">
                  Pinterest panomuzdaki 20 stüdyo ışığı, Nano Banana cilt gözenek teknolojisi ve 9 kamera açısı
                  parametreleriyle <strong>Kadın (3/6)</strong>, <strong>Erkek (2/6)</strong> veya{" "}
                  <strong>Çocuk (1/6)</strong> AI mankeninizi saniyeler içinde yapılandırın.
                </p>
              </div>

              {/* 1. Cinsiyet & Kota Seçimi */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/90 block">
                  1. AI Manken Kategorisi (3 Kadın : 2 Erkek : 1 Çocuk Oranı)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "kadin", label: "👗 Kadın AI Manken", sub: "3/6 Kota (%50)" },
                    { id: "erkek", label: "👔 Erkek AI Manken", sub: "2/6 Kota (%33)" },
                    { id: "cocuk", label: "🧸 Çocuk AI Manken", sub: "1/6 Kota (%17)" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setBuilderGender(g.id as any)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        builderGender === g.id
                          ? "bg-[#E65A7F]/20 border-[#E65A7F] text-white"
                          : "bg-black/30 border-white/10 text-white/70 hover:bg-white/5"
                      }`}
                    >
                      <div className="text-xs font-black">{g.label}</div>
                      <div className="text-[10px] text-amber-300 font-mono mt-0.5">{g.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Estetik & Kombin Konsepti */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90 block">2. Kombin & Moda Konsepti</label>
                  <select
                    value={builderStyle}
                    onChange={(e) => setBuilderStyle(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/15 px-3.5 py-2.5 text-xs text-white font-semibold"
                  >
                    <option value="Old Money & Quiet Luxury">Old Money & Quiet Luxury (Zara / İpekyol / Ray-Ban)</option>
                    <option value="Smart Streetwear & Suede Bomber">Smart Streetwear & Süet Bomber (Adidas Samba)</option>
                    <option value="Ofisten Sokağa Kapsül Stil">Ofisten Sokağa Kapsül Stil (Çizgili Gömlek & Palazzo)</option>
                    <option value="Icy-Steel High-Fashion Editorial">Icy-Steel Yüksek Moda Editoryal (PIN #24)</option>
                    <option value="3D Bratz / Koleksiyon Bebek Stili">3D Bratz Fashion Doll Stili (PIN #18)</option>
                    <option value="Çocuk Kolej & Hafta Sonu Stili">Çocuk Kolej & Hafta Sonu Rahat Stil</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90 block">3. Kamera & Açılar (PIN #08 & #17)</label>
                  <select
                    value={builderCamera}
                    onChange={(e) => setBuilderCamera(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/15 px-3.5 py-2.5 text-xs text-white font-semibold"
                  >
                    <option value="85mm f/1.8 Tam Boy Sokak Yürüyüşü (9:16 Reels)">
                      85mm f/1.8 Tam Boy Yürüyüş (9:16 Reels Podyum)
                    </option>
                    <option value="9-Camera Angle Contact Sheet (/droneview, /lowangle, /profile, /widefull)">
                      9 Kamera Açısı Grid (/droneview, /lowangle, /profile)
                    </option>
                    <option value="35mm f/2.0 Editoryal Dar Kabin & Balon Tipografi">
                      35mm f/2.0 Editoryal Geniş Kadraj (PIN #01)
                    </option>
                    <option value="100mm f/2.8 Macro Dermatolojik Cilt & Göz Detayı">
                      100mm f/2.8 Makro Cilt & Göz Detayı (PIN #03)
                    </option>
                  </select>
                </div>
              </div>

              {/* 3. Işık & Cilt Mühendisliği */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90 block">
                    4. Stüdyo Işık & Reflektör (PIN #11, #16, #22)
                  </label>
                  <select
                    value={builderLighting}
                    onChange={(e) => setBuilderLighting(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/15 px-3.5 py-2.5 text-xs text-white font-semibold"
                  >
                    <option value="Golden Hour Doğal Sokak Işığı + Altın Reflektör">
                      Golden Hour Sokak Işığı + Altın Reflektör Dolgu
                    </option>
                    <option value="Rembrandt 45-Degree Key Light + Crisp Hair Rim Light">
                      Rembrandt 45° Anahtar Işık + Saç Kontur (Rim) Işığı
                    </option>
                    <option value="Butterfly (Paramount) Beauty Light + Silver Reflector">
                      Butterfly (Paramount) Güzellik Işığı + Gümüş Reflektör
                    </option>
                    <option value="Icy Steel-Blue Vertical Gradient + Floor Glass Halation">
                      Buz Çeliği Degrade + Zemin Cam Halasyonu (PIN #24)
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90 block">5. Cilt Dokusu Motoru (PIN #03)</label>
                  <select
                    value={builderSkin}
                    onChange={(e) => setBuilderSkin(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/15 px-3.5 py-2.5 text-xs text-white font-semibold"
                  >
                    <option value="Nano Banana Pro Raw Skin (Görünür Gözenek + Ayva Tüyü)">
                      Nano Banana Pro Raw Skin (Gözenek + Peach Fuzz Ayva Tüyü)
                    </option>
                    <option value="Unretouched NaturalMediterranean Skin + Subsurface Scattering">
                      Rötuşsuz Doğal Akdeniz Teni + Subsurface Scattering
                    </option>
                    <option value="High-Gloss Porcelain 3D Vinyl Character Shader">
                      Parlak 3D Porselen / Vinyl Koleksiyon Bebek Dokusu
                    </option>
                  </select>
                </div>
              </div>

              {/* 4. 6 Parça Kombin Detayı */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 block">
                  6. Mankenin Giyeceği 6 Parçalık Kombin Detayı
                </label>
                <textarea
                  rows={2}
                  value={builderOutfitNote}
                  onChange={(e) => setBuilderOutfitNote(e.target.value)}
                  className="w-full rounded-xl bg-[#0B0E14] border border-white/15 p-3 text-xs text-white"
                />
              </div>

              {/* Generated Master Prompt Output */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ÜRETİLEN TERSİNE MÜHENDİSLİK MASTER PROMPTU:
                  </span>
                  <button
                    onClick={() => handleCopy("builder-master", generatedMasterPrompt)}
                    className="px-3 py-1 rounded-lg bg-emerald-500 text-black text-xs font-black flex items-center gap-1.5"
                  >
                    {copiedId === "builder-master" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "builder-master" ? "Kopyalandı!" : "Promptu Kopyala"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0E14] border border-emerald-500/30 text-xs font-mono text-emerald-300 leading-relaxed select-all">
                  {generatedMasterPrompt}
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-rose-300/90">
                  <strong>Negative Prompt:</strong> {generatedNegativePrompt}
                </div>
              </div>
            </div>

            {/* Right Live Preview Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#0B0E14] rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white/80 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#E65A7F]" />
                  Canlı AI Manken Referans Önizlemesi
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  %100 SENTETİK AI KİMLİK
                </span>
              </div>

              <div className="relative aspect-[9/12] rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={previewImgMap[builderGender]}
                  alt="AI Model Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-black">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AI VIRTUAL MODEL VERIFIED • TELİFSİZ</span>
                  </div>
                  <div className="text-sm font-black text-white">{builderStyle}</div>
                  <div className="text-[11px] text-white/75 line-clamp-2">{builderOutfitNote}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                <div className="font-bold text-amber-300">🎬 3 Kareli Reels Yürüyüş Sekansı Hazır:</div>
                <p className="text-white/70 text-[11px] leading-relaxed">
                  Bu prompt ile üretilen AI manken, <strong>Adım 1 (Sağ ayak önde)</strong>,{" "}
                  <strong>Adım 2 (Sol ayak önde)</strong> ve <strong>Adım 3 (Kameraya yakın özgüvenli gülümseme)</strong>{" "}
                  olarak 2K Graph-Motion Reels motorumuza doğrudan aktarılır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVANCED WEB DESIGN SHOWCASE (REVERSE-ENGINEERED FROM PINTEREST BOARD) */}
        {activeTab === "webdesigns" && (
          <div id="gelismis-web-tasarimlari" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADVANCED_WEB_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  className="rounded-3xl bg-[#151B28] border border-white/15 overflow-hidden flex flex-col justify-between shadow-2xl group"
                >
                  <div>
                    {/* Interactive Mini-Viewport Header */}
                    <div className={`relative h-64 bg-gradient-to-br ${tpl.bgGradient} p-6 overflow-hidden flex items-center justify-between gap-4`}>
                      <div className="z-10 max-w-xs space-y-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-white/15">
                          {tpl.pinRef} • CANLI WEB MİMARİSİ
                        </span>
                        <h3 className="text-xl font-black text-white leading-tight">{tpl.title}</h3>
                        <p className="text-xs text-white/80 leading-relaxed">{tpl.subtitle}</p>
                      </div>
                      <img
                        src={tpl.previewImage}
                        alt={tpl.title}
                        className="w-36 h-48 object-cover rounded-2xl border-2 border-white/20 shadow-2xl group-hover:scale-105 group-hover:-rotate-2 transition duration-500 z-10"
                      />
                    </div>

                    {/* Architecture Specs & CSS Snippet */}
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                          <div className="text-[10px] font-mono text-white/50 uppercase">Tipografi Eşleşmesi</div>
                          <div className="font-bold text-white mt-0.5">{tpl.typographyPair}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                          <div className="text-[10px] font-mono text-white/50 uppercase">UI / Shader Mimarisi</div>
                          <div className="font-bold text-white mt-0.5">{tpl.uiArchitecture}</div>
                        </div>
                      </div>

                      <p className="text-xs text-white/75 leading-relaxed">
                        <strong className="text-amber-300">İnteraktif Deneyim:</strong> {tpl.interactiveFeature}
                      </p>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono text-sky-300">
                          <span className="flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5" />
                            TERSİNE MÜHENDİSLİK CSS / SHADER KODU
                          </span>
                          <button
                            onClick={() => handleCopy(tpl.id, tpl.cssPromptSnippet)}
                            className="text-amber-300 hover:underline font-bold"
                          >
                            {copiedId === tpl.id ? "✓ Kopyalandı" : "Kodu Kopyala"}
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-[#0B0E14] border border-white/10 text-[11px] font-mono text-sky-200 overflow-x-auto">
                          {tpl.cssPromptSnippet}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PinterestAiModelPromptHub;
