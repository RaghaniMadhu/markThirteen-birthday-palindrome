

function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    return str === reverseStr(str);
}

function dateString(date){
    var dateStr = {day : '', month : '', year : ''};
    if (date.day < 10)
        dateStr.day = '0' + date.day;
    else 
        dateStr.day = date.day.toString();

    if (date.month < 10)
        dateStr.month = '0' + date.month;
    else 
        dateStr.month = date.month.toString();
    
    dateStr.year = date.year.toString();
    return dateStr;
}

function dateAllVariations(date){
    // slice -2 is basically negative indexing it gives last 2 chars of this given string

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromesForAllDateFormats(date){
    var listOfDates = dateAllVariations(date);
    for(let aDate of listOfDates){
        if(isPalindrome(aDate)){
            return true;
        }
    }
    return false;
}


function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}


function getNextDate(date){
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    
    if (month === 2)
        if (isLeapYear(year)){
            if(day > 29){
                day = 1;
                month = 3;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month = 3;
            }
        }
    else{
        if(day > daysInMonths[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        day = 1;
        month = 1;
        year++;
    }
    return {
        day : day,
        month : month,
        year: year
    }
}

function getNextPalindrome(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var dateStr = dateString(nextDate);
        if(checkPalindromesForAllDateFormats(dateStr))
            break;
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}


function checkBirthdayPalindrome(){
    
    var dateStr = dateString(date);
    var flag = checkPalindromesForAllDateFormats(dateStr);

    if(flag)
        return "Yayy! Your Birthday is Palindrome!";
    else{
        var nextPalindrome = getNextPalindrome(date);
        var nextStr = dateString(nextPalindrome[1]);
        return "Oops! Your Birthday is not Palindrome. Next Palindrome Date is " + nextStr.day + "-" + nextStr.month + "-" + nextStr.year + ". You missed it by " + nextPalindrome[0] + " days.";
    }

}

date = {
    day : "2",
    month : "9",
    year : "2022",
}

console.log(checkBirthdayPalindrome(dateString(date)));

// 02092022