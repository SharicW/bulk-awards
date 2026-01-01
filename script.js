function displayWinners() {
  const winnerCards = document.querySelectorAll('.winner-card');

  winnerCards.forEach(card => {
    const nomination = card.dataset.nomination;
    const winner = winners[nomination];

    if (winner) {
      const winnerInfo = card.querySelector('.winner-info');
      winnerInfo.innerHTML = `
        <div class="winner-name">${winner.name}</div>
        ${winner.twitter ? `<a href="${winner.twitter}" class="winner-twitter" target="_blank" rel="noopener noreferrer">𝕏</a>` : ''}
      `;

      card.classList.add('has-winner');
    }
  });
}

const winners = {
  "Bulk King": {
    name: "Sur.ki",
    img: "https://i.imgur.com/4AXcREJ.jpeg",
    twitter: "https://x.com/KSurnin"
  },

  "Bulk Queen": {
    name: "Anekia",
    img: "https://i.imgur.com/3WnEojT.jpeg",
    twitter: "https://x.com/Anekiaaa"
  },

  "Bulk Artist": {
    name: "u7niversal",
    img: "https://i.imgur.com/TwCNnYy.jpeg",
    twitter: "https://x.com/u7niversal"
  },

  "Bulk Writer": {
    name: "yanok",
    img: "https://i.imgur.com/k4QNRO0.jpeg",
    twitter: "https://x.com/crypto_yanok"
  },

  "Bulk Video Maker": {
    name: "Sur.ki",
    img: "https://i.imgur.com/4AXcREJ.jpeg",
    twitter: "https://x.com/KSurnin"
  },

  "Best Team Member": {
    name: "rizzy",
    img: "https://i.imgur.com/9GWVKQc.jpeg",
    twitter: "https://x.com/rizzy_sol"
  },

  "Bulk Unique Content": {
    name: "cool",
    img: "https://i.imgur.com/bjTkrMC.jpeg",
    twitter: "https://x.com/coolxinfluencer"
  }
};


document.addEventListener('DOMContentLoaded', function() {
  displayWinners();
});


const starsLayer = document.querySelector(".stars-layer");
const STAR_COUNT = 620;
const stars = [];

const cols = Math.floor(Math.sqrt(STAR_COUNT * (window.innerWidth / window.innerHeight)));
const rows = Math.floor(STAR_COUNT / cols);

let i = 0;

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    if (i >= STAR_COUNT) break;

    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2.2 + 0.8;
    const duration = Math.random() * 25 + 20; // 20–45 sec
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

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  starsLayer.style.transform = `translate(${x}px, ${y}px)`;
});










