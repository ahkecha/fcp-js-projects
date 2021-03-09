function checkCashRegister(price, cash, cid) {
  let cashArr = cid.map(e => e[1]*100),
      converted = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000],
      rawChange = ((cash - price)*100),
      result = [["PENNY", 0],  ["NICKEL", 0],  ["DIME", 0],  ["QUARTER", 0],  ["ONE", 0],  ["FIVE", 0],  ["TEN", 0],  ["TWENTY", 0],  ["ONE HUNDRED", 0]],
      change = {status: "", change: []};
  for (let i = cashArr.length - 1; i >= 0; i--) {
    while(cashArr[i] > 0) {
      if (rawChange - converted[i] >= 0) {
        result[i][1] += converted[i];
        rawChange -= converted[i];
        cashArr[i] -= converted[i];       
      } else { break; }
    }
    if (rawChange === 0) {break;}
  } 
  for (let i = result.length -1;i >= 0; i--){
    if (result[i][1] !== 0){
      result[i][1] = result[i][1]/100
    }
  }
  if (rawChange !== 0) {
    change.status = "INSUFFICIENT_FUNDS";
    return change;
  } 
  else if (rawChange === 0 && JSON.stringify(result)==JSON.stringify(cid)) {    
    change.status = "CLOSED";
    change.change = result;
    return change;        
  }
  
  else {  
    result = result.filter(e => e[1] !== 0).reverse();  
    change.status = "OPEN";
    change.change = result;
    return change;
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
