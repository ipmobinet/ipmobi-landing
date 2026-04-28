"use client";

import React from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/providers/LanguageProvider";

const dict: Record<string, Record<string, string>> = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last Updated: April 28, 2026",
    intro: "These Terms of Service govern your use of the IPMobi.net platform, including all proxy services, APIs, and related infrastructure provided by GreenTech Network.",
    section1Title: "1. Service Description",
    section1Text: "IPMobi.net provides dedicated mobile proxy ports backed by physical 4G/5G modems located in Shah Alam, Selangor, Malaysia. Each port corresponds to a physical USB modem with a real carrier SIM card (Maxis, Celcom, or Digi). Services are provided on a subscription basis.",
    section2Title: "2. Acceptable Use",
    section2Text: "You agree not to use our services for: (a) any illegal activity under Malaysian or international law; (b) network intrusion or unauthorized access to systems; (c) sending spam, malware, or conducting denial-of-service attacks; (d) any activity that violates the terms of service of any third-party platform you access through our proxies.",
    section3Title: "3. Account Registration",
    section3Text: "You must provide accurate information when registering. Each account is for a single entity. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.",
    section4Title: "4. Payments & Billing",
    section4Text: "Subscription fees are billed monthly. Payments are processed through our payment gateway. Refunds are handled on a case-by-case basis within 14 days of purchase for unused services. Bandwidth is unlimited unless otherwise stated in your plan.",
    section5Title: "5. IP Rotation",
    section5Text: "Manual IP rotation is available on all plans. API-driven automatic rotation is available on Automation Pro and Enterprise plans. We reserve the right to rotate IPs for maintenance purposes with reasonable notice.",
    section6Title: "6. Limitation of Liability",
    section6Text: "IPMobi.net provides services 'as is' without warranty of any kind. We are not liable for any damages arising from use or inability to use our services, including blocked accounts on third-party platforms. Our maximum liability is limited to the amount paid for the service in the preceding month.",
    section7Title: "7. Termination",
    section7Text: "Either party may terminate the agreement with 30 days written notice. We reserve the right to immediately terminate accounts that violate these terms. Upon termination, your ports will be deactivated and any remaining data will be deleted.",
    section8Title: "8. Governing Law",
    section8Text: "These terms are governed by the laws of Malaysia. Any disputes shall be resolved in the courts of Selangor, Malaysia.",
    contact: "For questions, contact",
    backHome: "← Back to Home",
  },
  zh: {
    title: "服务条款", lastUpdated: "最后更新：2026年4月28日",
    intro: "本服务条款适用于您对IPMobi.net平台的使用，包括GreenTech Network提供的所有代理服务、API及相关基础设施。",
    section1Title: "1. 服务描述", section1Text: "IPMobi.net提供由位于马来西亚雪兰莪州莎阿南的物理4G/5G调制解调器支持的专用移动代理端口。每个端口对应一个带有真实运营商SIM卡的物理USB调制解调器。服务以订阅制提供。",
    section2Title: "2. 可接受使用", section2Text: "您同意不将我们的服务用于：(a) 非法活动；(b) 网络入侵或未经授权访问；(c) 发送垃圾邮件或恶意软件；(d) 违反第三方平台服务条款的活动。",
    section3Title: "3. 账户注册", section3Text: "注册时您必须提供准确信息。每个账户仅限单一实体使用。您有责任维护凭证的机密性。",
    section4Title: "4. 付款与计费", section4Text: "订阅费按月计费。退款在购买后14天内个案处理。带宽不限量。",
    section5Title: "5. IP轮换", section5Text: "所有套餐均提供手动IP轮换。自动化Pro和企业套餐提供API驱动的自动轮换。",
    section6Title: "6. 责任限制", section6Text: "IPMobi.net按'现状'提供服务，不作任何担保。最大赔偿责任限于前一个月支付的费用。",
    section7Title: "7. 终止", section7Text: "任何一方可在提前30天书面通知后终止协议。",
    section8Title: "8. 管辖法律", section8Text: "本条款受马来西亚法律管辖。",
    contact: "如有疑问，请联系", backHome: "← 返回首页",
  },
  ru: {
    title: "Условия предоставления услуг", lastUpdated: "Последнее обновление: 28 апреля 2026 г.",
    intro: "Настоящие Условия предоставления услуг регулируют использование вами платформы IPMobi.net.",
    section1Title: "1. Описание услуг", section1Text: "IPMobi.net предоставляет выделенные мобильные прокси-порты на базе физических модемов 4G/5G в Малайзии.",
    section2Title: "2. Допустимое использование", section2Text: "Вы соглашаетесь не использовать наши услуги для незаконной деятельности, сетевого вторжения, спама или DoS-атак.",
    section3Title: "3. Регистрация", section3Text: "Вы должны предоставить точную информацию при регистрации.",
    section4Title: "4. Платежи", section4Text: "Плата за подписку взимается ежемесячно. Возврат средств рассматривается индивидуально.",
    section5Title: "5. Ротация IP", section5Text: "Ручная ротация IP доступна во всех тарифах. Автоматическая ротация через API в тарифах Pro и Enterprise.",
    section6Title: "6. Ограничение ответственности", section6Text: "IPMobi.net предоставляет услуги 'как есть'. Максимальная ответственность ограничена суммой оплаты за предыдущий месяц.",
    section7Title: "7. Расторжение", section7Text: "Любая сторона может расторгнуть соглашение с уведомлением за 30 дней.",
    section8Title: "8. Применимое право", section8Text: "Настоящие условия регулируются законодательством Малайзии.",
    contact: "По вопросам обращайтесь", backHome: "← На главную",
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

export default function TermsPage() {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  );
}

function TermsContent() {
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
