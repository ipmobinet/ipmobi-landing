// IPMobi.net EXACT product content — EN / ZH / RU
// Data center: Shah Alam, Selangor, Malaysia

export type Locale = "en" | "zh" | "ru" | "ja" | "ko" | "vi" | "th" | "id" | "ms" | "hi" | "ar" | "pt" | "es" | "de" | "fr";

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
    orderPort: "Order Now",
    navTrial: "Free Trial",
    backHome: "Back Home",

    // ---- Hero ----
    heroBadge: "Shah Alam Data Center • Zero Shared Overlap",
    heroTitle1: "Raw Mobile IP",
    heroTitle2: "Infrastructure.",
    heroDesc:
      "Deploy dedicated mobile proxies with 1:1 physical modem mapping. Real carrier ASNs, zero VM overlap, and protocol-agnostic traffic routing from our Shah Alam data center.",
    deployBtn: "Client Portal",
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
    orderPort: "立即订购",
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
    orderPort: "Заказать",
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
  ja: {
    navTrial: "無料トライアル",
    navUseCases: "ユースケース", navInfra: "インフラ", navAPI: "API", navPricing: "料金",
    clientPortal: "クライアントポータル", orderPort: "注文する", backHome: "ホームに戻る",
    heroBadge: "シャーアラムDC • ゼロ共有", heroTitle1: "純正モバイルIP", heroTitle2: "インフラ。",
    heroDesc: "マレーシア専用物理4G/5Gモデム。GB課金なし。ハードウェアをレンタル、帯域を所有。",
    deployBtn: "ノード展開", apiBtn: "APIドキュメント",
    stat1: "専用ポート", stat2: "帯域", stat3: "ネイティブASN", stat4: "API回転",
    ucTitle: "高信頼運用向け設計。", ucDesc: "純正キャリアIPが自動化の最大ボトルネックを解決。",
    uc1Title: "ECマトリックス", uc1Desc: "Shopee/Lazada/Amazon安全管理。純正モバイルIPが関連付け禁止を防止。",
    uc2Title: "SNSファーミング", uc2Desc: "TikTok/FB/IGアカウント育成。1モデム＝1高信頼端末。",
    uc3Title: "スニーカー＆チケット", uc3Desc: "Datadome/Cloudflare待機室を高トラストスコアで突破。",
    uc4Title: "データスクレイピング", uc4Desc: "ブロック時APIで3秒物理IP切替。データ制限ゼロ。",
    infTitle: "スケール向け構築。", infDesc: "自社DCでHuawei/Quectelモデムをラック実装・保守。",
    inf1Title: "専用物理ハードウェア", inf1Desc: "各ポートは実際のMaxis/Celcom/Digi SIM搭載物理USBモデムに1:1マッピング。",
    inf1a: "VMオーバーラップゼロ", inf1b: "実際のキャリアASN",
    inf2Title: "無制限トラフィック", inf2Desc: "GB課金なし。現地4G/5G基地局が許す限り自由に。",
    inf3Title: "プロトコル非依存", inf3Desc: "最適化3x-ui。SOCKS5/HTTP(s)/UDP対応。",
    devTitle: "API駆動回転。", devDesc: "ブロック時にREST APIでハードウェアIP回転。3秒未満。",
    dev1Title: "機内モード即時切替", dev1Desc: "モデムHiLinkと直接通信。",
    dev2Title: "シンプル統合", dev2Desc: "1回のGETで回転。", devOut: "出力",
    prTitle: "透明な価格。", prDesc: "隠れ費用なし。市場平均$130/月を半額に。",
    pr1Name: "スクレイパーノード", pr1Sub: "手動/低頻度抽出用。", prPortMo: "ポート/月",
    prModem: "専用物理モデム1台", prUnlim: "無制限帯域", prProto: "HTTP/SOCKS5", prManual: "手動IP回転のみ", prDeploy: "展開",
    prApiEn: "API有効", pr2Name: "自動化Pro", pr2Sub: "動的スクレイピング/アカウント管理用。",
    prApiRot: "REST API自動回転", prConc: "高同時実行許可", pr2Deploy: "APIノード展開",
    prEnt1: "10台以上のモデムが必要？", prEnt2: "企業ファーム構築問合せ",
    ftDesc: "マレーシアShah Alam展開のハードウェア基盤プロキシ。API無制限。帯域上限なし。",
    ftPlat: "プラットフォーム", ftLegal: "法務/問合せ", ftTOS: "利用規約", ftPriv: "プライバシーポリシー",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },
  ko: {
    navTrial: "무료 체험",
    navUseCases: "사용 사례", navInfra: "인프라", navAPI: "API", navPricing: "가격",
    clientPortal: "클라이언트 포털", orderPort: "포트 주문", backHome: "홈으로",
    heroBadge: "Shah Alam DC • 제로 공유", heroTitle1: "순수 모바일 IP", heroTitle2: "인프라.",
    heroDesc: "말레이시아 전용 물리 4G/5G 모뎀. GB당 요금제 종료. 하드웨어 임대, 대역폭 소유.",
    deployBtn: "노드 배포", apiBtn: "API 문서",
    stat1: "전용 포트", stat2: "대역폭", stat3: "네이티브 ASN", stat4: "API 회전",
    ucTitle: "고신뢰 운영 최적화.", ucDesc: "통신사 IP가 자동화 장벽 해결.",
    uc1Title: "이커머스 매트릭스", uc1Desc: "Shopee/Lazada/Amazon 안전 관리. 모바일 IP가 계정 차단 방지.",
    uc2Title: "SNS 파밍", uc2Desc: "TikTok/FB/IG 계정 육성. 모뎀 1개 = 고신뢰 장치.",
    uc3Title: "스니커즈/티켓 봇", uc3Desc: "Datadome/Cloudflare 높은 신뢰도로 우회.",
    uc4Title: "데이터 스크래핑", uc4Desc: "차단 시 3초 API IP 교체. 제한 없음.",
    infTitle: "확장 구축.", infDesc: "자체 DC에서 Huawei/Quectel 모뎀 설치 및 유지보수.",
    inf1Title: "전용 물리 하드웨어", inf1Desc: "각 포트는 실제 Maxis/Celcom/Digi SIM의 물리 USB 모뎀에 1:1 매핑.",
    inf1a: "VM 중복 제로", inf1b: "실제 통신사 ASN",
    inf2Title: "무제한 트래픽", inf2Desc: "GB당 요금 없음. 기지국 허용 범위 내 자유로운 스크래핑.",
    inf3Title: "프로토콜 중립", inf3Desc: "최적화 3x-ui. SOCKS5/HTTP(s)/UDP 지원.",
    devTitle: "API 기반 회전.", devDesc: "차단 시 REST API로 하드웨어 IP 회전. 3초 이내.",
    dev1Title: "즉시 비행기 모드", dev1Desc: "모뎀 HiLink 인터페이스 직접 통신.",
    dev2Title: "간단한 통합", dev2Desc: "GET 요청 한 번으로 회전.", devOut: "출력",
    prTitle: "투명한 가격.", prDesc: "숨은 비용 없음. 시장 평균 $130/월 절반.",
    pr1Name: "스크래퍼 노드", pr1Sub: "수동/저빈도 추출용.", prPortMo: "포트/월",
    prModem: "전용 물리 모뎀 1개", prUnlim: "무제한 대역폭", prProto: "HTTP/SOCKS5", prManual: "수동 회전만", prDeploy: "노드 배포",
    prApiEn: "API 활성", pr2Name: "오토메이션 Pro", pr2Sub: "동적 스크래핑/계정 관리용.",
    prApiRot: "REST API 자동 회전", prConc: "높은 동시성 허용", pr2Deploy: "API 노드 배포",
    prEnt1: "10+ 모뎀 필요?", prEnt2: "엔터프라이즈 팜 문의",
    ftDesc: "말레이시아 Shah Alam 구축 하드웨어 기반 모바일 프록시. API 무제한. 대역폭 상한 없음.",
    ftPlat: "플랫폼", ftLegal: "법률/연락처", ftTOS: "이용약관", ftPriv: "개인정보방침",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },
  th: {
    navTrial: "ทดลองใช้ฟรี",
    navUseCases: "กรณีการใช้งาน", navInfra: "โครงสร้างพื้นฐาน", navAPI: "API", navPricing: "ราคา",
    clientPortal: "พอร์ทัลลูกค้า", orderPort: "สั่งซื้อพอร์ต", backHome: "กลับหน้าหลัก",
    heroBadge: "Shah Alam DC • ไม่มีการใช้ร่วมกัน", heroTitle1: "IP มือถือแท้", heroTitle2: "โครงสร้างพื้นฐาน.",
    heroDesc: "ข้ามระบบป้องกันบอทที่เข้มงวดด้วยโมเด็ม 4G/5G เฉพาะในมาเลเซีย เลิกจ่ายต่อGB เช่าฮาร์ดแวร์ เป็นเจ้าของแบนด์วิธ",
    deployBtn: "ติดตั้งโหนด", apiBtn: "อ่านเอกสาร API",
    stat1: "พอร์ตเฉพาะ", stat2: "แบนด์วิธ", stat3: "ASN ดั้งเดิม", stat4: "หมุนเวียน API",
    ucTitle: "ออกแบบเพื่อการดำเนินงานที่เชื่อถือได้สูง.", ucDesc: "IP ผู้ให้บริการแท้แก้ปัญหาคอขวดของระบบอัตโนมัติ",
    uc1Title: "เมทริกซ์อีคอมเมิร์ซ", uc1Desc: "จัดการโปรไฟล์ผู้ขาย Shopee/Lazada/Amazon อย่างปลอดภัย IP มือถือแท้ป้องกันการแบนข้ามบัญชี",
    uc2Title: "ฟาร์มโซเชียลมีเดีย", uc2Desc: "ปลูกบัญชี TikTok/FB/IG 1 โมเด็ม = 1 อุปกรณ์มือถือที่เชื่อถือได้ หลีกเลี่ยง Shadowban",
    uc3Title: "บอทรองเท้าและตั๋ว", uc3Desc: "ข้าม Datadome/Cloudflare ด้วยคะแนนความน่าเชื่อถือสูง",
    uc4Title: "การขูดข้อมูล", uc4Desc: "ขูดข้อมูลต่อเนื่อง เมื่อถูกบล็อก หมุน IP ผ่านภายใน 3 วินาที",
    infTitle: "สร้างเพื่อขยาย.", infDesc: "เราไม่ขายบอตเน็ต เราติดตั้งและบำรุงรักษาโมเด็ม Huawei/Quectel ใน DC ของเราเอง",
    inf1Title: "ฮาร์ดแวร์เฉพาะทางกายภาพ", inf1Desc: "แต่ละพอร์ตเชื่อมต่อ 1:1 กับโมเด็ม USB ที่มี SIM จริงของ Maxis/Celcom/Digi",
    inf1a: "ไม่มีการใช้ VM ร่วม", inf1b: "ASN ผู้ให้บริการจริง",
    inf2Title: "แบนด์วิธไม่จำกัด", inf2Desc: "ไม่มีค่าใช้จ่ายต่อGB ขูดข้อมูลเท่าที่เสา 4G/5G อนุญาต",
    inf3Title: "อิสระโปรโตคอล", inf3Desc: "ขับเคลื่อนด้วย 3x-ui รองรับ SOCKS5/HTTP(s)/UDP",
    devTitle: "หมุนเวียนผ่าน API.", devDesc: "เมื่อถูกบล็อก เรียก API เพื่อหมุน IP ระดับฮาร์ดแวร์ รับ IP ใหม่ใน 3 วินาที",
    dev1Title: "สลับโหมดเครื่องบินทันที", dev1Desc: "สื่อสารกับอินเทอร์เฟซ HiLink ของโมเด็มโดยตรง",
    dev2Title: "ผสานรวมง่าย", dev2Desc: "คำขอ GET เดียวก็หมุน IP ได้", devOut: "ผลลัพธ์",
    prTitle: "ราคาโปร่งใส.", prDesc: "ไม่มีค่าใช้จ่ายแบนด์วิธซ่อนเร้น ราคาตลาดเฉลี่ย $130/เดือน เราลดครึ่งหนึ่ง",
    pr1Name: "โหนดขูดข้อมูล", pr1Sub: "สำหรับการดึงข้อมูลด้วยตนเองหรือความถี่ต่ำ", prPortMo: "พอร์ต/เดือน",
    prModem: "โมเด็มเฉพาะ 1 ตัว", prUnlim: "แบนด์วิธไม่จำกัด", prProto: "HTTP/SOCKS5", prManual: "หมุนด้วยตนเองเท่านั้น", prDeploy: "ติดตั้งโหนด",
    prApiEn: "API พร้อมใช้", pr2Name: "อัตโนมัติ Pro", pr2Sub: "สำหรับการขูดข้อมูลแบบไดนามิกและการจัดการบัญชี",
    prApiRot: "REST API หมุนอัตโนมัติ", prConc: "อนุญาตการทำงานพร้อมกันสูง", pr2Deploy: "ติดตั้ง API โหนด",
    prEnt1: "ต้องการ 10+ โมเด็ม?", prEnt2: "ติดต่อสร้างฟาร์มองค์กร",
    ftDesc: "โครงสร้างพื้นฐานพร็อกซีมือถือบนฮาร์ดแวร์ใน Shah Alam มาเลเซีย เข้าถึง API ไม่จำกัด ไม่มีขีดจำกัดแบนด์วิธ",
    ftPlat: "แพลตฟอร์ม", ftLegal: "กฎหมาย/ติดต่อ", ftTOS: "เงื่อนไขบริการ", ftPriv: "นโยบายความเป็นส่วนตัว",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },
  id: {
    navTrial: "Uji Coba Gratis",
    navUseCases: "Penggunaan", navInfra: "Infrastruktur", navAPI: "API", navPricing: "Harga",
    clientPortal: "Portal Klien", orderPort: "Pesan Port", backHome: "Kembali",
    heroBadge: "Shah Alam DC • Zero Tumpang Tindih", heroTitle1: "IP Mobile Mentah", heroTitle2: "Infrastruktur.",
    heroDesc: "Lewati sistem anti-bot paling ketat dengan modem 4G/5G fisik khusus di Malaysia. Berhenti bayar per GB. Sewa hardware, miliki bandwidth.",
    deployBtn: "Deploy Node", apiBtn: "Dokumentasi API",
    stat1: "Port Khusus", stat2: "Bandwidth", stat3: "ASN Asli", stat4: "Rotasi API",
    ucTitle: "Dirancang untuk Operasi Kepercayaan Tinggi.", ucDesc: "IP operator asli memecahkan hambatan terbesar dalam alur kerja otomatis.",
    uc1Title: "Matriks E-Commerce", uc1Desc: "Kelola profil penjual Shopee/Lazada/Amazon dengan aman. IP mobile asli cegah larangan akun silang.",
    uc2Title: "Farming Media Sosial", uc2Desc: "Panaskan akun TikTok/FB/IG. 1 modem = 1 perangkat seluler tepercaya.",
    uc3Title: "Bot Sneaker & Tiket", uc3Desc: "Lewati Datadome/Cloudflare dengan skor kepercayaan tinggi.",
    uc4Title: "Scraping Data", uc4Desc: "Scraping terus menerus. Saat diblokir, rotasi IP fisik dalam 3 detik via API.",
    infTitle: "Dibangun untuk Skala.", infDesc: "Kami tidak menjual botnet. Kami memasang modem Huawei/Quectel di DC kami sendiri.",
    inf1Title: "Hardware Fisik Khusus", inf1Desc: "Setiap port dipetakan 1:1 ke modem USB fisik dengan SIM Maxis/Celcom/Digi asli.",
    inf1a: "Zero Tumpang Tindih VM", inf1b: "ASN Operator Asli",
    inf2Title: "Traffic Tak Terbatas", inf2Desc: "Tanpa biaya per GB. Scraping sebebas yang diizinkan menara 4G/5G.",
    inf3Title: "Agnostik Protokol", inf3Desc: "Didukung routing 3x-ui. Dukungan SOCKS5/HTTP(s)/UDP asli.",
    devTitle: "Rotasi Berbasis API.", devDesc: "Saat diblokir, picu rotasi IP level hardware via REST API. Dapatkan IP operator baru dalam 3 detik.",
    dev1Title: "Toggle Mode Pesawat Instan", dev1Desc: "Berkomunikasi langsung dengan antarmuka HiLink modem.",
    dev2Title: "Integrasi Sederhana", dev2Desc: "Satu permintaan GET sudah cukup.", devOut: "Output",
    prTitle: "Harga Transparan.", prDesc: "Tanpa biaya bandwidth tersembunyi. Harga pasar rata-rata $130/bln, kami potong setengah.",
    pr1Name: "Node Scraper", pr1Sub: "Untuk ekstraksi data manual/frekuensi rendah.", prPortMo: "port/bln",
    prModem: "1 Modem Fisik Khusus", prUnlim: "Bandwidth Tak Terbatas", prProto: "HTTP/SOCKS5", prManual: "Rotasi Manual Saja", prDeploy: "Deploy Node",
    prApiEn: "API Aktif", pr2Name: "Otomatisasi Pro", pr2Sub: "Untuk scraping dinamis & manajemen akun.",
    prApiRot: "Rotasi Otomatis REST API", prConc: "Konkurensi Tinggi Diizinkan", pr2Deploy: "Deploy API Node",
    prEnt1: "Butuh 10+ modem?", prEnt2: "Hubungi untuk Farm Enterprise",
    ftDesc: "Infrastruktur proxy mobile berbasis hardware di Shah Alam, Malaysia. Akses API tak terbatas. Tanpa batas bandwidth.",
    ftPlat: "Platform", ftLegal: "Hukum & Kontak", ftTOS: "Ketentuan Layanan", ftPriv: "Kebijakan Privasi",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },
  ms: {
    navTrial: "Percubaan Percuma",
    navUseCases: "Kegunaan", navInfra: "Infrastruktur", navAPI: "API", navPricing: "Harga",
    clientPortal: "Portal Pelanggan", orderPort: "Tempah Port", backHome: "Kembali",
    heroBadge: "Pusat Data Shah Alam • Sifar Pertindihan", heroTitle1: "IP Mudah Alih Mentah", heroTitle2: "Infrastruktur.",
    heroDesc: "Langkau sistem anti-bot paling ketat dengan modem 4G/5G fizikal khusus di Malaysia. Henti bayar per GB. Sewa perkakasan, miliki lebar jalur.",
    deployBtn: "Gunakan Node", apiBtn: "Baca Dokumen API",
    stat1: "Port Khas", stat2: "Lebar Jalur", stat3: "ASN Asli", stat4: "Putaran API",
    ucTitle: "Direka untuk Operasi Amanah Tinggi.", ucDesc: "IP pembawa asli menyelesaikan masalah terbesar dalam aliran kerja automatik.",
    uc1Title: "Matriks E-Dagang", uc1Desc: "Urus profil penjual Shopee/Lazada/Amazon dengan selamat. IP mudah alih sebenar cegah larangan silang akaun.",
    uc2Title: "Penternakan Media Sosial", uc2Desc: "Panaskan akaun TikTok/FB/IG. 1 modem = 1 peranti mudah alih dipercayai.",
    uc3Title: "Bot Sneaker & Tiket", uc3Desc: "Langkau Datadome/Cloudflare dengan skor kepercayaan tinggi.",
    uc4Title: "Scraping Data", uc4Desc: "Scrap data berterusan. Apabila disekat, putar IP fizikal dalam 3 saat melalui API.",
    infTitle: "Dibina untuk Skala.", infDesc: "Kami tidak menjual botnet. Kami memasang modem Huawei/Quectel di DC kami sendiri.",
    inf1Title: "Perkakasan Fizikal Khas", inf1Desc: "Setiap port dipetakan 1:1 ke modem USB fizikal dengan SIM Maxis/Celcom/Digi sebenar.",
    inf1a: "Sifar Pertindihan VM", inf1b: "ASN Pembawa Sebenar",
    inf2Title: "Lalu Lintas Tanpa Had", inf2Desc: "Tiada caj per GB. Scrap seaktif yang dibenarkan menara 4G/5G tempatan.",
    inf3Title: "Agnostik Protokol", inf3Desc: "Didorong oleh routing 3x-ui. Sokongan SOCKS5/HTTP(s)/UDP asli.",
    devTitle: "Putaran Didorong API.", devDesc: "Apabila disekat, picu putaran IP peringkat perkakasan melalui REST API. Dapatkan IP pembawa baru dalam 3 saat.",
    dev1Title: "Togol Mod Pesawat Segera", dev1Desc: "Berkomunikasi terus dengan antara muka HiLink modem.",
    dev2Title: "Integrasi Mudah", dev2Desc: "Satu permintaan GET sudah cukup.", devOut: "Output",
    prTitle: "Harga Telus.", prDesc: "Tiada yuran lebar jalur tersembunyi. Harga pasaran purata $130/bln, kami potong separuh.",
    pr1Name: "Node Scraper", pr1Sub: "Untuk ekstraksi data manual/kekerapan rendah.", prPortMo: "port/bln",
    prModem: "1 Modem Fizikal Khas", prUnlim: "Lebar Jalur Tanpa Had", prProto: "HTTP/SOCKS5", prManual: "Putaran Manual Sahaja", prDeploy: "Gunakan Node",
    prApiEn: "API Diaktifkan", pr2Name: "Automasi Pro", pr2Sub: "Untuk scraping dinamik & pengurusan akaun.",
    prApiRot: "Putaran Auto REST API", prConc: "Konkurensi Tinggi Dibolehkan", pr2Deploy: "Gunakan Node API",
    prEnt1: "Perlukan 10+ modem?", prEnt2: "Hubungi untuk Farm Enterprise",
    ftDesc: "Infrastruktur proksi mudah alih berasaskan perkakasan di Shah Alam, Malaysia. Akses API tanpa had. Tiada had lebar jalur.",
    ftPlat: "Platform", ftLegal: "Undang-undang & Hubungi", ftTOS: "Syarat Perkhidmatan", ftPriv: "Dasar Privasi",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },

  hi: {
    navTrial: "मुफ्त परीक्षण",
    navUseCases: "उपयोग के मामले", navInfra: "बुनियादी ढांचा", navAPI: "API", navPricing: "मूल्य निर्धारण",
    clientPortal: "क्लाइंट पोर्टल", orderPort: "पोर्ट ऑर्डर करें", backHome: "होम पर वापस",
    heroBadge: "शाह आलम डेटा सेंटर • शून्य साझा ओवरलैप", heroTitle1: "रॉ मोबाइल IP", heroTitle2: "बुनियादी ढांचा।",
    heroDesc: "मलेशिया में समर्पित भौतिक 4G/5G मॉडेम के साथ सबसे सख्त एंटी-बॉट सिस्टम को बायपास करें। प्रति GB भुगतान बंद करें। हार्डवेयर किराए पर लें, बैंडविड्थ के मालिक बनें।",
    deployBtn: "हार्डवेयर नोड तैनात करें", apiBtn: "API दस्तावेज़ पढ़ें",
    stat1: "समर्पित पोर्ट", stat2: "बैंडविड्थ", stat3: "देशी ASN", stat4: "API रोटेशन",
    ucTitle: "उच्च-विश्वास संचालन के लिए इंजीनियर्ड।", ucDesc: "वास्तविक कैरियर IP स्वचालित वर्कफ़्लो में सबसे बड़ी बाधा को हल करते हैं।",
    uc1Title: "ई-कॉमर्स मैट्रिक्स", uc1Desc: "Shopee, Lazada और Amazon सेलर प्रोफाइल को सुरक्षित रूप से प्रबंधित करें। वास्तविक मोबाइल IP क्रॉस-अकाउंट एसोसिएशन प्रतिबंधों को रोकते हैं।",
    uc2Title: "सोशल मीडिया फार्मिंग", uc2Desc: "TikTok, Facebook और Instagram अकाउंट को वार्म अप करें। 1 मॉडम = 1 अत्यधिक विश्वसनीय मोबाइल डिवाइस।",
    uc3Title: "स्नीकर और टिकटिंग बॉट", uc3Desc: "उच्च विश्वास स्कोर के साथ Datadome और Cloudflare वेटिंग रूम को बायपास करें।",
    uc4Title: "डेटा स्क्रैपिंग", uc4Desc: "लगातार डेटा निकालें। ब्लॉक होने पर, API के माध्यम से 3 सेकंड में भौतिक IP घुमाएं।",
    infTitle: "स्केल के लिए बनाया गया।", infDesc: "हम बॉटनेट नहीं बेचते। हम अपने डेटा सेंटर में Huawei और Quectel मॉडेम रैक, वायर और मेंटेन करते हैं।",
    inf1Title: "समर्पित भौतिक हार्डवेयर", inf1Desc: "आपके द्वारा किराए पर लिया गया प्रत्येक पोर्ट वास्तविक Maxis, Celcom या Digi SIM कार्ड वाले भौतिक USB मॉडेम से 1:1 मैप किया गया है।",
    inf1a: "शून्य VM ओवरलैप", inf1b: "वास्तविक कैरियर ASN",
    inf2Title: "असीमित ट्रैफ़िक", inf2Desc: "कोई प्रति GB बिलिंग नहीं। जितना स्थानीय 4G/5G सेल टावर अनुमति देता है, उतनी आक्रामकता से स्क्रैप करें।",
    inf3Title: "प्रोटोकॉल अज्ञेय", inf3Desc: "अनुकूलित 3x-ui रूटिंग द्वारा संचालित। देशी SOCKS5, HTTP(s) और UDP समर्थन।",
    devTitle: "API-संचालित रोटेशन।", devDesc: "जब आप ब्लॉक हिट करते हैं, तो हमारे REST API के माध्यम से हार्डवेयर-स्तरीय IP रोटेशन ट्रिगर करें। 3 सेकंड में ताज़ा कैरियर IP प्राप्त करें।",
    dev1Title: "इंस्टेंट फ़्लाइट-मोड टॉगल", dev1Desc: "सीधे मॉडेम के HiLink इंटरफ़ेस के साथ संचार करता है।",
    dev2Title: "सरल एकीकरण", dev2Desc: "रोटेशन ट्रिगर करने के लिए बस एक GET अनुरोध।", devOut: "आउटपुट",
    prTitle: "पारदर्शी मूल्य निर्धारण।", prDesc: "कोई छिपी हुई बैंडविड्थ फीस नहीं। बाजार औसत मूल्य $130/माह, हम कीमत आधी करते हैं।",
    pr1Name: "स्क्रैपर नोड", pr1Sub: "मैन्युअल या कम-आवृत्ति डेटा निष्कर्षण के लिए।", prPortMo: "पोर्ट/माह",
    prModem: "1 समर्पित भौतिक मॉडेम", prUnlim: "असीमित बैंडविड्थ", prProto: "HTTP / SOCKS5 प्रोटोकॉल", prManual: "केवल मैन्युअल IP रोटेशन", prDeploy: "नोड तैनात करें",
    prApiEn: "API सक्षम", pr2Name: "ऑटोमेशन प्रो", pr2Sub: "गतिशील स्क्रैपिंग और खाता प्रबंधन के लिए।",
    prApiRot: "REST API ऑटो-रोटेशन", prConc: "उच्च concurrency की अनुमति", pr2Deploy: "API नोड तैनात करें",
    prEnt1: "10+ मॉडेम या विशिष्ट कैरियर लक्ष्यीकरण चाहिए?", prEnt2: "एंटरप्राइज़ फार्म निर्माण के लिए संपर्क करें",
    ftDesc: "शाह आलम, मलेशिया में तैनात हार्डवेयर-समर्थित मोबाइल प्रॉक्सी बुनियादी ढांचा। अप्रतिबंधित API पहुंच। शून्य बैंडविड्थ कैप।",
    ftPlat: "प्लेटफ़ॉर्म", ftLegal: "कानूनी और संपर्क", ftTOS: "सेवा की शर्तें", ftPriv: "गोपनीयता नीति",
    ftCopy: "© 2026 IPMOBI.NET. डेटा सेंटर: शाह आलम, सेलांगोर, मलेशिया।"
  },
  ar: {
    navTrial: "تجربة مجانية",
    navUseCases: "حالات الاستخدام", navInfra: "البنية التحتية", navAPI: "API", navPricing: "التسعير",
    clientPortal: "بوابة العميل", orderPort: "طلب منفذ", backHome: "العودة للرئيسية",
    heroBadge: "مركز بيانات شاه علم • بدون تداخل مشترك", heroTitle1: "IP جوال خام", heroTitle2: "البنية التحتية.",
    heroDesc: "تجاوز أكثر أنظمة مكافحة البوتات تشدداً باستخدام مودمات 4G/5G مادية مخصصة في ماليزيا. توقف عن الدفع لكل جيجابايت. استأجر الأجهزة، وامتلك النطاق الترددي.",
    deployBtn: "نشر عقدة الأجهزة", apiBtn: "قراءة وثائق API",
    stat1: "منافذ مخصصة", stat2: "النطاق الترددي", stat3: "ASN أصلي", stat4: "تدوير API",
    ucTitle: "مصممة للعمليات عالية الثقة.", ucDesc: "حل أكبر عنق زجاجة في سير العمل الآلي باستخدام IP شركة الاتصالات الأصلي.",
    uc1Title: "مصفوفة التجارة الإلكترونية", uc1Desc: "إدارة ملفات بائعي Shopee وLazada وAmazon بأمان. تمنع عناوين IP المحمولة الحقيقية حظر الحسابات المرتبطة.",
    uc2Title: "زراعة وسائل التواصل الاجتماعي", uc2Desc: "تدفئة حسابات TikTok وFacebook وInstagram. مودم واحد = جهاز محمول موثوق واحد. تجنب الحظر المخفي.",
    uc3Title: "بوتات الأحذية الرياضية والتذاكر", uc3Desc: "تجاوز غرف انتظار Datadome وCloudflare بدرجات ثقة عالية.",
    uc4Title: "استخراج البيانات", uc4Desc: "استخراج البيانات باستمرار. عند الحظر، قم بتدوير IP الفعلي عبر API في 3 ثوانٍ.",
    infTitle: "مبنية للتوسع.", infDesc: "نحن لا نبيع شبكات البوت. نقوم بتركيب وصيانة مودمات Huawei وQuectel في مركز البيانات الخاص بنا.",
    inf1Title: "أجهزة مادية مخصصة", inf1Desc: "كل منفذ تستأجره مرتبط 1:1 بمودم USB فعلي به شريحة SIM حقيقية من Maxis أو Celcom أو Digi. عزل مطلق.",
    inf1a: "بدون تداخل VM", inf1b: "ASN شركات اتصالات حقيقية",
    inf2Title: "حركة مرور غير محدودة", inf2Desc: "لا فوترة لكل جيجابايت. استخرج البيانات بقدر ما يسمح به برج 4G/5G المحلي.",
    inf3Title: "غير مرتبط بالبروتوكول", inf3Desc: "مدعوم بتوجيه 3x-ui المحسن. دعم أصلي لـ SOCKS5 وHTTP(s) وUDP.",
    devTitle: "تدوير عبر API.", devDesc: "عند الحظر، قم بتفعيل تدوير IP على مستوى الأجهزة عبر REST API. احصل على IP جديد لشركة الاتصالات في أقل من 3 ثوانٍ.",
    dev1Title: "تبديل وضع الطيران الفوري", dev1Desc: "يتواصل مباشرة مع واجهة HiLink للمودم.",
    dev2Title: "تكامل بسيط", dev2Desc: "طلب GET واحد يكفي لتفعيل التدوير.", devOut: "المخرجات",
    prTitle: "تسعير شفاف.", prDesc: "لا رسوم نطاق ترددي مخفية. متوسط السوق 130 دولاراً شهرياً، نخفض السعر للنصف.",
    pr1Name: "عقدة الاستخراج", pr1Sub: "للاستخراج اليدوي أو منخفض التردد.", prPortMo: "منفذ/شهر",
    prModem: "مودم مادي مخصص واحد", prUnlim: "نطاق ترددي غير محدود", prProto: "بروتوكول HTTP/SOCKS5", prManual: "تدوير IP يدوي فقط", prDeploy: "نشر العقدة",
    prApiEn: "API مفعل", pr2Name: "الأتمتة برو", pr2Sub: "للاستخراج الديناميكي وإدارة الحسابات.",
    prApiRot: "تدوير تلقائي عبر REST API", prConc: "يسمح بالتزامن العالي", pr2Deploy: "نشر عقدة API",
    prEnt1: "تحتاج 10+ مودمات أو استهداف شركة اتصالات محددة؟", prEnt2: "اتصل بنا لبناء مزرعة مؤسسية",
    ftDesc: "بنية تحتية للبروكسي المحمول قائمة على الأجهزة في شاه علم، ماليزيا. وصول غير مقيد لـ API. بدون حدود للنطاق الترددي.",
    ftPlat: "المنصة", ftLegal: "القانوني والاتصال", ftTOS: "شروط الخدمة", ftPriv: "سياسة الخصوصية",
    ftCopy: "© 2026 IPMOBI.NET. مركز البيانات: شاه علم، سيلانغور، ماليزيا."
  },

  pt: {
    navTrial: "Teste Grátis",
    navUseCases: "Casos de Uso", navInfra: "Infraestrutura", navAPI: "API", navPricing: "Preços",
    clientPortal: "Portal do Cliente", orderPort: "Pedir Porta", backHome: "Voltar",
    heroBadge: "Data Center Shah Alam • Sobreposição Zero", heroTitle1: "IP Móvel Bruto", heroTitle2: "Infraestrutura.",
    heroDesc: "Ignore os sistemas anti-bot mais rigorosos com modems 4G/5G físicos dedicados na Malásia. Pare de pagar por GB. Alugue o hardware, seja dono da banda.",
    deployBtn: "Implantar Nó", apiBtn: "Ler Documentação API",
    stat1: "Portas Dedicadas", stat2: "Largura de Banda", stat3: "ASNs Nativos", stat4: "Rotação API",
    ucTitle: "Projetado para Operações de Alta Confiança.", ucDesc: "IPs de operadora reais resolvem o maior gargalo em fluxos de trabalho automatizados.",
    uc1Title: "Matriz de E-commerce", uc1Desc: "Gerencie perfis de vendedor Shopee, Lazada e Amazon com segurança. IPs móveis reais evitam banimentos por associação.",
    uc2Title: "Farming em Redes Sociais", uc2Desc: "Aqueça contas TikTok, Facebook e Instagram. 1 modem = 1 dispositivo móvel altamente confiável.",
    uc3Title: "Bots de Sneakers & Ingressos", uc3Desc: "Ignore filas Datadome e Cloudflare com altos scores de confiança.",
    uc4Title: "Coleta de Dados", uc4Desc: "Extraia dados continuamente. Quando bloqueado, rotacione o IP físico em 3 segundos via API.",
    infTitle: "Construído para Escalar.", infDesc: "Não revendemos botnets. Nós mesmos montamos e mantemos modems Huawei e Quectel em nosso data center.",
    inf1Title: "Hardware Físico Dedicado", inf1Desc: "Cada porta que você aluga é mapeada 1:1 para um modem USB físico com chip Maxis, Celcom ou Digi real. Isolamento absoluto.",
    inf1a: "Zero Sobreposição VM", inf1b: "ASNs de Operadora Reais",
    inf2Title: "Tráfego Ilimitado", inf2Desc: "Sem cobrança por GB. Colete dados tão agressivamente quanto a torre 4G/5G local permitir.",
    inf3Title: "Agnóstico de Protocolo", inf3Desc: "Alimentado por roteamento 3x-ui otimizado. Suporte nativo a SOCKS5, HTTP(s) e UDP.",
    devTitle: "Rotação via API.", devDesc: "Quando bloquear, acione a rotação de IP a nível de hardware via REST API. Obtenha um novo IP de operadora em 3 segundos.",
    dev1Title: "Alternância Instantânea Modo Avião", dev1Desc: "Comunica-se diretamente com a interface HiLink do modem.",
    dev2Title: "Integração Simples", dev2Desc: "Apenas uma requisição GET para acionar a rotação.", devOut: "Saída",
    prTitle: "Preços Transparentes.", prDesc: "Sem taxas de banda ocultas. Preço médio de mercado $130/mês, cortamos pela metade.",
    pr1Name: "Nó Coletor", pr1Sub: "Para extração manual ou de baixa frequência.", prPortMo: "porta/mês",
    prModem: "1 Modem Físico Dedicado", prUnlim: "Largura de Banda Ilimitada", prProto: "Protocolo HTTP/SOCKS5", prManual: "Rotação Manual Apenas", prDeploy: "Implantar Nó",
    prApiEn: "API Ativada", pr2Name: "Automação Pro", pr2Sub: "Para coleta dinâmica e gestão de contas.",
    prApiRot: "Rotação Automática REST API", prConc: "Alta Concorrência Permitida", pr2Deploy: "Implantar Nó API",
    prEnt1: "Precisa de 10+ modems?", prEnt2: "Contate-nos para Farm Enterprise",
    ftDesc: "Infraestrutura de proxy móvel baseada em hardware em Shah Alam, Malásia. Acesso API irrestrito. Sem limites de banda.",
    ftPlat: "Plataforma", ftLegal: "Legal & Contato", ftTOS: "Termos de Serviço", ftPriv: "Política de Privacidade",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malásia."
  },
  es: {
    navTrial: "Prueba Gratis",
    navUseCases: "Casos de Uso", navInfra: "Infraestructura", navAPI: "API", navPricing: "Precios",
    clientPortal: "Portal del Cliente", orderPort: "Solicitar Puerto", backHome: "Volver",
    heroBadge: "Centro de Datos Shah Alam • Superposición Cero", heroTitle1: "IP Móvil Puro", heroTitle2: "Infraestructura.",
    heroDesc: "Supere los sistemas antibot más estrictos con módems 4G/5G físicos dedicados en Malasia. Deje de pagar por GB. Alquile el hardware, sea dueño del ancho de banda.",
    deployBtn: "Implementar Nodo", apiBtn: "Leer Documentación API",
    stat1: "Puertos Dedicados", stat2: "Ancho de Banda", stat3: "ASN Nativos", stat4: "Rotación API",
    ucTitle: "Diseñado para Operaciones de Alta Confianza.", ucDesc: "Las IPs de operador reales resuelven el mayor cuello de botella en flujos de trabajo automatizados.",
    uc1Title: "Matriz de Comercio Electrónico", uc1Desc: "Gestione perfiles de vendedor de Shopee, Lazada y Amazon de forma segura. Las IPs móviles reales evitan prohibiciones por asociación.",
    uc2Title: "Farming en Redes Sociales", uc2Desc: "Prepare cuentas de TikTok, Facebook e Instagram. 1 módem = 1 dispositivo móvil altamente confiable.",
    uc3Title: "Bots de Sneakers & Entradas", uc3Desc: "Evite salas de espera de Datadome y Cloudflare con altas puntuaciones de confianza.",
    uc4Title: "Extracción de Datos", uc4Desc: "Extraiga datos continuamente. Cuando sea bloqueado, rote la IP física en 3 segundos vía API.",
    infTitle: "Construido para Escalar.", infDesc: "No revendemos botnets. Nosotros mismos montamos y mantenemos módems Huawei y Quectel en nuestro centro de datos.",
    inf1Title: "Hardware Físico Dedicado", inf1Desc: "Cada puerto que alquila se asigna 1:1 a un módem USB físico con una SIM real de Maxis, Celcom o Digi. Aislamiento absoluto.",
    inf1a: "Superposición VM Cero", inf1b: "ASNs de Operador Reales",
    inf2Title: "Tráfico Ilimitado", inf2Desc: "Sin facturación por GB. Extraiga datos tan agresivamente como lo permita la torre 4G/5G local.",
    inf3Title: "Agnóstico de Protocolo", inf3Desc: "Impulsado por enrutamiento 3x-ui optimizado. Soporte nativo de SOCKS5, HTTP(s) y UDP.",
    devTitle: "Rotación impulsada por API.", devDesc: "Cuando reciba un bloqueo, active la rotación de IP a nivel de hardware a través de nuestra REST API. Obtenga una IP de operador nueva en 3 segundos.",
    dev1Title: "Alternancia Instantánea Modo Avión", dev1Desc: "Se comunica directamente con la interfaz HiLink del módem.",
    dev2Title: "Integración Simple", dev2Desc: "Una sola solicitud GET es suficiente para activar la rotación.", devOut: "Salida",
    prTitle: "Precios Transparentes.", prDesc: "Sin cargos ocultos de ancho de banda. Precio promedio de mercado $130/mes, reducimos el precio a la mitad.",
    pr1Name: "Nodo Scraper", pr1Sub: "Para extracción manual o de baja frecuencia.", prPortMo: "puerto/mes",
    prModem: "1 Módem Físico Dedicado", prUnlim: "Ancho de Banda Ilimitado", prProto: "Protocolo HTTP/SOCKS5", prManual: "Solo Rotación Manual", prDeploy: "Implementar Nodo",
    prApiEn: "API Activada", pr2Name: "Automatización Pro", pr2Sub: "Para extracción dinámica y gestión de cuentas.",
    prApiRot: "Rotación Automática REST API", prConc: "Alta Concurrencia Permitida", pr2Deploy: "Implementar Nodo API",
    prEnt1: "¿Necesita 10+ módems?", prEnt2: "Contáctenos para Granja Enterprise",
    ftDesc: "Infraestructura de proxy móvil basada en hardware en Shah Alam, Malasia. Acceso API sin restricciones. Sin límites de ancho de banda.",
    ftPlat: "Plataforma", ftLegal: "Legal y Contacto", ftTOS: "Términos del Servicio", ftPriv: "Política de Privacidad",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malasia."
  },
  de: {
    navTrial: "Kostenlose Testversion",
    navUseCases: "Anwendungsfälle", navInfra: "Infrastruktur", navAPI: "API", navPricing: "Preise",
    clientPortal: "Kundenportal", orderPort: "Port bestellen", backHome: "Zurück",
    heroBadge: "Shah Alam Rechenzentrum • Keine gemeinsame Überlappung", heroTitle1: "Rohe Mobile IP", heroTitle2: "Infrastruktur.",
    heroDesc: "Umgehen Sie selbst die strengsten Anti-Bot-Systeme mit dedizierten physischen 4G/5G-Modems in Malaysia. Hören Sie auf, pro GB zu zahlen. Mieten Sie die Hardware, besitzen Sie die Bandbreite.",
    deployBtn: "Hardware-Knoten bereitstellen", apiBtn: "API-Dokumentation lesen",
    stat1: "Dedizierte Ports", stat2: "Bandbreite", stat3: "Native ASNs", stat4: "API-Rotation",
    ucTitle: "Entwickelt für hochvertrauenswürdige Operationen.", ucDesc: "Echte Carrier-IPs lösen den größten Engpass in automatisierten Workflows.",
    uc1Title: "E-Commerce Matrix", uc1Desc: "Verwalten Sie Shopee-, Lazada- und Amazon-Verkäuferprofile sicher. Echte mobile IPs verhindern Cross-Account-Sperren.",
    uc2Title: "Social Media Farming", uc2Desc: "Wärmen Sie TikTok-, Facebook- und Instagram-Konten auf. 1 Modem = 1 hochvertrauenswürdiges mobiles Gerät.",
    uc3Title: "Sneaker- & Ticket-Bots", uc3Desc: "Umgehen Sie Datadome- und Cloudflare-Warteschlangen mit hohen Vertrauenswerten.",
    uc4Title: "Datenextraktion", uc4Desc: "Extrahieren Sie Daten kontinuierlich. Bei Blockierung rotieren Sie die physische IP in 3 Sekunden über die API.",
    infTitle: "Gebaut für Skalierung.", infDesc: "Wir verkaufen keine Botnets. Wir installieren und warten Huawei- und Quectel-Modems in unserem eigenen Rechenzentrum.",
    inf1Title: "Dedizierte physische Hardware", inf1Desc: "Jeder von Ihnen gemietete Port ist 1:1 einem physischen USB-Modem mit echter Maxis-, Celcom- oder Digi-SIM zugeordnet. Absolute Isolation.",
    inf1a: "Keine VM-Überlappung", inf1b: "Echte Carrier-ASNs",
    inf2Title: "Unbegrenzter Traffic", inf2Desc: "Keine Abrechnung pro GB. Extrahieren Sie so aggressiv, wie es der lokale 4G/5G-Masten erlaubt.",
    inf3Title: "Protokollunabhängig", inf3Desc: "Angetrieben von optimiertem 3x-ui-Routing. Native SOCKS5-, HTTP(s)- und UDP-Unterstützung.",
    devTitle: "API-gesteuerte Rotation.", devDesc: "Bei einer Blockierung lösen Sie eine hardwaregesteuerte IP-Rotation über unsere REST API aus. Erhalten Sie in 3 Sekunden eine frische Carrier-IP.",
    dev1Title: "Sofortiger Flugmodus-Umschalter", dev1Desc: "Kommuniziert direkt mit dem HiLink-Interface des Modems.",
    dev2Title: "Einfache Integration", dev2Desc: "Eine einzige GET-Anfrage genügt, um die Rotation auszulösen.", devOut: "Ausgabe",
    prTitle: "Transparente Preise.", prDesc: "Keine versteckten Bandbreitengebühren. Marktdurchschnittspreis $130/Monat, wir halbieren den Preis.",
    pr1Name: "Scraper-Knoten", pr1Sub: "Für manuelle oder niederfrequente Datenextraktion.", prPortMo: "Port/Monat",
    prModem: "1 Dediziertes physisches Modem", prUnlim: "Unbegrenzte Bandbreite", prProto: "HTTP/SOCKS5-Protokoll", prManual: "Nur manuelle IP-Rotation", prDeploy: "Knoten bereitstellen",
    prApiEn: "API aktiviert", pr2Name: "Automatisierung Pro", pr2Sub: "Für dynamische Extraktion und Kontoverwaltung.",
    prApiRot: "REST API Auto-Rotation", prConc: "Hohe Parallelität erlaubt", pr2Deploy: "API-Knoten bereitstellen",
    prEnt1: "Brauchen Sie 10+ Modems?", prEnt2: "Kontaktieren Sie uns für Enterprise-Farm",
    ftDesc: "Hardwaregestützte mobile Proxy-Infrastruktur in Shah Alam, Malaysia. Uneingeschränkter API-Zugriff. Keine Bandbreitenobergrenzen.",
    ftPlat: "Plattform", ftLegal: "Rechtliches & Kontakt", ftTOS: "Nutzungsbedingungen", ftPriv: "Datenschutzerklärung",
    ftCopy: "© 2026 IPMOBI.NET. DC: Shah Alam, Selangor, Malaysia."
  },
  fr: {
    navTrial: "Essai Gratuit",
    navUseCases: "Cas d'Usage", navInfra: "Infrastructure", navAPI: "API", navPricing: "Tarifs",
    clientPortal: "Portail Client", orderPort: "Commander un Port", backHome: "Retour",
    heroBadge: "Centre de Données Shah Alam • Zéro Chevauchement", heroTitle1: "IP Mobile Brute", heroTitle2: "Infrastructure.",
    heroDesc: "Contournez les systèmes antibot les plus stricts avec des modems 4G/5G physiques dédiés en Malaisie. Arrêtez de payer par Go. Louez le matériel, possédez la bande passante.",
    deployBtn: "Déployer le Nœud", apiBtn: "Lire la Documentation API",
    stat1: "Ports Dédiés", stat2: "Bande Passante", stat3: "ASN Natifs", stat4: "Rotation API",
    ucTitle: "Conçu pour les Opérations de Haute Confiance.", ucDesc: "Les IP opérateur réelles résolvent le plus grand goulot d'étranglement dans les flux de travail automatisés.",
    uc1Title: "Matrice E-Commerce", uc1Desc: "Gérez en toute sécurité les profils vendeurs Shopee, Lazada et Amazon. Les IP mobiles réelles empêchent les interdictions de comptes croisés.",
    uc2Title: "Farming sur les Réseaux Sociaux", uc2Desc: "Préparez les comptes TikTok, Facebook et Instagram. 1 modem = 1 appareil mobile hautement fiable.",
    uc3Title: "Bots Sneakers & Billets", uc3Desc: "Contournez les salles d'attente Datadome et Cloudflare avec des scores de confiance élevés.",
    uc4Title: "Extraction de Données", uc4Desc: "Extrayez des données en continu. Lorsque bloqué, faites pivoter l'IP physique en 3 secondes via l'API.",
    infTitle: "Conçu pour Passer à l'Échelle.", infDesc: "Nous ne revendons pas de botnets. Nous montons et maintenons nous-mêmes les modems Huawei et Quectel dans notre centre de données.",
    inf1Title: "Matériel Physique Dédié", inf1Desc: "Chaque port que vous louez est mappé 1:1 à un modem USB physique avec une vraie carte SIM Maxis, Celcom ou Digi. Isolation absolue.",
    inf1a: "Zéro Chevauchement VM", inf1b: "Vrais ASN Opérateur",
    inf2Title: "Trafic Illimité", inf2Desc: "Pas de facturation au Go. Extrayez des données aussi agressivement que la tour 4G/5G locale le permet.",
    inf3Title: "Indépendant du Protocole", inf3Desc: "Alimenté par le routage 3x-ui optimisé. Support natif SOCKS5, HTTP(s) et UDP.",
    devTitle: "Rotation Pilotée par API.", devDesc: "En cas de blocage, déclenchez une rotation IP au niveau matériel via notre API REST. Obtenez une nouvelle IP opérateur en 3 secondes.",
    dev1Title: "Basculement Instantané Mode Avion", dev1Desc: "Communique directement avec l'interface HiLink du modem.",
    dev2Title: "Intégration Simple", dev2Desc: "Une seule requête GET suffit pour déclencher la rotation.", devOut: "Sortie",
    prTitle: "Tarification Transparente.", prDesc: "Pas de frais de bande passante cachés. Prix moyen du marché $130/mois, nous réduisons le prix de moitié.",
    pr1Name: "Nœud Scraper", pr1Sub: "Pour l'extraction manuelle ou à basse fréquence.", prPortMo: "port/mois",
    prModem: "1 Modem Physique Dédié", prUnlim: "Bande Passante Illimitée", prProto: "Protocole HTTP/SOCKS5", prManual: "Rotation Manuelle Uniquement", prDeploy: "Déployer le Nœud",
    prApiEn: "API Activée", pr2Name: "Automatisation Pro", pr2Sub: "Pour l'extraction dynamique et la gestion de comptes.",
    prApiRot: "Rotation Automatique REST API", prConc: "Haute Concurrence Autorisée", pr2Deploy: "Déployer le Nœud API",
    prEnt1: "Besoin de 10+ modems ?", prEnt2: "Contactez-nous pour une Ferme Enterprise",
    ftDesc: "Infrastructure de proxy mobile basée sur du matériel à Shah Alam, Malaisie. Accès API sans restriction. Aucune limite de bande passante.",
    ftPlat: "Plateforme", ftLegal: "Juridique & Contact", ftTOS: "Conditions d'Utilisation", ftPriv: "Politique de Confidentialité",
    ftCopy: "© 2026 IPMOBI.NET. DC : Shah Alam, Selangor, Malaisie."
  },
  vi: {
    navTrial: "Dùng thử miễn phí",
    navUseCases: "Trường hợp sử dụng", navInfra: "Hạ tầng", navAPI: "API", navPricing: "Bảng giá",
    clientPortal: "Cổng khách hàng", orderPort: "Đặt cổng", backHome: "Về trang chủ",
    heroBadge: "Trung tâm dữ liệu Shah Alam • Không trùng lặp", heroTitle1: "IP Di động Thô", heroTitle2: "Hạ tầng.",
    heroDesc: "Vượt qua các hệ thống chống bot khắt khe nhất với modem 4G/5G vật lý chuyên dụng tại Malaysia. Ngừng trả tiền theo GB. Thuê phần cứng, sở hữu băng thông.",
    deployBtn: "Triển khai nút", apiBtn: "Đọc tài liệu API",
    stat1: "Cổng chuyên dụng", stat2: "Băng thông", stat3: "ASN gốc", stat4: "Xoay API",
    ucTitle: "Được thiết kế cho vận hành độ tin cậy cao.", ucDesc: "IP nhà mạng gốc giải quyết nút thắt lớn nhất trong quy trình tự động hóa.",
    uc1Title: "Ma trận thương mại điện tử", uc1Desc: "Quản lý an toàn hồ sơ người bán Shopee, Lazada và Amazon. IP di động thật ngăn chặn lệnh cấm liên kết tài khoản chéo.",
    uc2Title: "Nuôi tài khoản mạng xã hội", uc2Desc: "Nuôi tài khoản TikTok, Facebook và Instagram. 1 modem = 1 thiết bị di động đáng tin cậy. Tránh shadowban.",
    uc3Title: "Bot giày thể thao & vé", uc3Desc: "Vượt qua Datadome và Cloudflare với điểm tin cậy cao.",
    uc4Title: "Thu thập dữ liệu", uc4Desc: "Thu thập dữ liệu liên tục. Khi bị chặn, xoay IP vật lý qua API chỉ trong 3 giây.",
    infTitle: "Xây dựng cho mở rộng.", infDesc: "Chúng tôi không bán lại botnet. Chúng tôi tự lắp đặt modem Huawei và Quectel tại trung tâm dữ liệu độc quyền.",
    inf1Title: "Phần cứng vật lý chuyên dụng", inf1Desc: "Mỗi cổng bạn thuê được ánh xạ 1:1 tới modem USB vật lý với SIM Maxis, Celcom hoặc Digi thật. Cách ly tuyệt đối.",
    inf1a: "Không trùng lặp VM", inf1b: "ASN nhà mạng thật",
    inf2Title: "Băng thông không giới hạn", inf2Desc: "Không tính phí theo GB. Thu thập dữ liệu mạnh mẽ như tháp di động 4G/5G cho phép.",
    inf3Title: "Độc lập giao thức", inf3Desc: "Được hỗ trợ bởi định tuyến 3x-ui. Hỗ trợ SOCKS5, HTTP(s) và UDP gốc.",
    devTitle: "Xoay IP qua API.", devDesc: "Khi bị chặn, kích hoạt xoay IP cấp phần cứng qua REST API. Lấy IP nhà mạng mới trong 3 giây.",
    dev1Title: "Chuyển đổi chế độ máy bay tức thì", dev1Desc: "Giao tiếp trực tiếp với giao diện HiLink của modem.",
    dev2Title: "Tích hợp đơn giản", dev2Desc: "Chỉ cần một yêu cầu GET để xoay IP.", devOut: "Đầu ra",
    prTitle: "Giá cả minh bạch.", prDesc: "Không phí băng thông ẩn. Giá thị trường trung bình $130/tháng, chúng tôi cắt giảm một nửa.",
    pr1Name: "Nút thu thập", pr1Sub: "Dành cho trích xuất dữ liệu thủ công hoặc tần suất thấp.", prPortMo: "cổng/tháng",
    prModem: "1 Modem vật lý chuyên dụng", prUnlim: "Băng thông không giới hạn", prProto: "Giao thức HTTP/SOCKS5", prManual: "Chỉ xoay IP thủ công", prDeploy: "Triển khai nút",
    prApiEn: "Đã kích hoạt API", pr2Name: "Tự động hóa Pro", pr2Sub: "Dành cho thu thập động & quản lý tài khoản.",
    prApiRot: "Tự động xoay REST API", prConc: "Cho phép đồng thời cao", pr2Deploy: "Triển khai nút API",
    prEnt1: "Cần 10+ modem hoặc nhắm mục tiêu nhà mạng cụ thể?", prEnt2: "Liên hệ xây dựng trang trại Doanh nghiệp",
    ftDesc: "Hạ tầng proxy di động dựa trên phần cứng tại Shah Alam, Malaysia. Truy cập API không giới hạn. Không giới hạn băng thông.",
    ftPlat: "Nền tảng", ftLegal: "Pháp lý & Liên hệ", ftTOS: "Điều khoản dịch vụ", ftPriv: "Chính sách bảo mật",
    ftCopy: "© 2026 IPMOBI.NET. Trung tâm dữ liệu: Shah Alam, Selangor, Malaysia."
  }
};

export function t(key: LangKey, locale: Locale = "en"): string {
  const translations = dict[locale];
  return translations?.[key] || dict["en"][key] || key;
}
