// aiChat.js - AI Garment & Textile Intelligence (Concise & Direct Answers)

class AiChatEngine {
  constructor() {
    this.messages = [
      {
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Salom! Men sizning <strong>AI Texnologingizman</strong> 🤖\n\nMato sarfi, lekalo o'lchamlari, tikuv sozlamalari yoki tannarx bo'yicha savolingizni bering!`
      }
    ];
  }

  getMessages() {
    return this.messages;
  }

  addUserMessage(text) {
    this.messages.push({
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    });
  }

  async generateResponse(query) {
    const q = query.toLowerCase();
    let responseText = '';

    // Quick thinking delay
    await new Promise(r => setTimeout(r, 400));

    if (q.includes('futer') || q.includes('tolstovka') || q.includes('hoodie') || q.includes('sarf')) {
      responseText = `
        <strong>🧵 Tolstovka (122 sm) sarf me'yori:</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>Futer 3-ipli (185 sm):</strong> 0.82 m / 485 g</li>
          <li><strong>Ribana 2x2:</strong> 80 g (manjet va etak)</li>
          <li><strong>Tikuv ipi:</strong> 77.3 m (4-ipli overlok)</li>
          <li><strong>Bichuv unumdorligi:</strong> 87.4% (12.6% chiqindi)</li>
        </ul>
        💡 <em>Maslahat: Futer bichishdan oldin 12 soat dam oldiriladi.</em>
      `;
    } else if (q.includes('razmer') || q.includes('o\'lcham') || q.includes('yeng') || q.includes('122') || q.includes('gost')) {
      responseText = `
        <strong>📐 122 sm (7-8 yosh) standart o'lchamlari:</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>Bo'yi:</strong> 48.0 sm (±0.5)</li>
          <li><strong>Ko'krak 1/2:</strong> 34.0 sm (aylana 68 sm)</li>
          <li><strong>Yeng uzunligi:</strong> 42.0 sm (manjet bilan)</li>
          <li><strong>Yelka:</strong> 10.0 sm</li>
        </ul>
        💡 <em>Gradatsiya qadami: razmerlararo bo'yi +2.5 sm, eni +2.0 sm.</em>
      `;
    } else if (q.includes('to\'lqin') || q.includes('defekt') || q.includes('muammo') || q.includes('cho\'zil')) {
      responseText = `
        <strong>⚠️ Trikotajda to'lqinlanishni yo'qotish:</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>Differensial:</strong> Reykani <strong>1.2 – 1.4</strong> ga qo'ying (matoni yig'ish).</li>
          <li><strong>Lapka:</strong> Bosimini biroz bo'shating.</li>
          <li><strong>Igna:</strong> <strong>Ball Point (SES №75/11)</strong> ishlating.</li>
          <li><strong>Silikon lenta:</strong> Yelka chokiga 0.5 sm elastik lenta qo'shing.</li>
        </ul>
      `;
    } else if (q.includes('tannarx') || q.includes('foyda') || q.includes('narx') || q.includes('marja') || q.includes('500')) {
      responseText = `
        <strong>💰 500 dona buyurtma hisob-kitobi (1 dona tolstovka):</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>Mato va furnitura:</strong> 26 930 so'm</li>
          <li><strong>Bichuv va tikuv ish haqi:</strong> 39 500 so'm</li>
          <li><strong>Qadoqlash va ustama:</strong> 7 790 so'm</li>
          <li><strong>1 dona tannarx:</strong> <strong style="color:#0284c7;">74 220 so'm</strong></li>
          <li><strong>Tavsiya narx (+35%):</strong> <strong style="color:#15803d;">100 200 so'm</strong></li>
        </ul>
        ✨ <em>500 donadan sof foyda: <strong>+12 990 000 so'm</strong></em>
      `;
    } else if (q.includes('ip') || q.includes('overlok') || q.includes('formula') || q.includes('koeffitsiyent')) {
      responseText = `
        <strong>🧵 Ip sarfi koeffitsiyentlari (K):</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>4-ipli Overlok:</strong> Chok (m) × <strong>16.0</strong></li>
          <li><strong>Rasshivalka:</strong> Chok (m) × <strong>19.0</strong></li>
          <li><strong>1-ignali to'g'ri chok:</strong> Chok (m) × <strong>2.8</strong></li>
        </ul>
        💡 <em>Misol: 70 sm overlok choki = 0.7 × 16 = <strong>11.2 m ip</strong>.</em>
      `;
    } else {
      responseText = `
        <strong>🤖 AI Texnolog javobi:</strong>
        <ul style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.5;">
          <li><strong>Standart chok zichligi:</strong> 1 sm da 4–5 ta qadam.</li>
          <li><strong>Tavsiya mato:</strong> 100% paxta yoki 95/5 laykrali trikotaj.</li>
          <li><strong>Chok turi:</strong> Bolalar kiyimida 4-ipli elastik overlok.</li>
        </ul>
        💡 <em>Aniqroq ma'lumot uchun model yoki mato turini yozing.</em>
      `;
    }

    const aiMsg = {
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: responseText
    };

    this.messages.push(aiMsg);
    return aiMsg;
  }

  clearChat() {
    this.messages = [
      {
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Salom! Yangi savolingizni yozing. Men qisqa va aniq javob beraman! 🤖`
      }
    ];
  }
}

const aiChatEngine = new AiChatEngine();
