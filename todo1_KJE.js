/#1/
function pushFront(arr, push) {
    array[array.length] = push;
    for (var x = array.length-1; x > 0; x--) {
        var temp = arr[x];
        array[x] = arr[x-1];
        array[x-1] = temp;
    }
    return arr;
}

var array = [1, 2, 3]
var push = 99;
console.log(pushFront(array, push));

/#2/
function popFront(arr) {
    var temp = arr[0];
    for (var x = 0; x < arr.length-1; x++){
        var move = arr[x];
        arr[x] = arr[x+1];
        arr[x+1] = move;
    }
    arr.pop();
    return temp;
}

var arr = [7, 10, 13, 16];
popFront(arr);
console.log(arr);

/#3/
function insertAt(arr, place, push) {
    array[array.length] = push;
    for (var x = array.length-1; x > place; x--) {
        var temp = arr[x];
        arr[x] = arr[x-1];
        arr[x-1] = temp;
    }
    return array;
}

var arr1 = [1, 2, 3, 4, 5]
console.log(insertAt(arr1, 2, 99));

/#4/
function removeAt(arr, place) {
    var temp = arr[place];
    for (var i=place; i < arr.length-1; i++) {
        var move = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = move;
    }
    arr.pop();
    return temp;
}

var arr1 = [1, 2, 3, 4, 5];
removeAt(arr1, 2);
console.log(arr1);

/#5/
function swappairs(arr) {
    if (arr.length%2 == 0) {
        for (var x = 0; x < arr.length; x+=2) {
            var temp = arr[x];
            arr[x] = arr[x+1];
            arr[x+1] = temp;
        }
    } else {
        for (var x = 0; x < arr.length-1; x+=2) {
            var temp = arr[x];
            arr[x] = arr[x+1];
            arr[x+1] = temp;
        }
    }
    return arr;
}

var arr1 = [1, 2, 3, 4];
var arr2 = [1, 2, 3, 4, 5];
console.log(swappairs(arr1));
console.log(swappairs(arr2));

/#6/
function removeDuplicates(arr) {
    var idx = 0;
    var count = 1;
    while (count < arr.length) {
        if (arr[idx] == arr[count]){
            count++;
        } else {
            arr[idx+1] = arr[count];
            idx++;
            count++;
        }
    }
    for (var x = 0; x < idx; x++) {
        arr.pop();
    }
    return arr;
}

var arr1 = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5, 6];
console.log(removeDuplicates(arr1));