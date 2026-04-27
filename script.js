const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const btn = document.getElementById("btn");

const img = document.getElementById("img");
const textBox = document.getElementById("textBox");

btn.onclick = function () {

  const file = fileInput.files[0];
  const text = textInput.value;

  if (!file) {
    alert("पहले फोटो चुनें");
    return;
  }

  // ===== IMAGE LOAD (WORKING) =====
  const url = URL.createObjectURL(file);
  img.src = url;

  // ===== TEXT SHOW =====
  textBox.innerText = text;

  // ===== VOICE (USER CLICK REQUIRED) =====
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
};
