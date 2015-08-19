$(document).ready(function(){
  setup();
})


function getValidInput (inputName) {


  if (inputType === "number") {
    while ( isNaN(Number(userInput)) ) {
        userInput = prompt("Please enter an actual number for " + inputName + "!");
      }
      return Number(userInput);
  }
  else {
    while (validInputs[inputType].indexOf(userInput) === -1 ) {
      userInput = prompt("Please enter a valid " + inputName + " from " + validInputs[inputType] +"!");
    }
    return userInput;
  }
}