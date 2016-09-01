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

var writeText = function(ctx, x, y, w, h, color, text) {
  ctx.fillStyle = color;
  ctx.textAlign = 'center';

  // Display the time, in the middle of the screen
  ctx.fillText(text, (x+w)/2, (y+h)/2);
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

  var hours = d.getHours();
  var minutes = d.getMinutes();
  var hourHandY = h / 12 * (hours % 12);
  var minHandY = h / 60 * minutes;
  
  drawHorizontalRect(ctx, 0, hourHandY, w/2, h/12, 'white');
  writeText(ctx, 0, hourHandY, w/2, h/12, 'white', hours);
  drawHorizontalRect(ctx, w/2, minHandY, w/2, h/60, 'lightblue');
  writeText(ctx, w/2, minHandY, w/2, h/12, 'white', minutes);
  
});