// ===== Slide Data =====
const slides = [
  {
    image: "images/img1.jpg",
    text: "वही सृजन सार्थक है, जो लोगों के जीवन में मूल्य, प्रेरणा और सकारात्मक परिवर्तन का कारण बने।"
  },
  {
    image: "images/img2.jpg",
    text: "सत्य, सरलता और संवेदना ही स्थायी प्रभाव का आधार हैं।"
  },
  {
    image: "images/img3.jpg",
    text: "विचार वही मूल्यवान है, जो जीवन को दिशा दे और समाज को जोड़ सके।"
  }
];

let currentIndex = 0;
let isSpeaking = false;
let voices = [];

const slideDiv = document.getElementById("slide");
const textBox = document.getElementById("textBox");

// ===== Load Voices =====
function loadVoices() {
  voices = speechSynthesis.getVoices();
}

// कुछ browsers में voices async आते हैं
speechSynthesis.onvoiceschanged = loadVoices;

// ===== Select Female Hindi Voice =====
function getHindiFemaleVoice() {
  return voices.find(v =>
    v.lang.includes("hi") && v.name.toLowerCase().includes("female")
  ) || voices.find(v =>
    v.lang.includes("hi")
  ) || null;
}

// ===== Speak Function =====
function speakText(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const voice = getHindiFemaleVoice();
  if (voice) {
    utterance.voice = voice;
  }

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

// ===== Prevent Interaction While Speaking =====
document.addEventListener("touchstart", (e) => {
  if (isSpeaking) {
    e.preventDefault();
  }
}, { passive: false });

// ===== Init =====
window.onload = () => {
  loadVoices();
  loadSlide(currentIndex);
};
