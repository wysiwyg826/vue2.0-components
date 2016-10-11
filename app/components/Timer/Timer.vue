<!--  
 * charset:  utf-8 
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-11 09:18:59
 * @File:    Timer.vue
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-11 21:38:48
 * @Description: 时间选择组件
-->
<style scoped lang="scss">
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.timer {
  transform: scale(1, 1);
  position: relative;
  height: 36px;
  display: inline-block;
  width: auto;
  box-sizing: border-box;
  .timer-input {
    outline: none;
    border: none;
    color: #868686;
    margin: 0;
    padding: 0;
    height: 100%;
    font-size: 1.1rem;
    border-bottom: 2px solid #2979ff;
    &:disabled {
      user-select: none;
      background-color: transparent;
    }
  }
  .icon {
    cursor: pointer;
    display: inline-block;
    height: 36px;
    width: 36px;
    outline: 1px solid red;
  }
  .timeShow {
    background-color: #fbfbfb;
    overflow: hidden;
    height: 420px;
    width: 300px;
    box-shadow: 0 0 3px rgba(12, 12, 12, .3);
    .header {
      padding: 20px;
      height: 80px;
      width: 100%;
      background-color: #2979ff;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        user-select: none;
        color: #FFF;
        font-size: 48px;
      }
      .mid {
        animation: blink 1s infinite;
      }
    }
    .watch {
      width: 300px;
      height: 300px;
      #watch-body {
        overflow: hidden;
        margin: 0 auto;
        position: relative;
      }
    }
    .btns {
      overflow: hidden;
      height: 40px;
      background-color: #f4f5f4;
      span {
        margin-top: 5px;
        cursor: pointer;
        font-size: 16px;
        float: right;
        margin-right: 8px;
        padding: 8px 15px;
        &:hover {
          overflow: hidden;
          box-shadow: 0 0 1px #2979ff;
          border-radius: 5px;
          color: #2979ff;
        }
      }
    }
  }
}
</style>
<template>
  <div class="timer">
    <input class="timer-input" type="text" name="time" disabled="true">
    <span @click="pickTime($event)" class="icon">time</span>
    <div class="timeShow">
      <div class="header">
        <span class="hour">{{hour}}</span>
        <span class="mid">:</span>
        <span class="min">{{min}}</span>
      </div>
      <div class="watch">
        <canvas height="300" width="300" id="watch-body">您的浏览器不支持canvas!</canvas>
      </div>
      <div class="btns">
        <span>Enter</span>
        <span>Cancel</span>
      </div>
    </div>
  </div>
</template>
<script>
import cwatch from './watch.js';
export default {
  props: {
    time: {
      type: String
    }
  },
  computed: {
    fhour: function() {
      if (this.isNumber(this.hour)) return NaN;
      // if()
      let c = document.getElementById("watch-body");

      return NaN;
    }
  },
  data: () => ({
    hour: 0,
    min: 0
  }),
  methods: {
    initWatch: function() {
      let c = document.getElementById("watch-body");
      const _this = this;
      cwatch(c, function(data) {
        console.log("data:", data);
        _this.hour = data
      })
    },
    isNumber: function(num) {
      return isNaN(Number(num));
    },
    init: function() {
      if (this.time) {
        this.hour = this.time.split(":")[0];
        this.min = this.time.split(":")[1];
      } else {
        let time = new Date();
        this.hour = time.getHours();
        this.min = time.getMinutes();
      }
    },
    pickTime: function(e) {
      console.log(e);
    }
  },
  mounted: function() {
    this.init();
    this.initWatch();
    console.log('挂载完成');
  }
}
</script>
