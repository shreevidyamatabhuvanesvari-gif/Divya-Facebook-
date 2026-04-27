function generate() {
  const file = document.getElementById("imageInput").files[0];
  const text = document.getElementById("textInput").value;

  if (!file) {
    alert("कृपया फोटो चुनें");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("previewImage").src = e.target.result;
  }

  reader.readAsDataURL(file);

  document.getElementById("previewText").innerText = text;

  speak(text);
}

function speak(text) {
  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 0.9;

  speechSynthesis.speak(speech);
}
