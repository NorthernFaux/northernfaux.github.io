// part of p3.html

// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const countP = document.querySelector('p');
let count = 0;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// shape object
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;0
    }
}

// ball object

class Ball extends Shape {
    // sets position, how fast it is, color and its size
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    // draw the ball on the screen
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    // updates the ball's position
    update() {
        // checks if the ball reached the screen edges and updates the trajectory
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }
        
        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
        
        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }

        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    // detects if another ball collided with it, then changes its color
    collisionDetect() {
        for (const ball of balls) {
            // ensures the ball being checked is not itself and its still in the game
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// evil circle object
class EvilCircle extends Shape {
    // creates the evil circle, inheriting size from the shape class but setting velocity
    // color and size are the same no matter what
    constructor (x, y) {
        super(x, y, 20, 20);
        this.color = "rgb(255, 255, 255)";
        this.size = 10;

        // allows the player to move it around
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }

    // draws the evil circle
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // moves the circle away from the edges of the screen
    checkBounds() {
        if (this.x + this.size >= width) {
            this.x -= this.size;
        }
        
        if (this.x - this.size <= 0) {
            this.x += this.size;
        }
        
        if (this.y + this.size >= height) {
            this.y -= this.size;
        }

        if (this.y - this.size <= 0) {
            this.y += this.size;
        }
    }

    // detects if it collides with a ball
    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // makes the ball not exist
                if (distance < this.size + ball.size) {
                    ball.exists = false;
                }
            }
        }
    }
}
}

// holds all ball objects
const balls = [];

// creates 25 ball objects
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

// main loop
function loop() {
  // fades the previous screen image
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // draws the balls and updates their position; does collision detection
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
