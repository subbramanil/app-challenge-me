/**
 * Created by Subbu on 5/24/15.
 */

function Rule(param, opr, value, action, emailID, phoneNumber){
    this.rowID = Rule.count++;
    this.param = param;
    this.opr = opr;
    this.value = value;
    this.action = action;
    this.flag = null;

    if(emailID)
        this.emailID = emailID;
    else
        this.emailID = "";
    if(phoneNumber)
        this.phoneNumber = phoneNumber;
    else
        this.phoneNumber = "";
    this.getRuleInfo =  function(){
        return JSON.stringify(this);
    };

}
Rule.count = 0;