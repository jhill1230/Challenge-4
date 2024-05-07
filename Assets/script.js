// Questions for the Quiz 
let Questions = [ 
	{ 
		prompt: `Inside which HTML 
				element do we put 
				the JavaScript?`, 
		choices: [ 
			"<javascript>", 
			"<js>", 
			"<script>", 
			"<scripting>", 
		], 
		answer: "<script>", 
	}, 

	{ 
		prompt: `How do you call a 
				function named 
				myFunction?`, 
		choices: [ 
			"call myFunction()", 
			"myFunction()", 
			"call function myFunction", 
			"Call.myFunction", 
		], 
		answer: "myFunction()", 
	}, 

	{ 
		prompt: `How does a for loop 
				start?`, 
		choices: [ 
			"for (i = 0; i <= 5; i++)", 
			"for (i = 0; i <= 5)", 
			"for i = 1 to 5", 
			" for (i <= 5; i++)", 
		], 
		answer: "for (i = 0; i <= 5; i++)", 
	}, 

	{ 
		prompt: `In JavaScript, which 
				of the following is 
				a logical operator?`, 
		choices: ["|", "&&", "%", "/"], 
		answer: "&&", 
	}, 

	{ 
		prompt: `A named element in a 
				JavaScript program that 
				is used to store and 
				retrieve data is a _____.`, 
		choices: [ 
			"method", 
			"assignment operator", 
			"letiable", 
			"string", 
		], 
		answer: "letiable", 
	}, 
]; 

// Dom Elements

let the_questions = document.querySelector("#questions"); 
let time_set = document.querySelector("#timer"); 
let the_choices = document.querySelector("#choices"); 
let submitButton = document.querySelector("#submit-score"); 
let startButton = document.querySelector("#start"); 
let name_ink = document.querySelector("#name"); 
let comment_set = document.querySelector("#comment");
let reStartButton = document.querySelector("#restart"); 


// Initial State for the Quiz
let recQuestion = 0;
let timerset = Questions.length * 20;
let timeID;

// Start of the Quiz
function quizStart() { 
    timeID = setInterval(clockDown,1000);
    time_set.textContent = timerset; 
    let screenlabel = document.getElementById("start-screen");     
    screenlabel.setAttribute("class","hide"); 
    the_questions.removeAttribute("class"); 
    getQuestion(); 
};

// Start quiz after clicking start quiz
startButton.onclick = quizStart;

// Loop through array of questions and answers
// Create list with buttons 
function getQuestion() { 
    let currentQuestion = Questions[recQuestion]; 
    let the_prompt = document.getElementById("questions-words");

    the_prompt.textContent = currentQuestion.prompt; 
    the_choices.innerHTML = ""; 
    currentQuestion.choices.forEach(function (choice, i) { 
            let choiceButton = document.createElement("button"); 
            choiceButton.setAttribute("value", choice); 
            choiceButton.textContent = i + 1 + ". " + choice; 
            choiceButton.onclick = questionClick; 
            the_choices.appendChild(choiceButton);
             } 
    ); 
};


// Check for right answers and deduct 
// Time for wrong answer, go to next question   
function questionClick() { 
    if (this.value !== Questions[recQuestion].answer 
    ) { 
        timerset -= 10; 
        if (timerset < 0) { 
            timerset = 0; 
        } 
        time_set.textContent = timerset; 
        comment.textContent = `Wrong! The correct answer was  + ${Questions[recQuestion].answer};` 
        comment.style.color = "red"; 
    } else { 
        comment.textContent = "Correct!"; 
        comment.style.color = "green"; 
    } 
    comment.setAttribute("class","comment"); 
    setTimeout(function () { 
        comment.setAttribute("class","comment hide"); 
    }, 2000); 

    recQuestion++; 

    if ( 
        recQuestion === Questions.length 
    ) { 
        quizEnd(); 
    } else { 
        getQuestion(); 
    } 
};


// End quiz if timer reaches 0 
function clockDown() { 
    timerset--; 
    time_set.textContent = timerset; 
    if (timerset <= 0) { 
        quizEnd(); 
    } 
};

// End quiz by hiding questions, 
// Stop timer and show final score 
function quizEnd() { 
    
    clearInterval(timeID); 
    let end_Screen = document.getElementById("end");
    end_Screen.removeAttribute("class"); 
    let final_score = document.getElementById("score"); 
    final_score.textContent = timerset; 
    the_questions.setAttribute("class","hide"); 
}; 



// Save score in local storage 
// Along with users' name 
function saveHighscore() { 
    let name = document.querySelector('#name_ink').value.trim();
    if (name == "") {let highscores = JSON.parse(window.localStorage.getItem("highscores")) || []; 
        let newScore = { 
            score: time, 
            name: name, 
        }; 
        highscores.push(newScore); 
        window.localStorage.setItem("highscores",JSON.stringify(highscores)); 
        alert("Your Score has been Submitted"); 
    } 
} 
  
// Save users' score after pressing enter 
  
function checkForEnter(event) { 
    if (event.key === "Enter") { 
        saveHighscore(); 
        alert("Your Score has been Submitted"); 
    } 
} 

name_ink.onkeypress = checkForEnter; 
  
// Save users' score after clicking submit 
  
submitButton.onclick = saveHighscore; 






