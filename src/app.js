const tasks = {
  food: [
    { question: "Translate: apple", answer: "яблуко" },
    { question: "Translate: bread", answer: "хліб" },
    { question: "Translate: cheese", answer: "сир" },
  ],
  travel: [
    { question: "Translate: airport", answer: "аеропорт" },
    { question: "Translate: ticket", answer: "квиток" },
    { question: "Translate: luggage", answer: "багаж" },
  ],
  technology: [
    { question: "Translate: computer", answer: "комп’ютер" },
    { question: "Translate: keyboard", answer: "клавіатура" },
    { question: "Translate: internet", answer: "інтернет" },
  ],
};

document.getElementById("generate").addEventListener("click", () => {
  const topic = document.getElementById("topic").value;
  const container = document.getElementById("task-container");
  container.innerHTML = "";

  tasks[topic].forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <p>${i + 1}. ${t.question}</p>
      <input type="text" id="answer-${i}" placeholder="Ваша відповідь">
    `;
    container.appendChild(div);
  });

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Перевірити відповіді";
  checkBtn.onclick = () => checkAnswers(topic);
  container.appendChild(checkBtn);
});

function checkAnswers(topic) {
  const userAnswers = tasks[topic].map((_, i) =>
    document.getElementById(`answer-${i}`).value.trim().toLowerCase()
  );

  let correct = 0;
  tasks[topic].forEach((t, i) => {
    if (userAnswers[i] === t.answer.toLowerCase()) correct++;
  });

  alert(`Результат: ${correct} з ${tasks[topic].length}`);
}
