const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const img = document.getElementById("img");
const textBox = document.getElementById("textBox");
const playBtn = document.getElementById("playBtn");
const container = document.querySelector(".container");

// ===== IMAGE LOAD =====
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  img.src = url;
  img.style.display = "block";
});

// ===== MULTILINE TEXT =====
let lines = [];
let currentLine = 0;

// ===== PLAY BUTTON =====
playBtn.addEventListener("click", function () {

  const text = textInput.value.trim();
  if (!text) {
    alert("पहले लेख लिखें");
    return;
  }

  // 🔥 Hide input UI
  fileInput.style.display = "none";
  textInput.style.display = "none";
  playBtn.style.display = "none";

  // 🔥 Fullscreen
  document.documentElement.requestFullscreen?.();

  // Split text into lines (by punctuation)
  lines = text.split(/[।.!?]/).filter(l => l.trim() !== "");
  currentLine = 0;

  speakLine();
});

// ===== SPEAK LINE BY LINE =====
function speakLine() {

  if (currentLine >= lines.length) return;

  const line = lines[currentLine].trim();

  // show only one line
  textBox.innerText = line;

  // animate image
  applyImageEffect();

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(line);

  // 🎤 BEST FEMALE VOICE DETECTION
  const voices = speechSynthesis.getVoices();
  const femaleVoice = voices.find(v =>
    v.lang.includes("hi") && v.name.toLowerCase().includes("female")
  ) || voices.find(v => v.lang.includes("hi"));

  if (femaleVoice) speech.voice = femaleVoice;

  speech.lang = "hi-IN";
  speech.rate = 0.95;
  speech.pitch = 1.1;

  speech.onend = () => {
    currentLine++;
    setTimeout(speakLine, 600);
  };

  speechSynthesis.speak(speech);
}

// ===== IMAGE EFFECT =====
function applyImageEffect() {

  const effects = [
    "scale(1.05)",
    "scale(1.1)",
    "scale(1.08)"
  ];

  const random = effects[Math.floor(Math.random() * effects.length)];

  img.style.transition = "transform 5s ease";
  img.style.transform = random;
}
