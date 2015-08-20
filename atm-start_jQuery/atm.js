////object definition///Sorry Gui! it seems to only work when I put everything about the object up top... probably because the OO is half half...

var Account = Account || {};

Account = {
  id: 0,
  type: null,
  name: null,
  balance: 0,
  overDraftLimit: 0,
  history: {},

  setBalance: function(amount){
    if (this.checkAmount(amount)){ 
      this.balance += amount;
      var now = new Date();
      this.history[now] = amount; 
    }
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
  var now = new Date();
  if (enoughBalance){
    this.history[now] = amount;
    return this.balance += amount;
  } 
  else if (enoughBalance !== NaN) {
    var totalBalance = this.balance + savingsAccount1.getBalance();
    if (totalBalance + amount >= 0) {
      savingsAccount1.history[now] = this.balance+amount;
      savingsAccount1.setBalance(this.balance + amount);

      this.history[now] = -this.balance;
      return this.balance = 0;
    }
    else {
      return null;
    }
  } 
  else {
    return null;
  }
}
///end object definition///


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
    var account = accounts[$account.attr("id")] //enhancement using actual ids in Account object should be made
    var newBalance = doOperation(operation, amount, account);
    updateDisplay(newBalance,$balance);
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

function updateDisplay(balance, disiplayElement){
    if (balance !== null) {
      disiplayElement.css("background-color", (balance > 0 ? "#E3E3E3" : "red"));
      disiplayElement.text("$"+balance);
    }
    else {
      console.log("not enough balance!");
    }

    $("#balance2").text("$"+savingsAccount1.getBalance());
    $("#balance2").css("background-color", (savingsAccount1.getBalance() > 0 ? "#E3E3E3" : "red"));

}
