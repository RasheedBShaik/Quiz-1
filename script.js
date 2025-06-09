let timerInterval;
let timeLeft = 2 * 60; // 2 minutes
let submitted = false;
let nameSaved = false; // track if name is saved

// Save name
function saveData() {
  const nameInput = document.getElementById("nameInput");
  const emptyName = document.getElementById("emptyName");

  if (nameInput.value.trim() === "") {
    emptyName.textContent = "Please enter your name.";
    emptyName.style.color = "red";
    nameSaved = false;
  } else {
    emptyName.textContent = "Name saved: " + nameInput.value.trim();
    emptyName.style.color = "green";
    nameSaved = true;
  }
}

// Start quiz
function started() {
  if (!nameSaved) {
    alert("Please save your name first!");
    return;
  }

  const quizSection = document.getElementById("quizSection");
  const radios = quizSection.querySelectorAll("input[type='radio']");
  quizSection.style.display = "block";

  radios.forEach((radio) => {
    radio.disabled = false;
  });

  document.getElementById("submission").textContent = "";
  document.getElementById("resetpopup").textContent = "";
  submitted = false;
  timeLeft = 2 * 60; // Reset timer when starting quiz
  startTimer();
}

// Timer
function startTimer() {
  const timerDisplay = document.getElementById("timer");
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
      correctAnswer(); // Auto-submit when time runs out
      return;
    }

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `Time: ${minutes} min ${seconds} secs`;
    timeLeft--;
  }, 1000);
}

// Submit answers and calculate score
function correctAnswer() {
  if (submitted) {
    document.getElementById("submission").textContent = "Already submitted!";
    return;
  }

  const radios = document.querySelectorAll("input[type='radio']");
  let score = 0;

  radios.forEach((radio) => {
    if (radio.checked && radio.value === "correct") {
      score++;
    }
    radio.disabled = true;
  });

  document.getElementById("score").textContent = `Score: ${score}/10`;
  document.getElementById("submission").textContent =
    "Your answers have been submitted.";
  submitted = true;
  clearInterval(timerInterval);
  document
    .querySelectorAll('input[type="radio"][value="correct"]')
    .forEach((input) => {
      input.parentElement.style.color = "green";
      input.parentElement.style.fontWeight = "600";
      input.parentElement.style.fontSize = "18px";
    });
}

// Reset quiz
function resetScore() {
  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach((radio) => {
    radio.checked = false;
    radio.disabled = true;
  });

  document.getElementById("score").textContent = "";
  document.getElementById("submission").textContent = "";
  document.getElementById("resetpopup").textContent = "Reset successful.";
  submitted = false;
  nameSaved = false;
  timeLeft = 2 * 60;
  document.getElementById("quizSection").style.display = "none";
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "Time: 2 min 0 secs";
  document.getElementById("emptyName").textContent = "";
}

// Handle Enter key on name input
document
  .getElementById("nameInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!nameSaved) {
        saveData();
      } else {
        started();
      }
    }
  });
