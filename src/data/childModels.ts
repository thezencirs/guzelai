export interface ChildModel {
  id: string;
  continent: string;
  location: string;
  name: string;
  age: number;
  story: string;
  characterNoteTR: string;
  visibleDetailsTR: string;
  tags: string[];
  image: string;
  imageAltTR: string;
  prompt: string;
  brandUseTR: string;
}

/** Fictional minors. Everyday clothing and natural skin are intentional. */
export const CHILD_MODELS: ChildModel[] = [
  {
    id: "africa",
    continent: "Afrika",
    location: "Dakar, Senegal",
    name: "Awa Diop",
    age: 11,
    story: "Dakar'da yaşayan, çizim defterini her yere taşıyan kurgusal bir çocuk. Liman ışığı ve çağdaş şehir hayatı, sahnenin arka planını kuruyor.",
    characterNoteTR: "Wolof kökenli Senegalli bir karakter olarak yazıldı. Gündelik kıyafeti ve bireysel ilgisi, kıtayı tek bir görünüme indirgemez.",
    visibleDetailsTR: "Sol yanağında küçük doğum lekesi, doğal saç çizgisi ve çocuklara özgü hafif yüz asimetrisi.",
    tags: ["Dakar", "Çizim merakı", "Doğal ten"],
    image: "/assets/child-models/africa.webp",
    imageAltTR: "Dakar'da çizim defteri taşıyan kurgusal 11 yaşındaki Awa Diop",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. Awa Diop is a fictional 11-year-old Senegalese girl of Wolof heritage in present-day Dakar, fully clothed in a modest contemporary cotton shirt, light jacket and trousers, holding her own sketchbook. Deep brown natural skin with visible pores, a small birthmark on her left cheek, age-appropriate facial proportions, neat natural braids and a subtly asymmetric relaxed smile. Place her on a contemporary Dakar coastal promenade with ordinary city life and a soft glimpse of the Atlantic, not a village or costume scene. Three-quarter-length composition, eye-level 50mm documentary lens, late afternoon daylight, honest color, realistic hands and five fingers, realistic fabric weave, no retouching or beauty makeup. Respectful everyday presence; no glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Aileye yönelik ürün hikâyesinde doğal cilt dokusunu koruyan gündelik yaşam görseli.",
  },
  {
    id: "asia",
    continent: "Asya",
    location: "Osaka, Japonya",
    name: "Haruto Mori",
    age: 9,
    story: "Okul çıkışında küçük robot çizimlerini gösteren kurgusal bir Osaka çocuğu. Şehrin sakin bir ara sokağı, canlı kişiliğine alan açıyor.",
    characterNoteTR: "Japon bir karakterin bugünkü şehir yaşamından tek bir an. Geleneksel kıyafet veya bütün Asya'yı temsil ettiği iddiası yok.",
    visibleDetailsTR: "Alnına düşen inatçı saç tutamı, hafif asimetrik gülüş ve doğal cilt dokusu.",
    tags: ["Osaka", "Robot çizimleri", "İnatçı saç tutamı"],
    image: "/assets/child-models/asia.webp",
    imageAltTR: "Osaka sokağında çizim kâğıdı tutan kurgusal 9 yaşındaki Haruto Mori",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. Haruto Mori is a fictional 9-year-old Japanese boy in present-day Osaka, fully clothed in an ordinary zip-up navy jacket, striped shirt and comfortable trousers, holding a folded page of small robot sketches with no legible writing. His straight dark hair has one stubborn cowlick falling over his forehead; keep his slight uneven smile, natural child skin texture and realistic age-appropriate proportions. Contemporary quiet Osaka side street after school, bicycles and muted storefront shapes softly out of focus, no tourist clichés. Three-quarter-length eye-level 50mm documentary photography, soft overcast afternoon light, realistic hands and five fingers, natural color, no skin smoothing. Respectful candid expression; no glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Aile odaklı kampanyada çocuğun merakını öne çıkaran doğal bir portre.",
  },
  {
    id: "europe",
    continent: "Avrupa",
    location: "Marsilya, Fransa",
    name: "Inès Benali",
    age: 15,
    story: "Marsilya'da fotoğraf kulübüne giden kurgusal bir genç. Rüzgârlı kıyı sokağı ve analog fotoğraf makinesi onun ilgisini anlatıyor.",
    characterNoteTR: "Cezayir kökenli Fransız bir genç olarak kurgulandı. Avrupa'daki farklı aile hikâyelerinden birini temsil eder; tüm kıtayı tanımlamaz.",
    visibleDetailsTR: "Alında hafif ergenlik sivilcesi, kaşlarda küçük eşitsizlik ve doğal dudak çizgisi.",
    tags: ["Marsilya", "Fotoğraf kulübü", "Gerçek cilt dokusu"],
    image: "/assets/child-models/europe.webp",
    imageAltTR: "Marsilya'da fotoğraf makinesi taşıyan kurgusal 15 yaşındaki Inès Benali",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. Inès Benali is a fictional 15-year-old French girl of Algerian family heritage in present-day Marseille, fully clothed in a practical denim jacket over a plain crew-neck shirt and loose trousers, holding a small analog camera by its strap. Olive-toned natural skin with a few mild teenage acne marks on her forehead, slightly uneven eyebrows and naturally shaped lips; no cosmetics, no fillers, no retouching. A breezy Marseille waterfront street with pale stone and the Mediterranean visible softly in the distance, ordinary contemporary setting. Three-quarter-length eye-level 50mm documentary lens, honest early evening light, realistic hands and five fingers, authentic unposed expression and natural proportions. No glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Gençlerin gerçek cilt dokusunu saklamayan, ürün vaadi içermeyen editoryal sahne.",
  },
  {
    id: "north-america",
    continent: "Kuzey Amerika",
    location: "Oaxaca, Meksika",
    name: "Mateo López",
    age: 12,
    story: "Oaxaca'da okuldan sonra seramik atölyesine uğrayan kurgusal bir çocuk. Elindeki şekillenmemiş kil parçası, kendi merakının küçük bir izi.",
    characterNoteTR: "Zapotek aile kökenli Meksikalı bir karakter. Zanaat bağlamı belirli bir yerle ilişkilidir; etnik kimliği kostümle anlatılmıyor.",
    visibleDetailsTR: "Sağ elmacık kemiğinde küçük ben, hafif düzensiz saç çizgisi ve kilden tozlanmış parmaklar.",
    tags: ["Oaxaca", "Seramik merakı", "Küçük ben"],
    image: "/assets/child-models/north-america.webp",
    imageAltTR: "Oaxaca seramik atölyesi önünde kurgusal 12 yaşındaki Mateo López",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. Mateo López is a fictional 12-year-old Mexican boy of Zapotec family heritage in present-day Oaxaca, fully clothed in a simple contemporary short-sleeve cotton shirt layered over a long-sleeve tee and relaxed trousers. He holds a small unfinished clay piece; his fingers carry a little harmless clay dust. Preserve a small mole on his right cheekbone, subtly irregular hairline, natural medium-brown skin texture and ordinary child proportions. At the entrance of a modest contemporary pottery workshop in Oaxaca, warm plaster walls and shelves of simple unpainted pottery softly behind him; no costume or ceremonial imagery. Three-quarter-length eye-level 50mm documentary lens, diffused afternoon daylight, realistic hands and five fingers, understated colors. No glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Renk ve dokuyu çocuğun yaratıcı uğraşı üzerinden gösteren doğal sahne.",
  },
  {
    id: "south-america",
    continent: "Güney Amerika",
    location: "Cartagena, Kolombiya",
    name: "María Valdés",
    age: 14,
    story: "Cartagena'da deniz kenarında arkadaşlarıyla kitap takası yapan kurgusal bir genç. Sahnenin sıcaklığı şehir ışığından ve hareketinden geliyor.",
    characterNoteTR: "Afro-Kolombiyalı bir karakter. Bu portre Kolombiya veya Güney Amerika için tek bir ten, saç ya da yaşam biçimi iddiası taşımaz.",
    visibleDetailsTR: "Doğal bukleler, burnunda birkaç çil ve hafif farklı yükseklikte kaşlar.",
    tags: ["Cartagena", "Kitap takası", "Doğal bukleler"],
    image: "/assets/child-models/south-america.webp",
    imageAltTR: "Cartagena kıyısında kitap taşıyan kurgusal 14 yaşındaki María Valdés",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. María Valdés is a fictional 14-year-old Afro-Colombian girl in present-day Cartagena, fully clothed in a comfortable light linen overshirt, plain T-shirt and loose trousers, carrying two secondhand books with no legible covers. Her natural curly hair is slightly windblown, with a few subtle freckles across the bridge of her nose and gently uneven eyebrows; realistic deep brown skin texture, no beauty makeup or retouching. Everyday Cartagena waterfront walkway with warm historic plaster colors and the sea softly behind, no tourist costume. Three-quarter-length eye-level 50mm documentary photography, warm late afternoon light, credible hands and five fingers, age-appropriate proportions and a lively but unposed expression. No glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Kurgusal aile kampanyasında sıcak ışıkla gerçek saç ve cilt dokusunu gösteren portre.",
  },
  {
    id: "oceania",
    continent: "Okyanusya",
    location: "Auckland, Yeni Zelanda",
    name: "Tama Rangi",
    age: 10,
    story: "Auckland'da yağmur sonrası sahile taş toplamaya çıkan kurgusal bir çocuk. Hafif ıslak montu ve meraklı bakışı gündelik anı anlatıyor.",
    characterNoteTR: "Māori aile kökenli Yeni Zelandalı bir karakter. Geleneksel işaret, kostüm veya kültürel simge taklidi kullanılmıyor.",
    visibleDetailsTR: "Ön dişleri arasında küçük boşluk, yağmurdan kabarmış saç ve doğal yanak kızarıklığı.",
    tags: ["Auckland", "Yağmur sonrası", "Diş aralığı"],
    image: "/assets/child-models/oceania.webp",
    imageAltTR: "Auckland kıyısında kurgusal 10 yaşındaki Tama Rangi",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical editorial portrait for a family-safe fictional character atlas. Tama Rangi is a fictional 10-year-old New Zealand boy of Māori family heritage in present-day Auckland, fully clothed in a practical teal rain jacket, simple shirt and trousers. He carries a small smooth beach stone in one hand after a walk. Preserve a small natural gap between his front teeth, slightly frizzy rain-damp dark hair, mild cold-weather cheek redness and authentic child skin texture; ordinary age-appropriate proportions. Contemporary Auckland coastal path after rain, low headland and calm harbour in soft focus, no cultural costume, no moko or borrowed symbols. Three-quarter-length eye-level 50mm documentary portrait, gentle cloudbreak light, real fabric droplets, realistic hands and five fingers. No glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Aile markasının açık hava öyküsünde yağmur sonrası doğal bir an.",
  },
  {
    id: "antarctica",
    continent: "Antarktika",
    location: "Antarktika araştırma istasyonu",
    name: "Emilia Álvarez",
    age: 13,
    story: "Uluslararası bir araştırma ekibine eşlik eden kurgusal Şilili genç. Kısa dış mekân anında araştırma istasyonu ve buz manzarası görülüyor.",
    characterNoteTR: "Antarktika'ya özgü yerli bir halk veya etnik kimlik yoktur. Karakterin Şilili kimliği, uluslararası ekibin kişisel hikâyesidir.",
    visibleDetailsTR: "Soğuk havadan hafif kızarmış yanaklar, başlığın altından çıkan dağınık saç ve gerçekçi kış kıyafeti.",
    tags: ["Araştırma istasyonu", "Şilili karakter", "Soğuk ışık"],
    image: "/assets/child-models/antarctica.webp",
    imageAltTR: "Antarktika araştırma istasyonu önünde kurgusal 13 yaşındaki Emilia Álvarez",
    prompt: "Use case: photorealistic-natural. Asset type: 4:5 vertical documentary portrait for a family-safe fictional character atlas. Emilia Álvarez is a fictional 13-year-old Chilean child accompanying an international research team on a short, supervised outdoor moment at an Antarctic station. Fully clothed in realistic insulated parka, snow trousers, mittens and winter boots, hood up; no exposed skin except face. Lightly wind-reddened cheeks, a few dark flyaway hairs escaping the hood, natural unretouched skin and age-appropriate proportions. Modern research station buildings, low snow and distant ice in blue-hour light; physically plausible cold-weather equipment and environment. Three-quarter to full-body eye-level documentary photography, realistic gloves, face and anatomy, calm observant expression. Antarctica has no indigenous ethnicity; do not imply one. No glamour pose, no adult styling, no logo, no legible text, no watermark, no resemblance to a real child.",
    brandUseTR: "Kampanya yüzü olarak değil, insan çeşitliliği atlasında coğrafi hikâye örneği.",
  },
];
