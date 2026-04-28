"use client";

import React from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/providers/LanguageProvider";

const dict: Record<string, Record<string, string>> = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: April 28, 2026",
    intro: "IPMobi.net (operated by GreenTech Network) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.",
    section1Title: "1. Information We Collect",
    section1Text: "We collect information you provide during registration (name, email, billing info). We also collect usage data including connection timestamps and bandwidth usage. We do not monitor or log the content of traffic passing through our proxies.",
    section2Title: "2. How We Use Your Information",
    section2Text: "We use your information to: (a) provide and maintain our proxy services; (b) process payments; (c) send service-related communications; (d) detect and prevent abuse; (e) comply with legal obligations.",
    section3Title: "3. Data Retention",
    section3Text: "Account information is retained for the duration of your subscription plus 90 days after termination. Usage logs are retained for 30 days. Traffic content is never logged or stored.",
    section4Title: "4. Data Sharing",
    section4Text: "We do not sell your personal information. We may share data with: payment processors (for billing), legal authorities (when required by law), and our data center operators in Shah Alam, Malaysia.",
    section5Title: "5. Cookies",
    section5Text: "We use essential cookies for authentication and session management. We do not use tracking cookies or third-party analytics.",
    section6Title: "6. Security",
    section6Text: "We implement industry-standard security measures including encryption in transit (TLS), secure authentication, and access controls. Our infrastructure is physically secured in our Shah Alam data center.",
    section7Title: "7. Your Rights",
    section7Text: "You have the right to: access your personal data, request correction or deletion, withdraw consent, and request data portability. Contact us at support@ipmobi.net to exercise these rights.",
    section8Title: "8. International Transfers",
    section8Text: "Your data is stored and processed in Malaysia. By using our services, you consent to the transfer of your information to Malaysia.",
    contact: "For privacy-related inquiries, contact",
    backHome: "← Back to Home",
  },
  zh: {
    title: "隐私政策", lastUpdated: "最后更新：2026年4月28日",
    intro: "IPMobi.net致力于保护您的隐私。本政策说明了我们如何收集、使用和保护您的个人信息。",
    section1Title: "1. 我们收集的信息", section1Text: "我们收集您在注册时提供的信息以及使用数据。我们不监控通过我们代理传输的流量内容。",
    section2Title: "2. 我们如何使用您的信息", section2Text: "我们将您的信息用于提供和维护服务、处理付款、发送服务通信、检测滥用以及履行法律义务。",
    section3Title: "3. 数据保留", section3Text: "账户信息在订阅期内保留，终止后保留90天。使用日志保留30天。流量内容从不记录。",
    section4Title: "4. 数据共享", section4Text: "我们不出售您的个人信息。可能与支付处理商、法律机构以及我们在马来西亚的数据中心运营商共享数据。",
    section5Title: "5. Cookie", section5Text: "我们使用必要的Cookie进行身份验证和会话管理。不使用跟踪Cookie或第三方分析。",
    section6Title: "6. 安全", section6Text: "我们实施行业标准安全措施：传输加密（TLS）、安全认证和访问控制。",
    section7Title: "7. 您的权利", section7Text: "您有权访问、更正或删除您的个人数据。请通过support@ipmobi.net联系我们。",
    section8Title: "8. 国际传输", section8Text: "您的数据在马来西亚存储和处理。",
    contact: "有关隐私的查询，请联系", backHome: "← 返回首页",
  },
  ru: {
    title: "Политика конфиденциальности", lastUpdated: "Последнее обновление: 28 апреля 2026 г.",
    intro: "IPMobi.net (управляется GreenTech Network) стремится защищать вашу конфиденциальность.",
    section1Title: "1. Информация, которую мы собираем", section1Text: "Мы собираем информацию, предоставленную вами при регистрации, и данные об использовании. Мы не отслеживаем содержимое трафика.",
    section2Title: "2. Как мы используем вашу информацию", section2Text: "Для предоставления услуг, обработки платежей, отправки уведомлений, предотвращения злоупотреблений и соблюдения законов.",
    section3Title: "3. Хранение данных", section3Text: "Информация об аккаунте хранится в течение подписки плюс 90 дней. Журналы использования — 30 дней.",
    section4Title: "4. Передача данных", section4Text: "Мы не продаем вашу личную информацию. Возможна передача платежным процессорам и правоохранительным органам.",
    section5Title: "5. Cookie", section5Text: "Мы используем обязательные cookie для аутентификации. Не используем отслеживающие cookie.",
    section6Title: "6. Безопасность", section6Text: "Мы применяем шифрование TLS, безопасную аутентификацию и контроль доступа.",
    section7Title: "7. Ваши права", section7Text: "Вы имеете право на доступ, исправление или удаление ваших данных. Свяжитесь: support@ipmobi.net.",
    section8Title: "8. Международная передача", section8Text: "Ваши данные хранятся и обрабатываются в Малайзии.",
    contact: "По вопросам конфиденциальности обращайтесь", backHome: "← На главную",
  },
};

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

function T({ k }: { k: string }) {
  const { lang } = useLanguage();
  return <>{dict[lang]?.[k] || dict["en"]?.[k] || k}</>;
}

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}

function PrivacyContent() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      <main className="max-w-4xl mx-auto px-4 py-24">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
          <T k="backHome" />
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2"><T k="title" /></h1>
        <p className="text-slate-500 text-sm mb-12"><T k="lastUpdated" /></p>
        
        <p className="text-slate-300 mb-10 leading-relaxed"><T k="intro" /></p>
        
        {sections.map((s) => (
          <section key={s.num} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3"><T k={s.titleKey} /></h2>
            <p className="text-slate-400 leading-relaxed"><T k={s.textKey} /></p>
          </section>
        ))}
        
        <p className="text-slate-400 mt-12 pt-8 border-t border-white/10">
          <T k="contact" />{" "}
          <a href="mailto:support@ipmobi.net" className="text-emerald-400 hover:text-emerald-300">
            support@ipmobi.net
          </a>
        </p>
      </main>
    </div>
  );
}
