/* charset:  utf-8
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-11 15:27:35
 * @File:    watch.js
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-11 21:11:35
 * @Description: 
 */

'use strict';
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();
const color_bg = "#d32f2f";
const color_font = "#fafafa";
var _this = {};

const pi = Math.PI;

let hours = [],
  mins = [];

function drawHours() {
    const ctx = _this.ctx;
  var tmp = ""
  for (let i = 1; i <= 12; i++) {
    ctx.font = " 14px/30px Roboto";
    ctx.fillStyle = "#000";
    if (i < 10) {
      tmp = "0" + i;
    } else {
      tmp = i + "";
    }
    let x = _this.width / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 30);
    let y = _this.height / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (_this.height / 2 - 30);
    hours.push({ name: tmp, x: x, y: y });
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(tmp, x, y)
  }

  for (let i = 13; i <= 24; i++) {
    ctx.font = " 14px/30px Roboto";
    ctx.fillStyle = "#000";
    if (i === 24) {
      tmp = "00"
    } else {
      tmp = i + "";
    }
    let x = _this.width / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 80);
    let y = _this.width / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 80);
    hours.push({ name: tmp, x: x, y: y });
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(tmp, x, y)
  }
  // console.table(hours);
}

function drawPoint() {
  const ctx = _this.ctx;
  ctx.beginPath();
  ctx.fillStyle = color_bg;
  ctx.arc(_this.closePoint.x, _this.closePoint.y, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = color_bg;
  ctx.moveTo(_this.width / 2, _this.height / 2);
  ctx.lineTo(_this.closePoint.x, _this.closePoint.y);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.font = "bold 20px/60px Roboto";
  ctx.fillStyle = color_font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(_this.closePoint.name, _this.closePoint.x, _this.closePoint.y);
  ctx.closePath();
}

function drawCenter() {
  const ctx = _this.ctx;
  ctx.beginPath();
  ctx.fillStyle = color_bg;
  ctx.arc(_this.width / 2, _this.height / 2, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

}

function clearCanvas() {
  _this.ctx.beginPath();
  _this.ctx.clearRect(0, 0, _this.width, _this.height);
  _this.ctx.closePath();
}



setInterval(function() {
  clearCanvas();
  drawCenter();
  drawHours();
  if (_this.closePoint) {
    drawPoint();
  }
}, 16.7);

module.exports = function cwatch(c, callback) {
  _this.el = c;
  _this.width = c.width;
  _this.height = c.height;
  _this.ctx = c.getContext("2d");


  c.addEventListener("click", function(e) {
    let closePoint = {};
    let l = 1000;
    for (let i = 0; i < hours.length; i++) {
      let tmp = Math.sqrt(Math.pow((hours[i].x - e.offsetX), 2) + Math.pow((hours[i].y - e.offsetY), 2));
      if (tmp < l) {
        closePoint = hours[i];
        l = tmp;
      }
    }
    _this.closePoint = closePoint;
    return callback(_this.closePoint.name)
  });
  
}
