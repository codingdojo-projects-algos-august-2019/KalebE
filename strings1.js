/*1*/

function removeBlanks(str) {
    return str.split(" ").join("");
}

var str1 = " Pl ayTha tF u nkyM usi       c   ";
console.log(removeBlanks(str1));

/*2*/

function getDigits(str) {
    var string = str.split("");
    var intStr = "";
    for (var x = 0; x < string.length; x++) {
        if (string[x]%1 == 0) {
            intStr += string[x];
        }
    }
    return intStr/1;
}

var str2 = "0s1a3y5w7h9a2t4?6!8?0";
console.log(getDigits(str2));

/*3*/

function acronyms(str) {
    var sArr = str.split(" ");
    var rStr = "";
    for (var x = 0; x < sArr.length; x++) {
        if (sArr[x] == false) {
            continue;
        } else {
            rStr += sArr[x][0].toUpperCase();
        }
    }
    return rStr;
}

var str3 = " there's no free lunch - gotta pay yer way.";
console.log(acronyms(str3));
var str4 = "Live from New York, it's Saturday Night!";
console.log(acronyms(str4));

/*4*/

function countNonSpaces(str) {
    var strArray = str.split("");
    var count = 0;
    for (var x = 0; x < strArray.length; x++) {
        if (strArray[x] == false) {
            continue;
        } else {
            count++;
        }
    }
    return count;
}

var str5 = "Honey pie, you are driving me crazy";
// Return 29, not 35.
console.log(countNonSpaces(str5));

/*5*/

function removeSS(strArr, val) {
    for (var x = strArr.length-1; x >= 0; x--) {
        if (strArr[x].length < val) {
            for (var i = x; i < strArr.length-1; i++){
                var temp = strArr[i];
                strArr[i] = strArr[i+1];
                strArr[i+1] = temp;
            }
            strArr.pop();
        }
    }
    return strArr;
}

var str6 = ["Hello", "World", "I", "am", "Here"];
console.log(removeSS(str6, 4));