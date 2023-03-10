const questionChoices = [
    ['question', "Inside which HTML element do we put the JavaScript?", ["&lt;scripting&gt;", "&lt;script&gt;", "&lt;js&gt;", "&lt;javascript&gt;"], "<script>"],
    ['question', "Where is the correct place to insert a JavaScript?", ["The body section", "The head section", "Neither", "Both"], "Both"],
    ['question', "True or False: The main purpose of JavaScript is to provide structure to a webpage?", ["True", "False"], "False"],
    ['question', "What is the correct syntax for referring to an external script called \"index.js\"?", ["&lt;href=\"index.js\" script&gt;", "&lt;script name=\"index.js\"&gt;", '&lt;script src=&#34;index.js&#34;&gt;'], '<script src="index.js">'],
    ['question', "How do you create a function in JavaScript?", ["function myFunction()", "function = myFunction()", "function:myFunction()"], "function myFunction()"],
    ['question', "Which of these methods removes the last element of an array?", ["pop( )", "splice( )", "push( )", "split( )"], "pop( )"],
    ['question', "What is first index value of an array?", ['1', '-1', '0', '2'], '0'],
    ['question', "Which of the following is not a looping structure in JavaScript?", ["For", "All are", "Do-while loops", "While"], "All are"],
    ['question', "How do you call a function named \"myFunction\"?", ["call myFunction", "myFunction()", "var myFunction", "myFunction"], "myFunction()"],
    ['question', "How does a WHILE loop start?", ["while i = 1 to 10", "while(i <= 10){}", "while(i <= 10; i++)"], "while(i <= 10){}"],
    ['question', "How does a DO-WHILE loop start?", ["while i = 1 to 10; do(someting)", "do{something}while(i <= 10)", "do(something)while(i <= 10; i++)"], "do{something}while(i <= 10)"],
    ['question', "Arrays in JavaScript are defined by which of the following statements?", ["It is an ordered list of objects", "It is an ordered list of values", "It is an ordered list of string", "It is an ordered list of functions"], "It is an ordered list of values"],
    ['question', "Which of the following object is the main entry point to all client-side JavaScript features and APIs?", ["Position", "Location", "Window", "Standard"], "Window"],
    ['question', "Which of the following can be used to call a JavaScript Code Snippet?", ["Preprocessor", "Event Listener", "Trigger Event", "Method"], "Method"],
    ['question', "Which of the following is a string method?", [".forEach()", ".filter()", ".toLowerCase()", ".map()"], ".toLowerCase()"],
    ['question', "What will be the result or type of error if p is not defined?", ["Value not found Error", "Reference Error", "Null", "Zero"], "Reference Error"],
    ['question', "Which of the following is correct about JavaScript?", ["JavaScript is Assembly-language", "JavaScript is an Object-Based language", "JavaScript is an Object-Oriented language", "JavaScript is a High-level language"], "JavaScript is an Object-Oriented language"],
];

const shuffleArr = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

// Shuffle questionChoices array and pick ten questions
const questions = shuffleArr(questionChoices.slice(0, 12));

export { questions };
