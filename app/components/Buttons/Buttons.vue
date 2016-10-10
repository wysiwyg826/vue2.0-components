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
}
</style>
<template>
  <div class="w-button default" @click.self="btnClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
  }),
  methods: {
    btnClick: function(e) {
      if (!e) return false;
      if (this.disabled === true) {
        this.$emit('btnClick')
      }
    }
  }
}
</script>
