function saveData() {
  let name = document.getElementById("nameInput").value;
  console.log(name);
  if (name.trim() === "") {
    document.getElementById("emptyName").innerHTML =
      "Please enter your name first";
    document.getElementById("saveButton").innerHTML = "save";
  } else if (typeof name === "string") {
    document.getElementById("emptyName").innerHTML =
      name + " welcome to quiz, click start Quiz to proceed";
    document.getElementById("saveButton").innerHTML = "saved";
  }
  console.log(typeof name);
  return document.getElementById("nameInput").value;
}
function stoptime() {
  clearInterval(timer);
}
let timer;
function started() {
  let content = document.getElementById("saveButton").innerHTML;
  console.log(content);
  if (content === "saved") {
    document.getElementById("quizSection").style.display = "block";
    console.log("worked");

    function disableRadioButtons() {
      let radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.disabled = true;
      });
    }

    function enableRadioButtons() {
      let radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.disabled = false;
      });
    }
    // time logic
    document.getElementById("timer").style.border = "none";
    let secs = 13 * 60;
    if (timer) {
      clearInterval(timer);
      enableRadioButtons();
    }
    timer = setInterval(() => {
      let mins = Math.floor(secs / 60);
      let remainingSecs = secs % 60;

      document.getElementById(
        "timer",
      ).innerHTML = `Time: ${mins} min ${remainingSecs} secs`;
      if (secs < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "time up!";
        stoptime();
        disableRadioButtons();
      } else secs--;
    }, 1000);
  } else if (content === "save") {
    document.getElementById("emptyName").innerHTML =
      "Please enter your name first";
    document.getElementById("quizSection").style.display = "none";
  }
}

let score = 0;
function correctAnswer() {
  let answers = {
    q1: "correct",
    q2: "correct",
    q3: "correct",
    q4: "correct",
    q5: "correct",
    q6: "correct",
    q7: "correct",
    q8: "correct",
    q9: "correct",
    q10: "correct",
    q11: "correct",
    q12: "correct",
    q13: "correct",
    q14: "correct",
    q15: "correct",
    q16: "correct",
    q17: "correct",
    q18: "correct",
    q19: "correct",
    q20: "correct",
    q21: "correct",
    q22: "correct",
    q23: "correct",
    q24: "correct",
    q25: "correct",
  };

  for (let key in answers) {
    let selectedOption = document.querySelector(`input[name='${key}']:checked`);
    if (selectedOption && selectedOption.value === answers[key]) {
      score += 1;
    }
  }

  let name = saveData();
  document.getElementById("score").innerHTML =
    "Congrats " + name + " Your score is: " + score + "/25";
  console.log("Current Score:", score);
  stoptime();
  document.getElementById("submitButton").disabled = true;

  //
  submitQuiz();
  disableRadioButtons();
  function disableRadioButtons() {
    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.disabled = true;
    });
  }
  function submitQuiz() {
    document.getElementById("submission").innerHTML =
      "Quiz submitted! You cannot submit your answer now.";
  }
  document.getElementById("resetpopup").innerHTML =
    "Click reset to start quiz again";
}
function resetScore() {
  score = 0;
  document.getElementById("score").innerHTML = "";
  document.getElementById("submission").innerHTML = "";
  document.getElementById("resetpopup").innerHTML = "";
  let selectedOptions = document.querySelectorAll(
    "input[type='radio']:checked",
  );
  document.getElementById("startingWeb");
  selectedOptions.forEach((option) => (option.checked = false));
  document.getElementById("submitButton").disabled = false;
  clearInterval(timer);
  secs = 300;
  started();
}
