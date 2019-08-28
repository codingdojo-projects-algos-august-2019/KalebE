/*1*/

function reverseArr(arr) {
    for (var i = 0; i < arr.length/2; i++) {
        var temp = arr[i];
        arr[i] = arr[arr.length-1-i];
        arr[arr.length-1-i] = temp;
    }
    return arr;
}

var arr1 = [1, 2, 3, 4, 5];
var arr2 = [1, 2, 3, 4, 5, 6];
console.log(reverseArr(arr1));
console.log(reverseArr(arr2));

/*2*/

function rotateArr(arr, shiftBy) {
	if (shiftBy > 0) {
		for (var x = 0; x < shiftBy; x++) {
			var temp = arr[arr.length - 1];
			for (var i = arr.length - 1; i >= 0; i--) {
				arr[i] = arr[i - 1];
			}
			arr[0] = temp;
		}
	} else {
		for (var x = 0; x > shiftBy; x--) {
			var temp = arr[0];
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i + 1];
			}
			arr[arr.length - 1] = temp;
		}
	}
	console.log(arr);
}

var arr3 = [1, 2, 3, 4, 5, 6];
console.log(rotateArr(arr3, -1));
console.log(rotateArr(arr3, 1));

/*3*/

function filterRange(arr, min, max) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] >= min && arr[i] <= max) {
			newArr[newArr.length] = arr[i];
		}
	}
	console.log(newArr);
	return newArr;
}

var arr4 = [1, 2, 3, 4, 5, 6];
console.log(filterRange(arr4, 1, 4));

/*4*/

function concatArray(arr1, arr2) {
	var newArr = [];
	for (var i = 0; i < arguments.length; i++) {
		for (var j = 0; j < arguments[i].length; j++) {
			newArr[newArr.length] = arguments[i][j];
		}
	}
	console.log(newArr);
}
concatArray([1, 2], ['a', 'b']);

/*5*/

function skylineHeights(arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (newArr.length == 0) {
			if (arr[i] > 0 && arr[i]) {
				newArr[newArr.length] = arr[i];
			}
		} else {
			if (arr[i] > 0 && arr[i] > newArr[newArr.length - 1]) {
				newArr[newArr.length] = arr[i];
			}
		}
	}
	console.log(newArr);
}

skylineHeights([0, 5, 1, 6, 2, 5, 9, 9]);
