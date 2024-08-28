const SHAPE_HEIGHT_RANGE = { 
  shape1: { min: 200, max: 350 },
  shape2: { min: 250, max: 350 },
  shape3: { min: 300, max: 400 }
};
const SHAPE_SPEEED_RANGES = {
  shape1: { min: 5, max: 10 },
  shape2: { min: 5, max: 10 },
  shape3: { min: 3, max: 5 }
};

let canvas;
let shapes = [];
let mouse = { x: 0, y: 0 };

function setup() {
  canvas = document.getElementById('canvas');
  
  // Add event listener for mouse movement
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  // Initialize shapes
  shapes = setupShapes();
  draw();
}

function draw() {
  shapes.forEach(shape => {
    shape.update();
    shape.show();
  });

  requestAnimationFrame(draw);
}

function createRandomShape(id, speedRange, heightRange) {
  const shapeElement = document.getElementById(id);
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const speed = Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
  const height = Math.random() * (heightRange.max - heightRange.min) + heightRange.min;

  return new Shape(shapeElement, x, y, speed, height);
}

function setupShapes() {
  return [
    createRandomShape('shape1', SHAPE_SPEEED_RANGES.shape1, SHAPE_HEIGHT_RANGE.shape1),
    createRandomShape('shape2', SHAPE_SPEEED_RANGES.shape2, SHAPE_HEIGHT_RANGE.shape2),
    createRandomShape('shape3', SHAPE_SPEEED_RANGES.shape3, SHAPE_HEIGHT_RANGE.shape3)
  ];
}

setup();
