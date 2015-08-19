$(document).ready(function(){
  setup();
})

function setup(){
  //initanciate accounts
  console.log("hello");
  $("body").on("click","[type=button]", changeBalanceHandler);
}

function changeBalanceHandler(){
  validateInput();
  //get id (parentid) -> account type
  findAccountType();
  //get value -> addition/subtraction
  determineActivity();
  //do banking stuff
  //show output
  updateAccount();
}


