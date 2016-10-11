/* charset:  utf-8
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-11 15:27:35
 * @File:    watch.js
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-11 18:25:56
 * @Description: 
 */

'use strict';
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

var _this = {};

const pi = Math.PI;

let hours = [],
    mins = [];

function drawHours() {
    var tmp = ""
    for (let i = 1; i <= 12; i++) {
        _this.ctx.font = " 14px/30px Roboto";
        _this.ctx.fillStyle = "#000";
        if (i < 10) {
            tmp = "0" + i;
        } else {
            tmp = i + "";
        }
        let x = _this.width / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 30);
        let y = _this.height / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (_this.height / 2 - 30);
        hours.push({ name: tmp, x: x, y: y });
        _this.ctx.fillText(tmp + "", x - 8, y + 5);
    }

    for (let i = 13; i <= 24; i++) {
        _this.ctx.font = " 14px/30px Roboto";
        _this.ctx.fillStyle = "#000";
        if (i === 24) {
            tmp = "00"
        } else {
            tmp = i + "";
        }
        let x = _this.width / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 80);
        let y = _this.width / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (_this.width / 2 - 80);
        hours.push({ name: tmp, x: x, y: y });
        _this.ctx.fillText(tmp, x - 8, y + 5)
    }
    // console.table(hours);
}

function drawPoint(point) {
    _this.ctx.beginPath();
    _this.ctx.fillStyle = "red";
    _this.ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI);
    _this.ctx.fill();
    _this.ctx.closePath();
}

function drawCenter() {
    _this.ctx.beginPath();
    _this.ctx.fillStyle = "red";
    _this.ctx.arc(_this.width / 2, _this.height / 2, 5, 0, 2 * Math.PI);
    _this.ctx.fill();
    _this.ctx.closePath();
}

function clearCanvas() {
    _this.ctx.beginPath();
    _this.ctx.clearRect(0, 0, _this.width, _this.height);
    _this.ctx.closePath();
}

function cwatch(c) {
    _this.el = c;
    _this.width = c.width;
    _this.height = c.height;
    _this.ctx = c.getContext("2d");

    setInterval(function() {
        drawCenter();
        drawHours();
        clearCanvas();
    }, 16.7);
    c.addEventListener("mousemove", function(e) {
        let closePoint = {};
        let l = 1000;
        for (let i = 0; i < hours.length; i++) {
            let tmp = Math.sqrt(Math.pow((hours[i].x - e.offsetX), 2) + Math.pow((hours[i].y - e.offsetY), 2));
            if (tmp < l) {
                closePoint = hours[i];
                l = tmp;
            }
        }
        drawPoint(closePoint);
        console.log(e.offsetX, e.offsetY);

        console.log(closePoint);
    });
}



module.exports = cwatch
