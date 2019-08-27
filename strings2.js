/*1*/

function parensValid(str){
    var co = 0;
    var cc = 0;
    for (var x = 0; x < str.length; x++) {
        if (cc > co){
            return false;
        }
        if (str[x] == "(") {
            co++;
        }
        if (str[x] == ")") {
            cc++;
        }
    }
    if (cc == co) {
        return true;
    }
    return false;
}

var str1 = "Y(3(p)p(3)r)s";
var str2 = "N(0(p)3";
var str3 = "N(0)t )0(k";
console.log(parensValid(str1));
console.log(parensValid(str2));
console.log(parensValid(str3));

/*2*/
function bracesValid(str) {
    var count = 0;
    var last = [];
    for (var x = 0; x < str.length; x++) {
        if (count == -1) {
            return false;
        }
        if (str[x] == "{" || str[x] == "[" || str[x] == "("){
            count++;
            last.push(str[x]);
        }
        if (str[x] == "]") {
            if (last[last.length-1] == "[") {
                count--;
                last.pop();
            } else {
                return false;
            }
        }
        if (str[x] == ")") {
            if (last[last.length-1] == "(") {
                count--;
                last.pop()
            } else {
                return false;
            }
        }
        if (str[x] == "}") {
            if (last[last.length-1] == "{") {
                count--;
                last.pop()
            } else {
                return false;
            }
        }
    }
    if (count == 0) {
        return true;
    }
    return false;
}

var str4 = "W(a{t}s[o(n{ c}o)m]e )h[e{r}e]!";
var str5 = "D(i{a}l[ t]o)n{e";
var str6 = "A(l)s[O(n]O{t) O}k";
console.log(bracesValid(str4));
console.log(bracesValid(str5));
console.log(bracesValid(str6));

/*3*/

function racecar(string) {
    for (var x = 0; x < string.length/2; x++) {
        if (string[x] != string[string.length-1-x]){
            return false;
        }
    }
    return true;
}

function racecar2(string) {
    var lowerStrArr = string.toLowerCase().match(/[a-z0-9]/g);
    for (var x = 0; x < lowerStrArr.length/2; x++) {
        if (lowerStrArr[x] != lowerStrArr[lowerStrArr.length-1-x]){
            return false;
        }
    }
    return true;
    }

var str7 = "racecar";
var str8 = " a x a";
var str9 = "asdf";
var str10 = "Dud";

console.log(racecar(str7));
console.log(racecar(str8));
console.log(racecar(str9));
console.log(racecar(str10));
console.log("This is Second Check")
console.log(racecar2(str7));
console.log(racecar2(str8));
console.log(racecar2(str9));
console.log(racecar2(str10));

/*4*/

function palcheck(string) {
    for (var x = 0; x < string.length/2; x++) {
        if (string[x] != string[string.length-1-x]){
            return false;
        }
    }
    return true;
}
  

function longestpal(string) {
    if (palcheck(string)){
      return string;
    }
    
    var pals = [];
    for (var x = 0; x < string.length-1; x++){
      var pal = string[x];
      var letter = string[x];
      for (var i = x+1; i < string.length; i++) {
        pal += string[i];
        if (string[i] == letter) {
          if (palcheck(pal)) {
            pals.push(pal);
          }
        }
      }
    }
   
    if (pals.length < 1) {
      return string[0];
    } else {
      var longest = pals[0];
      for (var x = 0; x < pals.length; x++) {
        if (pals[x].length > longest.length) {
          longest = pals[x];
        }
      }
      return longest;
    }
  }
  
//Version 2: Main function that gets longest palindrome
function longestpal2(string) {
    var newStr = string.toLowerCase().match(/[a-z0-9]/g).join("");
    if (palcheck(newStr)){
      return newStr;
    }

    var pals = [];
    for (var idx = 0; idx < newStr.length-1; idx++){
      var pal = newStr[idx];
      var letter = newStr[idx];
      for (var i = idx+1; i < newStr.length; i++) {
        pal += newStr[i];
        if (newStr[i] == letter) {
          if (palcheck(pal)) {
            pals.push(pal);
          }
        }
      }
    }

    if (pals.length < 1) {
      return string[0];
    } else {
      var longest = pals[0];
      for (var x = 0; x < pals.length; x++) {
        if (pals[x].length > longest.length) {
          longest = pals[x];
        }
      }
      return longest;
    }
}
  
var str11 = "what up, daddy-o?";
var str12 = "uh... not much";
var str13 = "Yikes! my favorite racecar erupted!";
var str14 = "Hot puree eruption!";
console.log(longestpal(str11));
console.log(longestpal(str12));
console.log(longestpal(str13));
console.log(longestpal(str14));
console.log("This is the second piece")
console.log(longestpal2(str11));
console.log(longestpal2(str12));
console.log(longestpal2(str13));
console.log(longestpal2(str14));
