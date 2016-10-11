<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
    <wButton class="btn" @btnClick="add" :disabled="false" v-wave>button</wButton>
    <timer ></timer>
  </div>
</template>
<script>
import wButton from './../components/Buttons/Buttons'
import timer from './../components/Timer/Timer'
export default {
  components:{
    wButton,
    timer
  },
  methods: {
    add: function() {
      console.log('func add', this.atime);
    }
  },
  data: () => ({
    atime:"19:03:12",
    val: 0,
    show: true
  }),
  beforeCreate: function() {
    // console.log('beforeCreate');
  },
  created: function() {
    // console.log('created');
  },
  beforeMount: function() {
    // console.log('beforeMount');
  },
  mounted: function() {
    // console.log('mounted1');
  },
  beforeUpdate: function() {
    // console.log('beforeUpdate');
  },
  updated: function() {
    // console.log('updated');
  },
  beforeDestroy: function() {
    // console.log('beforeDestory');
  },
  destroyed: function() {
    // console.log('destroyed');
  }
}
</script>
