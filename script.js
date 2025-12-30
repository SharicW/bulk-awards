// ================= DISCORD AUTH =================

const REDIRECT_URI = "https://sharicw.github.io/bulk-awards/";

const DISCORD_LOGIN_URL =
  "https://discord.com/oauth2/authorize" +
  "?client_id=1455371713276805344" +
  "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
  "&response_type=token" +
  "&scope=identify";

function loginDiscord() {
  window.location.href = DISCORD_LOGIN_URL;
}

// обработка возврата с Discord
const params = new URLSearchParams(window.location.search);
const discordUid = params.get("uid");
const discordName = params.get("name");

if (discordUid) {
  localStorage.setItem("discord_uid", discordUid);
  localStorage.setItem("discord_name", discordName);

  const btn = document.querySelector(".discord-btn");
  if (btn) {
    btn.innerText = `Connected: ${discordName}`;
    btn.classList.add("connected"); // ← АНИМАЦИЯ
    btn.disabled = true;
  }

  window.history.replaceState({}, document.title, "/");
}

// ================= FIREBASE INIT =================

const firebaseConfig = {
  apiKey: "AIzaSyBTHKpIIhazIcQ1u5yLHpENe38EApDjOjk",
  authDomain: "bulk-awards.firebaseapp.com",
  projectId: "bulk-awards",
  storageBucket: "bulk-awards.firebasestorage.app",
  messagingSenderId: "433124675392",
  appId: "1:433124675392:web:8115b0cd4a59981b21b4a5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= STATE =================

let selectedCandidate = null;
let currentNomination = null;

// ================= DATA =================

const nominations = {
  "Bulk King": [
    { name: "Sur.ki", img: "https://i.imgur.com/4AXcREJ.jpeg", twitter: "https://x.com/KSurnin" },
    { name: "cool", img: "https://i.imgur.com/bjTkrMC.jpeg", twitter: "https://x.com/coolxinfluencer" },
    { name: "qurool", img: "https://i.imgur.com/UmmeIHs.jpeg", twitter: "https://x.com/Qurool13" },
    { name: "Ace OP", img: "https://i.imgur.com/QNhzSe1.jpeg", twitter: "https://x.com/aceop_xyz" },
    { name: "unicodefawn", img: "https://i.imgur.com/bn9OO3i.jpeg", twitter: "https://x.com/unicodef1wn" },
    { name: "Serukara", img: "https://i.imgur.com/CXJqm0L.jpeg", twitter: "https://x.com/serukara" },
  ],

  "Bulk Queen": [
    { name: "Shinori", img: "https://i.imgur.com/1IP4cy7.jpeg", twitter: "https://x.com/shinori_san" },
    { name: "pixnvm", img: "https://i.imgur.com/pNCgekv.jpeg", twitter: "https://x.com/pixnvm" },
    { name: "Iryna", img: "https://i.imgur.com/XLp3fe5.jpeg", twitter: "https://x.com/0xIrina" },
    { name: "Anekia", img: "https://i.imgur.com/3WnEojT.jpeg", twitter: "https://x.com/Anekiaaa" },
    { name: "Alina Malina", img: "https://i.imgur.com/NbC3yiw.jpeg", twitter: "https://x.com/Alina_Malina999" },
    { name: "Optibanty", img: "https://i.imgur.com/o5qZRCK.jpeg", twitter: "https://x.com/optibantyy" },
  ],

  "Bulk Artist": [
    { name: "sqwizee", img: "https://i.imgur.com/1WCBhX7.jpeg", twitter: "https://x.com/sqw11z33" },
    { name: "f1sh", img: "https://i.imgur.com/CL5h4cq.jpeg", twitter: "https://x.com/f1shthelegend" },
    { name: "faylize", img: "https://i.imgur.com/AMNOTyd.jpeg", twitter: "https://x.com/fayl1ze" },
    { name: "nemos", img: "https://i.imgur.com/vtSdhkw.jpeg", twitter: "https://x.com/nemos_01" },
    { name: "Harddeki", img: "https://i.imgur.com/5ujU4ZM.jpeg", twitter: "https://x.com/harddeki" },
    { name: "u7niversal", img: "https://i.imgur.com/TwCNnYy.jpeg", twitter: "https://x.com/u7niversal" },
  ],

  "Bulk Writer": [
    { name: "unicodefawn", img: "https://i.imgur.com/bn9OO3i.jpeg", twitter: "https://x.com/unicodef1wn" },
    { name: "yanok", img: "https://i.imgur.com/k4QNRO0.jpeg", twitter: "https://x.com/crypto_yanok" },
    { name: "m4lka", img: "https://i.imgur.com/n78oroc.jpeg", twitter: "https://x.com/m4lkxx" },
    { name: "Mayner", img: "https://i.imgur.com/DWGcmDu.jpeg", twitter: "https://x.com/MinerCore2" },
    { name: "sqwizee", img: "https://i.imgur.com/1WCBhX7.jpeg", twitter: "https://x.com/sqw11z33" },
    { name: "Marchiii", img: "https://i.imgur.com/Ujip2d8.jpeg", twitter: "https://x.com/Markullill" },
  ],

  "Bulk Video Maker": [
    { name: "Sqw3zzy", img: "https://i.imgur.com/HEc0CZA.jpeg", twitter: "https://x.com/Sqw3zzy" },
    { name: "Tasher", img: "https://i.imgur.com/bmHM9BD.jpeg", twitter: "https://x.com/Dannnnnok" },
    { name: "Sur.ki", img: "https://i.imgur.com/4AXcREJ.jpeg", twitter: "https://x.com/KSurnin" },
    { name: "BERLIN", img: "https://i.imgur.com/sBgqEdb.jpeg", twitter: "https://x.com/whitewalker_sol" },
    { name: "Ace OP", img: "https://i.imgur.com/QNhzSe1.jpeg", twitter: "https://x.com/aceop_xyz" },
    { name: "乙", img: "https://i.imgur.com/vnTeH06.jpeg", twitter: "https://x.com/bluvv_xo" },
  ],

  "Best Team Member": [
    { name: "Rizzy", img: "https://i.imgur.com/9GWVKQc.jpeg", twitter: "https://x.com/rizzy_sol" },
    { name: "Kdot", img: "https://i.imgur.com/Gbi447Z.jpeg", twitter: "https://x.com/kdotcrypto" },
    { name: "Optibanty", img: "https://i.imgur.com/o5qZRCK.jpeg", twitter: "https://x.com/optibantyy" },
    { name: "glowburger", img: "https://i.imgur.com/ZcOa2eG.jpeg", twitter: "https://x.com/glowburger" },
    { name: "Orthodox", img: "https://i.imgur.com/TV7FqUi.jpeg", twitter: "https://x.com/X_Orthodox" },
    { name: "Junbug", img: "https://i.imgur.com/Z5xnaAY.jpeg", twitter: "https://x.com/junbug_sol" },
  ],

  "Bulk Unique Content": [
    { name: "no felony", img: "https://i.imgur.com/347jUcL.jpeg", twitter: "https://x.com/nofelonyx" },
    { name: "cool", img: "https://i.imgur.com/bjTkrMC.jpeg", twitter: "https://x.com/coolxinfluencer" },
    { name: "qurool", img: "https://i.imgur.com/UmmeIHs.jpeg", twitter: "https://x.com/Qurool13" },
    { name: "unicodefawn", img: "https://i.imgur.com/bn9OO3i.jpeg", twitter: "https://x.com/unicodef1wn" },
    { name: "Sur.ki", img: "https://i.imgur.com/4AXcREJ.jpeg", twitter: "https://x.com/KSurnin" },
    { name: "mary", img: "https://i.imgur.com/dPM0ajZ.jpeg", twitter: "https://x.com/Crypto_Maryy" },
  ]
};

// ================= MODAL =================

function openVote(nomination) {
  const uid = localStorage.getItem("discord_uid");
  if (!uid) {
    alert("Please connect Discord before voting.");
    return;
  }

  const modal = document.getElementById("voteModal");
  const modalTitle = document.getElementById("modalTitle");
  const grid = document.getElementById("candidatesGrid");

  const candidates = nominations[nomination];
  if (!candidates) {
    alert("No candidates for this nomination");
    return;
  }

  currentNomination = nomination;
  selectedCandidate = null;

  modalTitle.innerText = nomination;
  grid.innerHTML = "";

  candidates.forEach(c => {
    const div = document.createElement("div");
    div.className = "candidate";
    div.innerHTML = `
  <img src="${c.img}">
  <span>${c.name}</span>

  ${
    c.twitter
      ? `<a href="${c.twitter}" 
           class="twitter-btn" 
           target="_blank" 
           rel="noopener noreferrer"
           onclick="event.stopPropagation()">
           𝕏
         </a>`
      : ""
  }
`;


    div.onclick = () => {
      document
        .querySelectorAll(".candidate")
        .forEach(x => x.classList.remove("selected"));

      div.classList.add("selected");
      selectedCandidate = c.name;
    };

    grid.appendChild(div);
  });

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("voteModal");
  if (modal) modal.classList.add("hidden");
}

// ================= SUBMIT VOTE =================

async function submitVote() {
  if (!selectedCandidate) {
    alert("Please select a candidate.");
    return;
  }

  const uid = localStorage.getItem("discord_uid");
  const name = localStorage.getItem("discord_name");

  const voteId = `${currentNomination}_${uid}`;

  try {
    const voteRef = db.collection("votes").doc(voteId);
    const existing = await voteRef.get();

    if (existing.exists) {
      alert("You already voted in this nomination.");
      return;
    }

    await voteRef.set({
      nomination: currentNomination,
      candidate: selectedCandidate,
      discordId: uid,
      discordName: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("✅ Vote saved!");
    closeModal();

  } catch (error) {
    console.error("Firestore error:", error);
    alert("❌ Error saving vote");
  }
}

// ================= STARS (FIXED FOREVER) =================

const starsLayer = document.querySelector(".stars-layer");
const STAR_COUNT = 620;
const stars = [];

// равномерная сетка
const cols = Math.floor(Math.sqrt(STAR_COUNT * (window.innerWidth / window.innerHeight)));
const rows = Math.floor(STAR_COUNT / cols);

let i = 0;

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (i >= STAR_COUNT) break;

    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2.2 + 0.8;
    const duration = Math.random() * 25 + 20; // 20–45 секунд
    const delay = Math.random() * 30;

    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;


    const cellW = window.innerWidth / cols;
    const cellH = window.innerHeight / rows;

    const posX = x * cellW + Math.random() * cellW;
    const posY = y * cellH + Math.random() * cellH;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;

    star.style.setProperty("--x", `${posX}px`);
    star.style.setProperty("--y", `${posY}px`);

    starsLayer.appendChild(star);

    stars.push({
      el: star,
      x: posX,
      y: posY,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12
    });

    i++;
  }
}

// автодрейф (БЕЗ transform!)
function animateStars() {
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < -50) s.x = window.innerWidth + 50;
    if (s.x > window.innerWidth + 50) s.x = -50;
    if (s.y < -50) s.y = window.innerHeight + 50;
    if (s.y > window.innerHeight + 50) s.y = -50;

    s.el.style.setProperty("--x", `${s.x}px`);
    s.el.style.setProperty("--y", `${s.y}px`);
  });

  requestAnimationFrame(animateStars);
}

animateStars();

// мягкий параллакс
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  starsLayer.style.transform = `translate(${x}px, ${y}px)`;
});

// ================= COUNTDOWN TIMER =================

// 1 января 2026, 23:00 МСК = 20:00 UTC
const targetDate = new Date(Date.UTC(2026, 0, 1, 20, 0, 0));
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  if (!countdownEl) return;

  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "<span><b>00</b><small>Voting ended</small></span>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const values = countdownEl.querySelectorAll("b");

  values[0].innerText = String(days).padStart(2, "0");
  values[1].innerText = String(hours).padStart(2, "0");
  values[2].innerText = String(minutes).padStart(2, "0");
  values[3].innerText = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);




