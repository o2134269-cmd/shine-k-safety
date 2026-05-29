/* Shine-K — trilingual dictionary (EN / 中文 / 한국어).
   Static UI strings keyed by their data-i18n attribute (flat dotted keys).
   Dynamic dashboard strings/structures live under the same language object. */
window.I18N = {

/* ====================== ENGLISH ====================== */
en:{
  "meta.title":"Shine-K · AI Industrial Safety Platform",
  "meta.desc":"Shine-K — AI-powered industrial safety platform for SME manufacturers. Predict accident and cumulative health hazards using the infrastructure you already own.",
  "a11y.skip":"Skip to content",

  "nav.problem":"Challenge","nav.solution":"Solution","nav.dashboard":"Live Demo",
  "nav.how":"How it works","nav.impact":"Impact","nav.ecosystem":"Ecosystem",

  "hero.eyebrow":"AX-powered Industrial Safety · Gyeongbuk, Korea",
  "hero.title":"A workplace where every worker goes home safe.",
  "hero.sub":"Shine-K turns the cameras, microphones and IoT you already own into an AI safety brain — predicting both sudden accidents and slow, cumulative health risks for small and mid-sized manufacturers.",
  "hero.ctaPrimary":"Explore the live platform","hero.ctaSecondary":"How it works",
  "hero.badge1":"No new sensors","hero.badge2":"Privacy by design","hero.badge3":"Real-time + predictive",
  "hero.cardTitle":"Live site safety index","hero.zones":"Zones monitored","hero.alerts":"Risks prevented today",
  "hero.stat1":"SME manufacturers in Korea","hero.stat2":"2024 industrial accident rate",
  "hero.stat3":"2030 target with prevention","hero.stat4":"of fatalities at musculoskeletal-risk SMEs",

  "problem.kicker":"The challenge","problem.title":"Two kinds of danger hide on every factory floor",
  "problem.lead":"SME manufacturers carry the highest accident burden, yet most rely on experience and paper checklists. Risk lives in two timescales — and both go unmeasured.",
  "problem.acuteTitle":"Accident Hazard","problem.acuteSub":"Immediate, process-driven events",
  "problem.acute1":"Caught-in & pinch points on machinery","problem.acute2":"Falls from height & slips",
  "problem.acute3":"Explosion, fire & chemical leaks","problem.acute4":"Struck-by & collisions",
  "problem.acuteFoot":"of 2023 manufacturing accidents were caught-in, falls or struck-by",
  "problem.chronicTitle":"Cumulative Hazard","problem.chronicSub":"Slow harm from repeated exposure",
  "problem.chronic1":"Musculoskeletal strain & back pain","problem.chronic2":"Respiratory disease & pneumoconiosis",
  "problem.chronic3":"Noise, vibration & heat stress","problem.chronic4":"Chronic conditions over years",
  "problem.chronicFoot":"of Gyeongbuk occupational illness is musculoskeletal",
  "problem.s1":"OECD ranking on fatal accidents (of 38)","problem.s2":"of fatal accidents at firms under 50 staff",
  "problem.s3":"occupational-illness cases in Gyeongbuk","problem.s4":"industrial-safety market by 2030",

  "solution.kicker":"The Shine-K approach","solution.title":"Use the infrastructure you already have",
  "solution.lead":"No costly retrofits. Shine-K ingests signals from existing CCTV, microphones, smartphones and IoT, then a privacy-first AI pipeline turns them into a single, comparable risk score.",
  "solution.src1":"CCTV","solution.src2":"Microphones","solution.src3":"Smartphones","solution.src4":"IoT sensors",
  "solution.p1t":"De-identify","solution.p1d":"Faces & voices anonymised at the edge — privacy by design.",
  "solution.p2t":"Integrate","solution.p2d":"The SHine-K standard schema unifies heterogeneous data.",
  "solution.p3t":"Detect","solution.p3d":"AI finds trends & anomalies, identifies risk factors.",
  "solution.p4t":"Score & share","solution.p4d":"A unified risk score, alerts & insight to everyone on site.",

  "dash.kicker":"Live platform · simulated demo","dash.title":"The safety control room, in your browser",
  "dash.lead":"A live simulation of the Shine-K operations console. Data updates in real time to show how accident and cumulative risks are detected, predicted and acted on.",
  "dash.indexTitle":"Site safety index","dash.safe":"Safe","dash.watch":"Watch","dash.danger":"Danger",
  "dash.predictTitle":"AI risk prediction · next 12h",
  "dash.predictNote":"Forecast band shows the AI's projected accident-risk index. A predicted breach triggers a pre-emptive alert.",
  "dash.zonesTitle":"Zone monitor","dash.feedTitle":"Live event feed",
  "dash.healthTitle":"Workforce health · cumulative risk","dash.roiTitle":"ROI calculator",
  "dash.roiNote":"See the financial case for prevention. Adjust to your site.",
  "dash.roiWorkers":"Workers on site","dash.roiIncidents":"Recordable incidents / year","dash.roiCost":"Avg. cost / incident (₩M)",
  "dash.roiSaved":"Est. annual saving","dash.roiPayback":"Payback period","dash.roiRatio":"1-year ROI",
  "dash.roiDisclaimer":"Illustrative model: assumes Shine-K prevents ~45% of recordable incidents (prediction-led prevention).",
  "dash.mapTitle":"Gyeongbuk manufacturing clusters · live",

  "how.kicker":"Prevention, not punishment","how.title":"From “what happened” to “what’s about to”",
  "how.lead":"Shine-K shifts safety from a reactive, punitive model to a predictive one — detecting weak signals before they become incidents.",
  "how.s1t":"Connect","how.s1d":"Link existing CCTV, mics, phones and IoT in hours — no factory shutdown, no capital sensors.",
  "how.s2t":"Learn","how.s2d":"AI baselines each line and worker context, learning what “normal” looks like for your site.",
  "how.s3t":"Predict & protect","how.s3d":"Anomalies and rising trends trigger alerts and health programs before harm occurs.",

  "feat.kicker":"Platform capabilities","feat.title":"One platform, the whole safety picture",
  "feat.f1t":"Real-time monitoring","feat.f1d":"Continuous risk surveillance across every zone, with instant alerting.",
  "feat.f2t":"Predictive AI","feat.f2d":"Forecasts accident-risk hours ahead so teams act before, not after.",
  "feat.f3t":"Worker health programs","feat.f3d":"Personalised, data-driven health promotion for cumulative risks.",
  "feat.f4t":"Privacy by design","feat.f4d":"Edge de-identification of faces and voices before anything is stored.",
  "feat.f5t":"SHine-K open schema","feat.f5d":"A standard data schema that unifies any sensor or legacy system.",
  "feat.f6t":"Automatic ROI","feat.f6d":"Links safety outcomes to finance, computing return on prevention.",

  "impact.kicker":"National impact","impact.title":"A measurable path to fewer lives lost",
  "impact.lead":"Aligned with Korea's goal to halve the industrial accident-fatality rate — toward and below the OECD average.",
  "impact.chartTitle":"Accident rate trajectory (%)",
  "impact.k1":"Targeted accident-rate cut by 2030","impact.k2":"Govt. 2026 accident-prevention budget",
  "impact.k3":"New industries: prediction, safety-ed, wearables",

  "eco.kicker":"Built with the region","eco.title":"An industry–government–university–research alliance",
  "eco.lead":"Shine-K is anchored by Kyungwoon University's Industrial Safety R&D, a Living Lab, and a regional safety-tech support center.",
  "eco.c1t":"Industry–Gov–Univ–Research Alliance","eco.c1d":"Industry, government, academia & research co-develop and validate on real sites.",
  "eco.c2t":"Living Lab","eco.c2d":"A shared risk-factor database and field test-bed for new safety tech.",
  "eco.c3t":"Safety-Tech Center","eco.c3d":"Training, certification and startup support to grow a safety industry.",

  "cta.title":"Make every workplace one where people come home safe.","cta.btn":"Open the live platform",

  "footer.tag":"AI industrial safety platform for SME manufacturers.","footer.ces":"Innovation Award entry",
  "footer.org":"Organization","footer.center":"Worker Safety Support Center","footer.region":"Gyeongbuk, Republic of Korea",
  "footer.contact":"Contact","footer.note":"Note",
  "footer.disclaimer":"Dashboard figures are a simulated demonstration for the KW·AI platform competition.",
  "footer.built":"Built to run on every device, everywhere — no tracking, no third-party calls.",

  /* dynamic */
  "app.indexLabel":"SAFE INDEX","app.now":"now","app.predicted":"predicted","app.threshold":"alert threshold",
  "app.hoursAbbr":"h","app.workers":"workers","app.sites":"sites","app.unitB":"B","app.unitM":"M","app.months":"mo",
  zones:[
    {n:"Welding Bay A",t:"12 workers · arc + fume"},
    {n:"Press Line 2",t:"caught-in risk · 18 workers"},
    {n:"Chemical Store",t:"VOC + leak watch"},
    {n:"Assembly Hall",t:"24 workers · ergonomic"},
    {n:"Forklift Aisle",t:"traffic + struck-by"},
    {n:"Loading Dock",t:"falls + heavy lift"}
  ],
  events:[
    {ic:"⚠️",cls:"ai-danger",ti:"Predicted pinch-point risk · Press Line 2",su:"AI raised guarding alert 9 min before pattern peak"},
    {ic:"🦺",cls:"ai-watch",ti:"Missing PPE detected · Welding Bay A",su:"Vision model flagged 1 worker without face shield"},
    {ic:"🌫️",cls:"ai-watch",ti:"VOC rising · Chemical Store",su:"Ventilation auto-boost recommended"},
    {ic:"🚜",cls:"ai-info",ti:"Forklift over-speed · Aisle 3",su:"Driver coaching notice sent"},
    {ic:"🌡️",cls:"ai-watch",ti:"Heat-stress index up · Assembly Hall",su:"Hydration break suggested for line 4"},
    {ic:"✅",cls:"ai-safe",ti:"Guarding restored · Press Line 2",su:"Risk returned to safe band"},
    {ic:"🔊",cls:"ai-info",ti:"Noise dose 82dB · 6h exposure",su:"Rotation recommended to limit hearing risk"},
    {ic:"🧯",cls:"ai-safe",ti:"Leak watch cleared · Chemical Store",su:"Sensors back within normal range"}
  ],
  health:[
    {n:"Healthy baseline",c:"#1faa6b"},
    {n:"Musculoskeletal",c:"#2f6bff"},
    {n:"Respiratory",c:"#7c5cff"},
    {n:"Hearing risk",c:"#f0a818"},
    {n:"Heat / fatigue",c:"#e0483d"}
  ],
  clusters:[
    {n:"Gumi National Complex",t:"Electronics · Semiconductor"},
    {n:"Pohang · Gyeongju",t:"Steel · Metal"},
    {n:"Andong Region",t:"Food · Wood · Textile"}
  ]
},

/* ====================== 中文 (简体) ====================== */
zh:{
  "meta.title":"Shine-K · 人工智能工业安全平台",
  "meta.desc":"Shine-K——面向中小制造企业的人工智能工业安全平台。利用您现有的基础设施，预测突发事故与累积性健康风险。",
  "a11y.skip":"跳到主要内容",

  "nav.problem":"挑战","nav.solution":"解决方案","nav.dashboard":"在线演示",
  "nav.how":"工作原理","nav.impact":"社会效益","nav.ecosystem":"生态体系",

  "hero.eyebrow":"AX 智能工业安全 · 韩国庆尚北道",
  "hero.title":"让每一位工人都能平安回家的工作场所。",
  "hero.sub":"Shine-K 将您已有的摄像头、麦克风和物联网设备，转化为人工智能安全大脑——为中小制造企业同时预测突发事故与缓慢累积的健康风险。",
  "hero.ctaPrimary":"体验在线平台","hero.ctaSecondary":"工作原理",
  "hero.badge1":"无需新增传感器","hero.badge2":"隐私优先设计","hero.badge3":"实时 + 预测",
  "hero.cardTitle":"实时现场安全指数","hero.zones":"监测区域","hero.alerts":"今日已预防风险",
  "hero.stat1":"韩国中小制造企业","hero.stat2":"2024 年工伤事故率",
  "hero.stat3":"2030 年预防目标","hero.stat4":"死亡事故集中于肌骨风险中小企业",

  "problem.kicker":"行业挑战","problem.title":"每个车间都潜藏两类危险",
  "problem.lead":"中小制造企业承担最高的事故负担，却大多依靠经验和纸质清单。风险存在于两个时间尺度——两者均未被量化。",
  "problem.acuteTitle":"事故型危险","problem.acuteSub":"由工艺引发的即时事件",
  "problem.acute1":"机械卷入与夹点","problem.acute2":"高处坠落与滑倒",
  "problem.acute3":"爆炸、火灾与化学品泄漏","problem.acute4":"物体打击与碰撞",
  "problem.acuteFoot":"2023 年制造业事故中卷入、坠落或打击所占比例",
  "problem.chronicTitle":"累积型危险","problem.chronicSub":"反复暴露造成的缓慢伤害",
  "problem.chronic1":"肌肉骨骼劳损与腰痛","problem.chronic2":"呼吸系统疾病与尘肺",
  "problem.chronic3":"噪声、振动与热应激","problem.chronic4":"多年累积的慢性疾病",
  "problem.chronicFoot":"庆北职业病中属肌肉骨骼疾病的比例",
  "problem.s1":"致命事故 OECD 排名（共 38 国）","problem.s2":"致命事故发生于 50 人以下企业",
  "problem.s3":"庆尚北道职业病病例","problem.s4":"2030 年工业安全市场规模",

  "solution.kicker":"Shine-K 方法","solution.title":"善用您已有的基础设施",
  "solution.lead":"无需昂贵改造。Shine-K 接入现有的摄像头、麦克风、智能手机与物联网信号，再由隐私优先的人工智能流水线，转化为统一可比的风险评分。",
  "solution.src1":"摄像头","solution.src2":"麦克风","solution.src3":"智能手机","solution.src4":"物联网传感器",
  "solution.p1t":"去标识化","solution.p1d":"在边缘端对人脸与声音匿名化——隐私优先设计。",
  "solution.p2t":"数据整合","solution.p2d":"SHine-K 标准数据模式统一异构数据。",
  "solution.p3t":"智能检测","solution.p3d":"人工智能发现趋势与异常，识别风险因素。",
  "solution.p4t":"评分与共享","solution.p4d":"统一风险评分、告警与洞察，触达现场每个人。",

  "dash.kicker":"在线平台 · 模拟演示","dash.title":"浏览器中的安全控制中心",
  "dash.lead":"Shine-K 运营控制台的实时模拟。数据实时更新，展示事故与累积风险如何被检测、预测并处置。",
  "dash.indexTitle":"现场安全指数","dash.safe":"安全","dash.watch":"注意","dash.danger":"危险",
  "dash.predictTitle":"AI 风险预测 · 未来 12 小时",
  "dash.predictNote":"预测带显示人工智能预测的事故风险指数。预测到突破阈值即触发预防性告警。",
  "dash.zonesTitle":"区域监测","dash.feedTitle":"实时事件流",
  "dash.healthTitle":"员工健康 · 累积风险","dash.roiTitle":"投资回报计算器",
  "dash.roiNote":"了解预防的经济价值。可按您的现场调整。",
  "dash.roiWorkers":"现场工人数","dash.roiIncidents":"每年可记录事故数","dash.roiCost":"每起事故平均成本（百万韩元）",
  "dash.roiSaved":"预计年度节省","dash.roiPayback":"投资回收期","dash.roiRatio":"一年投资回报率",
  "dash.roiDisclaimer":"示意模型：假设 Shine-K 通过预测式预防减少约 45% 的可记录事故。",
  "dash.mapTitle":"庆北制造产业集群 · 实时",

  "how.kicker":"预防，而非惩罚","how.title":"从“已经发生”到“即将发生”",
  "how.lead":"Shine-K 将安全从被动惩罚模式转向预测模式——在弱信号演变为事故之前及时发现。",
  "how.s1t":"接入","how.s1d":"数小时内接入现有摄像头、麦克风、手机与物联网——无需停产，无需资本性传感器。",
  "how.s2t":"学习","how.s2d":"人工智能为每条产线和工人情境建立基线，学习您现场的“正常”状态。",
  "how.s3t":"预测与防护","how.s3d":"异常与上升趋势在造成伤害前触发告警与健康干预。",

  "feat.kicker":"平台能力","feat.title":"一个平台，掌握安全全貌",
  "feat.f1t":"实时监测","feat.f1d":"对每个区域持续进行风险监控并即时告警。",
  "feat.f2t":"预测式 AI","feat.f2d":"提前数小时预测事故风险，让团队事前行动。",
  "feat.f3t":"员工健康计划","feat.f3d":"针对累积风险的个性化、数据驱动健康促进。",
  "feat.f4t":"隐私优先设计","feat.f4d":"在存储前于边缘端对人脸和声音去标识化。",
  "feat.f5t":"SHine-K 开放模式","feat.f5d":"统一任意传感器或既有系统的标准数据模式。",
  "feat.f6t":"自动投资回报","feat.f6d":"将安全成效与财务关联，计算预防回报。",

  "impact.kicker":"社会效益","impact.title":"减少伤亡的可量化路径",
  "impact.lead":"契合韩国将工伤死亡率减半的目标——向 OECD 平均水平及以下迈进。",
  "impact.chartTitle":"事故率走势（%）",
  "impact.k1":"2030 年目标事故率降幅","impact.k2":"政府 2026 年事故预防预算",
  "impact.k3":"三大新兴产业：预测分析、安全教育、可穿戴设备",

  "eco.kicker":"与地区共建","eco.title":"产—政—学—研联盟",
  "eco.lead":"Shine-K 以庆云大学工业安全研发、生活实验室及区域安全技术支持中心为依托。",
  "eco.c1t":"产政学研联盟","eco.c1d":"产业、政府、学界与研究机构在真实现场共同研发与验证。",
  "eco.c2t":"生活实验室","eco.c2d":"共享风险因素数据库与新型安全技术的现场试验场。",
  "eco.c3t":"安全技术中心","eco.c3d":"提供培训、认证与创业支持，培育安全产业。",

  "cta.title":"让每个工作场所，都能让人平安回家。","cta.btn":"打开在线平台",

  "footer.tag":"面向中小制造企业的人工智能工业安全平台。","footer.ces":"创新奖参选作品",
  "footer.org":"主办机构","footer.center":"劳动者安全支持中心","footer.region":"韩国庆尚北道",
  "footer.contact":"联系方式","footer.note":"说明",
  "footer.disclaimer":"控制台数据为 KW·AI 平台竞赛的模拟演示。",
  "footer.built":"为全球各类设备而构建——无追踪，无第三方请求。",

  "app.indexLabel":"安全指数","app.now":"现在","app.predicted":"预测","app.threshold":"告警阈值",
  "app.hoursAbbr":"小时","app.workers":"名工人","app.sites":"家企业","app.unitB":"亿","app.unitM":"百万","app.months":"个月",
  zones:[
    {n:"焊接车间 A",t:"12 名工人 · 电弧+烟尘"},
    {n:"冲压产线 2",t:"卷入风险 · 18 名工人"},
    {n:"化学品仓库",t:"VOC + 泄漏监测"},
    {n:"总装车间",t:"24 名工人 · 人体工效"},
    {n:"叉车通道",t:"交通 + 物体打击"},
    {n:"装卸平台",t:"坠落 + 重物搬运"}
  ],
  events:[
    {ic:"⚠️",cls:"ai-danger",ti:"预测夹点风险 · 冲压产线 2",su:"AI 在风险峰值前 9 分钟发出护栏告警"},
    {ic:"🦺",cls:"ai-watch",ti:"检测到未戴防护 · 焊接车间 A",su:"视觉模型标记 1 名工人未戴面罩"},
    {ic:"🌫️",cls:"ai-watch",ti:"VOC 上升 · 化学品仓库",su:"建议自动加强通风"},
    {ic:"🚜",cls:"ai-info",ti:"叉车超速 · 通道 3",su:"已向司机发送提醒"},
    {ic:"🌡️",cls:"ai-watch",ti:"热应激指数上升 · 总装车间",su:"建议第 4 线安排补水休息"},
    {ic:"✅",cls:"ai-safe",ti:"护栏已恢复 · 冲压产线 2",su:"风险回到安全区间"},
    {ic:"🔊",cls:"ai-info",ti:"噪声剂量 82dB · 暴露 6 小时",su:"建议轮岗以降低听力风险"},
    {ic:"🧯",cls:"ai-safe",ti:"泄漏监测解除 · 化学品仓库",su:"传感器恢复正常范围"}
  ],
  health:[
    {n:"健康基线",c:"#1faa6b"},
    {n:"肌肉骨骼",c:"#2f6bff"},
    {n:"呼吸系统",c:"#7c5cff"},
    {n:"听力风险",c:"#f0a818"},
    {n:"热 / 疲劳",c:"#e0483d"}
  ],
  clusters:[
    {n:"龟尾国家产业园",t:"电子 · 半导体"},
    {n:"浦项 · 庆州",t:"钢铁 · 金属"},
    {n:"安东地区",t:"食品 · 木材 · 纺织"}
  ]
},

/* ====================== 한국어 ====================== */
ko:{
  "meta.title":"Shine-K · AI 산업안전 플랫폼",
  "meta.desc":"Shine-K — 중소제조기업을 위한 AI 산업안전 플랫폼. 이미 보유한 인프라로 사고위험과 누적 건강위험을 예측합니다.",
  "a11y.skip":"본문으로 건너뛰기",

  "nav.problem":"과제","nav.solution":"솔루션","nav.dashboard":"라이브 데모",
  "nav.how":"작동 원리","nav.impact":"기대효과","nav.ecosystem":"생태계",

  "hero.eyebrow":"AX 기반 산업안전 · 대한민국 경상북도",
  "hero.title":"모든 근로자가 안전하게 퇴근하는 일터.",
  "hero.sub":"Shine-K는 이미 보유한 카메라·마이크·IoT를 AI 안전 두뇌로 바꿔, 중소제조기업의 갑작스러운 사고위험과 서서히 쌓이는 누적 건강위험을 함께 예측합니다.",
  "hero.ctaPrimary":"라이브 플랫폼 살펴보기","hero.ctaSecondary":"작동 원리",
  "hero.badge1":"신규 센서 불필요","hero.badge2":"프라이버시 우선 설계","hero.badge3":"실시간 + 예측",
  "hero.cardTitle":"실시간 현장 안전지수","hero.zones":"모니터링 구역","hero.alerts":"오늘 예방한 위험",
  "hero.stat1":"국내 중소제조기업 수","hero.stat2":"2024년 산업재해율",
  "hero.stat3":"예방 기반 2030년 목표","hero.stat4":"근골격계 위험 중소기업의 사망 비중",

  "problem.kicker":"과제","problem.title":"모든 작업 현장에 숨어 있는 두 가지 위험",
  "problem.lead":"중소제조기업은 가장 높은 재해 부담을 안고 있지만, 대부분 경험과 종이 점검표에 의존합니다. 위험은 두 개의 시간축에 존재하며, 둘 다 측정되지 않습니다.",
  "problem.acuteTitle":"사고위험","problem.acuteSub":"공정에서 발생하는 즉각적 사건",
  "problem.acute1":"기계 끼임 및 협착 지점","problem.acute2":"고소 추락 및 미끄러짐",
  "problem.acute3":"폭발·화재 및 화학물질 누출","problem.acute4":"부딪힘 및 충돌",
  "problem.acuteFoot":"2023년 제조업 사고 중 끼임·추락·부딪힘 비중",
  "problem.chronicTitle":"누적위험","problem.chronicSub":"반복 노출로 인한 서서히 쌓이는 피해",
  "problem.chronic1":"근골격계 부담 및 요통","problem.chronic2":"호흡기 질환 및 진폐증",
  "problem.chronic3":"소음·진동 및 온열 스트레스","problem.chronic4":"수년에 걸친 만성 질환",
  "problem.chronicFoot":"경북 직업성 질병 중 근골격계 비중",
  "problem.s1":"치명 재해 OECD 순위 (38개국 중)","problem.s2":"치명 재해가 50인 미만 사업장에서 발생",
  "problem.s3":"경상북도 질병재해자 수","problem.s4":"2030년 산업안전 시장 규모",

  "solution.kicker":"Shine-K 접근법","solution.title":"이미 보유한 인프라를 활용하세요",
  "solution.lead":"값비싼 개조가 필요 없습니다. Shine-K는 기존 CCTV·마이크·스마트폰·IoT 신호를 수집하고, 프라이버시 우선 AI 파이프라인이 이를 하나의 비교 가능한 위험 점수로 변환합니다.",
  "solution.src1":"CCTV","solution.src2":"마이크","solution.src3":"스마트폰","solution.src4":"IoT 센서",
  "solution.p1t":"비식별화","solution.p1d":"엣지에서 얼굴·음성을 익명화 — 프라이버시 우선 설계.",
  "solution.p2t":"통합","solution.p2d":"SHine-K 표준 스키마가 이기종 데이터를 통합합니다.",
  "solution.p3t":"탐지","solution.p3d":"AI가 경향·이상을 찾아 위험요인을 식별합니다.",
  "solution.p4t":"점수화·공유","solution.p4d":"통합 위험 점수와 알림·인사이트를 현장 모두에게.",

  "dash.kicker":"라이브 플랫폼 · 시뮬레이션 데모","dash.title":"브라우저 속 안전 관제센터",
  "dash.lead":"Shine-K 운영 콘솔의 실시간 시뮬레이션입니다. 데이터가 실시간으로 갱신되며 사고·누적 위험이 어떻게 탐지·예측·조치되는지 보여줍니다.",
  "dash.indexTitle":"현장 안전지수","dash.safe":"안전","dash.watch":"주의","dash.danger":"위험",
  "dash.predictTitle":"AI 위험 예측 · 향후 12시간",
  "dash.predictNote":"예측 구간은 AI가 전망한 사고위험 지수입니다. 임계치 돌파가 예측되면 선제적 알림이 발동됩니다.",
  "dash.zonesTitle":"구역 모니터","dash.feedTitle":"실시간 이벤트 피드",
  "dash.healthTitle":"근로자 건강 · 누적위험","dash.roiTitle":"ROI 계산기",
  "dash.roiNote":"예방의 경제적 효과를 확인하세요. 현장에 맞게 조정할 수 있습니다.",
  "dash.roiWorkers":"현장 근로자 수","dash.roiIncidents":"연간 보고 가능 사고 건수","dash.roiCost":"사고당 평균 비용(백만 원)",
  "dash.roiSaved":"연간 예상 절감액","dash.roiPayback":"투자 회수기간","dash.roiRatio":"1년 ROI",
  "dash.roiDisclaimer":"예시 모델: Shine-K가 예측 기반 예방으로 보고 가능 사고의 약 45%를 예방한다고 가정.",
  "dash.mapTitle":"경북 제조산업 클러스터 · 실시간",

  "how.kicker":"처벌이 아닌 예방","how.title":"‘무엇이 일어났나’에서 ‘무엇이 일어날까’로",
  "how.lead":"Shine-K는 안전을 사후·징벌적 모델에서 예측 모델로 전환해, 약한 신호가 사고가 되기 전에 포착합니다.",
  "how.s1t":"연결","how.s1d":"기존 CCTV·마이크·스마트폰·IoT를 몇 시간 만에 연결 — 가동 중단도, 고가 센서도 필요 없습니다.",
  "how.s2t":"학습","how.s2d":"AI가 각 라인과 근로자 맥락의 기준선을 잡아 현장의 ‘정상’을 학습합니다.",
  "how.s3t":"예측·보호","how.s3d":"이상과 상승 추세가 피해 발생 전에 알림과 건강 프로그램을 발동합니다.",

  "feat.kicker":"플랫폼 기능","feat.title":"하나의 플랫폼, 안전의 전체 그림",
  "feat.f1t":"실시간 관제","feat.f1d":"모든 구역의 위험을 상시 감시하고 즉시 알립니다.",
  "feat.f2t":"예측 AI","feat.f2d":"사고위험을 몇 시간 앞서 예측해 사후가 아닌 사전에 대응합니다.",
  "feat.f3t":"근로자 건강 프로그램","feat.f3d":"누적위험에 대한 개인 맞춤·데이터 기반 건강 증진.",
  "feat.f4t":"프라이버시 우선 설계","feat.f4d":"저장 전 엣지에서 얼굴·음성을 비식별화합니다.",
  "feat.f5t":"SHine-K 개방형 스키마","feat.f5d":"어떤 센서·레거시 시스템도 통합하는 표준 데이터 스키마.",
  "feat.f6t":"자동 ROI","feat.f6d":"안전 성과를 재무와 연동해 예방 투자수익을 계산합니다.",

  "impact.kicker":"기대효과","impact.title":"인명 피해를 줄이는 측정 가능한 길",
  "impact.lead":"산재 사망률을 절반으로 줄이려는 국가 목표에 부합 — OECD 평균 수준 이하를 향해.",
  "impact.chartTitle":"산업재해율 추이 (%)",
  "impact.k1":"2030년 목표 재해율 감축폭","impact.k2":"정부 2026년 재해예방 예산",
  "impact.k3":"3대 신산업: 예측분석·안전교육·웨어러블",

  "eco.kicker":"지역과 함께 구축","eco.title":"지산학연 얼라이언스",
  "eco.lead":"Shine-K는 경운대학교 산업안전 R&D, 리빙랩, 지역 안전기술지원센터를 기반으로 합니다.",
  "eco.c1t":"지산학연 얼라이언스","eco.c1d":"산업·정부·학계·연구가 실제 현장에서 공동 개발하고 검증합니다.",
  "eco.c2t":"리빙랩(Living Lab)","eco.c2d":"위험요인 공유 DB와 신규 안전기술의 현장 테스트베드.",
  "eco.c3t":"안전기술지원센터","eco.c3d":"교육·인증·창업 지원으로 안전산업을 육성합니다.",

  "cta.title":"모든 일터를, 사람이 안전하게 돌아오는 곳으로.","cta.btn":"라이브 플랫폼 열기",

  "footer.tag":"중소제조기업을 위한 AI 산업안전 플랫폼.","footer.ces":"혁신상 출품작",
  "footer.org":"주최/주관","footer.center":"근로자안전지원센터","footer.region":"대한민국 경상북도",
  "footer.contact":"문의","footer.note":"안내",
  "footer.disclaimer":"대시보드 수치는 KW·AI 플랫폼 경진대회를 위한 시뮬레이션 시연입니다.",
  "footer.built":"전 세계 모든 기기에서 작동하도록 제작 — 추적 없음, 외부 호출 없음.",

  "app.indexLabel":"안전지수","app.now":"현재","app.predicted":"예측","app.threshold":"알림 임계치",
  "app.hoursAbbr":"시간","app.workers":"명","app.sites":"개사","app.unitB":"억","app.unitM":"백만","app.months":"개월",
  zones:[
    {n:"용접장 A",t:"12명 · 아크+흄"},
    {n:"프레스 라인 2",t:"끼임 위험 · 18명"},
    {n:"화학물질 저장소",t:"VOC + 누출 감시"},
    {n:"조립장",t:"24명 · 근골격계"},
    {n:"지게차 통로",t:"통행 + 부딪힘"},
    {n:"상하차장",t:"추락 + 중량물"}
  ],
  events:[
    {ic:"⚠️",cls:"ai-danger",ti:"끼임 위험 예측 · 프레스 라인 2",su:"AI가 패턴 정점 9분 전 방호 알림 발령"},
    {ic:"🦺",cls:"ai-watch",ti:"보호구 미착용 감지 · 용접장 A",su:"영상 모델이 안면보호구 미착용 1명 식별"},
    {ic:"🌫️",cls:"ai-watch",ti:"VOC 상승 · 화학물질 저장소",su:"환기 자동 강화 권장"},
    {ic:"🚜",cls:"ai-info",ti:"지게차 과속 · 통로 3",su:"운전자 코칭 알림 발송"},
    {ic:"🌡️",cls:"ai-watch",ti:"온열 스트레스 지수 상승 · 조립장",su:"4라인 수분 섭취 휴식 권장"},
    {ic:"✅",cls:"ai-safe",ti:"방호 복구 · 프레스 라인 2",su:"위험이 안전 구간으로 복귀"},
    {ic:"🔊",cls:"ai-info",ti:"소음 노출 82dB · 6시간",su:"청력 보호 위해 작업 순환 권장"},
    {ic:"🧯",cls:"ai-safe",ti:"누출 감시 해제 · 화학물질 저장소",su:"센서가 정상 범위로 회복"}
  ],
  health:[
    {n:"건강 기준선",c:"#1faa6b"},
    {n:"근골격계",c:"#2f6bff"},
    {n:"호흡기",c:"#7c5cff"},
    {n:"청력 위험",c:"#f0a818"},
    {n:"온열 / 피로",c:"#e0483d"}
  ],
  clusters:[
    {n:"구미 국가산단",t:"전자 · 반도체"},
    {n:"포항 · 경주",t:"철강 · 금속"},
    {n:"안동권",t:"식품 · 목재 · 섬유"}
  ]
}
};
