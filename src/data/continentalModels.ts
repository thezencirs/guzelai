export interface ContinentalModel {
  id: string;
  continent: string;
  location: string;
  lat: number;
  lon: number;
  name: string;
  age: number;
  role: string;
  story: string;
  culturalNoteTR: string;
  tags: string[];
  colorHex: string;
  image: string;
  imageAltTR: string;
  prompt: string;
  sourceUrl: string;
}

/**
 * All people in this collection are fictional adults. The places and crafts
 * provide context for an individual style; no continent has one "ethnic look".
 */
export const CONTINENTAL_MODELS: ContinentalModel[] = [
  {
    id: "africa",
    continent: "Afrika",
    location: "Akra, Gana",
    lat: 5.6037,
    lon: -0.187,
    name: "Ama Mensah",
    age: 29,
    role: "Akra çağdaş moda editoryali",
    story: "Akra'nın kıyı ışığını ve güncel tasarım enerjisini, indigo terzilik ve ölçülü bir baskı ayrıntısıyla yorumlayan kurgusal marka yüzü.",
    culturalNoteTR: "Gana'da wax print kumaşlar çağdaş giyimle birlikte kullanılır; kökenleri ve üretimleri çok katmanlıdır. Bu sahne Afrika'nın tamamını temsil etmez.",
    tags: ["Çağdaş Akra", "İndigo terzilik", "Wax print ayrıntısı"],
    colorHex: "#d9a36b",
    image: "/assets/continental-models/africa.webp",
    imageAltTR: "Akra kıyısında indigo kıyafetli kurgusal yetişkin model Ama Mensah",
    prompt: "Photorealistic 4:5 vertical three-quarter-length fashion editorial of Ama Mensah, a fictional 29-year-old adult Ghanaian woman with deep brown skin, natural skin texture, warm brown eyes, and a calm confident expression. She wears a contemporary indigo tailored jacket with restrained Ghanaian wax-print accents, not a costume. Place her in a contemporary Accra coastal design district at late golden hour, with warm Atlantic haze, understated modern architecture and a glimpse of the sea. Editorial 85mm lens, realistic hands and anatomy, refined fabric weave, soft directional sunlight, rich but natural color, authentic human presence, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://www.unesco.org/sites/default/files/medias/fichiers/2024/03/387230eng.pdf",
  },
  {
    id: "asia",
    continent: "Asya",
    location: "Kyoto, Japonya",
    lat: 35.0116,
    lon: 135.7681,
    name: "Yuna Sato",
    age: 27,
    role: "Kyoto tekstil ve çağdaş silüet",
    story: "Kyoto'nun Nishijin dokuma mirasını küçük bir ipek ayrıntıyla anan, güncel ve sade bir moda silüeti.",
    culturalNoteTR: "Nishijin, Kyoto'nun tarihî dokuma bölgesidir. Dokuma vurgusu belirli bir yer ve zanaata aittir; tüm Asya için ortak bir kıyafet iddiası taşımaz.",
    tags: ["Nishijin dokuması", "Çağdaş Kyoto", "İpek detayı"],
    colorHex: "#a698b8",
    image: "/assets/continental-models/asia.webp",
    imageAltTR: "Kyoto Nishijin bölgesinde ipek detaylı kıyafetli kurgusal yetişkin model Yuna Sato",
    prompt: "Photorealistic 4:5 vertical three-quarter-length luxury editorial of Yuna Sato, a fictional 27-year-old adult Japanese woman with natural warm skin, dark eyes, straight dark hair, visible skin detail and an assured relaxed posture. She wears an ink-black contemporary tailored coat and a restrained Nishijin woven-silk accent at the collar, styled as modern clothing rather than ceremonial dress. Set the scene in Kyoto's Nishijin textile district near a quiet workshop entrance, weathered timber and softly lit woven fabric visible in the background. Early morning overcast daylight, 85mm portrait lens, natural proportions and hands, delicate fabric texture, elegant negative space, understated film color, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://kyoto.travel/en/travel-inspiration/kyotos-historical-textile-district/",
  },
  {
    id: "europe",
    continent: "Avrupa",
    location: "Lizbon, Portekiz",
    lat: 38.7223,
    lon: -9.1393,
    name: "Tiago Moreira",
    age: 32,
    role: "Lizbon ışığı ve modern keten",
    story: "Lizbon'un eğimli sokakları ve seramik yüzeylerini arka plan alan, sakin ve özenli bir erkek giyim editoryali.",
    culturalNoteTR: "Azulejo seramikleri Portekiz mimarisinin belirgin görsel öğelerinden biridir. Karakter, kıtanın tamamı için tek bir görünüm olarak sunulmaz.",
    tags: ["Azulejo", "Keten terzilik", "Lizbon sokağı"],
    colorHex: "#e1c08d",
    image: "/assets/continental-models/europe.webp",
    imageAltTR: "Lizbon azulejo sokağında keten takımlı kurgusal yetişkin model Tiago Moreira",
    prompt: "Photorealistic 4:5 vertical three-quarter-length editorial of Tiago Moreira, a fictional 32-year-old adult Portuguese man with olive-toned natural skin, short dark wavy hair, gentle smile, subtle facial lines and realistic hands. Dress him in impeccably cut cream linen separates over a soft ecru shirt, relaxed contemporary Lisbon style. He stands on a sunlit Lisbon side street with authentic blue-and-white azulejo tiles, pale limestone and a slight hill receding behind him. Late-afternoon Atlantic light, 50mm editorial lens, tactile linen, believable body proportions, quiet premium color grading, no tourist costume, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://www.visitportugal.com/en/content/country-tiles",
  },
  {
    id: "north-america",
    continent: "Kuzey Amerika",
    location: "Meksiko, Meksika",
    lat: 19.4326,
    lon: -99.1332,
    name: "Lucía Serrano",
    age: 30,
    role: "Meksiko dokuma ve şehir stili",
    story: "Güncel şehir terziliğini bir rebozo aksesuarıyla birleştiren, Meksiko'da geçen sakin bir moda hikâyesi.",
    culturalNoteTR: "Rebozo, Meksika'da farklı toplulukların ve ustaların yaşattığı bir dokuma geleneğidir. Görsel, belirli bir zanaata saygılı bir çağdaş stil yorumudur.",
    tags: ["Rebozo", "Şehir terziliği", "Meksiko"],
    colorHex: "#cd7b67",
    image: "/assets/continental-models/north-america.webp",
    imageAltTR: "Meksiko'da rebozo aksesuarı taşıyan kurgusal yetişkin model Lucía Serrano",
    prompt: "Photorealistic 4:5 vertical three-quarter-length fashion editorial of Lucía Serrano, a fictional 30-year-old adult Mexican woman with warm medium skin, dark eyes, natural textured hair and a poised, candid expression. She wears a modern charcoal tailored suit and an elegant handwoven Mexican rebozo draped as an accessory, with visible woven threads and fringed ends; do not invent tribal symbols. Place her in a quiet contemporary art courtyard in Mexico City with warm plaster, basalt stone and soft jacaranda color in the distance. Golden-hour sidelight, 85mm lens, truthful skin pores, natural hands and posture, sophisticated contemporary styling, no costume, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://www.gob.mx/cultura/prensa/mexico-un-rebozo-tejido-a-mano",
  },
  {
    id: "south-america",
    continent: "Güney Amerika",
    location: "Bogotá, Kolombiya",
    lat: 4.711,
    lon: -74.0721,
    name: "Mateo Rojas",
    age: 28,
    role: "Bogotá şehir ve And dağları",
    story: "And dağlarının yüksek irtifa ışığıyla La Candelaria'nın taş sokaklarını birleştiren çağdaş erkek giyim portresi.",
    culturalNoteTR: "La Candelaria, Bogotá'nın tarihî merkezidir. Bu karakter Kolombiya'nın ya da Güney Amerika'nın tüm kültürlerini temsil etmez.",
    tags: ["La Candelaria", "And ışığı", "Modern terzilik"],
    colorHex: "#7ba897",
    image: "/assets/continental-models/south-america.webp",
    imageAltTR: "Bogotá La Candelaria'da modern takımlı kurgusal yetişkin model Mateo Rojas",
    prompt: "Photorealistic 4:5 vertical three-quarter-length editorial portrait of Mateo Rojas, a fictional 28-year-old adult Colombian man with warm tan skin, short dark curls, natural skin texture, dark eyes and a thoughtful direct gaze. Style him in deep emerald and charcoal contemporary tailoring with a practical lightweight outer layer for Bogotá's cool highland air. Photograph him on a cobbled street in La Candelaria, Bogotá, with ochre colonial facades and the Andes suggested through a distant blue-grey sky, without turning the scene into a postcard. Soft overcast high-altitude daylight, 50mm lens, realistic anatomy and hands, subtle fabric grain, cinematic but believable color, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://colombia.travel/es/bogota/visita-el-museo-de-trajes",
  },
  {
    id: "oceania",
    continent: "Okyanusya",
    location: "Melbourne, Avustralya",
    lat: -37.8136,
    lon: 144.9631,
    name: "Amara Ellis",
    age: 31,
    role: "Melbourne yaratıcı sokak stili",
    story: "Yağmur sonrası Melbourne ara sokağında, yerel tasarım mağazalarının sakin ritmini taşıyan modern bir moda portresi.",
    culturalNoteTR: "Melbourne'ün moda mağazaları ve galerilerle dolu ara sokakları sahneye kaynaklık eder. Avustralya'nın çok kültürlü yapısı tek bir fiziksel tipe indirgenmez; yerli desenleri izinsiz taklit edilmez.",
    tags: ["Melbourne laneway", "Yağmur sonrası", "Modern palto"],
    colorHex: "#83a6b5",
    image: "/assets/continental-models/oceania.webp",
    imageAltTR: "Melbourne ara sokağında modern paltolu kurgusal yetişkin model Amara Ellis",
    prompt: "Photorealistic 4:5 vertical three-quarter-length fashion editorial of Amara Ellis, a fictional 31-year-old adult Australian woman with medium-brown skin, shoulder-length dark curls, natural freckles and an open confident expression. She wears a minimalist earth-tone designer coat over modern city separates, entirely contemporary clothing without borrowed Indigenous patterns. Set her in a Melbourne laneway just after rain, with wet bluestone pavement, discreet boutique windows and soft reflected city light. Blue-hour ambient light with a gentle warm shop-window rim, 50mm editorial lens, lifelike hands and anatomy, realistic coat texture and skin detail, premium muted palette, no logo, no text, no watermark, no celebrity resemblance.",
    sourceUrl: "https://www.visitmelbourne.com/regions/melbourne/destinations/laneways",
  },
  {
    id: "antarctica",
    continent: "Antarktika",
    location: "Antarktika araştırma istasyonu",
    lat: -67.5681,
    lon: -68.125,
    name: "Noor Rahman",
    age: 34,
    role: "Uluslararası kutup araştırması",
    story: "Antarktika'daki uluslararası bir araştırma ekibinden kurgusal bir yetişkin karakter; moda dili, gerçek saha ekipmanının işlevini koruyor.",
    culturalNoteTR: "Antarktika'nın yerli insan topluluğu yoktur. Burada kıtaya ait bir etnik kimlik iddiası yerine araştırma yaşamı ve güvenli kutup giyimi gösterilir.",
    tags: ["Araştırma ekibi", "Kutup ekipmanı", "Mavi saat"],
    colorHex: "#9ecde0",
    image: "/assets/continental-models/antarctica.webp",
    imageAltTR: "Antarktika araştırma istasyonunda gerçekçi kutup kıyafetli kurgusal yetişkin araştırmacı Noor Rahman",
    prompt: "Photorealistic 4:5 vertical three-quarter-length environmental editorial of Noor Rahman, a fictional 34-year-old adult international polar researcher with medium-brown skin and natural human features, standing safely near an Antarctic research station during blue hour. Dress the character in credible layered extreme-cold field clothing: insulated parka, thermal trousers, gloves, hood and sturdy snow boots; no impractical exposed skin or fashion costume. Show station structures, wind-shaped snow and distant ice ridges, with the face visible under the hood and a composed focused expression. Cold blue ambient light balanced by warm station windows, 50mm documentary fashion lens, accurate anatomy and hands, realistic fabric insulation, restrained cinematic contrast, no logos, no text, no watermark, no celebrity resemblance. Do not imply any Indigenous Antarctic ethnicity.",
    sourceUrl: "https://www.bas.ac.uk/polar-capabilities/field-work/",
  },
];
