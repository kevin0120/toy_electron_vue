<!--<script setup lang="ts">-->
<!--  // This starter template is using Vue 3 <script setup> SFCs-->
<!--  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup-->
<!--  import HelloWorld from './components/learn/HelloWorld.vue';-->
<!--</script>-->

<template>
  <router-view />
  <Toast />
  <DownloadCard
    :show="hasItem"
    :list="downloadList"
    :done-num="doneNum"
    :total-num="totalNum"
    :status="status"
    :value="downloadProgress"
    @close="close"
  />
  <ConfirmDialog />
  <ConfirmDialog group="warning">
    <template #message="slotProps">
      <div class="flex flex-column">
        <i :class="slotProps.message.icon" style="font-size: 5rem; text-align: center"></i>
        <p class="pl-2 mt-4">{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
  import Toast from 'primevue/toast';
  import ConfirmDialog from 'primevue/confirmdialog';
  import DownloadCard from '/@/components/Modal/DownloadCard.vue';
  import { useDownloadStore } from '/@/store/modules/download';
  import { storeToRefs } from 'pinia';

  const downloadStore = useDownloadStore();
  const { resetStore } = downloadStore;
  const close = () => {
    resetStore();
  };
  const { downloadList, hasItem, totalNum, doneNum, status, downloadProgress } = storeToRefs(downloadStore);
</script>
