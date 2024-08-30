export default function totalPhoneBill(bills) {
    const billList = bills.split(', ');
     console.log(billList);
     const call = 2.75;
     const sms = 0.65;
    var total = 0;
    for (var i = 0; i < billList.length; i++) {
     const bill = billList[i].trim();
      
    if (bill.includes('call')) {
      total += call;
    }
      else {
      total += sms;
      }
    }
      return 'R' + total.toFixed(2);
   }
    var phoneString = 'call, sms, call, sms, sms';
    console.log(totalPhoneBill(phoneString));