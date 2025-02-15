document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
        { question: "What is the square root of 16?", options: ["2", "4", "6", "8"], answer: "4" },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"], answer: "Shakespeare" }
    ];
    
    function loadQuiz() {
        quizContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;
            q.options.forEach(option => {
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = option;
                input.addEventListener("change", () => saveProgress());
                
                const label = document.createElement("label");
                label.textContent = option;
                
                questionDiv.appendChild(input);
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement("br"));
            });
            quizContainer.appendChild(questionDiv);
        });
        restoreProgress();
    }
    
    function saveProgress() {
        const progress = {};
        questions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
            if (selectedOption) {
                progress[`question${index}`] = selectedOption.value;
            } 
        });
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }
    
    function restoreProgress() {
        const progress = JSON.parse(sessionStorage.getItem("progress"));
        if (progress) {
            Object.keys(progress).forEach(key => {
                const input = document.querySelector(`input[name='${key}'][value='${progress[key]}']`);
                if (input) input.checked = true;
            });
        }
    }
    
    function calculateScore() {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });
        localStorage.setItem("score", score);
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    }
    
    submitButton.addEventListener("click", function () {
        calculateScore();
    });
    
    loadQuiz();
    
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
    }
});
