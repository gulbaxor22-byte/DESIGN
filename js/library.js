// library.js - Professional Kids Garment Manufacturing Standards & Technical Library

class LibraryEngine {
  constructor() {
    this.stitchTypes = [
      { code: "ISO 301", name: "1-ignali Mokoli Chok (Lockstitch)", threadRatio: "2.8x", desc: "Ikki ipli universal tekis chok. Cho'zilmaydigan mustahkam biriktirish, cho'ntak bostirish, zamok qadash uchun.", icon: "🧵" },
      { code: "ISO 504", name: "3-ipli Overlock (Overedge Stitch)", threadRatio: "12.0x", desc: "Mato qirrasini to'kilishdan saqlovchi va yengil bukish choki. Yengil trikotaj va yubkalar uchun.", icon: "🪡" },
      { code: "ISO 514", name: "4-ipli Trikotaj Overlock (Mock Safety)", threadRatio: "16.0x", desc: "Trikotaj bolalar kiyimlarining asosiy konstruktiv biriktiruvchi elastik choki (Hoodie, futbolka, shortik).", icon: "⚡" },
      { code: "ISO 516", name: "5-ipli Kombinatsiyalangan Overlock", threadRatio: "20.0x", desc: "Zanjirli chok va overlock birlashmasi. To'qima matolar (shim, kurtka, denim) uchun yirtilmas chok.", icon: "🛡️" },
      { code: "ISO 406 / 602", name: "Tekis Chok (Coverstitch / Raspoposhivalka)", threadRatio: "18.0x", desc: "2 yoki 3 ignali pastki zanjirli elastik chok. Yeng uchlari, tolstovka va futbolkalar etagini qayirib tikish.", icon: "📏" },
      { code: "ISO 304", name: "Zig-Zag Chok", threadRatio: "3.5x", desc: "Elastik matolarga rezinka va applikatsiya biriktirish uchun egiluvchan chok.", icon: "〰️" }
    ];

    this.machines = [
      { name: "Juki DDL-8700-7", type: "1-ignali universal moko", speed: "5500 rpm", needle: "DBx1 #70–90", power: "550W Servo", features: "Avtomat ip kesuvchi, avtomat zakrepka, mikro-orqaga qaytarish" },
      { name: "Siruba 747K-514M2-24", type: "4-ipli tezyurar overlock", speed: "7000 rpm", needle: "DCx27 #65–80", power: "550W Direct Drive", features: "Differensial surish mexanizmi, trikotaj uchun yumshoq chok" },
      { name: "Pegasus W562PV-01GB", type: "Tekis chokli Raspoposhivalka", speed: "6000 rpm", needle: "UY128GAS #70–80", power: "550W Servo", features: "Yuqori va pastki qoplama (top/bottom cover), etak qayiruvchi moslama" },
      { name: "Jack JK-T1900BSK", type: "Elektron zakrepka va tugma qadash", speed: "3200 rpm", needle: "DPx17 #90–110", power: "750W Direct Drive", features: "50+ xotira dasturlari, cho'ntak burchaklarini mustahkamlash" },
      { name: "Kansai Special DLR-1508P", type: "8-ignali Bel Rezinka mashinasi", speed: "4500 rpm", needle: "DVx57 #90–110", power: "750W", features: "Sport shimlari bel rezinkasini 4 qatorli parallel mustahkam tikish" }
    ];

    this.fabrics = [
      { name: "Futer 3-ipli Naches / Petlya", comp: "80% Paxta, 20% PES", weight: "300–340 g/m²", shrink: "Uzunligiga 3.5%, Eniga 2.0%", needle: "SES / Ballpoint #80–90", use: "Bolalar tolstovkalari, qishki sport kostyumlari, issiq shimlar" },
      { name: "Futer 2-ipli Laykrali", comp: "95% Paxta, 5% Laykra", weight: "240–260 g/m²", shrink: "Uzunligiga 4.0%, Eniga 2.5%", needle: "Ballpoint #75–80", use: "Kuz-bahor tolstovkalari, bolalar sport kiyimlari" },
      { name: "Interlok Penye", comp: "100% Organik Paxta", weight: "200–230 g/m²", shrink: "Uzunligiga 3.0%, Eniga 2.0%", needle: "Ballpoint #70–75", use: "Chaqaloqlar kiyimi, maktab polo futbolkalari, pijama" },
      { name: "Suprem (Kulirnaya glad)", comp: "95% Paxta, 5% Laykra", weight: "160–190 g/m²", shrink: "Uzunligiga 4.5%, Eniga 3.0%", needle: "Ballpoint #65–75", use: "Yozgi futbolkalar, shortiklar, qizlar ko'ylaklari" },
      { name: "Ribana 2x2 (Kashkorse)", comp: "95% Paxta, 5% Elastan", weight: "260–300 g/m²", shrink: "Uzunligiga 5.0%, Eniga 4.0%", needle: "Stretch #80", use: "Yoqa, yeng manjetlari, pastki belbog'lar" },
      { name: "Plashevka Dewspo PU", comp: "100% Poliester (PU Membrana)", weight: "90–120 g/m²", shrink: "0.5%", needle: "Microtex #70–80", use: "Bolalar vetrovkalari, kurtkalar, yomg'irpo'shlar" }
    ];
  }
}

const libraryEngine = new LibraryEngine();
