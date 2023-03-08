<template>
  <div class="bc">
    <div class="loginBox">
      <div class="loginTitle">
        <div class="loginAvatar">CAP</div>
      </div>
      <div class="loginForm">
        <div>
          <div class="p-inputgroup field" style="width: 300px">
            <span class="p-inputgroup-addon loginInput">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="user.username" class="loginInput" type="text" placeholder="用户名" />
          </div>
          <small v-show="userNamePrefix.show" id="username-help" class="p-error">{{ userNamePrefix.msg }}</small>
        </div>
        <div>
          <div class="p-inputgroup" style="width: 300px">
            <span class="p-inputgroup-addon loginInput">
              <i class="pi pi-lock"></i>
            </span>
            <InputText v-model="user.password" class="loginInput" type="password" placeholder="密码" />
          </div>
          <small v-show="passwordPrefix.show" id="password-help" class="p-error">{{ passwordPrefix.msg }}</small>
        </div>
        <Button
          label="登录"
          class="p-button-raised"
          style="width: 300px; background: #46ddc8; border: 1px solid #46ddc8"
          :loading="loginLoading"
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import { loginApi } from '/@/api/httpRequest/user';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  const toast = useToast();
  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStoreWithOut();
  const { updateUserInfo, updateToken } = userStore;

  const loginLoading = ref(false);

  const user = reactive({
    username: '',
    password: ''
  });
  const userNamePrefix = reactive({ show: false, msg: '请输入用户名！' });
  const passwordPrefix = reactive({ show: false, msg: '请输入密码！' });

  const prefix = () => {
    let pass = true;
    userNamePrefix.show = false;
    passwordPrefix.show = false;
    if (user.username === '') {
      userNamePrefix.show = true;
      pass = false;
    }
    if (user.password === '') {
      passwordPrefix.show = true;
      pass = false;
    }
    return pass;
  };
  const login = async () => {
    try {
      const pass = prefix();
      if (!pass) {
        return;
      }

      // 验证通过，展示 loading
      loginLoading.value = true;

      const res = await loginApi(user);

      if (!res) return;
      updateUserInfo(res.data.userinfo);
      updateToken(res.data.token);
      toast.add({
        severity: 'success',
        summary: '登录成功',
        detail: `欢迎回来 ${user.username}`,
        life: 3000
      });
      // 跳转回原来页面
      let redirect = route.query.redirect;
      if (typeof redirect !== 'string') {
        redirect = '/';
      }
      router.replace(redirect);
    } catch (e: any) {
      console.warn(e);
      toast.add({
        severity: 'error',
        summary: '登录失败',
        detail: e.message || e,
        life: 3000
      });
    } finally {
      loginLoading.value = false;
    }
  };
</script>

<style scoped>
  .bc {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: url('../../assets/icons/bolt_name.png');
    /*background: rgb(221, 252, 226);*/
    /*background: radial-gradient(circle, rgba(221, 252, 226, 1) 0%, rgba(240, 255, 255, 1) 100%);*/
    overflow: hidden;
  }
  .loginBox {
    width: 360px;
    height: 300px;
    /*position: absolute;*/
    /*top: calc(50% - 200px);*/
    /*left: calc(50% - 200px);*/
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    color: rgba(255, 255, 255, 0.75);
  }
  .loginTitle {
    width: 100%;
    height: 20%;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  }
  .loginAvatar {
    width: 200px;
    height: 60px;
    border-radius: 10px;
    background: rgba(6, 212, 215, 0.5);
    backdrop-filter: blur(6px);
    position: relative;
    top: -20px;
    color: #ffffff;
    margin: 0 auto;
    line-height: 60px;
  }
  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80%;
  }
  .loginInput {
    background-color: rgba(200, 200, 200, 0.25);
    /*color: #ffffff;*/
  }
  .loginDesc {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
  }
  .buttonLink {
    color: #ffffff;
    font-size: 14px;
  }
</style>
