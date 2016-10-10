/* charset:  utf-8
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-10 09:32:45
 * @File:    wave.js
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-10 14:33:21
 * @Description: 
 */
'use strict';

import Vue from 'vue';

Vue.directive('wave', {
  bind: function(el, binding, vnode) {
    let once = false
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (!e) return false;
      if (once) return false;
      once = true;
      let [x, y, l] = [e.offsetX, e.offsetY, 0];
      let ele = document.createElement("div");
      ele.style.position = "absolute";
      ele.style.height = l + "px";
      ele.style.width = l + "px";
      ele.style.left = x + "px";
      ele.style.top = y + "px";
      ele.style.backgroundColor = "rgba(255, 255, 255, .2)";
      ele.style.display = "block";
      ele.style.borderRadius = "1000px";
      el.appendChild(ele);

      let timer = setInterval(function() {
        x -= 3;
        y -= 3;
        l += 6;
        ele.style.left = x + "px";
        ele.style.top = y + "px";
        ele.style.height = l + "px";
        ele.style.width = l + "px";
        if(l > 200) {
          once = false
          clearInterval(timer);
          el.removeChild(ele);
        }
      }, 16.7);
    }, true);
  }
});
