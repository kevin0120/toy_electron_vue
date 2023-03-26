<template>
  <div class="bg-gray-50">
    <Breadcrumb style="height: 3.5rem" :home="home" :model="model"/>
    <div class="w-full p-2" style="height: calc(100vh - 3.5rem)">
      <slot name="AppBody"></slot>
    </div>
  </div>
</template>


<script>
// import {MenuItem} from "primevue/menuitem";
import Breadcrumb from 'primevue/breadcrumb';
export default {
  name: 'AppLayout',
  components: {
    Breadcrumb
  },
  data() {
    return {
    };
  },
  props: {
    model:[],
    home: {}
  },
  methods: {},
  mounted() {
  },
  created() {
  },
  unmounted() {
  },

}
</script>
