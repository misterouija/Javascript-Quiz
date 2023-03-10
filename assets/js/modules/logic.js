// Imports
import { questions } from "./questions.js";

// Quiz object
const quiz = {
    questions: questions,
    duration: questions.length + 60,
    question: 0,
    score: 0,
    startTimer () {
        let timeDisplay = document.querySelector('#time');

        const countdown = () => {
            timeDisplay.innerText = this.duration;
            this.duration--;
            // Stop time if times up or questions finished
            if (this.duration < 0 || this.question === this.questions.length) {
                clearInterval(clearTimer);
                // Shows final score if timer runs out or questions finished
                setTimeout(() => { this.finalScore(); }, 1500);
            }
        };
        let clearTimer = setInterval(countdown, 1000);
    },
    showForm () {
        // Display question
        document.querySelector('#question-title').innerHTML = `Question ${this.question + 1} of ${this.questions.length}<br><hr>${this.questions[this.question][1]}`;

        // Generate Answer Choices
        const choices = document.querySelector('#choices');
        let answerChoices = "<form>";
        this.questions[this.question][2].forEach((q) => {
            answerChoices += `<span class="answers"><input type="radio" name="${this.questions[this.question][0]}" id="ans-${q}" value="${q}"><label for="${q}">${q}</label></span><br>`;
        });
        answerChoices += "<button type='submit' class='submit'>Check Answer</button>";
        answerChoices += "</form>";
        choices.innerHTML = answerChoices;

        // Check Answer
        const checkAnswer = document.querySelector('.submit');
        // Disable button until answer is chosen
        checkAnswer.disabled = true;
        // Enable button if answer selected
        const choiceName = document.querySelectorAll(`[name="${this.questions[this.question][0]}"]`);
        choiceName.forEach((choice) => {
            choice.addEventListener('click', () => {
                checkAnswer.disabled = false;
            });
        });
        // Get value from selected answer and check if correct
        checkAnswer.addEventListener('click', (event) => {
            event.preventDefault();
            choiceName.forEach((choice) => {
                if (choice.checked) {
                    if (choice.value === this.questions[this.question][3]) {
                        // Play feeback sound
                        const audio = new Audio('./assets/sfx/correct.wav');
                        audio.play();
                        // Adds score
                        this.score += 1;
                        // Display feedback
                        this.showElement("feedback");
                        this.setFeedbackStyle("green");
                        this.setTextContent("feedback", "Correct");
                        setTimeout(() => { this.hideElement("feedback"); }, 1000);


                    } else {
                        // Play feedback sound
                        const audio = new Audio('./assets/sfx/incorrect.wav');
                        audio.play();
                        // Decrease timer by ten if value is greater than ten
                        this.duration > 10 ? this.duration -= 10 : this.duration = 0;
                        // Display feedback
                        this.showElement("feedback");
                        this.setFeedbackStyle("red");
                        this.setTextContent("feedback", "Correct");
                        setTimeout(() => { this.hideElement("feedback"); }, 1000);

                    }

                };

            });

            // Increment question property to select next question
            this.question++;

            // Call buildFrom until questions is finished
            if (this.question < this.questions.length) {
                this.showForm();
            } else {
                //Shows final score after two seconds if all questions answered
                setTimeout(() => { this.finalScore(); }, 1500);
            }
        });

        // Styling
        document.querySelector("#questions").setAttribute("style", "border: 1px solid #d8d8d8;padding: 20px;border-radius: 6px;margin - top: 50px; font - family: monospace; ");

    },
    finalScore () {
        this.hideElement("questions");
        this.showElement("end-screen");
        this.setTextContent("final-score", `${this.score} out of ${this.questions.length}`);
        this.setTextContent("final-score-percent", this.getScorePercentage());
    },
    startQuiz () {
        // Sets the question property back to zero
        this.question = 0;
        // Display form
        this.showForm();
        // Start timer
        this.startTimer();
        // Hide start screen
        this.hideElement("start-screen");
    },
    submitScores (initials) {
        let playerInitials = initials;
        let scores = [];
        let scoreDate = new Date();

        // Store highscores to local storage
        if (JSON.parse(localStorage.getItem("highScores")) === null) {
            scores.push([scoreDate.toLocaleString(), playerInitials, `${this.score}/${questions.length}`]);
            localStorage.setItem("highScores", JSON.stringify(scores));
        } else {
            scores = JSON.parse(localStorage.getItem("highScores"));
            scores.push([scoreDate.toLocaleString(), playerInitials, `${this.score}/${questions.length}`]);
            localStorage.setItem("highScores", JSON.stringify(scores));
        }

        // Load highscores page
        location.assign("highscores.html");
    },
    renderHighScores () {
        const highScoreslist = document.querySelector("#highscores");
        const highScores = JSON.parse(localStorage.getItem("highScores"));

        // Create list items
        let listItems = "";
        if (highScores !== null) {
            highScores.forEach((score) => {
                listItems += `<li><span class="score-initials">${score[1]}</span><span class="high-scores">${score[2]}</span><span class="score-dates">${score[0]}</span></li>`;
            });
        } else {
            listItems = "<li>No scores recorded yet. Play quiz and submit score to see results</li>";
        }

        highScoreslist.innerHTML = listItems;
    },
    clearHighScores (item) {
        localStorage.removeItem(item);
    },
    hideElement (id) {
        document.querySelector(`#${id}`).setAttribute("class", "hide");
    },
    showElement (id) {
        document.querySelector(`#${id}`).setAttribute("class", "show");
    },
    setTextContent (id, content) {
        document.querySelector(`#${id}`).textContent = content;
    },
    setFeedbackStyle (color) {
        let style = `color: ${color};`;
        style += 'font-style: italic;font-size: 120%;margin-top: 20px;';
        style += 'padding-top: 10px;border-top: 2px solid #ccc;font-weight:bold;';
        document.querySelector("#feedback").setAttribute('style', style);
    },
    getScorePercentage () {
        return ((this.score / (this.questions.length) * 100).toFixed(2));
    }
};


export { quiz };
