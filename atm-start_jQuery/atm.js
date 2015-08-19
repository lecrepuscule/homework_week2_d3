$(document).ready(function(){
  setup();
})

function setup(){
  //initanciate accounts
  console.log("hello");
  $("body").on("click",":button", changeBalanceHandler);
}

function changeBalanceHandler(){
  var accounts = {
    account1 : currentAccount1,
    account2 : savingsAccount1
  };
  var $account = $(this).parent();
  var $button = $(this);
  var $amount = $(this).siblings("[id^=amount]");
  var amount = Number($amount.val())
  var operation = $button.val();

  if (validateInput(amount)) {
    var account = accounts[$account.attr("id")] //enhancement using actual ids in Account object can be made
    var newBalance = doOperation(operation, amount, account);
    displayBalance(newBalance);
  }
  else {
    $amount.val("POSITIVE NUMBER ONLY");
  }
}

function doOperation(operation, amount, account){
  switch (operation) {
    case: "Deposit";
      return account.setBalance(amount);
    break;
    case: "Withdraw";
      return account.setBalance(-amount);
    break;
    case: "TransactionHistory";
    break;
  }
}

function validateInput(amount){
  return (isNaN(amount) || amount <= 0) ? false : true;
}


