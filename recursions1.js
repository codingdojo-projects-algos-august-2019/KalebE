/*Recursive Sigma*/

function rSigma(num) {
  if (num == 1) {
    return 1;
  }
  return rSigma(num-1) + num;
}

console.log(rSigma(99));

/*Recursive Factorial*/

function rFactorial(num) {
  if (num <= 1) {
    return 1;
  }
  return rFactorial(num - 1) * num;
}

console.log(rFactorial(5));

/*Flood Fill*/

var canvas = [[3,2,3,4,3],
                [2,3,3,4,0],
                [7,3,3,5,3],
                [6,5,3,4,1],
                [1,2,3,3,3]];

console.log("Before: \n", canvas);

function floodFill(canvas, startXY, newcolor){
  oldcolor = canvas[startXY[1]][startXY[0]];
  canvas[startXY[1]][startXY[0]] = newcolor;
  if (canvas[startXY[1]-1] != undefined){
    if (canvas[startXY[1]-1][startXY[0]] == oldcolor){
      floodFill(canvas, [startXY[0],startXY[1]-1], newcolor);
    }
  }
  if (canvas[startXY[1]][startXY[0]-1] == oldcolor){
    floodFill(canvas, [startXY[0]-1, startXY[1]], newcolor);
  }
  if (canvas[startXY[1]][startXY[0]+1] == oldcolor){
    floodFill(canvas, [startXY[0]+1, startXY[1]], newcolor);
  }
  if (canvas[startXY[1]+1] != undefined){
    if (canvas[startXY[1]+1][startXY[0]] == oldcolor){
      floodFill(canvas, [startXY[0], startXY[1]+1], newcolor);
    }
  }
}
floodFill(canvas, [2,2], 1);
console.log("After: \n", canvas);