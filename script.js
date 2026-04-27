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

// ===== TEXT SPLIT =====
function splitLines(text) {
  return text
    .split(/\n|[।.!?]/)
    .map(l => l.trim())
    .filter(l => l.length > 0);
}

// ===== FULLSCREEN =====
function openFullscreen() {
  const el = document.querySelector(".preview"); // 🔥 important

  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

// ===== IMAGE EFFECT =====
function applyEffect() {
  img.style.transition = "transform 6s linear";
  img.style.transform = "scale(1.08)";
}

// ===== RESET EFFECT =====
function resetEffect() {
  img.style.transition = "none";
  img.style.transform = "scale(1)";
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

  // UI hide
  fileInput.style.display = "none";
  textInput.style.display = "none";
  playBtn.style.display = "none";

  openFullscreen();

  lines = splitLines(text);
  index = 0;

  speakNext();
});

// ===== SPEAK FUNCTION =====
function speakNext() {

  if (index >= lines.length) return;

  const line = lines[index];

  // 🔥 TEXT SHOW FIX
  textBox.textContent = line;

  // 🔥 IMAGE EFFECT FIX
  resetEffect();
  setTimeout(applyEffect, 50);

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(line);

  // 🔥 VOICE FIX (async load safe)
  let voices = speechSynthesis.getVoices();
  if (!voices.length) {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      setVoiceAndSpeak();
    };
  } else {
    setVoiceAndSpeak();
  }

  function setVoiceAndSpeak() {
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
}
