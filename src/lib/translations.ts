// IPMobi.net EXACT product content — EN / ZH / RU
// Data center: Shah Alam, Selangor, Malaysia

export type Locale = "en" | "zh" | "ru";

export type LangKey =
  // Nav
  | "navUseCases"
  | "navInfra"
  | "navAPI"
  | "navPricing"
  | "navTrial"
  | "clientPortal"
  | "orderPort"
  | "backHome"
  // Hero
  | "heroBadge"
  | "heroTitle1"
  | "heroTitle2"
  | "heroDesc"
  | "deployBtn"
  | "apiBtn"
  // Stats
  | "stat1"
  | "stat2"
  | "stat3"
  | "stat4"
  // Use Cases
  | "ucTitle"
  | "ucDesc"
  | "uc1Title"
  | "uc1Desc"
  | "uc2Title"
  | "uc2Desc"
  | "uc3Title"
  | "uc3Desc"
  | "uc4Title"
  | "uc4Desc"
  // Infrastructure
  | "infTitle"
  | "infDesc"
  | "inf1Title"
  | "inf1Desc"
  | "inf1a"
  | "inf1b"
  | "inf2Title"
  | "inf2Desc"
  | "inf3Title"
  | "inf3Desc"
  // Developer
  | "devTitle"
  | "devDesc"
  | "dev1Title"
  | "dev1Desc"
  | "dev2Title"
  | "dev2Desc"
  | "devOut"
  // Pricing
  | "prTitle"
  | "prDesc"
  | "pr1Name"
  | "pr1Sub"
  | "prPortMo"
  | "prModem"
  | "prUnlim"
  | "prProto"
  | "prManual"
  | "prDeploy"
  | "prApiEn"
  | "pr2Name"
  | "pr2Sub"
  | "prApiRot"
  | "prConc"
  | "pr2Deploy"
  | "prEnt1"
  | "prEnt2"
  // Footer
  | "ftDesc"
  | "ftPlat"
  | "ftLegal"
  | "ftTOS"
  | "ftPriv"
  | "ftCopy";

export type TranslationDict = Record<LangKey, string>;

export const dict: Record<Locale, TranslationDict> = {
  en: {
    // ---- Nav ----
    navUseCases: "Use Cases",
    navInfra: "Infrastructure",
    navAPI: "API",
    navPricing: "Pricing",
    clientPortal: "Client Portal",
    orderPort: "Order Port",
    navTrial: "Free Trial",
    backHome: "Back Home",

    // ---- Hero ----
    heroBadge: "Shah Alam Data Center • Zero Shared Overlap",
    heroTitle1: "Raw Mobile IP",
    heroTitle2: "Infrastructure.",
    heroDesc:
      "Deploy dedicated mobile proxies with 1:1 physical modem mapping. Real carrier ASNs, zero VM overlap, and protocol-agnostic traffic routing from our Shah Alam data center.",
    deployBtn: "Deploy Your Node",
    apiBtn: "API Access",

    // ---- Stats ----
    stat1: "Dedicated Ports",
    stat2: "Bandwidth",
    stat3: "Native ASNs",
    stat4: "API Rotation",

    // ---- Use Cases ----
    ucTitle: "Purpose-Built for",
    ucDesc: "Production workloads that demand clean mobile IPs from a real telco data center.",
    uc1Title: "E-Commerce Matrix",
    uc1Desc:
      "Manage Shopee, Lazada, and Amazon seller accounts at scale. Each modem gets a dedicated mobile IP — no cross-account contamination.",
    uc2Title: "Social Media Farming",
    uc2Desc:
      "Operate TikTok, Facebook, and Instagram account farms on real Malaysian mobile IPs. Consistent carrier-grade fingerprints.",
    uc3Title: "Sneaker & Ticketing Bots",
    uc3Desc:
      "Bypass Datadome, Cloudflare, and perimeter-based rate limiting. Raw mobile IPs rotate without shared pool contention.",
    uc4Title: "Data Scraping",
    uc4Desc:
      "Scrape search engines, marketplaces, and social feeds without CAPTCHA triggers. Each request originates from a clean mobile carrier IP.",

    // ---- Infrastructure ----
    infTitle: "Built for Scale.",
    infDesc:
      "Every port is a dedicated physical modem in our Shah Alam rack — no virtualization, no noisy neighbors, no compromises.",
    inf1Title: "Dedicated Physical Hardware",
    inf1Desc: "1:1 physical modem-to-port mapping. What you rent is what you get — a real modem on a real tower.",
    inf1a: "Zero VM Overlap",
    inf1b: "Real Carrier ASNs",
    inf2Title: "Unlimited Traffic",
    inf2Desc: "No per-GB metering. Pay the flat port rate and push as much data as your use case demands.",
    inf3Title: "Protocol Agnostic",
    inf3Desc: "SOCKS5, HTTP/HTTPS, and raw UDP all supported on the same port. No protocol restrictions.",

    // ---- Developer ----
    devTitle: "API-Driven Rotation.",
    devDesc:
      "Control every modem from code. Our REST API gives you instant IP rotation, port status, and traffic metrics.",
    dev1Title: "Instant Flight-Mode Toggle",
    dev1Desc:
      "Trigger a carrier-level IP change via a single API call. The modem power-cycles and reconnects with a fresh IP in seconds.",
    dev2Title: "Simple Integration",
    dev2Desc:
      "Works with any language or tool that speaks HTTP. No proprietary SDKs — just curl, Python, Go, or Node.js.",
    devOut: "Output",

    // ---- Pricing ----
    prTitle: "Transparent Pricing.",
    prDesc:
      "One flat rate per dedicated modem port. Unlimited bandwidth, no hidden fees, no long-term contracts.",
    pr1Name: "Scraper Node",
    pr1Sub: "Single dedicated modem port with manual rotation.",
    prPortMo: "port / mo",
    prModem: "1 Dedicated Physical Modem",
    prUnlim: "Unlimited Bandwidth",
    prProto: "HTTP / SOCKS5 Protocol",
    prManual: "Manual IP Rotation Only",
    prDeploy: "Deploy Node",
    prApiEn: "API Enabled",
    pr2Name: "Automation Pro",
    pr2Sub: "Multi-port with automatic API-driven IP rotation.",
    prApiRot: "REST API Auto-Rotation",
    prConc: "High Concurrency Allowed",
    pr2Deploy: "Deploy API Node",
    prEnt1: "Need 10+ modems or custom routing?",
    prEnt2: "Contact us for Enterprise Farm builds.",

    // ---- Footer ----
    ftDesc: "Raw mobile IP infrastructure from Shah Alam's premier data center. Dedicated modems, real carrier ASNs, unlimited bandwidth.",
    ftPlat: "Platform",
    ftLegal: "Legal & Contact",
    ftTOS: "Terms of Service",
    ftPriv: "Privacy Policy",
    ftCopy: "© 2026 IPMOBI.NET. Data Center: Shah Alam, Selangor, Malaysia.",
  },

  zh: {
    // ---- Nav ----
    navUseCases: "应用场景",
    navInfra: "基础设施",
    navAPI: "API",
    navPricing: "定价",
    clientPortal: "客户门户",
    orderPort: "订购端口",
    navTrial: "免费试用",
    backHome: "返回首页",

    // ---- Hero ----
    heroBadge: "莎阿南数据中心 • 零共享重叠",
    heroTitle1: "原始移动 IP",
    heroTitle2: "基础设施。",
    heroDesc:
      "部署专用移动代理，实现 1:1 物理调制解调器映射。真实运营商 ASN、零 VM 重叠，以及来自我们莎阿南数据中心的无协议限制流量路由。",
    deployBtn: "部署节点",
    apiBtn: "API 接入",

    // ---- Stats ----
    stat1: "专用端口",
    stat2: "带宽",
    stat3: "原生 ASN",
    stat4: "API 轮换",

    // ---- Use Cases ----
    ucTitle: "专为",
    ucDesc: "需要来自真实电信数据中心的干净移动 IP 的生产工作负载。",
    uc1Title: "电商矩阵",
    uc1Desc:
      "大规模管理 Shopee、Lazada 和 Amazon 卖家账户。每个调制解调器获得专用移动 IP — 无跨账户污染。",
    uc2Title: "社交媒体养号",
    uc2Desc:
      "在真实的马来西亚移动 IP 上运营 TikTok、Facebook 和 Instagram 账号矩阵。一致的运营商级指纹。",
    uc3Title: "抢鞋与票务机器人",
    uc3Desc:
      "绕过 Datadome、Cloudflare 和基于频率的速率限制。原始移动 IP 轮换，无共享池争用。",
    uc4Title: "数据采集",
    uc4Desc:
      "采集搜索引擎、电商平台和社交媒体信息流，不触发 CAPTCHA。每个请求源自干净的移动运营商 IP。",

    // ---- Infrastructure ----
    infTitle: "为规模而生。",
    infDesc: "每个端口都是我们莎阿南机架中的专用物理调制解调器——没有虚拟化，没有嘈杂邻居，没有妥协。",
    inf1Title: "专用物理硬件",
    inf1Desc: "1:1 物理调制解调器到端口映射。你租的就是你得到的——一个连接真实基站的真实调制解调器。",
    inf1a: "零 VM 重叠",
    inf1b: "真实运营商 ASN",
    inf2Title: "无限流量",
    inf2Desc: "无每 GB 计费。支付固定端口费率，按需推送任意数据量。",
    inf3Title: "协议无关",
    inf3Desc: "同一端口同时支持 SOCKS5、HTTP/HTTPS 和原始 UDP。无协议限制。",

    // ---- Developer ----
    devTitle: "API 驱动的轮换。",
    devDesc: "通过代码控制每个调制解调器。我们的 REST API 提供即时 IP 轮换、端口状态和流量指标。",
    dev1Title: "即时飞行模式切换",
    dev1Desc:
      "通过单个 API 调用触发运营商级 IP 变更。调制解调器断电重启，数秒内以全新 IP 重新连接。",
    dev2Title: "简单集成",
    dev2Desc:
      "适用于任何支持 HTTP 的编程语言或工具。无需专有 SDK — 只需 curl、Python、Go 或 Node.js。",
    devOut: "输出",

    // ---- Pricing ----
    prTitle: "透明定价。",
    prDesc: "每个专用调制解调器端口统一费率。无限带宽，无隐藏费用，无长期合同。",
    pr1Name: "采集节点",
    pr1Sub: "单个专用调制解调器端口，手动轮换。",
    prPortMo: "端口/月",
    prModem: "1 个专用物理调制解调器",
    prUnlim: "无限带宽",
    prProto: "HTTP / SOCKS5 协议",
    prManual: "仅手动 IP 轮换",
    prDeploy: "部署节点",
    prApiEn: "API 已启用",
    pr2Name: "自动化专业版",
    pr2Sub: "多端口自动 API 驱动 IP 轮换。",
    prApiRot: "REST API 自动轮换",
    prConc: "支持高并发",
    pr2Deploy: "部署 API 节点",
    prEnt1: "需要 10 个以上调制解调器或自定义路由？",
    prEnt2: "联系我们获取企业农场构建方案。",

    // ---- Footer ----
    ftDesc: "来自莎阿南顶级数据中心的原始移动 IP 基础设施。专用调制解调器、真实运营商 ASN、无限带宽。",
    ftPlat: "平台",
    ftLegal: "法律与联系",
    ftTOS: "服务条款",
    ftPriv: "隐私政策",
    ftCopy: "© 2026 IPMOBI.NET。数据中心：马来西亚雪兰莪州莎阿南。",
  },

  ru: {
    // ---- Nav ----
    navUseCases: "Сценарии",
    navInfra: "Инфраструктура",
    navAPI: "API",
    navPricing: "Цены",
    clientPortal: "Клиентский портал",
    orderPort: "Заказать порт",
    navTrial: "Бесплатная пробная",
    backHome: "На главную",

    // ---- Hero ----
    heroBadge: "ЦОД в Шах-Алам • Нулевое пересечение",
    heroTitle1: "Нативные мобильные IP",
    heroTitle2: "Инфраструктура.",
    heroDesc:
      "Развёртывайте выделенные мобильные прокси с маппингом 1:1 физический модем — порт. Реальные операторские ASN, нулевое пересечение VM и маршрутизация без ограничений по протоколам из нашего ЦОД в Шах-Алам.",
    deployBtn: "Развернуть узел",
    apiBtn: "API-доступ",

    // ---- Stats ----
    stat1: "Выделенные порты",
    stat2: "Пропускная способность",
    stat3: "Нативные ASN",
    stat4: "Ротация через API",

    // ---- Use Cases ----
    ucTitle: "Создано для",
    ucDesc: "Продакшн-нагрузки, требующие чистых мобильных IP из реального ЦОД.",
    uc1Title: "Матрица E-Commerce",
    uc1Desc:
      "Управляйте аккаунтами продавцов Shopee, Lazada и Amazon в масштабе. Каждый модем получает выделенный мобильный IP — никакого пересечения аккаунтов.",
    uc2Title: "Фарминг соцсетей",
    uc2Desc:
      "Управляйте фермами аккаунтов TikTok, Facebook и Instagram на реальных малайзийских мобильных IP. Стабильные отпечатки операторского уровня.",
    uc3Title: "Боты для кроссовок и билетов",
    uc3Desc:
      "Обходите Datadome, Cloudflare и лимиты на основе периметра. Нативные мобильные IP ротируются без конкуренции в общем пуле.",
    uc4Title: "Парсинг данных",
    uc4Desc:
      "Сканируйте поисковики, маркетплейсы и соцсети без срабатывания CAPTCHA. Каждый запрос исходит с чистого мобильного IP оператора.",

    // ---- Infrastructure ----
    infTitle: "Создано для масштаба.",
    infDesc:
      "Каждый порт — это выделенный физический модем в нашей стойке в Шах-Алам. Никакой виртуализации, никаких шумных соседей, никаких компромиссов.",
    inf1Title: "Выделенное физическое оборудование",
    inf1Desc: "Маппинг 1:1 физический модем — порт. Что арендуете, то и получаете — реальный модем на реальной вышке.",
    inf1a: "Нулевое пересечение VM",
    inf1b: "Реальные операторские ASN",
    inf2Title: "Безлимитный трафик",
    inf2Desc: "Без поминутной тарификации за ГБ. Платите фиксированную ставку за порт и передавайте столько данных, сколько нужно.",
    inf3Title: "Независимость от протокола",
    inf3Desc: "SOCKS5, HTTP/HTTPS и сырой UDP — всё поддерживается на одном порту. Без ограничений.",

    // ---- Developer ----
    devTitle: "Ротация через API.",
    devDesc:
      "Управляйте каждым модемом через код. Наш REST API даёт мгновенную ротацию IP, статус порта и метрики трафика.",
    dev1Title: "Мгновенный режим полёта",
    dev1Desc:
      "Запускайте смену IP на уровне оператора одним вызовом API. Модем перезагружается и подключается с новым IP за секунды.",
    dev2Title: "Простая интеграция",
    dev2Desc:
      "Работает с любым языком или инструментом, поддерживающим HTTP. Никаких проприетарных SDK — просто curl, Python, Go или Node.js.",
    devOut: "Вывод",

    // ---- Pricing ----
    prTitle: "Прозрачные цены.",
    prDesc: "Единая ставка за порт выделенного модема. Безлимитный трафик, без скрытых платежей, без долгосрочных контрактов.",
    pr1Name: "Нода для парсинга",
    pr1Sub: "Один выделенный порт модема с ручной ротацией.",
    prPortMo: "порт / мес",
    prModem: "1 выделенный физический модем",
    prUnlim: "Безлимитный трафик",
    prProto: "HTTP / SOCKS5 протокол",
    prManual: "Только ручная ротация IP",
    prDeploy: "Развернуть ноду",
    prApiEn: "API включён",
    pr2Name: "Automation Pro",
    pr2Sub: "Несколько портов с автоматической ротацией IP через API.",
    prApiRot: "Автоматическая ротация через REST API",
    prConc: "Высокая степень параллелизма",
    pr2Deploy: "Развернуть API-ноду",
    prEnt1: "Нужно 10+ модемов или кастомная маршрутизация?",
    prEnt2: "Свяжитесь с нами для создания Enterprise-фермы.",

    // ---- Footer ----
    ftDesc: "Инфраструктура нативных мобильных IP из ведущего ЦОД в Шах-Алам. Выделенные модемы, реальные ASN, безлимитный трафик.",
    ftPlat: "Платформа",
    ftLegal: "Правовая информация и контакты",
    ftTOS: "Условия использования",
    ftPriv: "Политика конфиденциальности",
    ftCopy: "© 2026 IPMOBI.NET. ЦОД: Шах-Алам, Селангор, Малайзия.",
  },
};

export function t(key: LangKey, locale: Locale = "en"): string {
  return dict[locale][key];
}
