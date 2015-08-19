var Account = Account || {};

Account = {
  type: null,
  name: null,
  balance: 0,
  overDraftLimit: 0,
  history: {},

  this.setBalance = function(amount){
    return this.checkBalance(amount) ? (this.balance += amount) : null;
  }

  this.checkAmount = function(amount){
    if (!isNaN(amount)) {
      return (this.balance - Math.abs(amount)) >=0 ? true : false;
    } 
    else {
      console.log("NaN in checkBalance");
      return NaN;
    }
  }

  this.getBalance = function(){
    return this.balance;
  }

  this.getHistory = function(time, amount){

  }

}