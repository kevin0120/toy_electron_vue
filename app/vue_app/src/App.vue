<template>

  <nav>
    <ul>
      <li>
        <router-link to="/page1">Index</router-link>
      </li>
      <li>
        <router-link to="/page2">Subpage</router-link>
      </li>
    </ul>
  </nav>
  <div id="app_frame" v-if="true">
    <!--    <LeetxHead v-if="true"></LeetxHead>-->
    <div class="content-box">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
<!--        <h1 v-if="$route.meta.keepAlive">!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>-->
<!--        <h1 v-if="!$route.meta.keepAlive">@@@@@@@@@@@@@@@@@@@@@@@@@@</h1>-->
      </router-view>
    </div>
    <!--    <LeetxFooter></LeetxFooter>-->
    <!--    <StackMask></StackMask>-->
    <!--    <MessageTips></MessageTips>-->
  </div>
</template>


<script>
// import LeetxHead from "./screwdriver/nav/LeetxHead.vue";
// import LeetxFooter from './screwdriver/nav/LeetxFooter.vue';

export default {
  name: "App",
  components: {
    // LeetxHead,
    // LeetxFooter,
  },
  data() {
    return {
      gws: null,
    };
  },
  methods: {
    checkgws() {
      // if (this.gws != null) this.gws.close();
    },

  },
  created() {
    // checkLogin();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.module) {
        // console.log('to.meta.module',to.meta.module);
        if (to.meta.module in this.$store.state.f_status.permissions && this.$store.state.f_status.permissions[to.meta.module] >= 1) {
          next();
        }
      } else {
        next();
      }
    });
  },
  unmounted() {
  },
  mounted() {
    // listenWindow();
  },
  computed: {
    // 用户是否在线
    isOnline() {
      return this.$store.state.f_status.user != "guest";
    },
    cursor() {
      return window.navigator.userAgent.toLowerCase().includes("windows") ? "auto" : "none";
    }
  }
}

</script>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  color: #fff;
  padding: 5px;
  height: 20px;
}

ul {
  display: flex;
  list-style: none;
}

li {
  margin-left: 20px;
}

a {
  text-decoration: none;
  color: #fff;
}

.active {
  font-weight: bold;
}

</style>

