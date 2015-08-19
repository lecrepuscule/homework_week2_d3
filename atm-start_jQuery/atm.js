////object definition///
var Account = Account || {};

Account = {
  id: 0,
  type: null,
  name: null,
  balance: 0,
  overDraftLimit: 0,
  history: {},

  setBalance: function(amount){
    return this.checkAmount(amount) ? (this.balance += amount) : null;
  },

  checkAmount: function(amount){
    if (!isNaN(amount)) {
      return (this.balance + amount) >=0 ? true : false;
    } 
    else {
      console.log("NaN in checkBalance");
      return NaN;
    }
  },

  getBalance: function(){
    return this.balance;
  },

  getHistory: function(time, amount){

  }
}

var currentAccount1 = Object.create(Account);
var savingsAccount1 = Object.create(Account);
currentAccount1.setBalance = function(amount){
  var enoughBalance = this.checkAmount(amount);
  if (enoughBalance){
    return this.balance += amount;
  } 
  else if (enoughBalance !== NaN) {
    var totalBalance = this.balance + savingsAccount1.getBalance();
    if (this.checkAmount(totalBalance)) {
      savingsAccount1.setBalance(totalBalance + amount + this.balance);
      return this.balance = 0;
    }
  } 
  else {
    return null;
  }
}

$(document).ready(function(){
  setup();
})

function setup(){
  //initanciate accounts
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
  var $balance = $(this).siblings("[id^=balance]");
  var amount = Number($amount.val())
  var operation = $button.val();

  if (validateInput(amount)) {
    var account = accounts[$account.attr("id")] //enhancement using actual ids in Account object can be made
    var newBalance = doOperation(operation, amount, account);
    
    newBalance !== null ? $balance.text("$"+newBalance) : console.log("not enough balance!");
  }
  else {
    $amount.val("POSITIVE NUMBER ONLY");
  }
}

function doOperation(operation, amount, account){
  switch (operation) {
    case "Deposit":
      return account.setBalance(amount);
    break;
    case "Withdraw":
      return account.setBalance(-amount);
    break;
    case "TransactionHistory":
    break;
  }
}


function validateInput(amount){
  return (isNaN(amount) || amount <= 0) ? false : true;
}

