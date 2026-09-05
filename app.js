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
const appStatus = document.querySelector("#app-status");

const questions = [
  {
    question: "오늘 하루를 시작할 때 더 필요한 것은 무엇인가요?",
    choices: [
      { label: "차분하게 계획 세우기", image: "assets/choice-calm.svg" },
      {
        label: "새로운 일에 바로 도전하기",
        image: "assets/choice-adventure.svg",
      },
    ],
  },
  {
    question: "어려운 일이 생겼을 때 나는 어떻게 해결하나요?",
    choices: [
      { label: "혼자 먼저 생각해 보기", image: "assets/choice-solo.svg" },
      {
        label: "주변 사람과 함께 이야기하기",
        image: "assets/choice-together.svg",
      },
    ],
  },
  {
    question: "쉬는 시간에는 어떤 활동이 더 끌리나요?",
    choices: [
      { label: "조용히 휴식하기", image: "assets/choice-calm.svg" },
      { label: "재미있는 활동 즐기기", image: "assets/choice-adventure.svg" },
    ],
  },
  {
    question: "새로운 선택을 할 때 가장 중요하게 보는 것은 무엇인가요?",
    choices: [
      { label: "안정성과 익숙함", image: "assets/choice-calm.svg" },
      { label: "가능성과 설렘", image: "assets/choice-adventure.svg" },
    ],
  },
];

let currentQuestionIndex = 0;
let selectedChoices = [];

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

  resultBox.classList.add("is-success");
  appStatus.textContent = `${questionNumber}번째 질문`;
  appStatus.classList.add("is-running");

  resultBox.querySelectorAll(".choice-button").forEach((choiceButton) => {
    choiceButton.addEventListener("click", handleChoiceSelection);
  });
}

function handleChoiceSelection(event) {
  const choiceIndex = Number(event.currentTarget.dataset.choiceIndex);
  selectedChoices.push(choiceIndex);
  currentQuestionIndex += 1;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
    return;
  }

  showResult();
}

function showResult() {
  const firstChoiceCount = selectedChoices.filter(
    (choiceIndex) => choiceIndex === 0,
  ).length;
  const resultMessage =
    firstChoiceCount >= 3
      ? "신중하고 차분하게 생각하는 편이에요."
      : firstChoiceCount <= 1
        ? "새로운 경험과 가능성을 즐기는 편이에요."
        : "상황에 따라 균형 있게 선택하는 편이에요.";

  resultBox.innerHTML = `
    <p class="question-text">선택이 모두 완료되었습니다.</p>
    <strong>${resultMessage}</strong>
    <p>정답은 없으며, 지금의 선택을 가볍게 돌아보는 결과입니다.</p>
    <img class="result-image" src="assets/result.svg" alt="선택 결과를 보여주는 이미지" />
  `;

  appStatus.textContent = "선택 완료";
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
