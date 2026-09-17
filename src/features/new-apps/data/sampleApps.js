/**
 * Initial sample interactive apps to demonstrate the embedded HTML execution capabilities.
 */
export const sampleApps = [
  {
    id: 'sample_gita_sloka',
    title: 'శ్రీమద్భగవద్గీత శ్లోకాలు',
    description: 'నిత్య పారాయణకు ముఖ్యమైన భగవద్గీత శ్లోకాలు, సమగ్ర ప్రతిపదార్థాలు మరియు సరళ భావాలు.',
    category: 'Spiritual',
    iconUrl: '/og-preview.jpg',
    order: 0,
    createdAt: Date.now() - 86400000,
    htmlFileName: 'bhagavad_gita_daily.html',
    htmlFileSize: 8520,
    htmlContent: `<!DOCTYPE html>
<html lang="te">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>శ్రీమద్భగవద్గీత శ్లోక రత్నాలు</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Noto Serif Telugu', serif, system-ui;
      background: linear-gradient(135deg, #0b071a 0%, #1a0f2e 50%, #0d061c 100%);
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      text-align: center;
    }
    .header-badge {
      display: inline-block;
      background: rgba(255, 215, 0, 0.15);
      border: 1px solid #ffd700;
      color: #ffd700;
      padding: 6px 18px;
      border-radius: 20px;
      font-size: 0.9rem;
      margin-bottom: 16px;
    }
    h1 {
      color: #ffd700;
      font-size: 1.8rem;
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
      margin-bottom: 8px;
    }
    p.subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      margin-bottom: 24px;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 215, 0, 0.3);
      border-radius: 20px;
      padding: 24px 20px;
      max-width: 650px;
      width: 100%;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.15);
      animation: fadeIn 0.5s ease;
      margin-bottom: 24px;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .chapter-tag {
      color: #ff9800;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 16px;
    }
    .sloka-box {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      padding: 20px 16px;
      margin-bottom: 20px;
      border-left: 4px solid #ffd700;
    }
    .sloka-sanskrit {
      color: #ffe066;
      font-size: 1.25rem;
      line-height: 2;
      font-weight: 700;
      white-space: pre-line;
    }
    .sloka-translit {
      color: rgba(255, 255, 255, 0.6);
      font-style: italic;
      font-size: 0.95rem;
      margin-top: 10px;
      line-height: 1.6;
    }
    .meaning-box {
      text-align: left;
      background: rgba(255, 215, 0, 0.05);
      border-radius: 12px;
      padding: 16px;
      border: 1px dashed rgba(255, 215, 0, 0.3);
    }
    .meaning-title {
      color: #ffd700;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .meaning-text {
      color: rgba(255, 255, 255, 0.85);
      font-size: 1rem;
      line-height: 1.8;
    }
    .controls {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    button.btn {
      background: linear-gradient(45deg, #ffd700, #ff8c00);
      color: #0b071a;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
      transition: all 0.2s ease;
      font-family: inherit;
    }
    button.btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5);
    }
    button.btn-sec {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      border: 1px solid rgba(255, 215, 0, 0.4);
    }
    .chant-counter {
      margin-top: 20px;
      padding: 12px 20px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 25px;
      border: 1px solid rgba(255, 215, 0, 0.2);
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }
    .chant-num {
      font-size: 1.3rem;
      color: #ffd700;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header-badge">✨ శ్రీమద్భగవద్గీత నిత్య పారాయణ ✨</div>
  <h1>భగవద్గీత శ్లోక రత్నమాల</h1>
  <p class="subtitle">ప్రతిరోజూ ఒక పవిత్ర శ్లోకాన్ని స్మరించండి, అర్థం గ్రహించండి</p>

  <div class="card" id="slokaCard">
    <div class="chapter-tag" id="slokaRef">అధ్యాయం 2, శ్లోకం 47</div>
    <div class="sloka-box">
      <div class="sloka-sanskrit" id="slokaText">కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన |\\nమా కర్మఫలహేతుర్భూర్మా తే సఙ్గోత్స్వకర్మణి ||</div>
      <div class="sloka-translit" id="slokaTranslit">Karmanye vaadhikaaras te maa phaleshu kadaachana |\\nmaa karmaphalahetur bhoor maa te sango 'stv akarmani ||</div>
    </div>
    <div class="meaning-box">
      <div class="meaning-title">📖 ప్రతిపదార్థం & భావం:</div>
      <div class="meaning-text" id="slokaMeaning">నీకు కర్మ చేయడంలోనే అధికారము కలదు, ఫలములలో ఎప్పుడూ లేదు. కర్మఫలానికి నీవు హేతువు కాకు, అలాగని కర్మలను వదిలివేయడానికి కూడా ఆసక్తి చెందకు.</div>
    </div>
  </div>

  <div class="controls">
    <button class="btn btn-sec" onclick="prevSloka()">← మునుపటిది</button>
    <button class="btn" onclick="randomSloka()">🎲 యాదృచ్ఛిక శ్లోకం</button>
    <button class="btn btn-sec" onclick="nextSloka()">తదుపరి శ్లోకం →</button>
  </div>

  <div class="chant-counter">
    <span>🙏 జప సంఖ్య (Chant Count):</span>
    <span class="chant-num" id="counterVal">0</span>
    <button class="btn" style="padding: 6px 14px; font-size: 0.9rem;" onclick="addCount()">+1 జపించు</button>
  </div>

  <script>
    const slokas = [
      {
        ref: "అధ్యాయం 2, శ్లోకం 47 (కర్మయోగం)",
        text: "కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన |\\nమా కర్మఫలహేతుర్భూర్మా తే సఙ్గోత్స్వకర్మణి ||",
        translit: "Karmanyevadhikaraste Ma Phaleshu Kadachana | Ma Karmaphalaheturbhurma Te Sangostvakarmani ||",
        meaning: "కర్మలను నిష్కామముగా ఆచరించుటయే నీ ధర్మము. ఫలితములపై వ్యామోహము ఉంచవద్దు. కర్మఫలమునకు నీవే కర్తవని భావించకు, అలాగని కర్మలు చేయకుండా ఉండకు."
      },
      {
        ref: "అధ్యాయం 4, శ్లోకం 7-8 (జ్ఞానకర్మసన్యాసయోగం)",
        text: "యదా యదా హి ధర్మస్య గ్లానిర్భవతి భారత |\\nఅభ్యుత్థానమధర్మస్య తదాత్మానం సృజామ్యహమ్ ||\\nపరిత్రాణాయ సాధూనాం వినాశాయ చ దుష్కృతామ్ |\\nధర్మసంస్థాపనార్థాయ సంభవామి యుగే యుగే ||",
        translit: "Yada Yada Hi Dharmasya Glanirbhavati Bharata | Abhyutthanamadharmasya Tadatmanam Srijamyaham || Paritranaya Sadhunam Vinashaya Cha Dushkritam | Dharmasamsthapanarthaya Sambhavami Yuge Yuge ||",
        meaning: "ఎప్పుడెప్పుడు ధర్మమునకు హాని కలుగుతుందో, అధర్మము ప్రబలుతుందో, అప్పుడు సజ్జనుల రక్షణ కొరకు, దుష్టుల వినాశనము కొరకు, ధర్మ సంస్థాపన కొరకు నేను ప్రతి యుగమునందు అవతరిస్తాను."
      },
      {
        ref: "అధ్యాయం 9, శ్లోకం 22 (రాజవిద్యారాజగుహ్యయోగం)",
        text: "అనన్యాశ్చింతయంతో మాం యే జనాః పర్యుపాసతే |\\nతేషాం నిత్యాభియుక్తానాం యోగక్షేమం వహామ్యహమ్ ||",
        translit: "Ananyash Chintayanto Mam Ye Janah Paryupasate | Tesham Nityabhiyuktanam Yogakshemam Vahamyaham ||",
        meaning: "ఎవరైతే అనన్య భక్తితో నన్ను మాత్రమే ధ్యానిస్తూ ఉపాసిస్తారో, నిరంతరం నా యందే లగ్నమైన ఆ భక్తుల యోగక్షేమాలను నేనే స్వయంగా వహిస్తాను."
      },
      {
        ref: "అధ్యాయం 18, శ్లోకం 66 (మోక్షసన్యాసయోగం)",
        text: "సర్వధర్మాన్ పరిత్యజ్య మామేకం శరణం వ్రజ |\\nఅహం త్వా సర్వపాపేభ్యో మోక్షయిష్యామి మా శుచః ||",
        translit: "Sarva-dharman parityajya mam ekam sharanam vraja | Aham tva sarva-papebhyo mokshayishyami ma shuchah ||",
        meaning: "సకల ధర్మములను నా యందు సమర్పించి, నన్నొక్కడినే శరణు వేడుము. నేను నిన్ను సమస్త పాపముల నుండి విముక్తుడిని చేస్తాను, శోకింపకుము."
      }
    ];

    let currentIndex = 0;
    let chantCount = 0;

    function renderSloka(idx) {
      const s = slokas[idx];
      document.getElementById('slokaRef').innerText = s.ref;
      document.getElementById('slokaText').innerText = s.text;
      document.getElementById('slokaTranslit').innerText = s.translit;
      document.getElementById('slokaMeaning').innerText = s.meaning;
    }

    function nextSloka() {
      currentIndex = (currentIndex + 1) % slokas.length;
      renderSloka(currentIndex);
    }

    function prevSloka() {
      currentIndex = (currentIndex - 1 + slokas.length) % slokas.length;
      renderSloka(currentIndex);
    }

    function randomSloka() {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * slokas.length);
      } while (nextIdx === currentIndex && slokas.length > 1);
      currentIndex = nextIdx;
      renderSloka(currentIndex);
    }

    function addCount() {
      chantCount++;
      document.getElementById('counterVal').innerText = chantCount;
      if (navigator.vibrate) navigator.vibrate(30);
    }
  </script>
</body>
</html>`
  },
  {
    id: 'sample_puja_vidhanam',
    title: 'నిత్య పూజా విధానం',
    description: 'షోడశోపచార పూజా క్రమం, కలశార్చన, గణపతి ప్రార్థన మరియు అర్చన మంత్రాలు.',
    category: 'Spiritual',
    iconUrl: '/vastu_card.jpg',
    order: 1,
    createdAt: Date.now() - 43200000,
    htmlFileName: 'nitya_puja_vidhanam.html',
    htmlFileSize: 4200,
    htmlContent: `<!DOCTYPE html>
<html lang="te">
<head>
  <meta charset="UTF-8">
  <title>నిత్య పూజా విధానం</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Noto Serif Telugu', serif; background: #0c081e; color: #fff; padding: 24px; text-align: center; }
    h1 { color: #ffd700; margin-bottom: 8px; }
    .step { background: rgba(255,255,255,0.06); border: 1px solid #ffd700; border-radius: 16px; padding: 18px; margin: 16px auto; max-width: 600px; text-align: left; }
    .step-title { color: #ffd700; font-weight: bold; font-size: 1.1rem; margin-bottom: 6px; }
  </style>
</head>
<body>
  <h1>🪔 నిత్య పూజా విధానం</h1>
  <p>ప్రతిరోజూ ఉదయం మరియు సాయంత్రం ఆచరించదగిన పూజా క్రమము</p>
  <div class="step"><div class="step-title">1. ఆచమనం</div>ఓం కేశవాయ స్వాహా, ఓం నారాయణాయ స్వాహా, ఓం మాధవాయ స్వాహా...</div>
  <div class="step"><div class="step-title">2. గణపతి ప్రార్థన</div>శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజం | ప్రసన్నవదనం ధ్యాయేత్ సర్వవిఘ్నోపశాంతయే ||</div>
  <div class="step"><div class="step-title">3. దీపారాధన</div>దీపజ్యోతిః పరబ్రహ్మ దీపజ్యోతిర్జనార్దనః | దీపో హరతు మే పాపం సంధ్యాదీప నమోస్తుతే ||</div>
</body>
</html>`
  },
  {
    id: 'sample_mantra_counter',
    title: 'దైవ నామ జప మాల',
    description: 'ఓం నమః శివాయ, గాయత్రీ మంత్రం మరియు మహామృత్యుంజయ మంత్రాల డిజిటల్ జప సాధన.',
    category: 'Spiritual',
    iconUrl: '/shiva_entry_poster.jpg',
    order: 2,
    createdAt: Date.now() - 21600000,
    htmlFileName: 'japa_mala_counter.html',
    htmlFileSize: 3800,
    htmlContent: `<!DOCTYPE html>
<html lang="te">
<head>
  <meta charset="UTF-8">
  <title>దైవ నామ జప మాల</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Noto Serif Telugu', serif; background: #0b071a; color: #fff; padding: 24px; text-align: center; }
    h1 { color: #ffd700; }
    .circle-btn { width: 140px; height: 140px; border-radius: 50%; background: linear-gradient(135deg, #ffd700, #ff9800); color: #0b071a; border: none; font-size: 1.4rem; font-weight: bold; cursor: pointer; margin: 30px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 25px rgba(255,215,0,0.4); }
    .count { font-size: 3rem; color: #ffd700; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>📿 దైవ నామ జప సాధన</h1>
  <div class="count" id="c">0</div>
  <p>108 జప సంఖ్య పూర్తి చేయండి</p>
  <button class="circle-btn" onclick="inc()">జపించు 🙏</button>
  <script>
    let n = 0;
    function inc() { n++; document.getElementById('c').innerText = n; if(n===108) alert('108 జపం పూర్తయినది! హరి ఓం!'); }
  </script>
</body>
</html>`
  }
];
