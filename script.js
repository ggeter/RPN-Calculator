/* RPN Calculator on GLitch.me by Greg Geter @RGregGeterJr
*/

// prints "hi" in the browser's dev tools console
console.log('RPN Calc Start!');

console.log($);

var postOp = false;
var inputRegister = ["0"];
var longStack = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var ts = 0.0;
var roundTo = 6;

$(".number").on( "click", function() {
    if (postOp) {
      clickEnter();
      postOp = false;
    }
    longStack.shift(); // take first value off top
    inputRegister.push($(this).text().trim());
    ts = inputRegister.join("")/1;
    ts = precisionRound(ts,roundTo);
    if (ts==0){
      ts = ts.toFixed(1);
    }
    longStack.unshift(ts); // push new value
    updateStack();
});

function updateStack() {
    
    // push to stack and roll up
    $("#stackW").text(longStack[3]);
    $("#stackX").text(longStack[2]);
    $("#stackY").text(longStack[1]);
    $("#stackZ").text(longStack[0]);
    
    console.log(longStack);
}

function clickEnter() {
    longStack.unshift(ts);
    updateStack(ts);
  
    // clear number entry accumulator
    inputRegister = ["0"];
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

$(".enter").on( "click", function() {
    
  clickEnter();
  
});

$(".operation, .function").on("click",function () {
  // process operations
  var op = $(this).text().trim();
  var aTs = "";
  
  if(op == "+"){
      aTs=(longStack.shift() + longStack.shift());
     }
  if(op == "-"){
     aTs=((-1 * longStack.shift()) + longStack.shift());
     }
  if(op == "X"){
     aTs = (longStack.shift() * longStack.shift());
     }
  if(op == "/"){
     aTs = (1/(longStack.shift() / longStack.shift()));
     }  
  if(op == "+/-"){
     longStack[0] = -1 * longStack[0]
     }    
  if(op == "DROP") {
     longStack.shift();
     inputRegister = ["0"];
  }
  if(op=="SWAP"){
     var zz = longStack[0];
    longStack[0]=longStack[1];
    longStack[1]=zz;
  }
  if(op == "<=") {
    longStack.shift(); // take first value off top
    inputRegister.pop();
    ts = inputRegister.join("")/1;
    longStack.unshift(ts); // push new value
    updateStack();
  }
  if(op == "1/x"){
     aTs = 1 / longStack.shift();
     }   
  if(op == "x^2"){
     aTs = longStack[0] * longStack.shift();
     }   
  if(op == "√x"){
     aTs= Math.sqrt(longStack.shift());
     }   
  if(op == "x^y"){
    var thisy = longStack.shift();
     aTs= Math.pow(longStack.shift(),thisy);
     }   
  
  
  if (aTs) {
    aTs = precisionRound(aTs,roundTo);
    longStack.unshift(aTs);
    inputRegister = ["0"];
    postOp = true;
  }
  
  updateStack();
  
});