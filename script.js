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

// ===== MULTI COLOR TEXT =====
textInput.addEventListener("input", function () {
  const text = textInput.value;

  // हर शब्द को अलग रंग देना
  const colors = ["#ff4d4d", "#ffd633", "#66ff66", "#66ccff", "#ff66cc"];
  const words = text.split(" ");

  const coloredText = words.map((word, i) => {
    const color = colors[i % colors.length];
    return `<span style="color:${color}">${word}</span>`;
  }).join(" ");

  textBox.innerHTML = coloredText;
});

// ===== TTS PLAY =====
playBtn.addEventListener("click", function () {

  const text = textInput.value;
  if (!text) {
    alert("पहले लेख लिखें");
    return;
  }

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 0.9;

  speechSynthesis.speak(speech);

});
