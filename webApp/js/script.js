D = x => new Decimal(x) // lmao cooperation is a myth
// yee
let game = {
  x: D(1) // starts at 1 cause i like 1
}
// function that will be graphed
function f(x) {
  return D(x).add(game.x)
} 
function fun1(x) {
  x = f(x)
  return x.sin().abs().plus(1).log10().times(x.sin().sign)
}
function fun2(x) {
  x = game.x
  return x.sin().abs().plus(1).log10().times(x.sin().sign)
}

function draw() {
 var canvas = document.getElementById("canvas");
 if (null==canvas || !canvas.getContext) return;
 const context = canvas.getContext('2d'); 
 context.clearRect(0, 0, canvas.width, canvas.height);
 var axes={}, ctx=canvas.getContext("2d");
 axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
 axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
 axes.scale = 100;                 // 40 pixels from x=0 to x=1
 axes.doNegativeX = false;

 showAxes(ctx,axes);
 funGraph(ctx,axes,fun1,"rgb(11,153,11)",1); 
 funGraph(ctx,axes,fun2,"rgb(153,11,11)",1); 
}

function funGraph (ctx,axes,func,color,thick) {
 var xx, yy, dx=1, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
  if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
  else         ctx.lineTo(x0+xx,y0-yy);
 }
 ctx.stroke();
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}


// changes graph
setInterval(function() {
  game.x= game.x.add(0.05)
  draw()
}, 50)
