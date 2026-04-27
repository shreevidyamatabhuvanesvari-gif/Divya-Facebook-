const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");

const img = document.getElementById("img");
const textBox = document.getElementById("textBox");

// 🔥 IMAGE LOAD ON SELECT (NO BUTTON)
fileInput.addEventListener("change", function () {

  const file = fileInput.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  img.src = url;
  img.style.display = "block"; // 🔥 important

});

// 🔥 TEXT LIVE UPDATE
textInput.addEventListener("input", function () {
  textBox.innerText = textInput.value;
});
