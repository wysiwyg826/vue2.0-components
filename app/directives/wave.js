/* charset:  utf-8
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-10 09:32:45
 * @File:    wave.js
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-10 22:30:36
 * @Description: 
 */
'use strict';

import Vue from 'vue';

Vue.directive('wave', {
  bind: function(el, binding, vnode) {

  },
  inserted: function(el, binding, vnode) {
    const [offsetLeft, offsetTop] = [el.offsetLeft, el.offsetTop];
    el.addEventListener('click', function(e) {
      let [x, y] = [(e.clientX - offsetLeft), (e.clientY - offsetTop)];
      let ele = document.createElement("div");
      let scale = 1;
      ele.style.position = "absolute";
      ele.style.height = "15px";
      ele.style.width = "15px";
      ele.style.left = x + "px";
      ele.style.top = y + "px";
      ele.style.backgroundColor = "rgba(255, 255, 255, .2)";
      ele.style.display = "block";
      ele.style.borderRadius = "1000px";
      ele.style.transform = "scale(1,1)";
      el.appendChild(ele);

      let timer = setInterval(function() {
        scale += 0.5;
        ele.style.transform = "scale(" + scale + "," + scale + ")";

        if (scale > 20) {
          clearInterval(timer);
          el.removeChild(ele);
        }
      }, 16.7);
    });
  },
  update: function(el, binding, vnode) {
    console.log(el);
  }
});
