"use strict";

/*
 * AI.SW 부천연합해커톤 오후 프로젝트 스타터
 *
 * 이 파일의 예시 기능은 실행 환경 확인용입니다.
 * 프로젝트 기획이 승인되면 팀의 핵심 기능으로 교체하세요.
 *
 * 작업 원칙:
 * 1. 한 번에 기능 하나만 구현합니다.
 * 2. AI가 수정한 내용을 두 팀원이 함께 확인합니다.
 * 3. 실행하고 테스트한 뒤 커밋합니다.
 * 4. 개인정보나 API 키를 코드에 입력하지 않습니다.
 */

const startButton = document.querySelector("#start-button");
const quizIntro = document.querySelector("#quiz-intro");
const resultBox = document.querySelector("#result");

const questions = [
  {
    question: "어떤 엔진을 사용하고 싶으신가요?",
    choices: [
      { label: "약 1000마력의 F1자동차급 매연엔진", image: "assets/e2.jpg" },
      {
        label: "약76마력의 모닝급 전기 엔진",
        image: "assets/e1.png",
      },
    ],
  },
  {
    question: "어떤 타이어를 선택하실건가요?",
    choices: [
      { label: "위험한 정글이든 사막이든 어디든지 갈 수 있는 오프로드 타이어", image: "assets/t2.png" },
      {
        label: "일반 도로를 달리는 평범한 타이어",
        image: "assets/t1.png",
      },
    ],
  },
  {
    question: "어떤 도색을 하실건가요?",
    choices: [
      { label: "환경오염이 되지만 역시 자동차는 강렬한 레드", image: "assets/c2.png" },
      { label: "친환경적이지만 못생긴 블루", image: "assets/c1.png" },
    ],
  },
];

let currentQuestionIndex = 0;
let selectedChoices = [];
const ecoFriendlyChoices = new Set([
  "일반 도로를 달리는 평범한 타이어",
  "친환경적이지만 못생긴 블루",
  "약76마력의 모닝급 전기 엔진",
]);

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  resultBox.innerHTML = `
    <p class="question-count">${questionNumber} / ${questions.length}</p>
    <p class="question-text">${currentQuestion.question}</p>
    <div class="choice-list" role="group" aria-label="선택지">
      ${currentQuestion.choices
        .map(
          (choice, choiceIndex) => `
            <button class="choice-button" type="button" data-choice-index="${choiceIndex}">
              <span class="choice-label">${choice.label}</span>
              <img class="choice-image" src="${choice.image}" alt="${choice.label} 이미지" />
            </button>
          `,
        )
        .join("")}
    </div>
  `;

  resultBox.classList.remove("result-eco", "result-polluted");
  resultBox.classList.add("is-success");

  resultBox.querySelectorAll(".choice-button").forEach((choiceButton) => {
    choiceButton.addEventListener("click", handleChoiceSelection);
  });
}

function handleChoiceSelection(event) {
  const choiceIndex = Number(event.currentTarget.dataset.choiceIndex);
  const selectedChoice = questions[currentQuestionIndex].choices[choiceIndex].label;
  selectedChoices.push(selectedChoice);
  currentQuestionIndex += 1;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
    return;
  }

  showResult();
}

function showResult() {
  const ecoFriendlyChoiceCount = selectedChoices.filter(
    (choice) => ecoFriendlyChoices.has(choice),
  ).length;
  const resultMessage =
    ecoFriendlyChoiceCount >= 2 ? "친환경적인 미래" : "오염된 미래";
  const resultImage =
    ecoFriendlyChoiceCount >= 2 ? "assets/f1.png" : "assets/f2.png";
  const resultClass =
    ecoFriendlyChoiceCount >= 2 ? "result-eco" : "result-polluted";

  resultBox.innerHTML = `
    <p class="question-text">선택이 모두 완료되었습니다.</p>
    <strong class="future-result">${resultMessage}</strong>
    <img class="result-image" src="${resultImage}" alt="${resultMessage} 이미지" />
  `;
  resultBox.classList.remove("is-success");
  resultBox.classList.add(resultClass);

}

function startQuiz() {
  currentQuestionIndex = 0;
  selectedChoices = [];
  quizIntro.hidden = true;
  resultBox.hidden = false;
  renderQuestion();
}

startButton.addEventListener("click", startQuiz);

/*
 * TODO: 아래 순서로 팀 프로젝트를 구현하세요.
 *
 * 1. PROJECT_PLAN.md에 핵심 기능과 완료 기준을 작성합니다.
 * 2. index.html의 시연 영역을 프로젝트에 맞게 수정합니다.
 * 3. 사용자의 입력을 가져옵니다.
 * 4. 규칙 또는 데이터에 따라 결과를 계산합니다.
 * 5. 계산 결과와 판단 이유를 화면에 표시합니다.
 * 6. 정상 입력, 잘못된 입력, 경계값을 테스트합니다.
 * 7. TEST_CHECKLIST.md와 AI_LOG.md를 작성합니다.
 *
 * 규칙 기반 AI 예시:
 *
 * function makeRecommendation(score) {
 *   if (score >= 80) {
 *     return {
 *       result: "추천",
 *       reason: "안전 기준을 충분히 통과했습니다."
 *     };
 *   }
 *
 *   return {
 *     result: "다시 확인",
 *     reason: "사용자가 직접 검토할 항목이 남아 있습니다."
 *   };
 * }
 */
