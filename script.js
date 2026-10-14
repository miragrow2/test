// 확장된 기분 이모지
const emojiOptions = ["😊", "😢", "😡", "😌", "😴", "🤔", "🥳", "😇", "😕", "❤️"];

// 질문 리스트
const questions = [
  "가장 기억에 남는 순간은?",
  "오늘 하루를 한 단어로 표현한다면?",
  "내일을 위해 하고 싶은 것은?"
];

// 기분별 명언 데이터베이스 (확장)
const quotes = {
  "😊": [
    "행복은 습관이다. 그것을 몸에 지니라.",
    "웃음은 가장 좋은 약이다.",
    "작은 기쁨이 큰 행복을 만든다."
  ],
  "😢": [
    "눈물은 마음의 언어다.",
    "슬픔은 지나가고 희망은 남는다.",
    "어두운 밤도 결국은 새벽을 맞는다."
  ],
  "😡": [
    "분노는 잠시, 후회는 길다.",
    "화를 다스리는 자가 가장 강하다.",
    "침착함은 최고의 무기다."
  ],
  "😌": [
    "평온은 최고의 행복이다.",
    "마음의 고요가 삶의 빛을 만든다.",
    "내면의 평화가 외면의 행복을 이끈다."
  ],
  "😴": [
    "휴식은 내일을 위한 준비다.",
    "잘 자는 것이 최고의 회복이다.",
    "오늘의 피곤은 내일의 힘이 된다."
  ],
  "🤔": [
    "생각은 미래를 만든다.",
    "질문은 지혜의 시작이다.",
    "깊은 성찰이 큰 깨달음을 준다."
  ],
  "🥳": [
    "축하할 순간을 즐겨라.",
    "인생은 파티다, 즐겨라.",
    "작은 승리를 기뻐하라."
  ],
  "😇": [
    "선한 마음은 빛을 낸다.",
    "착한 행동은 세상을 바꾼다.",
    "순수한 마음이 가장 큰 힘이다."
  ],
  "😕": [
    "혼란은 성장의 시작이다.",
    "모든 답은 결국 찾아온다.",
    "길을 잃어야 새로운 길을 찾는다."
  ],
  "❤️": [
    "사랑은 모든 것을 이긴다.",
    "사랑은 나눌수록 커진다.",
    "사랑은 삶의 이유다."
  ]
};

let answers = [];
let currentQuestion = 0;

function renderEmojiOptions() {
  const container = document.getElementById("emoji-options");
  container.innerHTML = "";
  emojiOptions.forEach(emoji => {
    const btn = document.createElement("button");
    btn.textContent = emoji;
    btn.onclick = () => handleEmojiClick(emoji);
    container.appendChild(btn);
  });
}

function handleEmojiClick(emoji) {
  if (currentQuestion < questions.length) {
    answers.push(emoji);
    showNextQuestion();
  } else {
    answers.push(emoji);
    saveDaySummary();
  }
}

function showNextQuestion() {
  const qContainer = document.getElementById("questions");
  qContainer.textContent = questions[currentQuestion];

  const inputArea = document.getElementById("input-area");
  inputArea.innerHTML = `
    <input type="text" id="userInput" placeholder="여기에 입력하세요..." />
    <button onclick="saveInput()">저장</button>
  `;
}

function saveInput() {
  const input = document.getElementById("userInput").value;
  answers.push(input);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showNextQuestion();
  } else {
    saveDaySummary();
  }
}

function saveDaySummary() {
  const today = new Date().toLocaleDateString();
  const summary = {
    date: today,
    mood: answers.find(ans => emojiOptions.includes(ans)) || "😊",
    answers: answers
  };

  let history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.push(summary);
  localStorage.setItem("moodHistory", JSON.stringify(history));

  showSummary(summary);
  showWeekly(history);
  showQuote(summary.mood);
}

function showSummary(summary) {
  document.getElementById("summary").textContent =
    `오늘(${summary.date})의 기분: ${summary.mood} / 답변: ${summary.answers.join(", ")}`;
}

function showWeekly(history) {
  const weekly = history.slice(-7).map(day => day.mood).join(" ");
  document.getElementById("weekly").textContent =
    `📅 일주일 감정 변화: ${weekly}`;
}

function showQuote(mood) {
  const moodQuotes = quotes[mood] || ["내일은 새로운 시작이다."];
  const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
  document.getElementById("quote").textContent =
    `내일의 시작: "${randomQuote}"`;
}

renderEmojiOptions();