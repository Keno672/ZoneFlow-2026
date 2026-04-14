const STORAGE_KEY = "zoneflow_v1_payload";

const defaultPayload = {
  app: {
    featuredInstrument: "SPX500",
    plan: "Free users see Intel + News. Paid users unlock Battlefield.",
    priceWeekly: "€5 / week",
    payOptions: "Fiat + Crypto"
  },
  intel: {
    instrument: "SPX500",
    livePrice: "6905.77",
    bias: "BUY",
    climate: "Risk-On Lean",
    theme: "Recon Active",
    direction: "Bull Advance",
    force: "Strong",
    alignment: "Partial Stack",
    control: "Bulls Hold",
    condition: "Trend",
    threat: "Medium",
    triggerActivity: ["Bollinger Reverse", "Engulfing", "CCI Filter"],
    report: "Your scan reads like a bullish recon report. Trend is up, ADX says trend, and the stack still supports continuation."
  },
  battlefield: {
    instrument: "SPX500",
    livePrice: "6905.77",
    bias: "BUY",
    climate: "Risk-On Lean",
    theme: "Resistance Ridge / Support Sea",
    attackZone: "6890–6905",
    triggerLine: "6903.77",
    shieldLine: "6845.42",
    victory: "6939.82",
    order: "Hold the battlefield above FPV at 6845.42. Use the 6890–6905 defended zone as the advance corridor. If price reclaims and holds above 6903.77, press toward 6939.82. If defence fails below FPV, the mission weakens fast.",
    mode: "buy"
  },
  news: {
    affected: "SPX · BTC · DXY",
    support: "Supports Buy Bias",
    climate: "Equity Tone Steady",
    theme: "War Room Bulletin",
    summary: "News card turns uploaded macro headlines into battlefield context: what happened, whether it supports buyer morale, and which markets are now exposed or supported.",
    biasEffect: "Buy Support",
    urgency: "Medium",
    confidence: "3 / 5",
    watch: "Oil + Dollar",
    assets: ["SPX500", "BTC", "DXY", "Oil"],
    report: "This card sits between scan and battle plan. The scan says what the market looks like. The news card explains why the battlefield is calm, stressed, or dangerous once macro headlines are uploaded."
  }
};

function getPayload() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultPayload;
  try {
    return { ...defaultPayload, ...JSON.parse(raw) };
  } catch (e) {
    return defaultPayload;
  }
}

function savePayload(payload) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function chipList(items, klass = "chip blue") {
  return (items || []).map((i) => `<div class="${klass}">${i}</div>`).join("");
}


function renderCardDeck() {
  const data = getPayload();
  const deck = document.getElementById("deck");
  if (!deck) return;

  const intelBiasClass = (data.intel.bias || "").toUpperCase().includes("SELL") ? "sell" : "buy";
  const battleBiasClass = (data.battlefield.bias || "").toUpperCase().includes("SELL") ? "sell" : "buy";
  const newsBiasClass = (data.news.support || "").toUpperCase().includes("SELL") ? "sell" : "buy";
  const battleSell = (data.battlefield.mode || "").toLowerCase() === "sell";

  deck.innerHTML = `
  <section class="card intel-upgrade">
    <div class="card-header">
      <div class="card-tag"><span class="dot" style="background:var(--cyan)"></span> Free · Scan Intel</div>
      <div class="price-box"><div class="mini">Live Price</div><div class="price">${data.intel.livePrice}</div></div>
    </div>
    <div class="card-body">
      <div class="intel-shell">
        <div class="intel-title-row">
          <div>
            <div class="symbol">${data.intel.instrument}</div>
            <div class="subtitle">ZoneFlow Intel Card</div>
            <div class="rank">Scan-fed command brief</div>
          </div>
          <div class="intel-price-box">
            <div class="mini">Battle Climate</div>
            <div style="font-size:20px;font-weight:900;margin-top:6px">${data.intel.climate}</div>
          </div>
        </div>

        <div class="status-row" style="margin-top:14px">
          <div class="intel-banner-main ${intelBiasClass === "buy" ? "buy" : ""}">
            ${intelBiasClass === "buy" ? "🟢" : "🔴"} ${(data.intel.bias || "").toUpperCase()}
          </div>
          <div class="intel-ribbon">📡 ${data.intel.theme}</div>
        </div>

        <div class="intel-scene" style="margin-top:16px">
          <div class="stamp">Recon Summary</div>
          <div class="intel-scan-lines"></div>
          <div class="drone">🚁</div>
          <div class="tower">🗼</div>
          <div class="hill"></div>
          <div class="intel-readout">
            <div class="mini">Immediate Read</div>
            <div class="intel-big-bias">${(data.intel.bias || "").toUpperCase()}</div>
            <div style="margin-top:6px;color:var(--muted);font-size:13px">
              ${data.intel.direction} · ${data.intel.force} force · ${data.intel.alignment} alignment
            </div>
          </div>
        </div>

        <div class="intel-grid" style="margin-top:16px">
          <div class="intel-stat">
            <div class="top"><span class="icon">🧭</span>Direction</div>
            <div class="main">${data.intel.direction}</div>
            <div class="sub">Who the field is leaning toward</div>
          </div>
          <div class="intel-stat">
            <div class="top"><span class="icon">⚔️</span>Force</div>
            <div class="main">${data.intel.force}</div>
            <div class="sub">How hard the move is pressing</div>
          </div>
          <div class="intel-stat">
            <div class="top"><span class="icon">🪖</span>Alignment</div>
            <div class="main">${data.intel.alignment}</div>
            <div class="sub">How many signals agree</div>
          </div>
          <div class="intel-stat">
            <div class="top"><span class="icon">🏴</span>Control</div>
            <div class="main">${data.intel.control}</div>
            <div class="sub">Who holds territory now</div>
          </div>
          <div class="intel-stat">
            <div class="top"><span class="icon">🛰️</span>Condition</div>
            <div class="main">${data.intel.condition}</div>
            <div class="sub">Trend, compression, or reversal watch</div>
          </div>
          <div class="intel-stat">
            <div class="top"><span class="icon">☠️</span>Threat</div>
            <div class="main">${data.intel.threat}</div>
            <div class="sub">How dangerous the setup is</div>
          </div>
        </div>

        <div class="intel-trigger-panel" style="margin-top:16px">
          <div class="mini">Trigger Stack</div>
          <div class="chips" style="margin-top:10px">${chipList(data.intel.triggerActivity, "chip blue")}</div>
        </div>

        <div class="intel-report" style="margin-top:16px">
          <div class="mini">Field Report</div>
          <p>${data.intel.report}</p>
        </div>
      </div>

      <div class="footer-note">Upgraded Intel Card v2 → scan translated into immediate command language</div>
    </div>
  </section>

  <section class="card locked" style="background:radial-gradient(circle at top left, rgba(216,176,108,.18), transparent 28%),linear-gradient(180deg, rgba(28,18,10,.98), rgba(7,12,30,.98));">
    <div class="card-header">
      <div class="card-tag"><span class="dot" style="background:var(--gold)"></span> Paid · Chart Battlefield</div>
      <div class="price-box"><div class="mini">Live Price</div><div class="price">${data.battlefield.livePrice}</div></div>
    </div>
    <div class="card-body">
      <div><div class="symbol">${data.battlefield.instrument}</div><div class="subtitle">ZoneFlow Battlefield Card</div><div class="rank">Built from uploaded chart + levels</div></div>
      <div class="status-row">
        <div class="pill ${battleBiasClass}">${(data.battlefield.bias || "").toUpperCase()} Bias</div>
        <div class="pill macro">${data.battlefield.climate}</div>
        <div class="pill theme">${data.battlefield.theme}</div>
      </div>
      <div class="art-panel">
        <div class="battle-map"></div><div class="stamp">Battlefield Concept</div><div class="mountain-band"></div>
        <div class="attack-zone ${battleSell ? "sell" : ""}"></div><div class="support-sea"></div>
        <div class="level thin" style="top:14%;border-color:#fff7d1"></div>
        <div class="level" style="top:26%;border-color:var(--gold)"></div>
        <div class="level" style="top:43%;border-color:var(--cyan)"></div>
        <div class="level" style="top:64%;border-color:var(--red)"></div>
        <svg class="battle-svg" viewBox="0 0 1000 420" preserveAspectRatio="none">
          ${
            battleSell
              ? `<polyline fill="none" stroke="rgba(255,255,255,.94)" stroke-width="4" points="0,250 90,220 170,185 255,155 360,132 450,165 545,210 650,245 760,285 885,322 1000,350" />`
              : `<polyline fill="none" stroke="rgba(255,255,255,.94)" stroke-width="4" points="0,350 90,322 180,286 280,254 370,214 470,168 570,182 670,138 775,124 885,107 950,97 1000,83" />`
          }
        </svg>
        <div class="route-label">${battleSell ? "⚔️ Ambush route active" : "⚔️ Advance route active"}</div>
      </div>
      <div class="stats">
        <div class="stat"><div class="label">Attack Zone</div><div class="value">${data.battlefield.attackZone}</div><div class="note">${battleSell ? "Sell corridor" : "Buy defended zone"}</div></div>
        <div class="stat"><div class="label">${battleSell ? "Breakthrough" : "Trigger Line"}</div><div class="value">${data.battlefield.triggerLine}</div><div class="note">${battleSell ? "Enemy stop line" : "Control line"}</div></div>
        <div class="stat"><div class="label">${battleSell ? "Stop / Break" : "Shield Line"}</div><div class="value">${data.battlefield.shieldLine}</div><div class="note">${battleSell ? "Abort if broken" : "Defence line"}</div></div>
        <div class="stat"><div class="label">Victory</div><div class="value">${data.battlefield.victory}</div><div class="note">Primary objective</div></div>
      </div>
      <div class="panel"><div class="mini">Tactical Order</div><p>${data.battlefield.order}</p></div>
      <div class="footer-note">Paid card built from chart → zone, trigger, defence, objective, route</div>
    </div>
  </section>

  <section class="card" style="background:radial-gradient(circle at top left, rgba(216,176,108,.14), transparent 28%),linear-gradient(180deg, rgba(28,18,10,.98), rgba(10,12,20,.98));">
    <div class="card-header">
      <div class="card-tag"><span class="dot" style="background:var(--amber)"></span> Free · News Intel</div>
      <div class="price-box"><div class="mini">Affected Assets</div><div class="price" style="font-size:22px">${data.news.affected}</div></div>
    </div>
    <div class="card-body">
      <div><div class="symbol">NEWS</div><div class="subtitle">ZoneFlow News Card</div><div class="rank">Built from uploaded macro headlines</div></div>
      <div class="status-row">
        <div class="pill ${newsBiasClass}">${data.news.support}</div>
        <div class="pill macro">${data.news.climate}</div>
        <div class="pill theme">${data.news.theme}</div>
      </div>
      <div class="art-panel">
        <div class="stamp">Macro Dispatch</div>
        <div class="news-sun"></div><div class="mountain-range"></div><div class="news-sea"></div>
        <div class="news-brief">${data.news.summary}</div>
      </div>
      <div class="stats">
        <div class="stat"><div class="label">Bias Effect</div><div class="value">${data.news.biasEffect}</div><div class="note">How the news tilts the field</div></div>
        <div class="stat"><div class="label">Urgency</div><div class="value">${data.news.urgency}</div><div class="note">How immediate this is</div></div>
        <div class="stat"><div class="label">Confidence</div><div class="value">${data.news.confidence}</div><div class="note">How strong the read is</div></div>
        <div class="stat"><div class="label">Watch</div><div class="value">${data.news.watch}</div><div class="note">What can flip the tone</div></div>
      </div>
      <div class="panel"><div class="mini">War Room Use</div><div class="chips" style="margin-top:8px">${chipList(data.news.assets, "chip")}</div></div>
      <div class="panel"><div class="mini">Field Report</div><p>${data.news.report}</p></div>
      <div class="footer-note">Free card built from macro uploads → battlefield context behind the scan</div>
    </div>
  </section>
  `;
}
function parseBrief(text, source) {
  const lines = text.split(/\n+/).map((x) => x.trim()).filter(Boolean);
  const out = {};

  for (const line of lines) {
    const m = line.match(/^([^:]+):\s*(.+)$/);
    if (!m) continue;
    const k = m[1].toLowerCase().trim();
    const v = m[2].trim();

    if (source === "scan") {
      if (k.includes("instrument")) out.instrument = v;
      else if (k.includes("live")) out.livePrice = v;
      else if (k.includes("bias")) out.bias = v;
      else if (k.includes("climate")) out.climate = v;
      else if (k.includes("theme")) out.theme = v;
      else if (k.includes("direction")) out.direction = v;
      else if (k.includes("force")) out.force = v;
      else if (k.includes("alignment")) out.alignment = v;
      else if (k.includes("control")) out.control = v;
      else if (k.includes("condition")) out.condition = v;
      else if (k.includes("threat")) out.threat = v;
      else if (k.includes("trigger")) out.triggerActivity = v.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
      else if (k.includes("report")) out.report = v;
    }

    if (source === "chart") {
      if (k.includes("instrument")) out.instrument = v;
      else if (k.includes("live")) out.livePrice = v;
      else if (k.includes("bias")) {
        out.bias = v;
        out.mode = v.toLowerCase().includes("sell") ? "sell" : "buy";
      }
      else if (k.includes("climate")) out.climate = v;
      else if (k.includes("theme")) out.theme = v;
      else if (k.includes("attack zone") || k.includes("zone")) out.attackZone = v;
      else if (k.includes("trigger")) out.triggerLine = v;
      else if (k.includes("shield") || k.includes("stop") || k.includes("break")) out.shieldLine = v;
      else if (k.includes("victory") || k.includes("target")) out.victory = v;
      else if (k.includes("order") || k.includes("brief")) out.order = v;
    }

    if (source === "news") {
      if (k.includes("affected")) out.affected = v;
      else if (k.includes("support") || k.includes("bias effect")) {
        out.support = v;
        out.biasEffect = v;
      }
      else if (k.includes("climate")) out.climate = v;
      else if (k.includes("theme")) out.theme = v;
      else if (k.includes("summary")) out.summary = v;
      else if (k.includes("urgency")) out.urgency = v;
      else if (k.includes("confidence")) out.confidence = v;
      else if (k.includes("watch")) out.watch = v;
      else if (k.includes("assets")) out.assets = v.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
      else if (k.includes("report")) out.report = v;
    }
  }

  return out;
}

function demoBrief() {
  return `Instrument: SPX500
Live Price: 6905.77
Bias: BUY
Climate: Risk-On Lean
Direction: Bull Advance
Force: Strong
Alignment: Partial Stack
Control: Bulls Hold
Condition: Trend
Threat: Medium
Trigger Activity: Bollinger Reverse, Engulfing, CCI Filter
Report: Your scan reads like a bullish recon report. Trend is up, ADX says trend, and the stack still supports continuation.`;
}

function attachAdmin() {
  const form = document.getElementById("brief-form");
  if (!form) return;

  const source = document.getElementById("source");
  const raw = document.getElementById("brief");
  const loadDemo = document.getElementById("load-demo");

  if (loadDemo) {
    loadDemo.addEventListener("click", () => {
      raw.value = demoBrief();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = getPayload();
    const parsed = parseBrief(raw.value, source.value);

    if (source.value === "scan") payload.intel = { ...payload.intel, ...parsed };
    if (source.value === "chart") payload.battlefield = { ...payload.battlefield, ...parsed };
    if (source.value === "news") payload.news = { ...payload.news, ...parsed };

    savePayload(payload);

    const note = document.getElementById("save-note");
    if (note) note.textContent = "Saved. Open index.html to view the updated cards.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCardDeck();
  attachAdmin();
});
