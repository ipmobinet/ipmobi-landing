"use client";

import React from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const t = (key: string): string => {
  const dict: Record<string, Record<string, string>> = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: April 28, 2026",
      intro: "IPMobi.net (operated by GreenTech Network) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.",
      section1Title: "1. Information We Collect",
      section1Text: "We collect information you provide during registration (name, email, billing info). We also collect usage data including connection timestamps, bandwidth usage, and IP addresses assigned to your ports. We do not monitor or log the content of traffic passing through our proxies.",
      section2Title: "2. How We Use Your Information",
      section2Text: "We use your information to: (a) provide and maintain our proxy services; (b) process payments; (c) send service-related communications; (d) detect and prevent abuse; (e) comply with legal obligations.",
      section3Title: "3. Data Retention",
      section3Text: "Account information is retained for the duration of your subscription plus 90 days after termination. Usage logs are retained for 30 days for billing and abuse prevention purposes. Traffic content is never logged or stored.",
      section4Title: "4. Data Sharing",
      section4Text: "We do not sell your personal information. We may share data with: payment processors (for billing), legal authorities (when required by law), and our data center operators in Shah Alam, Malaysia.",
      section5Title: "5. Cookies",
      section5Text: "We use essential cookies for authentication and session management. We do not use tracking cookies or third-party analytics. Our language preference is stored in localStorage, not cookies.",
      section6Title: "6. Security",
      section6Text: "We implement industry-standard security measures including encryption in transit (TLS), secure authentication, and access controls. Our infrastructure is physically secured in our Shah Alam data center.",
      section7Title: "7. Your Rights",
      section7Text: "You have the right to: access your personal data, request correction or deletion, withdraw consent for processing, and request data portability. Contact us at support@ipmobi.net to exercise these rights.",
      section8Title: "8. International Transfers",
      section8Text: "Your data is stored and processed in Malaysia. By using our services, you consent to the transfer of your information to Malaysia, which may have different data protection laws than your jurisdiction.",
      contact: "For privacy-related inquiries, contact",
      backHome: "← Back to Home",
    },
    zh: {
      title: "隐私政策", lastUpdated: "最后更新：2026年4月28日",
      intro: "IPMobi.net（由GreenTech Network运营）致力于保护您的隐私。本政策说明了我们如何收集、使用和保护您的个人信息。",
      section1Title: "1. 我们收集的信息",
      section1Text: "我们收集您在注册时提供的信息（姓名、电子邮件、账单信息）。我们还收集使用数据，包括连接时间戳、带宽使用情况和分配给您的端口的IP地址。我们不监控或记录通过我们代理传输的流量内容。",
      section2Title: "2. 我们如何使用您的信息",
      section2Text: "我们将您的信息用于：(a) 提供和维护我们的代理服务；(b) 处理付款；(c) 发送与服务相关的通信；(d) 检测和防止滥用；(e) 履行法律义务。",
      section3Title: "3. 数据保留",
      section3Text: "账户信息在您的订阅期内保留，终止后保留90天。使用日志保留30天用于计费和防滥用目的。流量内容从不记录或存储。",
      section4Title: "4. 数据共享",
      section4Text: "我们不出售您的个人信息。我们可能与以下方面共享数据：支付处理商（用于计费）、法律机构（法律要求时）以及我们在马来西亚莎阿南的数据中心运营商。",
      section5Title: "5. Cookie",
      section5Text: "我们使用必要的Cookie进行身份验证和会话管理。我们不使用跟踪Cookie或第三方分析。我们的语言偏好存储在localStorage中，而非Cookie。",
      section6Title: "6. 安全",
      section6Text: "我们实施行业标准安全措施，包括传输加密（TLS）、安全认证和访问控制。我们的基础设施在莎阿南数据中心进行物理保护。",
      section7Title: "7. 您的权利",
      section7Text: "您有权：访问您的个人数据、请求更正或删除、撤回处理同意以及请求数据可移植性。请通过support@ipmobi.net联系我们行使这些权利。",
      section8Title: "8. 国际传输",
      section8Text: "您的数据在马来西亚存储和处理。使用我们的服务即表示您同意将您的信息传输至马来西亚，该国的数据保护法律可能与您所在司法管辖区有所不同。",
      contact: "有关隐私的查询，请联系",
      backHome: "← 返回首页",
    },
    ru: {
      title: "Политика конфиденциальности", lastUpdated: "Последнее обновление: 28 апреля 2026 г.",
      intro: "IPMobi.net (управляется GreenTech Network) стремится защищать вашу конфиденциальность. Эта политика объясняет, как мы собираем, используем и защищаем вашу личную информацию.",
      section1Title: "1. Информация, которую мы собираем",
      section1Text: "Мы собираем информацию, предоставленную вами при регистрации (имя, email, платежные данные). Также собираем данные об использовании: метки времени подключения, использование пропускной способности и IP-адреса. Мы не отслеживаем и не регистрируем содержимое трафика через наши прокси.",
      section2Title: "2. Как мы используем вашу информацию",
      section2Text: "Мы используем вашу информацию для: (a) предоставления и поддержки наших прокси-услуг; (b) обработки платежей; (c) отправки сообщений, связанных с услугами; (d) обнаружения и предотвращения злоупотреблений; (e) соблюдения юридических обязательств.",
      section3Title: "3. Хранение данных",
      section3Text: "Информация об учетной записи хранится в течение срока подписки плюс 90 дней после расторжения. Журналы использования хранятся 30 дней для целей биллинга и предотвращения злоупотреблений. Содержимое трафика никогда не регистрируется.",
      section4Title: "4. Передача данных",
      section4Text: "Мы не продаем вашу личную информацию. Мы можем передавать данные: платежным процессорам (для биллинга), правоохранительным органам (когда требуется по закону) и операторам наших дата-центров.",
      section5Title: "5. Файлы cookie",
      section5Text: "Мы используем обязательные cookie для аутентификации и управления сессиями. Мы не используем отслеживающие cookie или стороннюю аналитику. Языковые предпочтения хранятся в localStorage.",
      section6Title: "6. Безопасность",
      section6Text: "Мы применяем отраслевые стандарты безопасности: шифрование при передаче (TLS), безопасную аутентификацию и контроль доступа. Наша инфраструктура физически защищена в дата-центре Шах-Алам.",
      section7Title: "7. Ваши права",
      section7Text: "Вы имеете право на: доступ к вашим данным, запрос на исправление или удаление, отзыв согласия на обработку и запрос на переносимость данных. Для реализации этих прав свяжитесь с нами по адресу support@ipmobi.net.",
      section8Title: "8. Международная передача",
      section8Text: "Ваши данные хранятся и обрабатываются в Малайзии. Используя наши услуги, вы соглашаетесь на передачу вашей информации в Малайзию, где законы о защите данных могут отличаться от вашей юрисдикции.",
      contact: "По вопросам конфиденциальности обращайтесь",
      backHome: "← На главную",
    },
  };
  return dict.en[key] || key;
};

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}

function PrivacyContent() {
  const { lang, setLang } = useLanguage();

  const sections = [
    { num: "1", titleKey: "section1Title", textKey: "section1Text" },
    { num: "2", titleKey: "section2Title", textKey: "section2Text" },
    { num: "3", titleKey: "section3Title", textKey: "section3Text" },
    { num: "4", titleKey: "section4Title", textKey: "section4Text" },
    { num: "5", titleKey: "section5Title", textKey: "section5Text" },
    { num: "6", titleKey: "section6Title", textKey: "section6Text" },
    { num: "7", titleKey: "section7Title", textKey: "section7Text" },
    { num: "8", titleKey: "section8Title", textKey: "section8Text" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
          {t("backHome")}
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">{t("title")}</h1>
        <p className="text-slate-500 text-sm mb-12">{t("lastUpdated")}</p>
        
        <p className="text-slate-300 mb-10 leading-relaxed">{t("intro")}</p>
        
        {sections.map((s) => (
          <section key={s.num} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">{t(s.titleKey)}</h2>
            <p className="text-slate-400 leading-relaxed">{t(s.textKey)}</p>
          </section>
        ))}
        
        <p className="text-slate-400 mt-12 pt-8 border-t border-white/10">
          {t("contact")}{" "}
          <a href="mailto:support@ipmobi.net" className="text-emerald-400 hover:text-emerald-300">
            support@ipmobi.net
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
