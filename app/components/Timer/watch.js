    /* charset:  utf-8
     * @Author:  wysiwyg826
     * @Email:   wysiwyg826@gmail.com
     * @Date:    2016-10-11 15:27:35
     * @File:    watch.js
     * @Last modified by:   wysiwyg826
     * @Last Modified time: 2016-10-13 09:59:05
     * @Description: 
     */

    'use strict';
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();

    function cwatch(c, callback) {
        const color_bg = "#2979ff";
        const color_font = "#fafafa";
        const el = c;
        const eWidth = c.width;
        const eHeight = c.height;
        const ctx = c.getContext('2d');
        const pi = Math.PI;
        let closePoint = {};

        let hours = [],
            mins = [];
        this.type = 1;
        this.flag = true;
        let _this = this
        let mouseState = 0;
        el.addEventListener("click", function(e) {
            closePoint = {}
            _this.flag = true;
            computedClosePoint(e);
            return callback(closePoint.name)
        });
        el.addEventListener("mousedown", function(e) {
            closePoint = {}
            _this.flag = true;
            if (e.button === 0) mouseState = 1;
        });
        el.addEventListener("mouseup", function(e) {
            mouseState = 0;
            return callback(closePoint.name)
        });
        el.addEventListener("mousemove", function(e) {
            if (mouseState === 0) return false;
            computedClosePoint(e);
        });

        function computedClosePoint(e) {
            let point = {};
            let l = 1000;
            if (_this.type === 1) {
                for (let i = 0; i < hours.length; i++) {
                    let tmp = Math.sqrt(Math.pow((hours[i].x - e.offsetX), 2) + Math.pow((hours[i].y - e.offsetY), 2));
                    if (tmp < l) {
                        point = hours[i];
                        l = tmp;
                    }
                }
            } else if (_this.type === 2) {
                for (let i = 0; i < mins.length; i++) {
                    let tmp = Math.sqrt(Math.pow((mins[i].x - e.offsetX), 2) + Math.pow((mins[i].y - e.offsetY), 2));
                    if (tmp < l) {
                        point = mins[i];
                        l = tmp;
                    }
                }
            }
            closePoint = point;
        }

        function clearCanvas() {
            ctx.beginPath();
            ctx.clearRect(0, 0, eWidth, eHeight);
            ctx.closePath();
        }

        function drawPoint() {
            ctx.beginPath();
            ctx.fillStyle = color_bg;
            ctx.arc(closePoint.x, closePoint.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = color_bg;
            ctx.moveTo(eWidth / 2, eHeight / 2);
            ctx.lineTo(closePoint.x, closePoint.y);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.font = "bold 20px/60px Roboto";
            ctx.fillStyle = color_font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(closePoint.name, closePoint.x, closePoint.y);
            ctx.closePath();
        }

        function drawHours() {
            var tmp = ""
            for (let i = 1; i <= 12; i++) {
                ctx.font = " 14px/30px Roboto";
                ctx.fillStyle = "#000";
                if (i < 10) {
                    tmp = "0" + i;
                } else {
                    tmp = i + "";
                }
                let x = eWidth / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (eWidth / 2 - 30);
                let y = eHeight / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (eHeight / 2 - 30);
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
                let x = eWidth / 2 - Math.cos(pi / 2 + (pi / 6 * i)) * (eWidth / 2 - 80);
                let y = eHeight / 2 - Math.sin(pi / 2 + (pi / 6 * i)) * (eHeight / 2 - 80);
                hours.push({ name: tmp, x: x, y: y });
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(tmp, x, y)
            }
        }

        function drawMins() {
            var tmp = ""
            for (let i = 0; i <= 59; i++) {
                ctx.font = " 14px/30px Roboto";
                ctx.fillStyle = "#000";
                if (i < 10) {
                    tmp = "0" + i;
                } else {
                    tmp = i + "";
                }
                let x = eWidth / 2 - Math.cos(pi / 2 + (pi / 30 * i)) * (eWidth / 2 - 30);
                let y = eHeight / 2 - Math.sin(pi / 2 + (pi / 30 * i)) * (eHeight / 2 - 30);
                mins.push({ name: tmp, x: x, y: y });
                if (i % 5 === 0) {
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(tmp, x, y)
                }
            }
        }

        function drawCenter() {
            ctx.beginPath();
            ctx.fillStyle = color_bg;
            ctx.arc(eWidth / 2, eHeight / 2, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }


        this.run = function() {
            clearCanvas();
            drawCenter();
            if (_this.type === 1) {
                drawHours();
            } else if (_this.type === 2) {
                drawMins();
            }
            if (_this.flag && closePoint) {
                drawPoint();
            }
        }
        this.timer = setInterval(this.run, 16.7);

    }
    cwatch.prototype.change = function(num) {
        this.flag = false;
        this.type = num;
        if(this.type === 3) {
            clearInterval(this.timer);
        }
    }






    module.exports = cwatch;
