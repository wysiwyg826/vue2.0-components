/* charset: utf-8 * @Author: wysiwyg826 * @Email: wysiwyg826@gmail.com * @Date: 2016-10-09 14:35:07 * @File:    Buttons.vue
<style scoped lang="scss">
.default {
  background-color: #2979ff;
}

.w-button {
  position: relative;
  font-family: "Roboto", sans-serif;
  display: inline-block;
  overflow: hidden;
  color: #FFFFFF;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: none;
  border-radius: 3px;
  height: 36px;
  line-height: 36px;
  padding: 0 2rem;
  letter-spacing: 1px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
  transition: transform .25s linear;
  &:hover {
    transform: scale(1.03, 1.03);
    line-height: 36px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);
  }
  .wave {
    border-radius: 1000px;
    width: 0px;
    height: 0px;
    position: absolute;
    display: block;
    background-color: rgba(255, 255, 255, .2);
    left: 0;
    top: 0;
  }
}

@keyframes waves {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(10, 10);
  }
}
</style>
<template>
  <div class="w-button default" @click.self="btnClick">
    <slot></slot>
    <div v-show="show" class="wave" :style="{left:x+'px', top: y+'px', width:l+'px', height:l+'px'}"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
    x: 0,
    y: 0,
    l: 0
  }),
  methods: {
    btnClick: function(e) {
      if (!e) return false;
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.show = true;
      const _this = this;
      const timer = setInterval(function() {
        _this.x -= 3;
        _this.y -= 3;
        _this.l += 6;
      }, 16.7);
      setTimeout(function() {
      	_this.x = 0;
      	_this.y = 0;
      	_this.l = 0;
        _this.show = false;
        clearInterval(timer);
      }, 500)
      this.$emit('btnClick')
    }
  }
}
</script>
