var rocky = require("rocky");

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});

var drawHorizontalRect = function(ctx, x,y,w, h, color) {
  
  // Configure how we want to draw the hand
  ctx.lineWidth = h;
  ctx.strokeStyle = color;
  
  // Begin drawing
  ctx.beginPath();

  // Move to the center point, then draw the line
  ctx.moveTo(x, y+(h/2));
  ctx.lineTo(x+w, y+(h/2));

  // Stroke the line (output to display)
  ctx.stroke();
};


rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;
  var d = new Date();
  
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  var hourHandX = h / 12 * (d.getHours() % 12);
  var minHandX = h / 60 * d.getMinutes();
  
  drawHorizontalRect(ctx, 0, hourHandX, w/2, h/12, 'white');
  drawHorizontalRect(ctx, w/2, minHandX, w/2, h/60, 'lightblue');
});