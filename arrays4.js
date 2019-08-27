/*1*/

function shuffle(arr) {
    for (var x = 0; x < arr.length; x++) {
        var rand = Math.floor(Math.random()*arr.length);
        console.log(rand);
        var temp = arr[x];
        arr[x] = arr[rand];
        arr[rand] = temp;
    }
}

var arr1 = [1, 2, 3, 4, 5];
console.log(`Before shuffling: ${arr1}`);
shuffle(arr1);
console.log(`After shuffling: ${arr1}`);

/*2*/

function removeRange(arr, start, end) {
    for (var count = 0; count < (end - start + 1); count++) {
        removeAt(arr, start);
    }
    return arr;
}

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

var arr2 = [20, 30, 40, 50, 60, 70];
console.log(removeRange(arr2, 2, 4));

/*3*/

function interSums(arr) {
    var idx = 0;
    var sum = 0;
    while (idx < arr.length) {
        if ((idx+1) % 11 == 0) {
            insertAt(arr, idx, sum);
            sum = 0;
            idx++;
        } else {
            sum += arr[idx];
            idx++;
        }
    }
    if ((idx+1) % 11 != 0) {
        arr.push(sum);
    }
    return arr;
}

function insertAt(arr, place, push) {
    arr[arr.length] = push;
    for (var x = arr.length-1; x > place; x--) {
        var temp = arr[x];
        arr[x] = arr[x-1];
        arr[x-1] = temp;
    }
    return arr;
}

var arr3 = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
console.log(interSums(arr3));

/*4*/

function double(arr) {
    var count = arr.length;
    for (var i = count-1; i >= 0; i--) {
        // console.log(i, arr, arr[i]);
        arr.push(arr[i]);
        for (var idx = arr.length-1; idx > i+1; idx--) {
            // console.log(idx);
            var temp = arr[idx];
            arr[idx] = arr[idx-1];
            arr[idx-1] = temp;
        }
    }
    return arr;
}

var arr1 = [4, 'Ulysses', 42, false];
console.log(double(arr1)); //: [4, 4, "Ulysses", "Ulysses", 42, 42, false, false]

/*5*/

function zipIt(a1, a2) {
    var newArr = [];
    var count = (a1.length > a2.length ? a1.length : a2.length);
    for (var i = 0; i < count; i++) {
        if ( i < a1.length ) {
            newArr.push(a1[i]);
        }
        if ( i < a2.length ) {
            newArr.push(a2[i]);
        }
    }
    return newArr;
}

var arr1 = [1, 2];
var arr2 = [10, 20, 30, 40];
console.log(zipIt(arr1, arr2));