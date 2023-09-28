export default function gettime(){ 
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;    
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    return( String(hoursIST + ":"+minutesIST));
}