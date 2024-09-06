class Shape {
  constructor(element, x, y, speed, maxHeight, attractionStrength) {
    this.element = element;
    this.topspeed = speed;
    this.maxHeight = maxHeight || 100;
    this.attractionStrength = attractionStrength || 0.2;
    this.hasMoved = false; 

    this.position = {
      x: 0,  
      y: 0  
    };

    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };

    this.target = {
      x: 0,
      y: 0
    };
    this.changeTargetPosition();
    this.changeTargetPeriodically();

    this.element.style.width = `${this.maxHeight}px`;
    this.element.style.height = `${this.maxHeight}px`;

    this.show();
  }

  update() {
   
    if (mouse.x !== null && mouse.y !== null) {
      this.hasMoved = true;
    }

    if (this.hasMoved) {
      this.target.x = mouse.x;
      this.target.y = mouse.y;
    }

    let dir = {
      x: this.target.x - this.position.x,
      y: this.target.y - this.position.y
    };

    let magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
    if (magnitude !== 0) {
      dir.x /= magnitude;
      dir.y /= magnitude;
    }

    dir.x *= this.attractionStrength;
    dir.y *= this.attractionStrength;

    this.acceleration = dir;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    let speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > this.topspeed) {
      this.velocity.x = (this.velocity.x / speed) * this.topspeed;
      this.velocity.y = (this.velocity.y / speed) * this.topspeed;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  show() {
    this.element.style.left = `${this.position.x - this.maxHeight / 2}px`;
    this.element.style.top = `${this.position.y - this.maxHeight / 2}px`;
  }
  changeTargetPeriodically() {
    setInterval(() => {
      if (!this.hasMoved) {
        this.changeTargetPosition();
      }
    }, 10000);
  }

  changeTargetPosition() {
    this.target.x = Math.random() * window.innerWidth;
    this.target.y = Math.random() * window.innerHeight;
    // console.log(`Nouvelle cible: (${this.target.x}, ${this.target.y})`);
  }

}
