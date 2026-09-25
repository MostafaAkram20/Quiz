const questions = [
  {
    text: "مين اللي في الصورة ؟    ----  (اختاري الاجابه الي مصطفى بيحبها)",
    answers: ["الاء", "ليلى", "ليلو"],
    correct: 1,
    correctMessage: "مش ممممممكن شطوره فشخ  ❤️",
    wrongMessages: {
      0: "اسم بحب اناديكي بيه",
      1: "اسم بحب اناديكي بيه",
      // 2: "ليلااااااااعععععععع"
    }
  },
  {
    text: "اكتر حاجه مصطفى بيحب يعملها في يومه",
    answers: ["يكلم صحابه", "يكودينج على اللاب", "يكلم الاء طبعا 🥰"],
    correct: 2,
    correctMessage: "ماشاء الله بجد انتي ازاي شاطره كدا",
    wrongMessages: {
      0: "مهو اكيد يعني بس مش دي الأجابه",
      1: "هفتح لابي جاي اصفي معاكوا حسابي",
      2: ""
    }
  },
  {
    text: "ايه تاني حاجه بعتتيها لما بعتتيلي ازيك على المسنجر ",
    answers: ["معرفش"],
    correct: 0,
    correctMessage: " مهو طبيعي متعرفيش لانك مسحتي المسدج بعدها ...رهاب اجتماعي ",
    wrongMessages: {
      // 0: "مهو طبيعي متعرفيش لانك مسحتي المسدج بعدها ",
    }
  },
  {
    text: "اخر سؤال .. تحبي تخرجي معايا في يوم نلعب جيمز",
    answers: ["موافقه","طبعا موافقه", "هفكر... فكرت موافقه"],
    correct: 1,
    correctMessage: "جاري التخطيط 🥰",
    wrongMessages: {
      0: " 😡 اختاري موافقه",
      2: " 😡 اختاري موافقه",
      1: ""
    }
  }
];

let current = 0;
let answeredCorrectly = false;

const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const questionScreen = document.getElementById("questionScreen");
const finalScreen = document.getElementById("finalScreen");
const revealBtn = document.getElementById("revealBtn");
const hiddenMessage = document.getElementById("hiddenMessage");
const quizCard = document.getElementById("quizCard");
const toast = document.getElementById("toast");

function renderQuestion() {
  const item = questions[current];

  questionNumber.textContent = `السؤال ${current + 1} من ${questions.length}`;
  progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  question.innerHTML = item.text.replace("\\n", "<br>");

  answers.innerHTML = "";
  feedback.textContent = "";
  nextBtn.hidden = true;
  answeredCorrectly = false;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index, button));
    answers.appendChild(button);
  });

  questionScreen.classList.remove("active");
  void questionScreen.offsetWidth;
  questionScreen.classList.add("active");
}

function selectAnswer(index, clickedButton) {
  if (answeredCorrectly) return;

  const item = questions[current];

  if (index === item.correct) {
    answeredCorrectly = true;
    clickedButton.classList.add("correct");
    feedback.textContent = item.correctMessage;
    nextBtn.hidden = false;
    burstHearts(7);

    [...answers.children].forEach((button, i) => {
      if (i !== index) button.disabled = true;
    });

    if (current === questions.length - 1) {
      nextBtn.textContent = "شوفِ المفاجأة ❤️";
    }
  } else {
    clickedButton.classList.add("wrong");
    feedback.textContent = item.wrongMessages[index];
    showToast("ركزي يا الااااااء");
    setTimeout(() => clickedButton.classList.remove("wrong"), 450);
  }
}

nextBtn.addEventListener("click", () => {
  if (!answeredCorrectly) return;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showFinal();
  }
});

function showFinal() {
  questionScreen.hidden = true;
  questionNumber.textContent = "خلصنا الاختبار ❤️";
  progress.style.width = "100%";
  finalScreen.hidden = false;
  finalScreen.classList.remove("screen");
  void finalScreen.offsetWidth;
  finalScreen.classList.add("screen");
  burstHearts(28);
}

revealBtn.addEventListener("click", () => {
  hiddenMessage.classList.add("show");
  revealBtn.textContent = "❤️";
  revealBtn.disabled = true;
  burstHearts(16);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "confetti-heart";
    heart.textContent = Math.random() > .35 ? "❤️" : "💗";
    heart.style.left = `${45 + Math.random() * 10}%`;
    heart.style.top = `${42 + Math.random() * 12}%`;
    heart.style.setProperty("--x", `${(Math.random() - .5) * 320}px`);
    heart.style.setProperty("--y", `${(Math.random() - .8) * 400}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}

function floatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .4 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 20}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(floatingHeart, 1100);

renderQuestion();
