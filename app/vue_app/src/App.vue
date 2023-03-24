<template>

  <nav>
    <ul>
      <li>
        <router-link class="icon-route" to="/page1">
          <IconTextButton :permission="1" iconName="ActiveCursor" text="Index"
                          iconSize='2rem' interval="-0.2rem" fontSize="1rem"></IconTextButton>
        </router-link>
      </li>
      <li>
        <router-link class="icon-route" to="/page2">
          <IconTextButton  :permission="1" iconName="ActiveIO" text="图标"
                          iconSize="2rem" interval="-0.2rem" fontSize="1rem"></IconTextButton>
        </router-link>
      </li>
      <li>
        <router-link class="icon-route" to="/page3">
          <IconTextButton  :permission="1" iconName="ActiveLine" text="Example"
                          iconSize="2rem" interval="-0.2rem" fontSize="1rem"></IconTextButton>
        </router-link>
<!--        <router-link class="icon-route" to="/page3">-->
<!--          <IconTextButton module="CALIBRATION" :permission="1" iconName="ActiveLine" text="Example"-->
<!--                          iconSize="1.5rem" interval="-0.2rem" fontSize="1.375rem"></IconTextButton>-->
<!--        </router-link>-->
      </li>

    </ul>
  </nav>
  <div id="app_frame" v-if="true">
    <!--    <LeetxHead v-if="true"></LeetxHead>-->
    <div class="content-box">
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.name"/>
      </router-view>
    </div>
  </div>
</template>


<script>
import IconTextButton from './res/controls/IconTextButton.vue'
export default {
  name: "App",
  components: {
    IconTextButton
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

.icon-route{
  position: relative;
  top: 0;

}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  color: #fff;
  padding: 5px;
  height: 50px;
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

