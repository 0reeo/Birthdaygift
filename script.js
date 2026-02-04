/* ================== SETTING ================== */
// GANTI TEMA: romantis | polaroid | galaxy | surat
const theme = "polaroid";

// PASSWORD
const PASSWORD = "1002"; // ganti sesuai mau kamu

// TANGGAL & JAM ULTAH (YYYY, MM-1, DD, HH, MM)
const BIRTHDAY = new Date(2026, 1, 10, 0, 0); // contoh: 12 Maret 2026 00:00

// TEKS PERSONAL (implisit)
const message = `
Selamat bertambah usia.

Aku mungkin belum jadi tujuan,
tapi aku selalu berharap
semesta memperlakukanmu
dengan cara paling lembut 🤍
`;

/* ================== INIT ================== */
document.getElementById("theme-style").href = `theme-${theme}.css`;

const lock = document.getElementById("lock");
const countdown = document.getElementById("countdown");
const main = document.getElementById("main");
const timerEl = document.getElementById("timer");
const lockMsg = document.getElementById("lockMsg");

document.getElementById("unlockBtn").onclick = () => {
  const val = document.getElementById("password").value;
  if (val === PASSWORD) {
    lock.classList.add("hidden");
    checkCountdown();
  } else {
    lockMsg.textContent = "Kode salah. Coba lagi 🤍";
  }
};

/* ================== COUNTDOWN ================== */
function checkCountdown(){
  const now = new Date();
  if (now < BIRTHDAY){
    countdown.classList.remove("hidden");
    tick();
  } else {
    main.classList.remove("hidden");
  }
}

function tick(){
  const diff = BIRTHDAY - new Date();
  if (diff <= 0){
    countdown.classList.add("hidden");
    main.classList.remove("hidden");
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  timerEl.textContent = `${d}h ${h}j ${m}m ${s}d`;
  setTimeout(tick,1000);
}

/* ================== GIFT ================== */
const openBtn = document.getElementById("openGiftBtn");
const content = document.getElementById("content");
const typingText = document.getElementById("typingText");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let i = 0;
openBtn.onclick = () => {
  openBtn.style.display = "none";
  content.classList.remove("hidden");
  music.play();
  type();
  confetti();
};

function type(){
  if (i < message.length){
    typingText.innerHTML += message.charAt(i++);
    setTimeout(type, 55);
  }
}

musicBtn.onclick = () => music.paused ? music.play() : music.pause();

/* ================== CONFETTI ================== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth; canvas.height = innerHeight;

let dots = Array.from({length:120},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*4+2,
  d:Math.random()*3+1
}));

function confetti(){
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(255,182,193,.8)";
      ctx.fill();
      p.y+=p.d; if(p.y>canvas.height) p.y=0;
    });
    requestAnimationFrame(draw);
  })();
  }
/* ================== QR CODE ================== */
function drawQR(text){
  const c = document.getElementById("qr");
  const ctx = c.getContext("2d");
  const size = 160;
  c.width = c.height = size;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,size,size);
  ctx.fillStyle = "#000";

  let hash = 0;
  for (let i=0;i<text.length;i++){
    hash = text.charCodeAt(i) + ((hash<<5)-hash);
  }

  const cells = 21;
  const cellSize = size / cells;

  for (let y=0;y<cells;y++){
    for (let x=0;x<cells;x++){
      const v = (hash >> ((x*y)%16)) & 1;
      if (v){
        ctx.fillRect(
          x*cellSize,
          y*cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
}

// QR mengarah ke halaman penutup
drawQR(window.location.origin + window.location.pathname.replace("index.html","") + "final.html");
