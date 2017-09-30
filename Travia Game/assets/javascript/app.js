var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() {
  if (timelimit > 0) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (curmin!=0) { curtime=curmin+" minutes and "+cursec+" seconds left"; }
              else { curtime=cursec+" seconds left"; }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+' -Time run out for this question';
    clearInterval(myVar);
  }
  timelimit--;
}

var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 23, timelimit = maxtimelimit;  // 23 seconds per question
var questions = [
    [ "Which of these is a prime number?", "63", "93", "53","33", "C" ],
    [ "who is the all time top gaol scorer for real-madrid?", "Luis-Figo", "cristiano-ronaldo", "Zidan","Raul", "B" ],
    [ "what is the second most populous continent?","Asia", "Africa", "North America", "Australia", "B" ],
    [ "The Earth is flat", "True", "False","Unknown","A&B","B" ],
    [ "(WORM)this computer abbreviation usually means ?",
      " Write Over Retrieved Memory", "Write On, Request Memory", "Write Once, Read Many times","Write Only to Random Memory", "C" ],
    [ " Which country has the longest coastline in the world?", "Australia", "Russia", "Canada","Indonesia", "C" ],
    [ "This fear is also known as which phobia? Fear of paper","Papyrophobia", "Claustrophobia", "Bibliophobia","Microphobia", "A" ],
    [ " E-commerce company founded in Seattle, WA by Jeff Bezos in 1994", "eBay", "Craigslist", "Facebook","Amazon.com", "D" ],
    ["This car brand is (or was) originally from which country? Hyundai", "South Korea", "Japan", "China","India", "A" ],
    [ "What is a scientific name for a collector of these objects? Books", "Labologists", "Discophile", "Bibliophilist","Ambulist", "C" ],
    ["This extension refers usually to what kind of file? .RAM","Programming/scripting related file", "Structured Query Language Data", "Audio file","Image file", "C" ],
    [ "Which planet in our solar system has the lowest average density?", "Saturn", "Jupiter", "Uranus","Neptune", "A" ],
    ];
  var questionOrder = [];
  function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);   // alert(questionOrder);  
  pos = 0;  posn = questionOrder[pos];
}

function $_(ID) { return document.getElementById(ID); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
  $_("game_status").innerHTML = "Game Completed";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">PLAY-Again</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}
function renderQuestion() {
  var test = $_("test");
  $_("game_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  if (rscore != 0) { $_("game_status").innerHTML += '<br>You got: '+(correct).toFixed(0)+' correct of 12 questions'; }
   var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  var chD = questions[posn][4];
  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  test.innerHTML += "<label><input type='radio' name='choices' value='D'> "+chD+"</label><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}

function checkAnswer(){
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value; }
  }
  rscore++;
  if (choice == questions[posn][5] && timelimit > 0) { correct++; }
  pos++;  posn = questionOrder[pos];
  if (pos < questions.length) { renderQuestion(); } else { renderResults(); }
}

window.onload = function() {
  setQuestionOrder();
  renderQuestion();
}