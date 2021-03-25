//Global Variable Def
const clueHoldTime = 1000; // how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause imbetween clues;
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0;
var guessCounter = 0; 
var rightbtn = 0;

//Start and Stop Function Def

function startGame(){
  //init game variable
  progress = 0; 
  gamePlaying = true;
  //swap start and stop buttons(Which one is showing at tghe current time)
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}
function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}
// Sound Synthesis Functions
const freqMap = {
  1: 311.6,
  2: 359.6,
  3: 392,
  4: 432.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}
function playClueSequence(){
  let delay = nextClueWaitTime; // set delay to initial waiut time;
  guessCounter = 0;
  for(let i = 0; i <= progress; i++){
    //for each clue tha tis revealed so far
    rightbtn = pattern[i];
    console.log("play single clue: "+pattern[i]+" in "+delay+" ms")
    setTimeout(playSingleClue, delay, pattern[i])//sets a timeout on the game to show the user the clu
    delay += clueHoldTime
    
    delay += cluePauseTime;
    
               
  }
  
}
function loseGame(){
  stopGame();
  alert("Game Over. You Lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. YOU WIN!");
}

function guess(btn){
  console.log("user guessed: "+btn);
  if(!gamePlaying){
    return;
  }
  
  
  if(btn == pattern[guessCounter]){
    if(guessCounter == progress){
      if(progress == pattern.length -1){
        winGame();
      }
      else{
        progress++;
        playClueSequence();
      }
    }
    else{
      guessCounter++;
      }  
  }
  else{
    loseGame();
  }
}
 
  ///game logic h3re pls