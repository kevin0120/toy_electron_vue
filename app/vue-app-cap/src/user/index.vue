<template>
  <nut-row>
    <nut-col :span="24">
      <div class="user">
        <nut-avatar size="large">
          <img :src="userInfo?.avatar || ''" />
        </nut-avatar>
        <p>
          {{ userInfo?.nickname }}
        </p>
      </div>
    </nut-col>
  </nut-row>
  <nut-row>
    <nut-col :span="24">
      <div class="flex-content">
        <nut-button type="primary" @click="logout">退出登录</nut-button>
      </div>
    </nut-col>
  </nut-row>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '/@/store/modules/user';
  import { useMobilePageRouter } from '/@/hooks/modules/usePageRouter';
  const { routerToLogin } = useMobilePageRouter();
  const userStore = useUserStore();
  const { reset } = userStore;
  const { userInfo } = storeToRefs(userStore);
  const logout = () => {
    try {
      routerToLogin();
      reset();
    } catch (e) {
      console.warn('logout', e);
    }
  };
</script>

<style scoped>
  .flex-content {
    display: flex;
    justify-content: center;
  }
  .user {
    display: flex;
    padding: 1rem;
  }
</style>
