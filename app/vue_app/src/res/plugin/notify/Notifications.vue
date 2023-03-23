<template>
  <div
      class="vue-notification-group" :disable="show" @add="show123"
  >
    {{ message }}


    <button @click="this.$emit('add','hello ')">
      top center (max=3)
    </button>
  </div>
</template>
<script>

const Component = {
  name: 'Notifications',
  components: {},
  props: {
    message: {
      type: String,
      default: '12334'
    },
    show: {
      type: String,
      default: 'block'
    }
  },
  methods: {
    show123(s) {
      console.log(s)
      console.log("dfdfdfdfdfdf")
    },

    addItem(s) {
      console.log(s)
    },

    closeItem(s) {
      console.log(s)
    },

  },


  created () {
    console.log("hello mounted")
    this.$vue_notify_bus.on('add', this.addItem);
    this.$vue_notify_bus.on('close', this.closeItem);
  },

}

export default Component
</script>
<style>
.vue-notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification-title {
  font-weight: 600;
}

.vue-notification-template {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.vue-notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.success {
  background: #68CD86;
  border-left-color: #42A85F;
}

.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move {
  transition: all .5s;
}

.vn-fade-enter, .vn-fade-leave-to {
  opacity: 0;
}

</style>
