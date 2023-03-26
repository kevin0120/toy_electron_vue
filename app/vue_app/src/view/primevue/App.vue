<template>
  <div class="parent">

    <div class="child1">
      <Button label="Success" severity="success" @click="showSuccess"/>
      <Button label="Info" severity="info" @click="showInfo"/>
      <Button label="Warn" severity="warning" @click="showWarn"/>
      <Button label="Error" severity="danger" @click="showError"/>
    </div>

    <div class="child2">
      <Button label="Success" severity="success" @click="showSuccess"/>
      <Button label="Info" severity="info" @click="showInfo"/>
      <Button label="Warn" severity="warning" @click="showWarn"/>
      <Button label="Error" severity="danger" @click="showError"/>
    </div>

  </div>
</template>

<script>
import Button from 'primevue/button';
/* eslint-disable */
export default {
  name: 'App',
  components: {
    Button
  },
  methods: {
    show(message) {
      console.log(message)
      this.$toast.add({severity: 'info', summary: 'Sticky Message', detail: 'Message Content', life: 3000});
    },

    showTopLeft(message) {
      console.log(message)
      this.$toast.add({severity: 'info', summary: 'Info Message', detail: 'Message Content'});
    },

    showBottomLeft() {
      this.$toast.add({severity: 'warn', summary: 'Warn Message', detail: 'Message Content', group: 'bl', life: 3000});
    },

    showBottomRight() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        group: 'br',
        life: 3000
      });
    },
    showSuccess() {
      this.$toast.add({severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000});
    },
    showInfo() {
      this.$toast.add({severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000});
    },
    showWarn() {
      this.$toast.add({severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000});
    },
    showError() {
      this.$toast.add({severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000});
    }
  },

  created() {
    console.log('Example App Component created')
  },
  mounted() {
    console.log('Example App Component mounted')
  },
  updated() {
    console.log('Example App Component updated')
  },
  unmounted() {
    console.log('Example App Component destroyed')
  },


}
</script>

<style>
.parent {
  display: flex;
  justify-content: center;
  flex-direction: column;

}

.child1 {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: rgba(84, 255, 229, 0.96);
}

.child2 {
  padding: 5px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #54ccff;
}

</style>
