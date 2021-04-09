var canv, context, startX, startY, width, height, click_count;
canv = document.getElementById("canvas");
context = canvas.getContext("2d");
var dot = [null, null];
click_count = 0;
startX = 400;
startY = 450;
width = 500;
height = 400;
var pointsX = [startX, startX + width, startX + Math.round(width / 2)];
var pointsY = [startY, startY, startY - height];
draw_triangle();
function is_in_triangle(pointX, pointY, v1X, v1Y, v2X, v2Y, v3X, v3Y) {
    var A = (-v2Y * v3X + v1Y * (-v2X + v3X) + v1X * (v2Y - v3Y) + v2X * v3Y) / 2;
    var sign = A < 0 ? -1 : 1;
    var s = (v1Y * v3X - v1X * v3Y + (v3Y - v1Y) * pointX + (v1X - v3X) * pointY) * sign;
    var t = (v1X * v2Y - v1Y * v2X + (v1Y - v2Y) * pointX + (v2X - v1X) * pointY) * sign;
    return s > 0 && t > 0 && s + t < 2 * A * sign;
}
function draw_triangle() {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(startX + width, startY);
    context.lineTo(startX + Math.round(width / 2), startY - height);
    context.closePath();
    context.lineWidth = 10;
    context.fillStyle = "#ffffff";
    context.strokeStyle = '#000000';
    context.stroke();
    context.fill();
}

function draw_dot(x, y) {
    context.beginPath();
    context.arc(x, y, 0.05, 0, Math.PI * 2);
    context.fillStyle = "#000000";
    context.closePath();
    context.fill();
}

function main(event) {
    var x, y, rect;
    rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if (is_in_triangle(x, y, startX, startY, startX + width, startY, startX + Math.round(width / 2), startY - height)) {
        if (click_count < 1) {
            click_count += 1;
            draw_dot(x, y);
            if (click_count == 1) {
                dot[0] = x;
                dot[1] = y;
            }
        }
    }
}
function generate(col) {
    if (click_count > 0) {
        var vertex, xr, yr;
        var reserv = [0, 0];
        for (var i = 0; i < col; i++) {
            vertex = Math.round(Math.random() * 2);
            xr = pointsX[vertex] - dot[0];
            yr = pointsY[vertex] - dot[1];
            reserv[0] = dot[0];
            reserv[1] = dot[1];
            dot[0] = dot[0] + xr / 2;
            dot[1] = dot[1] + yr / 2;
            if (is_in_triangle(dot[0], dot[1], startX, startY, startX + width, startY, startX + Math.round(width / 2), startY - height)) {
                draw_dot(dot[0], dot[1]);
            }
        }
    }
}