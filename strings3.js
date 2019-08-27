/*1*/

function zipArrays(arr1, arr2) {
  var assocArr = {};
  for (var x = 0; x < arr1.length; x++) {
    assocArr[arr1[x]] = arr2[x];
  }
  return assocArr;
}

var arr1 = ["abc", 3, "yo"];
var arr2 = [42, "wassup", true];
console.log(zipArrays(arr1, arr2));

/*2*/

function invertHash(assocArr) {
    var newAssocArr = {};
    for (key in assocArr) {
      newAssocArr[assocArr[key]] = key;
    }
    return newAssocArr;
  }
  
  var arr3 = {"name": "Zaphod", "charm": "high", "morals": "dicey"};
  console.log(invertHash(arr3));

/*3*/

function length(assocArr) {
    var count = 0;
    for (key in assocArr) {
      count++;
    }
    return count;
}
  
var arr4 = {band: "Travis Shredd", style: "Country", album: "668"};
console.log(length(arr4));