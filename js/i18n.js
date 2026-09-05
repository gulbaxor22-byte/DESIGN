// i18n.js - Multi-language support (Uzbek, Russian, English)

const translations = {
  uz: {
    // Brand & App
    appName: "AI Kids Fashion & Production",
    appTagline: "G'oyadan tayyor mahsulotgacha bo'lgan to'liq ekotizim",
    
    // Navigation items
    nav_dashboard: "Bosh sahifa",
    nav_models: "Modellar",
    nav_designer: "AI Dizayn Generator",
    nav_cad: "Konstruktor / Lekalo",
    nav_materials: "Materiallar bazasi",
    nav_cutting: "Bichuv sarfi",
    nav_sewing: "Tikuv texnologiyasi",
    nav_techpack: "Texnologik karta",
    nav_costing: "Tannarx hisoblash",
    nav_production: "Ishlab chiqarish & QC",
    nav_analytics: "Hisobotlar",
    nav_library: "Kutubxona",
    nav_ai_technologist: "AI Texnolog",
    nav_korxona_mode: "Korxona / Mobil rejim",
    nav_settings: "Sozlamalar",

    // Dashboard
    kpi_today_title: "Bugungi ishlab chiqarish ko'rsatkichlari",
    kpi_new_models: "Yangi modellar",
    kpi_in_production: "Ishlab chiqarilmoqda",
    kpi_ready_models: "Tayyor modellar",
    kpi_materials: "Material turlari",
    kpi_in_cutting: "Bichuvda",
    kpi_in_sewing: "Tikuvda",
    recent_models_title: "Oxirgi modellar",
    btn_new_model: "+ Yangi model",
    btn_quick_ai: "🎨 AI Dizayn",
    btn_quick_techpack: "📋 Texnologik karta",
    btn_quick_calc: "💰 Tannarx",

    // Model Card & Fields
    field_model_code: "Model kodi",
    field_model_name: "Model nomi",
    field_category: "Kategoriya",
    field_gender: "Jinsi",
    field_age: "Yosh guruhi",
    field_sizes: "Razmerlar",
    field_season: "Mavsum",
    field_fabric: "Asosiy mato",
    field_cost: "Tannarx",
    field_selling_price: "Tavsiya sotuv narxi",
    field_status: "Holati",
    field_actions: "Amallar",
    field_description: "Tavsif",
    field_created_at: "Yaratilgan sana",

    // Genders
    gender_girl: "Qiz bola",
    gender_boy: "O'g'il bola",
    gender_unisex: "Unisex",

    // Categories
    cat_hoodie: "Hoodie / Tolstovka",
    cat_sweatshirt: "Sport kostyum",
    cat_pants: "Sport shim / Jogger",
    cat_dress: "Ko'ylak",
    cat_tshirt: "Futbolka",
    cat_polo: "Polo futbolka",
    cat_jacket: "Kurtka / Vetrovka",
    cat_shorts: "Shortik",
    cat_leggings: "Leggings",
    cat_longsleeve: "Longsliv",
    cat_pajamas: "Uy kiyimi / Pijama",
    cat_school: "Maktab kiyimi",
    cat_overall: "Kombinezon",

    // Statuses
    status_design: "Dizayn",
    status_cad: "Konstruktor",
    status_pattern: "Lekalo",
    status_cutting: "Bichuvda",
    status_sewing: "Tikuvda",
    status_qc: "Sifat nazorati (QC)",
    status_ready: "Tayyor",

    // AI Designer
    ai_title: "AI Kids Fashion Dizayn Generatori",
    ai_subtitle: "Matnli tavsif va parametrlardan 3D/2D visual model konsepsiyasi yaratish",
    ai_prompt_placeholder: "Masalan: 8 yoshli qiz bola uchun zamonaviy sport kostyum, pushti va oq rang, kapyushonli, oldida cho'ntak, yon tomonida dekorativ lampas...",
    ai_btn_generate: "Dizayn Generatsiya Qilish",
    ai_btn_apply_model: "Ushbu Dizayndan Yangi Model Yaratish",
    ai_view_front: "Old ko'rinish (Front)",
    ai_view_back: "Orqa ko'rinish (Back)",
    ai_view_side: "Yon ko'rinish (Side)",
    ai_style_tags: "Tezkor teglar",
    ai_color_palette: "Ranglar palitrasi",
    ai_decor_options: "Dekor va detallar",

    // Pattern CAD / Lekalo
    cad_title: "Konstruktor & Lekalo Moduli",
    cad_subtitle: "Bolalar kiyimi lekalo konstruksiyasi, o'lchamlar gradingi va eksport",
    cad_size_selector: "Bazaviy razmer",
    cad_seam_allowance: "Chok haqi (sm)",
    cad_ease_allowance: "Erkinlik qo'shimchasi (sm)",
    cad_btn_export_svg: "SVG Eksport",
    cad_btn_export_dxf: "DXF CAD Eksport",
    cad_btn_print_pdf: "A4 / A0 PDF Chop etish",
    cad_piece_front: "Old bo'lak",
    cad_piece_back: "Orqa bo'lak",
    cad_piece_sleeve: "Yeng",
    cad_piece_hood: "Kapyushon",
    cad_piece_pocket: "Cho'ntak (Kenguru/Yon)",
    cad_piece_waistband: "Belbog' (Poyas)",
    cad_piece_cuff: "Manjet",
    cad_piece_binding: "Kant / Beyka",

    // Materials
    mat_title: "Materiallar va Furnitura Bazasi",
    mat_btn_add: "+ Yangi material",
    mat_col_name: "Material nomi",
    mat_col_type: "Turi",
    mat_col_comp: "Tarkibi",
    mat_col_weight: "Gramaj (g/m²)",
    mat_col_width: "Eni (sm)",
    mat_col_price: "Narxi",
    mat_col_color: "Rangi",
    mat_col_stock: "Omborda qoldiq",
    mat_col_supplier: "Yetkazib beruvchi",

    // Cutting Calculator
    cut_title: "Bichuv va Sarf Kalkulyatori",
    cut_subtitle: "Raskladka optimizatsiyasi, foydali maydon va chiqindi hisob-kitobi",
    cut_fabric_width: "Mato eni (sm)",
    cut_order_qty: "Buyurtma soni (dona)",
    cut_layers: "Qatlamlar soni",
    cut_single_consumption: "1 dona uchun sarf",
    cut_total_fabric: "Umumiy mato sarfi",
    cut_efficiency: "Foydali maydon (Chiqim)",
    cut_waste: "Texnologik chiqindi",
    cut_formula_box: "Shaffof hisoblash formulasi",

    // Sewing Technology
    sew_title: "Tikuv Texnologiyasi va Vaqt Me'yori",
    sew_subtitle: "Operatsiyalar ketma-ketligi, mashina tanlovi va ip sarfi",
    sew_btn_add_op: "+ Operatsiya qo'shish",
    sew_col_op: "Operatsiya nomi",
    sew_col_machine: "Mashina turi",
    sew_col_time_sec: "Vaqt (sekund)",
    sew_col_seam_len: "Chok uzunligi (sm)",
    sew_col_thread_cons: "Ip sarfi (m)",
    sew_col_op_cost: "Operatsiya narxi",
    sew_total_time: "Umumiy tikuv vaqti",
    sew_total_thread: "Umumiy ip sarfi",

    // Tech Pack
    tp_title: "Texnologik Karta (Tech Pack)",
    tp_btn_print: "Chop etish (Print / PDF)",
    tp_btn_export_all: "Production Pack Eksport",
    tp_brand_header: "Bolalar Kiyimi Ishlab Chiqarish Korxonasi",

    // Costing
    cost_title: "Tannarx va Foyda Kalkulyatori",
    cost_subtitle: "Har bir xarajat komponentining shaffof matematik formulasi",
    cost_fabric: "Mato xarajati",
    cost_trims: "Furnitura xarajati",
    cost_thread: "Ip xarajati",
    cost_cutting: "Bichuv xarajati",
    cost_sewing: "Tikuv ish haqi",
    cost_packing: "Qadoqlash va etiketka",
    cost_overhead: "Korxona ustama xarajatlari",
    cost_total_unit: "Jami Tannarx (1 dona)",
    cost_margin: "Rejalashtirilgan Marja %",
    cost_profit_unit: "1 dona sof foyda",
    cost_rec_price: "Tavsiya qilinadigan sotuv narxi",

    // Production & QC
    prod_title: "Ishlab Chiqarish Jarayoni va Sifat Nazorati (QC)",
    prod_stage_flow: "Ishlab chiqarish bosqichlari zanjiri",
    qc_checklist_title: "8-Bosqichli Sifat Nazorati (QC Checklist)",
    qc_item_1: "1. O'lchamlar belgilangan toleransga mos (±0.5 sm)",
    qc_item_2: "2. Choklar tekis, mustahkam va zich tikilgan",
    qc_item_3: "3. Barcha ip qoldiqlari tozalangan",
    qc_item_4: "4. Mato yuzasida dog' va defektlar yo'q",
    qc_item_5: "5. Furnitura (zamok, tugma, knopka) ravon ishlaydi",
    qc_item_6: "6. Markirovka, label va razmer teglari to'g'ri",
    qc_item_7: "7. Yakuniy dazmollash (VTO) to'liq bajarilgan",
    qc_item_8: "8. Individual qadoqlash va shtrix-kod tayyor",
    qc_status_pass: "QABUL QILINDI (QC: PASS)",
    qc_status_fail: "QAYTA ISHLASH (QC: FAIL)",

    // AI Technologist
    tech_ai_title: "AI Texnolog & Konsultant",
    tech_ai_subtitle: "Murakkab model talablarini tahlil qilib, to'liq texnologik va sarf xaritasini tuzuvchi AI",
    tech_ai_input_placeholder: "Masalan: 8 yoshli bolalar sport shimini ishlab chiqarmoqchiman. Futer 3-ipli. Texnologik jarayon va sarfni hisoblab ber...",
    tech_ai_btn_send: "AI Texnologdan So'rash",
    tech_ai_btn_import: "📥 Ushbu hisobni loyihaga yuklash",

    // Korxona Mode
    korxona_title: "Tikuv Korxonasi — Ishchi Rejimi",
    korxona_subtitle: "Tikuvchilar va ustalarning operatsiyalarni real vaqtda belgilash ekrani",
    korxona_operator: "Tikuvchi:",
    korxona_active_op: "Joriy operatsiya",
    korxona_timer: "Vaqt hisoblagich",
    korxona_btn_complete: "Operatsiya Bajarildi ✅",

    // Library
    lib_title: "Professional Kutubxona va Standartlar",
    lib_tab_sizes: "Bolalar O'lchov Standartlari",
    lib_tab_stitches: "Chok Turlari (ISO 4915)",
    lib_tab_machines: "Tikuv Mashinalari Boshqarmasi",
    lib_tab_textile: "To'qimachilik Matolari",

    // Analytics
    analytics_title: "Ishlab Chiqarish Tahlili va Hisobotlar",
    
    // General
    btn_save: "Saqlash",
    btn_cancel: "Bekor qilish",
    btn_edit: "Tahrirlash",
    btn_delete: "O'chirish",
    btn_view: "Ko'rish",
    btn_export: "Eksport",
    btn_close: "Yopish",
    unit_som: "so'm",
    unit_kg: "kg",
    unit_meter: "m",
    unit_piece: "dona",
    unit_seconds: "sek",
    unit_minutes: "min"
  },

  ru: {
    // Brand & App
    appName: "AI Kids Fashion & Production",
    appTagline: "Полная экосистема от идеи до готовой детской одежды",
    
    // Navigation items
    nav_dashboard: "Дашборд",
    nav_models: "Модели",
    nav_designer: "AI Дизайн генератор",
    nav_cad: "Конструктор / Лекала",
    nav_materials: "База материалов",
    nav_cutting: "Раскрой и расход",
    nav_sewing: "Технология пошива",
    nav_techpack: "Технологическая карта",
    nav_costing: "Расчет себестоимости",
    nav_production: "Производство и QC",
    nav_analytics: "Отчеты и аналитика",
    nav_library: "Библиотека стандартов",
    nav_ai_technologist: "AI Технолог",
    nav_korxona_mode: "Режим предприятия / Моб.",
    nav_settings: "Настройки",

    // Dashboard
    kpi_today_title: "Показатели производства на сегодня",
    kpi_new_models: "Новые модели",
    kpi_in_production: "В производстве",
    kpi_ready_models: "Готовые модели",
    kpi_materials: "Видов материалов",
    kpi_in_cutting: "В раскрое",
    kpi_in_sewing: "В пошиве",
    recent_models_title: "Последние модели",
    btn_new_model: "+ Новая модель",
    btn_quick_ai: "🎨 AI Дизайн",
    btn_quick_techpack: "📋 Техкарта",
    btn_quick_calc: "💰 Себестоимость",

    // Model Card & Fields
    field_model_code: "Код модели",
    field_model_name: "Название модели",
    field_category: "Категория",
    field_gender: "Пол",
    field_age: "Возраст",
    field_sizes: "Размеры",
    field_season: "Сезон",
    field_fabric: "Основная ткань",
    field_cost: "Себестоимость",
    field_selling_price: "Реком. цена",
    field_status: "Статус",
    field_actions: "Действия",
    field_description: "Описание",
    field_created_at: "Дата создания",

    // Genders
    gender_girl: "Девочка",
    gender_boy: "Мальчик",
    gender_unisex: "Унисекс",

    // Categories
    cat_hoodie: "Худи / Толстовка",
    cat_sweatshirt: "Спортивный костюм",
    cat_pants: "Спортивные брюки",
    cat_dress: "Платье",
    cat_tshirt: "Футболка",
    cat_polo: "Футболка поло",
    cat_jacket: "Куртка / Ветровка",
    cat_shorts: "Шорты",
    cat_leggings: "Леггинсы",
    cat_longsleeve: "Лонгслив",
    cat_pajamas: "Пижама / Домашняя",
    cat_school: "Школьная форма",
    cat_overall: "Комбинезон",

    // Statuses
    status_design: "Дизайн",
    status_cad: "Конструктор",
    status_pattern: "Лекала",
    status_cutting: "В раскрое",
    status_sewing: "В пошиве",
    status_qc: "Контроль качества (QC)",
    status_ready: "Готово",

    // AI Designer
    ai_title: "AI Генератор Дизайна Детской Одежды",
    ai_subtitle: "Создание концепта модели с видами спереди, сзади и сбоку по текстовому описанию",
    ai_prompt_placeholder: "Например: Спортивный костюм для девочки 8 лет, розовый с белым, капюшон, карман кенгуру, лампасы...",
    ai_btn_generate: "Сгенерировать дизайн",
    ai_btn_apply_model: "Создать модель из этого концепта",
    ai_view_front: "Вид спереди (Front)",
    ai_view_back: "Вид сзади (Back)",
    ai_view_side: "Вид сбоку (Side)",
    ai_style_tags: "Быстрые теги",
    ai_color_palette: "Палитра цветов",
    ai_decor_options: "Декор и детали",

    // Pattern CAD / Lekalo
    cad_title: "Конструктор и Модуль Лекал",
    cad_subtitle: "Параметрические лекала детской одежды, градация размеров и экспорт в CAD/PDF",
    cad_size_selector: "Базовый размер",
    cad_seam_allowance: "Припуск на шов (см)",
    cad_ease_allowance: "Прибавка на свободу (см)",
    cad_btn_export_svg: "Экспорт SVG",
    cad_btn_export_dxf: "Экспорт DXF",
    cad_btn_print_pdf: "Печать A4 / A0 PDF",
    cad_piece_front: "Полочка (перед)",
    cad_piece_back: "Спинка",
    cad_piece_sleeve: "Рукав",
    cad_piece_hood: "Капюшон",
    cad_piece_pocket: "Карман",
    cad_piece_waistband: "Пояс",
    cad_piece_cuff: "Манжета",
    cad_piece_binding: "Бейка",

    // Materials
    mat_title: "База Материалов и Фурнитуры",
    mat_btn_add: "+ Добавить материал",
    mat_col_name: "Материал",
    mat_col_type: "Тип",
    mat_col_comp: "Состав",
    mat_col_weight: "Плотность (г/м²)",
    mat_col_width: "Ширина (см)",
    mat_col_price: "Цена",
    mat_col_color: "Цвет",
    mat_col_stock: "Остаток",
    mat_col_supplier: "Поставщик",

    // Cutting Calculator
    cut_title: "Калькулятор Раскроя и Норм Расхода",
    cut_subtitle: "Оптимизация раскладки, коэффициент полезной площади и расчет отходов",
    cut_fabric_width: "Ширина полотна (см)",
    cut_order_qty: "Объем партии (шт)",
    cut_layers: "Количество слоев",
    cut_single_consumption: "Расход на 1 шт",
    cut_total_fabric: "Общий расход ткани",
    cut_efficiency: "Полезная площадь (КПО)",
    cut_waste: "Технологические отходы",
    cut_formula_box: "Прозрачная формула расчета",

    // Sewing Technology
    sew_title: "Технология Пошива и Нормы Времени",
    sew_subtitle: "Пооперационная карта, подбор швейного оборудования и расчет ниток",
    sew_btn_add_op: "+ Добавить операцию",
    sew_col_op: "Операция",
    sew_col_machine: "Тип оборудования",
    sew_col_time_sec: "Время (сек)",
    sew_col_seam_len: "Длина строчки (см)",
    sew_col_thread_cons: "Расход ниток (м)",
    sew_col_op_cost: "Стоимость операции",
    sew_total_time: "Общее время пошива",
    sew_total_thread: "Общий расход ниток",

    // Tech Pack
    tp_title: "Технологическая Карта (Tech Pack)",
    tp_btn_print: "Печать (Print / PDF)",
    tp_btn_export_all: "Экспорт Production Pack",
    tp_brand_header: "Швейное Предприятие Детской Одежды",

    // Costing
    cost_title: "Калькулятор Себестоимости и Ценообразования",
    cost_subtitle: "Математически обоснованный расчет каждого компонента затрат",
    cost_fabric: "Ткань и трикотаж",
    cost_trims: "Фурнитура",
    cost_thread: "Нитки",
    cost_cutting: "Раскройные работы",
    cost_sewing: "Швейные работы",
    cost_packing: "Упаковка и маркировка",
    cost_overhead: "Накладные расходы предприятия",
    cost_total_unit: "Итоговая себестоимость (1 шт)",
    cost_margin: "Плановая маржа %",
    cost_profit_unit: "Чистая прибыль с 1 шт",
    cost_rec_price: "Рекомендуемая оптовая/розничная цена",

    // Production & QC
    prod_title: "Управление Производством и Контроль Качества",
    prod_stage_flow: "Цепочка производственных этапов",
    qc_checklist_title: "8-Пунктовый Чек-лист Качества (QC)",
    qc_item_1: "1. Соответствие размерной сетке (допуск ±0.5 см)",
    qc_item_2: "2. Ровность и плотность строчек",
    qc_item_3: "3. Полное удаление концов ниток",
    qc_item_4: "4. Отсутствие пятен и дефектов полотна",
    qc_item_5: "5. Исправная работа фурнитуры (молнии, кнопки)",
    qc_item_6: "6. Корректность составников и размерников",
    qc_item_7: "7. Качество влажно-тепловой обработки (ВТО)",
    qc_item_8: "8. Индивидуальная упаковка и штрихкодирование",
    qc_status_pass: "ПРИНЯТО (QC: PASS)",
    qc_status_fail: "НА ДОРАБОТКУ (QC: FAIL)",

    // AI Technologist
    tech_ai_title: "AI Технолог и Консультант",
    tech_ai_subtitle: "Интеллектуальный помощник для мгновенного составления маршрута и расчета затрат",
    tech_ai_input_placeholder: "Например: Хочу запустить спортивные брюки для мальчика 8 лет из футера 3-нитки. Составь техпроцесс и нормы расхода...",
    tech_ai_btn_send: "Спросить AI Технолога",
    tech_ai_btn_import: "📥 Загрузить данный расчет в проект",

    // Korxona Mode
    korxona_title: "Режим Предприятия — Экран Швеи",
    korxona_subtitle: "Интерфейс для оперативного учета выполненных операций на швейном потоке",
    korxona_operator: "Швея-оператор:",
    korxona_active_op: "Текущая операция",
    korxona_timer: "Секундомер операции",
    korxona_btn_complete: "Операция выполнена ✅",

    // Library
    lib_title: "Профессиональная Библиотека Стандартов",
    lib_tab_sizes: "Детские антропометрические таблицы",
    lib_tab_stitches: "Классификация стежков (ISO 4915)",
    lib_tab_machines: "Швейное оборудование",
    lib_tab_textile: "Свойства трикотажа и тканей",

    // Analytics
    analytics_title: "Аналитика и Отчеты Предприятия",

    // General
    btn_save: "Сохранить",
    btn_cancel: "Отмена",
    btn_edit: "Редактировать",
    btn_delete: "Удалить",
    btn_view: "Просмотр",
    btn_export: "Экспорт",
    btn_close: "Закрыть",
    unit_som: "сум",
    unit_kg: "кг",
    unit_meter: "м",
    unit_piece: "шт",
    unit_seconds: "сек",
    unit_minutes: "мин"
  },

  en: {
    // Brand & App
    appName: "AI Kids Fashion & Production",
    appTagline: "End-to-end ecosystem from concept to finished kids garment",
    
    // Navigation items
    nav_dashboard: "Dashboard",
    nav_models: "Models",
    nav_designer: "AI Design Studio",
    nav_cad: "Pattern CAD / Grading",
    nav_materials: "Materials Inventory",
    nav_cutting: "Cutting & Consumption",
    nav_sewing: "Sewing Technology",
    nav_techpack: "Tech Pack",
    nav_costing: "Costing & Margin",
    nav_production: "Production & QC",
    nav_analytics: "Analytics & Reports",
    nav_library: "Standards Library",
    nav_ai_technologist: "AI Technologist",
    nav_korxona_mode: "Factory Floor / Mobile",
    nav_settings: "Settings",

    // Dashboard
    kpi_today_title: "Today's Production Metrics",
    kpi_new_models: "New Models",
    kpi_in_production: "In Production",
    kpi_ready_models: "Finished Models",
    kpi_materials: "Material Items",
    kpi_in_cutting: "In Cutting",
    kpi_in_sewing: "In Sewing",
    recent_models_title: "Recent Garment Models",
    btn_new_model: "+ New Model",
    btn_quick_ai: "🎨 AI Design",
    btn_quick_techpack: "📋 Tech Pack",
    btn_quick_calc: "💰 Costing",

    // Model Card & Fields
    field_model_code: "Model Code",
    field_model_name: "Model Name",
    field_category: "Category",
    field_gender: "Gender",
    field_age: "Age Group",
    field_sizes: "Sizes",
    field_season: "Season",
    field_fabric: "Main Fabric",
    field_cost: "Unit Cost",
    field_selling_price: "Target Price",
    field_status: "Status",
    field_actions: "Actions",
    field_description: "Description",
    field_created_at: "Created Date",

    // Genders
    gender_girl: "Girls",
    gender_boy: "Boys",
    gender_unisex: "Unisex",

    // Categories
    cat_hoodie: "Hoodie / Sweatshirt",
    cat_sweatshirt: "Tracksuit",
    cat_pants: "Joggers / Pants",
    cat_dress: "Dress",
    cat_tshirt: "T-Shirt",
    cat_polo: "Polo Shirt",
    cat_jacket: "Jacket / Windbreaker",
    cat_shorts: "Shorts",
    cat_leggings: "Leggings",
    cat_longsleeve: "Long Sleeve",
    cat_pajamas: "Pajamas / Loungewear",
    cat_school: "School Uniform",
    cat_overall: "Jumpsuit / Romper",

    // Statuses
    status_design: "Design",
    status_cad: "CAD / Draft",
    status_pattern: "Pattern Ready",
    status_cutting: "Cutting",
    status_sewing: "Sewing",
    status_qc: "Quality Control",
    status_ready: "Production Ready",

    // AI Designer
    ai_title: "AI Kids Fashion Concept Generator",
    ai_subtitle: "Multi-angle conceptual rendering (Front, Back, Side) from text descriptions",
    ai_prompt_placeholder: "E.g. Modern tracksuit for 8-year-old girl, pink and ivory white, hooded, kangaroo pocket, decorative side stripes...",
    ai_btn_generate: "Generate AI Design",
    ai_btn_apply_model: "Convert Concept to Production Model",
    ai_view_front: "Front View",
    ai_view_back: "Back View",
    ai_view_side: "Side View",
    ai_style_tags: "Quick Tags",
    ai_color_palette: "Color Palette",
    ai_decor_options: "Trims & Details",

    // Pattern CAD / Lekalo
    cad_title: "Pattern Maker & CAD Grading",
    cad_subtitle: "Kids parametric 2D patterns, size grading rules and export",
    cad_size_selector: "Base Size",
    cad_seam_allowance: "Seam Allowance (cm)",
    cad_ease_allowance: "Ease Allowance (cm)",
    cad_btn_export_svg: "Export SVG",
    cad_btn_export_dxf: "Export DXF CAD",
    cad_btn_print_pdf: "Print A4 / A0 PDF",
    cad_piece_front: "Front Bodice",
    cad_piece_back: "Back Bodice",
    cad_piece_sleeve: "Sleeve",
    cad_piece_hood: "Hood",
    cad_piece_pocket: "Pocket",
    cad_piece_waistband: "Waistband",
    cad_piece_cuff: "Cuff",
    cad_piece_binding: "Binding",

    // Materials
    mat_title: "Materials & Accessories Inventory",
    mat_btn_add: "+ Add Material",
    mat_col_name: "Material Name",
    mat_col_type: "Type",
    mat_col_comp: "Composition",
    mat_col_weight: "Weight (g/m²)",
    mat_col_width: "Width (cm)",
    mat_col_price: "Unit Price",
    mat_col_color: "Color",
    mat_col_stock: "In Stock",
    mat_col_supplier: "Supplier",

    // Cutting Calculator
    cut_title: "Marker & Cutting Consumption",
    cut_subtitle: "Marker nesting simulation, yield calculation and waste analysis",
    cut_fabric_width: "Fabric Width (cm)",
    cut_order_qty: "Batch Order Qty (pcs)",
    cut_layers: "Spread Plies / Layers",
    cut_single_consumption: "Unit Consumption",
    cut_total_fabric: "Total Fabric Required",
    cut_efficiency: "Marker Efficiency (Yield)",
    cut_waste: "Technological Waste",
    cut_formula_box: "Transparent Formula Breakdown",

    // Sewing Technology
    sew_title: "Sewing Operations & Standard Times",
    sew_subtitle: "Operation sequence tree, machine allocation and thread costing",
    sew_btn_add_op: "+ Add Operation",
    sew_col_op: "Operation Name",
    sew_col_machine: "Machine Type",
    sew_col_time_sec: "Time (sec)",
    sew_col_seam_len: "Seam Length (cm)",
    sew_col_thread_cons: "Thread Used (m)",
    sew_col_op_cost: "Labor Cost",
    sew_total_time: "Total Sewing Time",
    sew_total_thread: "Total Thread Consumption",

    // Tech Pack
    tp_title: "Production Tech Pack",
    tp_btn_print: "Print Tech Pack (PDF)",
    tp_btn_export_all: "Export Full Production Pack",
    tp_brand_header: "Kids Garment Manufacturing Factory",

    // Costing
    cost_title: "Costing & Profit Margin Engine",
    cost_subtitle: "Transparent mathematical formula breakdown for all cost drivers",
    cost_fabric: "Fabric Cost",
    cost_trims: "Trims & Accessories",
    cost_thread: "Thread Cost",
    cost_cutting: "Cutting Labor",
    cost_sewing: "Sewing Labor",
    cost_packing: "Packaging & Labels",
    cost_overhead: "Factory Overhead",
    cost_total_unit: "Total Unit Cost (1 pc)",
    cost_margin: "Target Profit Margin %",
    cost_profit_unit: "Net Profit / Unit",
    cost_rec_price: "Recommended Target Price",

    // Production & QC
    prod_title: "Production Tracking & Quality Control (QC)",
    prod_stage_flow: "Production Stage Pipeline",
    qc_checklist_title: "8-Point Quality Inspection Checklist",
    qc_item_1: "1. Measurements within tolerance (±0.5 cm)",
    qc_item_2: "2. Seam density, tension and alignment",
    qc_item_3: "3. Complete thread trimming and loose yarn removal",
    qc_item_4: "4. No fabric stains, runs, or weaving defects",
    qc_item_5: "5. Zippers, buttons, snaps operate smoothly",
    qc_item_6: "6. Care labels, size tags, brand tabs properly sewn",
    qc_item_7: "7. Final pressing / steam iron completed",
    qc_item_8: "8. Individual polybag and barcode labeling ready",
    qc_status_pass: "INSPECTION PASSED (QC: PASS)",
    qc_status_fail: "REWORK REQUIRED (QC: FAIL)",

    // AI Technologist
    tech_ai_title: "AI Technologist & Production Advisor",
    tech_ai_subtitle: "Smart garment production assistant that generates engineering routes and math calculations",
    tech_ai_input_placeholder: "E.g. I want to produce an 8-year-old boys 3-thread fleece jogger pants. Calculate operations, time norms and fabric yield...",
    tech_ai_btn_send: "Ask AI Technologist",
    tech_ai_btn_import: "📥 Load this calculation into Project",

    // Korxona Mode
    korxona_title: "Factory Floor Mode — Operator Station",
    korxona_subtitle: "Real-time task completion and stopwatch interface for sewing operators",
    korxona_operator: "Operator / Seamstress:",
    korxona_active_op: "Current Operation",
    korxona_timer: "Operation Stopwatch",
    korxona_btn_complete: "Complete Operation ✅",

    // Library
    lib_title: "Professional Standards & Garment Library",
    lib_tab_sizes: "Kids Anthropometric Standards",
    lib_tab_stitches: "Stitch Types (ISO 4915)",
    lib_tab_machines: "Sewing Machines Guide",
    lib_tab_textile: "Fabric Specifications",

    // Analytics
    analytics_title: "Factory Analytics & Management Reports",

    // General
    btn_save: "Save",
    btn_cancel: "Cancel",
    btn_edit: "Edit",
    btn_delete: "Delete",
    btn_view: "View",
    btn_export: "Export",
    btn_close: "Close",
    unit_som: "UZS",
    unit_kg: "kg",
    unit_meter: "m",
    unit_piece: "pcs",
    unit_seconds: "sec",
    unit_minutes: "min"
  }
};

let currentLang = 'uz';

function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  if (translations['uz'][key]) {
    return translations['uz'][key];
  }
  return key;
}

function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('kids_fashion_lang', lang);
    applyTranslations();
  }
}

function initI18n() {
  const savedLang = localStorage.getItem('kids_fashion_lang') || 'uz';
  setLanguage(savedLang);
}

function applyTranslations() {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  // Update elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.setAttribute('title', t(key));
  });

  // Dispatch event for components that need dynamic redraw
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}
