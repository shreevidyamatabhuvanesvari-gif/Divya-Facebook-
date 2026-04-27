const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const previewBtn = document.getElementById("previewBtn");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");

previewBtn.addEventListener("click", function () {

  const file = imageInput.files[0];
  const text = textInput.value.trim();

  if (!file) {
    alert("कृपया फोटो चुनें");
    return;
  }

  if (!text) {
    alert("कृपया लेख लिखें");
    return;
  }

  // ===== Image Load =====
  const reader = new FileReader();

  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
  };

  reader.onerror = function () {
    alert("फोटो लोड करने में समस्या हुई");
  };

  reader.readAsDataURL(file);

  // ===== Text Set =====
  previewText.innerText = text;

  // ===== Speak =====
  speakText(text);
});

function speakText(text) {
  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 0.9;

  speechSynthesis.speak(speech);
}
