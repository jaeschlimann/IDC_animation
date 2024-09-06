const SHAPE_HEIGHT_RANGE = { 
  shape1: { min: 200, max: 450 },
  shape2: { min: 250, max: 450 },
  shape3: { min: 300, max: 500 }
};
const SHAPE_SPEEED_RANGES = {
  shape1: { min: 5, max: 10 },
  shape2: { min: 5, max: 10 },
  shape3: { min: 3, max: 5 }
};

let canvas;
let shapes = [];
let mouse = { x: null, y: null };
let globalTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };


function setup() {
  canvas = document.getElementById('canvas');
  
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  window.addEventListener('touchstart', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
  });

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

function changeGlobalTargetPosition() {
  const halfSize = 250;
  globalTarget.x = Math.random() * (window.innerWidth - halfSize * 2) + halfSize;
  globalTarget.y = Math.random() * (window.innerHeight - halfSize * 2) + halfSize;
  
}

setup();
