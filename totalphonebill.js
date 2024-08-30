 export default function totalPhoneBill(bills) {
    const billList = bills.split(','); // Adjusted to split by comma only
    console.log(billList);
    
    const call = 2.75;
    const sms = 0.65;
    let total = 0;
    
    for (let i = 0; i < billList.length; i++) {
        const bill = billList[i].trim();
        
        if (bill === 'call') {
            total += call;
        } else if (bill === 'sms') {
            total += sms;
        }
    }
    
    return 'R' + total.toFixed(2);
}

const phoneString = 'call, sms, call, sms, sms';
console.log(totalPhoneBill(phoneString));  // Output: R7.45
