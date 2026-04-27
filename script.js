const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const img = document.getElementById("img");
const textBox = document.getElementById("textBox");
const playBtn = document.getElementById("playBtn");

// ===== IMAGE LOAD =====
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  img.src = url;
  img.style.display = "block";
});

// ===== TEXT SPLIT FUNCTION (IMPORTANT FIX) =====
function splitLines(text) {
  return text
    .split(/\n|[।.!?]/) // 🔥 newline + punctuation
    .map(l => l.trim())
    .filter(l => l.length > 0);
}

// ===== FULLSCREEN FIX =====
function openFullscreen() {
  const el = document.documentElement;

  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

// ===== MAIN FLOW =====
let lines = [];
let index = 0;

playBtn.addEventListener("click", function () {

  const text = textInput.value.trim();
  if (!text) {
    alert("पहले लेख लिखें");
    return;
  }

  // 🔥 Hide inputs
  fileInput.style.display = "none";
  textInput.style.display = "none";
  playBtn.style.display = "none";

  // 🔥 Fullscreen (user gesture के अंदर)
  openFullscreen();

  lines = splitLines(text);
  index = 0;

  speakNext();
});

// ===== SPEAK LINE BY LINE =====
function speakNext() {

  if (index >= lines.length) return;

  const line = lines[index];

  // 👉 सिर्फ एक लाइन दिखेगी
  textBox.innerText = line;

  // 👉 image effect
  img.style.transform = "scale(1)";
  setTimeout(() => {
    img.style.transition = "transform 5s linear";
    img.style.transform = "scale(1.08)";
  }, 50);

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(line);

  // 🎤 Hindi voice
  const voices = speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.includes("hi")) || voices[0];
  if (v) speech.voice = v;

  speech.lang = "hi-IN";
  speech.rate = 0.95;
  speech.pitch = 1.1;

  speech.onend = () => {
    index++;
    setTimeout(speakNext, 700);
  };

  speechSynthesis.speak(speech);
}
