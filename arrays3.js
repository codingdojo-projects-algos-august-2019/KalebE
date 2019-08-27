/*1*/

function removeNeg(arr) {
  for (var x = arr.length-1; x >= 0; x--) {
    if (arr[x] < 0) {
      for (var i = x; i < arr.length-1; i++) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
      }
      arr.pop()
    }
  }
  return arr;
}

var arr1 = [-3, 0, 1, -5, 2, -1, 3, 4];
console.log(removeNeg(arr1));

/*2*/

function secondLast(arr) {
    if (arr.length < 2) {
      return null;
    }
    return arr[arr.length-2];
}
  
var arr2 = [42, true, 4, "Liam", 7];
var arr3 = [10];
console.log(secondLast(arr2));
console.log(secondLast(arr3));

/*3*/

function secondLargest(arr) {
    if (arr.length < 2) {
      return null;
    } else {
      var L, secondL;
      if (arr[0] > arr[1]) {
        L = arr[0];
        secondL = arr[1];
      } else {
        L = arr[1];
        secondL = arr[0];
      }
      for (var x = 2; x < arr.length; x++) {
        if (arr[x] > L) {
          secondL = L;
          L = arr[x];
        } else if (arr[x] > secondL) {
          secondL = arr[x];
        }
      }
    }
    return secondL;
}
  
var arr4 = [42, 1, 4, Math.PI, 7];
var arr5 = [3];
console.log(secondLargest(arr4));
console.log(secondLargest(arr5));

/*4*/

function nLast(arr, num) {
    if (num > arr.length) {
      return null;
    }
    return arr[arr.length-num];
}
  
var arr6 = [5, 2, 3, 6, 4, 9, 7];
console.log(nLast(arr6, 3));
console.log(nLast(arr6, 8));

/*5*/

function largest(arr, n){
    max = arr[0];
    min = arr[0];
    count = 1;
    while (count <= n) {
        var min2 = min;
        for (var x = 0; x < arr.length; x++) {
            if (count == 1) {
                if (arr[x] > max){
                    max = arr[x];
                    min2 = max;
                }
                if (arr[x] < min) {
                    min = arr[x];
                }
            } else {
                if (arr[x] < max && arr[x] > min2) {
                    min2 = arr[x];
                }
            }
        }
        max = min2;
        count++;
    }
    return max;
}

var arr7 = [200, 6, 8, 10, 12, 1, 20];
console.log(largest(arr7, 1));