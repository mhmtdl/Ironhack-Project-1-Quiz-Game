const questionNumber = document.querySelector('.question-number'); 
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const button = document.getElementById('myStartQuizButton');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const start = document.querySelector('.hero');
const buttonTry = document.getElementById('try');
const buttonGoHome = document.getElementById('go');
const buttonPlay = document.getElementById('play');


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOption = [];
let correctAnswer = 0;

//push the questions into availableQuestions Array
function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for(let i=0;i<totalQuestion;i++){
      availableQuestions.push(quiz[i])
  }
  
}
//set question number and question and options
function getNewQuestions(){
   //set question number
   questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

   //set question text
   //get random question
   const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
   currentQuestion = questionIndex;
   questionText.innerHTML = currentQuestion.q;
   //get the position of 'questionIndex' from the availableQuestion Array,so that the question does not repeat
   const index1 = availableQuestions.indexOf(questionIndex);
   
   //remove the 'questionIndex' from the availableQuestion Array;
   availableQuestions.splice(index1,1);
  // console.log(questionIndex);
  // console.log(availableQuestions)
  

   //set option
   //get the length of option
   const optionLen = currentQuestion.option.length;
   //push option into availableOption Array
   for(let i = 0;i<optionLen;i++){
      availableOption.push(i);
      
   }
   optionContainer.innerHTML = '';
   let animationDelay = 0.15;
   //console.log(availableOption)
   //create option in html
   for(let i=0;i<optionLen;i++){
       //random option
       const optonIndex = availableOption[Math.floor(Math.random()* availableOption.length)]  
       //get the position of 'optonIndex' from the availableOption
       const index2 = availableOption.indexOf(optonIndex);
      //remove the 'optonIndex' from the availableOption so that the option does not repeat
       // console.log(optonIndex)
       //console.log(availableOption)
       availableOption.splice(index2,1);
       const opt = document.createElement("div");
       opt.innerHTML = currentQuestion.option[optonIndex];
       opt.id = optonIndex;
       opt.style.animationDelay = animationDelay + 's';
       animationDelay = animationDelay + 0.15;
       opt.className = "option";
       optionContainer.appendChild(opt);
       opt.setAttribute("onclick","getResult(this)");
   }
      
   
   questionCounter++

}
//get result of current attempt question
function getResult(element){
   //console.log(element.innerHTML)
   const id = parseInt(element.id);
   //console.log(typeof id);
   //get the answer by comparing the id of clicked option
   if(id===currentQuestion.answer){
      // console.log("answer is correct");
      //set the green color to the correct option
      element.classList.add("correct");
      correctAnswer++;
      console.log("correct:"+correctAnswer)

      
   }
   else{
      //set the red color to the incorrect option
      //console.log("answer is wrong");
      element.classList.add("wrong");

      //if the answer is incorrect the show the correct option by adding green color the correct option
      const optionLen = optionContainer.children.length;
      for(let i =0;i<optionLen;i++){
          if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
              optionContainer.children[i].classList.add("correct");
          }
      }
   }
   unclickableOptions();
   
}
//make all the options unclickable once the user select a option(Restrict the user to change the option)
function unclickableOptions(){
   const optionLen = optionContainer.children.length;
   for(let i =0;i<optionLen;i++){
       optionContainer.children[i].classList.add("already-answered");
   }
}
//get progress bar
let bar = document.getElementById('myBar');


let width = 0;



button.addEventListener('click',()=>{
    if(questionCounter===quiz.length){
        console.log("quiz over");
        quizOver();
    } else {
        getNewQuestions();
    }
    bar.style.width = width + '%';
    if(width === 100){
        width = 0;
        
        
    }else {
        width = width + 10
    }
  
})

function quizOver(){
    //hide quiz quizBox
    quizBox.classList.add('d-none');
    //show result Box
    resultBox.classList.remove('d-none');
    
    quizResult();
}

//get the quiz result
function quizResult(){
    resultBox.querySelector('.total-question').innerHTML = quiz.length;
    resultBox.querySelector('.total-correct').innerHTML = correctAnswer;
    resultBox.querySelector('.total-wrong').innerHTML = quiz.length - correctAnswer;
    const percentage = (correctAnswer/quiz.length)*100;
    resultBox.querySelector('.percentage').innerHTML= percentage.toFixed(2) + "%";
    resultBox.querySelector('.total-score').innerHTML = correctAnswer + "/" + quiz.length;

    if(correctAnswer>7){
        let audio = new Audio(`./audio/applause2.mp3`);
        audio.play();
    }else {
        let dio = new Audio(`./audio/sfxboo.mp3`);
        dio.play();
    }


}


function resetQuiz(){
    questionCounter = 0;
    correctAnswer = 0;
}

buttonTry.addEventListener('click',()=>{
    //hide the resultBox
    resultBox.classList.add('d-none');
    //show the quizBox
    quizBox.classList.remove('d-none');


    bar.style.width = width + '%';
    if(width === 100){
        width = 0;
    }else {
        width = width + 10;
    }


    resetQuiz();
    setAvailableQuestions();
    getNewQuestions();
})

buttonPlay.addEventListener('click',()=>{
    quizBox.classList.remove('d-none');
    start.classList.add('d-none');

    bar.style.width = width + '%';
    if(width === 100){
        width = 0;
        
        
    }else {
        width = width + 10
    }
})

buttonGoHome.addEventListener('click',()=>{
    start.classList.remove('d-none');
    resultBox.classList.add('d-none');

    resetQuiz();
    setAvailableQuestions();
    getNewQuestions();
})






 window.onload=function(){
    //first  will set all questions in availableQuestions Array
    setAvailableQuestions()
    //second  will call getNewQuestions(); function
    getNewQuestions()
    
}

