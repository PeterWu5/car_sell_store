"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const showroomInventory = [
  {
    id: "car-1",
    type: "sedan",
    tag: "HOT PICK",
    zone: "Reception Lounge",
    areaTitle: "接待区 · 家用轿车",
    areaText:
      "主推家轿放在接待台前方，用户一进页面就能感受到门店质感、车身反光和整体陈列秩序。",
    title: "本田 Accord 260TURBO 豪华版",
    price: 118800,
    priceLabel: "¥118,800",
    meta: ["2020 年", "4.8 万公里", "1.5T 自动"],
    status: "可试驾 · 一手家用",
    image: "/assets/images/showroom/showroom-01.webp",
    alt: "北京高端二手车展厅接待区里展示的一辆家用轿车",
    objectPosition: "center 50%",
  },
  {
    id: "car-2",
    type: "suv",
    tag: "FAMILY",
    zone: "Central Island",
    areaTitle: "中岛区 · 家庭 SUV",
    areaText:
      "中岛区更适合承接空间感强的车型，视觉上既能看出车身体量，也能看出展厅的开阔感。",
    title: "丰田 RAV4 荣放 2.0L 两驱风尚",
    price: 149600,
    priceLabel: "¥149,600",
    meta: ["2021 年", "3.2 万公里", "家用 SUV"],
    status: "空间宽裕 · 支持分期",
    image: "/assets/images/showroom/showroom-02.webp",
    alt: "北京高端二手车展厅中岛区里展示的一辆家庭SUV",
    objectPosition: "center 54%",
  },
  {
    id: "car-3",
    type: "ev",
    tag: "EV",
    zone: "Window Gallery",
    areaTitle: "落地窗区 · 新能源轿车",
    areaText:
      "靠窗区域更适合新能源车型，自然光和镜面地面一起工作，画面会更像真实到店的第一眼。",
    title: "比亚迪 海豹 550KM 尊贵型",
    price: 132900,
    priceLabel: "¥132,900",
    meta: ["2023 年", "1.1 万公里", "纯电续航 550km"],
    status: "车新里程少 · 支持快充",
    image: "/assets/images/showroom/showroom-03.webp",
    alt: "北京高端二手车展厅落地窗区域里展示的一辆新能源轿车",
    objectPosition: "center 56%",
  },
  {
    id: "car-4",
    type: "suv",
    tag: "VALUE",
    zone: "SUV Corridor",
    areaTitle: "SUV 专区通道",
    areaText:
      "灯带和通道形成更强的记忆点，让第二台 SUV 不只是换一辆车，而是换一种到店区域体验。",
    title: "马自达 CX-5 2.5L 四驱智尊型",
    price: 108500,
    priceLabel: "¥108,500",
    meta: ["2019 年", "6.3 万公里", "操控型 SUV"],
    status: "底盘扎实 · 适合长途",
    image: "/assets/images/showroom/showroom-04.webp",
    alt: "北京高端二手车展厅SUV通道区域里展示的一辆深色SUV",
    objectPosition: "center 50%",
  },
  {
    id: "car-5",
    type: "mpv",
    tag: "BUSINESS",
    zone: "VIP Lounge",
    areaTitle: "VIP 区 · 商务 MPV",
    areaText:
      "把商务 MPV 放进洽谈和接待一体的 VIP 区域，更贴近家庭出行和商务接待用户的心理预期。",
    title: "别克 GL8 ES 陆尊 653T 豪华型",
    price: 196000,
    priceLabel: "¥196,000",
    meta: ["2021 年", "5.6 万公里", "7 座 MPV"],
    status: "商务接待 · 家庭长途",
    image: "/assets/images/showroom/showroom-05.webp",
    alt: "北京高端二手车展厅VIP洽谈区域里展示的一辆商务MPV",
    objectPosition: "center 52%",
  },
  {
    id: "car-6",
    type: "sedan",
    tag: "CITY",
    zone: "Delivery Bay",
    areaTitle: "交付区 · 舒适家轿",
    areaText:
      "最后一张放在交付和检测展示区，让用户自然联想到看完之后就能来店里完成提车流程。",
    title: "日产 天籁 2.0 XL 舒适版",
    price: 86900,
    priceLabel: "¥86,900",
    meta: ["2019 年", "5.9 万公里", "舒适家用"],
    status: "省心耐用 · 通勤首选",
    image: "/assets/images/showroom/showroom-06.webp",
    alt: "北京高端二手车展厅交付区里准备交车的一辆舒适型轿车",
    objectPosition: "center 50%",
  },
];

const benefitList = [
  {
    title: "先让用户感受到门店档次",
    text: "高端二手车的信任感，很多时候不是一句“精品车源”，而是靠展厅细节和陈列秩序建立的。",
  },
  {
    title: "轮播和车卡不是两套风格",
    text: "大图和车卡共用同一组实景图，避免轮播很高级，落到卡片又变成示意图的割裂感。",
  },
  {
    title: "地图图卡补齐最后一公里",
    text: "看到地址和定位图，用户更容易直接判断能不能去、怎么去，而不是先加联系方式再问路线。",
  },
  {
    title: "适合继续扩容更多车源",
    text: "当前是 6 台主推车模板，后面继续加同风格图片和车型数据，就能平滑扩展成完整门店官网页。",
  },
];

const processList = [
  {
    step: "01",
    title: "先看用途和预算",
    text: "通勤、接娃、长途、接待客户，对应车型完全不同。先把范围缩窄，再谈品牌和配置。",
  },
  {
    step: "02",
    title: "到店看车并试坐试驾",
    text: "先感受展厅氛围、车身细节和坐姿空间，再通过试驾确认转向、制动和隔音是否合适。",
  },
  {
    step: "03",
    title: "确认车况、价格和分期",
    text: "把检测项目、成交价、分期方案、过户协办和保险一次说清，减少后面临时加项。",
  },
  {
    step: "04",
    title: "交付与手续落地",
    text: "尾款、保险、过户或临牌安排一并衔接，让用户从网页预约到线下提车形成闭环。",
  },
];

const formatter = new Intl.NumberFormat("zh-CN");

function formatCurrency(value) {
  return `¥${formatter.format(Math.round(value))}`;
}

export default function UsedCarStorePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [price, setPrice] = useState(118800);
  const [downPayment, setDownPayment] = useState(0.3);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(0.045);
  const [serviceFee, setServiceFee] = useState(4000);
  const [bookingStatus, setBookingStatus] = useState({ text: "", tone: "success" });
  const [formState, setFormState] = useState({
    visitorName: "",
    visitorPhone: "",
    carInterest: "",
    visitTime: "",
  });

  const bookingFormRef = useRef(null);

  const filteredInventory = useMemo(() => {
    if (activeFilter === "all") return showroomInventory;
    return showroomInventory.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  const financeQuote = useMemo(() => {
    const down = price * downPayment;
    const principal = price - down + serviceFee;
    const monthlyRate = interestRate / 12;
    let monthly = principal / loanTerm;

    if (monthlyRate > 0) {
      monthly =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }

    const repayment = monthly * loanTerm;
    const totalCost = down + repayment;

    return {
      serviceFeeLabel: formatCurrency(serviceFee),
      monthlyLabel: `${formatCurrency(monthly)} / 月`,
      downLabel: formatCurrency(down),
      loanLabel: formatCurrency(principal),
      repaymentLabel: formatCurrency(repayment),
      totalLabel: formatCurrency(totalCost),
    };
  }, [downPayment, interestRate, loanTerm, price, serviceFee]);

  useEffect(() => {
    if (isAutoplayPaused) return undefined;

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showroomInventory.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isAutoplayPaused]);

  useEffect(() => {
    const revealBlocks = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealBlocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  const goToSlide = (index) => {
    const total = showroomInventory.length;
    setCurrentSlide((index + total) % total);
  };

  const handleJumpToCar = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleTouchEnd = (clientX) => {
    const delta = clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    goToSlide(currentSlide + (delta < 0 ? 1 : -1));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    const { visitorName, visitorPhone, carInterest, visitTime } = formState;
    if (!visitorName || !visitorPhone || !carInterest || !visitTime) {
      setBookingStatus({
        text: "请先完整填写预约信息。",
        tone: "error",
      });
      return;
    }

    const readableDate = new Date(visitTime).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    setBookingStatus({
      text: `${visitorName}，已为你保留 ${readableDate} 的到店时段，意向车型：${carInterest}。门店将通过 ${visitorPhone} 与你确认。`,
      tone: "success",
    });
    setFormState({
      visitorName: "",
      visitorPhone: "",
      carInterest: "",
      visitTime: "",
    });
    bookingFormRef.current?.reset();
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">Y</span>
          <span>曜车行 Used Select</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#inventory">现车精选</a>
          <a href="#finance">金融方案</a>
          <a href="#process">购车流程</a>
          <a href="#contact">到店预约</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <span className="eyebrow">中国高端二手车展厅风格 · 实景车位展示</span>
            <h1>把展厅质感，直接搬到网页上。</h1>
            <p>
              这一版把原来的示意车图全部换成真实感展厅画面，并在现车精选里加入大轮播，
              让用户先看到店内不同区域的陈列氛围，再进入对应车源。预约区也保留了静态定位图，
              到店信息更完整。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#inventory">
                查看现车
              </a>
              <a className="button button-secondary" href="#contact">
                预约看车
              </a>
            </div>
            <div className="hero-metrics">
              <article className="metric-card">
                <strong>6 组</strong>
                <span>店内不同区域的实景展示，从接待区到交付区都能提前看到氛围。</span>
              </article>
              <article className="metric-card">
                <strong>1 张</strong>
                <span>真实定位地图图卡，页面里不再只有文字地址，找店路径更直观。</span>
              </article>
              <article className="metric-card">
                <strong>126 台</strong>
                <span>当前在售车源库的展示样式模板，适合继续扩充更多车型卡片。</span>
              </article>
            </div>
          </div>

          <div className="hero-gallery" aria-hidden="true">
            <div className="hero-gallery-main">
              <img src="/assets/images/showroom/showroom-01.webp" alt="" />
              <div className="gallery-note">
                <small>Reception Lounge</small>
                <strong>接待区首推家轿</strong>
                <span>用户打开页面第一屏，先看到高端展厅的到店感和主推车型位置。</span>
              </div>
            </div>
            <div className="hero-gallery-stack">
              <div className="hero-gallery-side">
                <img src="/assets/images/showroom/showroom-02.webp" alt="" />
                <div className="gallery-note">
                  <small>Central Island</small>
                  <strong>SUV 中岛陈列</strong>
                  <span>更适合承接家庭出行和空间型车源。</span>
                </div>
              </div>
              <div className="hero-gallery-side">
                <img src="/assets/images/showroom/showroom-05.webp" alt="" />
                <div className="gallery-note">
                  <small>VIP Lounge</small>
                  <strong>商务 MPV 看车区</strong>
                  <span>把接待、看车和谈单氛围一起交给用户。</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" id="inventory">
          <div className="section-heading">
            <div>
              <h2>现车精选</h2>
            </div>
            <p>
              大图先展示店内分区氛围，下面的车卡再承接具体信息。轮播和车卡共用同一组本地图片，
              页面会更像真正的高端门店展示页。
            </p>
          </div>

          <div
            className="inventory-showcase"
            aria-label="展厅实景轮播"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
          >
            <div className="showcase-controls">
              <button
                className="showcase-arrow"
                type="button"
                aria-label="上一张"
                onClick={() => goToSlide(currentSlide - 1)}
              >
                ←
              </button>
              <button
                className="showcase-arrow"
                type="button"
                aria-label="下一张"
                onClick={() => goToSlide(currentSlide + 1)}
              >
                →
              </button>
            </div>

            <div
              className="showcase-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
              onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
            >
              {showroomInventory.map((item) => (
                <article className="showcase-slide" data-index={item.id} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="showcase-overlay">
                    <div className="showcase-copy">
                      <span className="showcase-chip">{item.zone}</span>
                      <h3>{item.areaTitle}</h3>
                      <p>{item.areaText}</p>
                    </div>
                    <button
                      className="showcase-jump"
                      type="button"
                      onClick={() => handleJumpToCar(item.id)}
                    >
                      查看对应车源
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="showcase-dots" aria-label="轮播分页">
              {showroomInventory.map((item, index) => (
                <button
                  key={item.id}
                  className={`showcase-dot ${index === currentSlide ? "active" : ""}`}
                  type="button"
                  aria-label={`查看第 ${index + 1} 张`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="filter-bar" role="tablist" aria-label="车辆筛选">
            {[
              ["all", "全部车型"],
              ["sedan", "家用轿车"],
              ["suv", "SUV"],
              ["mpv", "商务 / 家庭"],
              ["ev", "新能源"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`filter-chip ${activeFilter === value ? "active" : ""}`}
                data-filter={value}
                type="button"
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="inventory-grid">
            {filteredInventory.map((item) => (
              <article className="car-card" id={item.id} data-type={item.type} key={item.id}>
                <div className="car-media">
                  <span className="car-tag">{item.tag}</span>
                  <span className="car-zone">{item.zone}</span>
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>
                <div className="car-content">
                  <div className="car-title">
                    <h3>{item.title}</h3>
                    <span className="price">{item.priceLabel}</span>
                  </div>
                  <div className="meta-list">
                    {item.meta.map((metaItem) => (
                      <span key={metaItem}>{metaItem}</span>
                    ))}
                  </div>
                  <div className="car-footer">
                    <span className="status">{item.status}</span>
                    <a className="ghost-link" href="#contact">
                      预约看车
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <div className="section-heading">
            <div>
              <h2>为什么这版更适合卖车</h2>
            </div>
            <p>它不只是“把车摆出来”，而是先给用户展厅氛围，再给车，再给预算，再给到店路径。</p>
          </div>
          <div className="benefit-grid">
            {benefitList.map((item) => (
              <article className="benefit-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="finance">
          <div className="section-heading">
            <div>
              <h2>分期试算</h2>
            </div>
            <p>把用户最关心的月供范围提前亮出来。不是合同价，但足够帮助他判断预算是否合适。</p>
          </div>

          <div className="finance-grid">
            <div className="finance-panel">
              <label htmlFor="carPrice">车辆价格</label>
              <select
                className="select"
                id="carPrice"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              >
                <option value={86900}>日产 天籁 | ¥86,900</option>
                <option value={108500}>马自达 CX-5 | ¥108,500</option>
                <option value={118800}>本田 Accord | ¥118,800</option>
                <option value={132900}>比亚迪 海豹 | ¥132,900</option>
                <option value={149600}>丰田 RAV4 | ¥149,600</option>
                <option value={196000}>别克 GL8 | ¥196,000</option>
              </select>

              <div className="field-grid">
                <div>
                  <label htmlFor="downPayment">首付比例</label>
                  <select
                    className="select"
                    id="downPayment"
                    value={downPayment}
                    onChange={(event) => setDownPayment(Number(event.target.value))}
                  >
                    <option value={0.2}>20%</option>
                    <option value={0.3}>30%</option>
                    <option value={0.4}>40%</option>
                    <option value={0.5}>50%</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="loanTerm">分期期数</label>
                  <select
                    className="select"
                    id="loanTerm"
                    value={loanTerm}
                    onChange={(event) => setLoanTerm(Number(event.target.value))}
                  >
                    <option value={12}>12 期</option>
                    <option value={24}>24 期</option>
                    <option value={36}>36 期</option>
                    <option value={48}>48 期</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="interestRate">年化参考</label>
                  <select
                    className="select"
                    id="interestRate"
                    value={interestRate}
                    onChange={(event) => setInterestRate(Number(event.target.value))}
                  >
                    <option value={0.038}>3.8%</option>
                    <option value={0.045}>4.5%</option>
                    <option value={0.052}>5.2%</option>
                    <option value={0.06}>6.0%</option>
                  </select>
                </div>
              </div>

              <div className="range-wrap">
                <div className="range-label">
                  <span>附加整备与服务包</span>
                  <strong>{financeQuote.serviceFeeLabel}</strong>
                </div>
                <input
                  id="serviceFee"
                  type="range"
                  min="0"
                  max="8000"
                  step="500"
                  value={serviceFee}
                  onChange={(event) => setServiceFee(Number(event.target.value))}
                />
              </div>
            </div>

            <aside className="quote-panel" aria-live="polite">
              <div>
                <span className="quote-badge">Smart Estimate</span>
                <h3>{financeQuote.monthlyLabel}</h3>
                <p>按当前选择估算的月供结果，适合作为到店前的预算参考。</p>
              </div>
              <div className="quote-stats">
                <div>
                  <span>预计首付</span>
                  <strong>{financeQuote.downLabel}</strong>
                </div>
                <div>
                  <span>贷款金额</span>
                  <strong>{financeQuote.loanLabel}</strong>
                </div>
                <div>
                  <span>总还款</span>
                  <strong>{financeQuote.repaymentLabel}</strong>
                </div>
                <div>
                  <span>总成本预估</span>
                  <strong>{financeQuote.totalLabel}</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section reveal" id="process">
          <div className="section-heading">
            <div>
              <h2>购车流程</h2>
            </div>
            <p>把第一次买二手车的人最关心的“先看什么、后做什么”拆成四步，网页上就能先把预期说明白。</p>
          </div>
          <div className="process-grid">
            {processList.map((item) => (
              <article className="process-card" key={item.step}>
                <em>{item.step}</em>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="contact">
          <div className="section-heading">
            <div>
              <h2>到店预约</h2>
            </div>
            <p>看完实景车位、车源和预算之后，页面最后一步就是明确告诉用户店在哪里，并给出直接预约入口。</p>
          </div>

          <div className="contact-grid">
            <div className="contact-panel">
              <h3>门店信息</h3>
              <p className="small-note">
                这一块已经补成完整的门店落地页信息结构：地址、时间、联系方式和定位图都放在同一区域，
                用户不用再跳出去找路线。
              </p>

              <div className="contact-list">
                <div className="contact-item">
                  <span>门店地址</span>
                  <strong>北京市朝阳区来广营西路55号爱车二手车行</strong>
                </div>
                <div className="contact-item">
                  <span>营业时间</span>
                  <strong>09:30 - 20:00 / 周一到周日</strong>
                </div>
                <div className="contact-item">
                  <span>联系电话</span>
                  <strong>400-820-1128</strong>
                </div>
                <div className="contact-item">
                  <span>试驾提醒</span>
                  <strong>建议提前 2 小时预约，方便预留意向车辆和接待时间</strong>
                </div>
              </div>

              <figure className="map-figure">
                <img
                  src="/assets/images/map/store-location.png"
                  alt="北京市朝阳区来广营西路55号爱车二手车行的静态地图定位图"
                />
              </figure>
              <div className="map-caption">
                静态定位图用于页面展示和到店参考。文字地址和地图图卡已经按同一门店位置统一。
              </div>
            </div>

            <div className="booking-panel">
              <form className="booking-form" ref={bookingFormRef} onSubmit={handleBookingSubmit}>
                <h3>提交预约信息</h3>
                <p>这里保留了页面内即时确认逻辑。用户填完后，当场就能看到预约已登记的提示。</p>

                <div>
                  <label htmlFor="visitorName">称呼</label>
                  <input
                    className="input"
                    id="visitorName"
                    name="visitorName"
                    type="text"
                    placeholder="例如：王先生"
                    value={formState.visitorName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="visitorPhone">联系电话</label>
                  <input
                    className="input"
                    id="visitorPhone"
                    name="visitorPhone"
                    type="tel"
                    placeholder="请填写手机号"
                    value={formState.visitorPhone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="carInterest">意向车型</label>
                  <select
                    className="select"
                    id="carInterest"
                    name="carInterest"
                    value={formState.carInterest}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">请选择</option>
                    {showroomInventory.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="visitTime">期望到店时间</label>
                  <input
                    className="input"
                    id="visitTime"
                    name="visitTime"
                    type="datetime-local"
                    value={formState.visitTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="submit-row">
                  <button className="button button-primary" type="submit">
                    确认预约
                  </button>
                  <span className="small-note">页面不会真实发出信息，但会完整演示网页端的预约确认流程。</span>
                </div>
                <div
                  className={`booking-status ${bookingStatus.tone === "error" ? "error" : ""}`}
                  aria-live="polite"
                >
                  {bookingStatus.text}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        页面名称：曜车行 Used Select。当前版本已经迁移为 Next.js 单页项目，可直接作为二手车辆售卖店展示页继续扩展。
      </footer>
    </div>
  );
}
