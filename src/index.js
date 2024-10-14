const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// default app settings
let distance;
let insideCanvas = true;
let redCicleSpeedX = 1;
let redCicleSpeedY = 1;
const blueCircleRadius = 25;
const redCricleRadisu = 25;
const constrait = 25;

// data for blue cricles
let circles = [];
let x;
let y;

// RedCircle cordinate
let redCircleX = canvas.width / 2;
let redCircleY = canvas.height - 100;

// function for calucation range between blue cricles
function rangeCalc(max, min = blueCircleRadius) {
  return Math.floor(Math.random() * (max - min) + min);
}

// function for drawing
function draw() {
  if (canvas.getContext) {
    // loop for creating blue circles (2 for now)
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        x = rangeCalc(canvas.offsetWidth - blueCircleRadius);
        y = rangeCalc(canvas.offsetHeight / 2 - blueCircleRadius);
        let object = {
          x,
          y,
        };
        circles.push(object);
      } else if (i === 1) {
        do {
          x = rangeCalc(canvas.offsetWidth - blueCircleRadius);
          y = rangeCalc(canvas.offsetHeight / 2 - blueCircleRadius);
          let object = {
            x,
            y,
          };
          circles.push(object);
          const distX = circles[0].x - x;
          const distY = circles[0].y - y;
          distance = Math.floor(Math.sqrt(distX * distX + distY * distY));
        } while (distance < blueCircleRadius * 3);
      }

      // blue circles settings
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(x, y, blueCircleRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // red circle
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(redCircleX, redCircleY, redCricleRadisu, 0, 2 * Math.PI);
  ctx.fill();

  // drawing deviding line
  // drawLine();
}

// event
canvas.addEventListener("click", function (e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  let distanceX;
  let distanceY;
  let per;
  let changeX = 0;
  let changeY = 0;

  if (mouseX < redCircleX) {
    distanceX = redCircleX - mouseX;
    changeX = 1;
  } else {
    distanceX = mouseX - redCircleX;
  }

  if (mouseY < redCircleY) {
    distanceY = redCircleY - mouseY;
    changeY = 1;
  } else {
    distanceY = mouseY - redCircleY;
  }

  if (distanceX > distanceY) {
    per = (distanceX - distanceY) / distanceY;
    redCicleSpeedX = 1 + per;
    console.log("perX", per);
  } else {
    per = (distanceY - distanceX) / distanceX;
    redCicleSpeedY = 1 + per;
    console.log("perY", per);
  }

  if (changeX) redCicleSpeedX *= -1;
  if (changeY) redCicleSpeedY *= -1;

  // Preventing displaying multiple red circles
  if (mouseX === redCircleX) {
    redCicleSpeedX = 0;
    redCicleSpeedY = 1;
  }
  // Preventing displaying multiple red circles
  if (mouseY === redCircleY) {
    redCicleSpeedX = 1;
    redCicleSpeedY = 0;
  }

  play();
});

//  Line created for cheking half of the canvas height
// function drawLine() {
//   ctx.beginPath();
//   ctx.moveTo(0, 250);
//   ctx.lineTo(500, 250);
//   ctx.stroke();
// }

// main function
function play() {
  setInterval(() => {
    // Change X direction
    if (
      redCircleX <= constrait ||
      redCircleX >= canvas.offsetWidth - constrait
    ) {
      redCicleSpeedX *= -1;
    }

    // Change Y direction
    if (
      redCircleY <= constrait ||
      redCircleY >= canvas.offsetHeight - constrait
    ) {
      redCicleSpeedY *= -1;
    }

    // Increasing/decreasing X,Y cordinate of red circle
    redCircleX += redCicleSpeedX;
    redCircleY += redCicleSpeedY;

    ctx.clearRect(
      redCircleX - redCricleRadisu - 2,
      redCircleY - redCricleRadisu - 2,
      54,
      54
    );
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(redCircleX, redCircleY, redCricleRadisu, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }, 1);
}

window.addEventListener("load", draw);
