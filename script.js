const slides = [
  {
    image: "images/img1.jpg",
    text: "वही सृजन सार्थक है, जो लोगों के जीवन में मूल्य, प्रेरणा और सकारात्मक परिवर्तन का कारण बने।"
  },
  {
    image: "images/img2.jpg",
    text: "सत्य और सरलता ही स्थायी प्रभाव की नींव हैं।"
  },
  {
    image: "images/img3.jpg",
    text: "प्रेरणा वही जो जीवन में सकारात्मक परिवर्तन लाए।"
  }
];

let currentIndex = 0;
let isSpeaking = false;
let voices = [];

const slideDiv = document.getElementById("slide");
const textBox = document.getElementById("textBox");
const startBtn = document.getElementById("startBtn");

// ===== Voices Load =====
function loadVoices() {
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;

// ===== Best Hindi Voice =====
function getHindiVoice() {
  let voice = voices.find(v => v.lang === "hi-IN");
  if (!voice) {
    voice = voices.find(v => v.lang.includes("hi"));
  }
  return voice || null;
}

// ===== Speak Function =====
function speakText(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const voice = getHindiVoice();
  if (voice) utterance.voice = voice;

  utterance.lang = "hi-IN";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  isSpeaking = true;

  utterance.onend = () => {
    isSpeaking = false;
    nextSlide();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    nextSlide();
  };

  speechSynthesis.speak(utterance);
}

// ===== Load Slide =====
function loadSlide(index) {
  const data = slides[index];

  slideDiv.style.backgroundImage = `url('${data.image}')`;
  textBox.innerText = data.text;

  speakText(data.text);
}

// ===== Next Slide =====
function nextSlide() {
  currentIndex++;

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  setTimeout(() => {
    loadSlide(currentIndex);
  }, 500);
}

// ===== Start Button =====
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  loadSlide(currentIndex);
});

// ===== Prevent Interaction While Speaking =====
document.addEventListener("touchstart", (e) => {
  if (isSpeaking) {
    e.preventDefault();
  }
}, { passive: false });

// ===== Init =====
window.onload = () => {
  loadVoices();
};
