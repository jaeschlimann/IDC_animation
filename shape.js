class Shape {
  constructor(element, x, y, speed, maxHeight, attractionStrength) {
    this.element = element;
    this.position = { x: x, y: y };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.topspeed = speed;
    this.maxHeight = maxHeight || 100;
    this.attractionStrength = attractionStrength || 0.2;
    
    // Initial size
    this.element.style.width = `${this.maxHeight}px`;
    this.element.style.height = `${this.maxHeight}px`;
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  update() {
    let dir = {
      x: mouse.x - this.position.x,
      y: mouse.y - this.position.y
    };

    let magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
    dir.x /= magnitude;
    dir.y /= magnitude;

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
}
