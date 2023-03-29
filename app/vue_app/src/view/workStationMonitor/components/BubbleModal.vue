<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div :class="`modal-wrapper text-8xl font-italic text-${status}`" @click="$emit('close')">
          {{ status }}
        </div>
        <div class="box">
          <div :class="`bubble b1 status-${status}`"></div>
          <div :class="`bubble b11 status-${status}`"></div>
          <div :class="`bubble b2 status-${status}`"></div>
          <div :class="`bubble b22 status-${status}`"></div>
          <div :class="`bubble b3 status-${status}`"></div>
          <div :class="`bubble b4 status-${status}`"></div>
          <div :class="`bubble b5 status-${status}`"></div>
          <div :class="`bubble b6 status-${status}`"></div>
          <div :class="`bubble b7 status-${status}`"></div>
          <div :class="`bubble b8 status-${status}`"></div>
          <div :class="`bubble b88 status-${status}`"></div>
          <div :class="`bubble b9 status-${status}`"></div>

          <div :class="`bubble b10 status-${status}`"></div>
          <div :class="`bubble t1 status-${status}`"></div>
          <div :class="`bubble t11 status-${status}`"></div>
          <div :class="`bubble t2 status-${status}`"></div>
          <div :class="`bubble t22 status-${status}`"></div>
          <div :class="`bubble t3 status-${status}`"></div>
          <div :class="`bubble t4 status-${status}`"></div>
          <div :class="`bubble t5 status-${status}`"></div>
          <div :class="`bubble t6 status-${status}`"></div>
          <div :class="`bubble t7 status-${status}`"></div>
          <div :class="`bubble t8 status-${status}`"></div>
          <div :class="`bubble t88 status-${status}`"></div>
          <div :class="`bubble t9 status-${status}`"></div>
          <div :class="`bubble t10 status-${status}`"></div>

          <div :class="`bubble r10 status-${status}`"></div>
          <div :class="`bubble r1 status-${status}`"></div>
          <div :class="`bubble r11 status-${status}`"></div>
          <div :class="`bubble r2 status-${status}`"></div>
          <div :class="`bubble r22 status-${status}`"></div>
          <div :class="`bubble r3 status-${status}`"></div>
          <div :class="`bubble r5 status-${status}`"></div>
          <div :class="`bubble r6 status-${status}`"></div>
          <div :class="`bubble r7 status-${status}`"></div>
          <div :class="`bubble r8 status-${status}`"></div>
          <div :class="`bubble r88 status-${status}`"></div>
          <div :class="`bubble r9 status-${status}`"></div>
          <div :class="`bubble r10 status-${status}`"></div>

          <div :class="`bubble l1 status-${status}`"></div>
          <div :class="`bubble l11 status-${status}`"></div>
          <div :class="`bubble l2 status-${status}`"></div>
          <div :class="`bubble l22 status-${status}`"></div>
          <div :class="`bubble l3 status-${status}`"></div>
          <div :class="`bubble l4 status-${status}`"></div>
          <div :class="`bubble l5 status-${status}`"></div>
          <div :class="`bubble l6 status-${status}`"></div>
          <div :class="`bubble l7 status-${status}`"></div>
          <div :class="`bubble l8 status-${status}`"></div>
          <div :class="`bubble l88 status-${status}`"></div>
          <div :class="`bubble l9 status-${status}`"></div>
          <div :class="`bubble l10 status-${status}`"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>


export default {
  name: 'BubbleModal',
  data() {
  },
  props: {
    show: {type: Boolean, required: true},
    status: {type: String, required: true}
  },

  mounted() {
  }
}


</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(121, 121, 121, 0.6) 79%,
      rgba(93, 93, 93, 0.8) 94%
  );
  display: table;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  z-index: 9999;
  position: absolute;
  cursor: pointer;
  top: 45%;
  left: 45%;
  font-weight: 900;
  text-transform: uppercase;
}

/*
* 对于 transition="modal" 的元素来说
* 当通过 Vue.js 切换它们的可见性时
* 以下样式会被自动应用。
*
* 你可以简单地通过编辑这些样式
* 来体验该模态框的过渡效果。
*/

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: #000;
}

.text-ok {
  color: #4dd07d;
}

.text-nok {
  color: #ff7878;
}

.status-ok {
  background: #4dd07d;
}

.status-nok {
  background: #ff7878;
}

.bubble {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  z-index: 111;
  /*box-shadow: 0 20px 30px rgba(0, 0, 0, .2), inset 0 10px 30px 5px rgba(255, 255, 255, 1);*/
}

.b1 {
  left: 20%;
  transform: scale(0.6);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b11 {
  left: 25%;
  transform: scale(0.4);
  animation: movetotop 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b2 {
  left: 30%;
  transform: scale(0.5);
  animation: movetotop 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b22 {
  left: 35%;
  transform: scale(1);
  animation: movetotop 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b2 {
  left: 40%;
  transform: scale(0.7);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b3 {
  left: 45%;
  transform: scale(0.8);
  animation: movetotop 1s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b4 {
  left: 50%;
  transform: scale(0.4);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b5 {
  left: 55%;
  transform: scale(0.8);
  animation: movetotop 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b6 {
  left: 60%;
  transform: scale(0.6);
  animation: movetotop 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b7 {
  left: 65%;
  transform: scale(0.8);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b8 {
  left: 70%;
  transform: scale(0.8);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b88 {
  left: 75%;
  transform: scale(0.6);
  animation: movetotop 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b9 {
  left: 85%;
  transform: scale(0.3);
  animation: movetotop 1.5s linear infinite, direction 3s ease-in-out infinite alternate;
}

.b10 {
  left: 90%;
  transform: scale(0.9);
  animation: movetotop 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */

.t1 {
  left: 2%;
  transform: scale(0.6);
  animation: movetobottom 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t11 {
  left: 6%;
  transform: scale(0.4);
  animation: movetobottom 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t2 {
  left: 8%;
  transform: scale(0.6);
  animation: movetobottom 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t22 {
  left: 10%;
  transform: scale(1);
  animation: movetobottom 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t2 {
  left: 15%;
  transform: scale(0.7);
  animation: movetobottom 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t3 {
  left: 20%;
  transform: scale(0.8);
  animation: movetobottom 1s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t4 {
  left: 35%;
  transform: scale(0.4);
  animation: movetobottom 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t5 {
  left: 40%;
  transform: scale(0.8);
  animation: movetobottom 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t6 {
  left: 50%;
  transform: scale(0.6);
  animation: movetobottom 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t7 {
  left: 60%;
  transform: scale(1);
  animation: movetobottom 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t8 {
  left: 70%;
  transform: scale(0.8);
  animation: movetobottom 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t88 {
  left: 75%;
  transform: scale(0.6);
  animation: movetobottom 3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t9 {
  left: 85%;
  transform: scale(0.3);
  animation: movetobottom 11s linear infinite, direction 3s ease-in-out infinite alternate;
}

.t10 {
  left: 90%;
  transform: scale(0.9);
  animation: movetobottom 8s linear infinite, direction 3s ease-in-out infinite alternate;
}

/* rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */

.r1 {
  top: 2%;
  transform: scale(0.6);
  animation: movetoleft 3s linear infinite, movetobottom 3s linear infinite;
}

.r11 {
  top: 6%;
  transform: scale(0.4);
  animation: movetoleft 3s linear infinite, movetobottom 3s linear infinite;
}

.r2 {
  top: 8%;
  transform: scale(0.1);
  animation: movetoleft 3s linear infinite, movetobottom 3s linear infinite;
}

.r22 {
  top: 10%;
  transform: scale(1);
  animation: movetoleft 1.4s linear infinite, movetobottom 3s linear infinite;
}

.r2 {
  top: 15%;
  transform: scale(0.7);
  animation: movetoleft 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r3 {
  top: 20%;
  transform: scale(0.8);
  animation: movetoleft 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r4 {
  left: 25%;
  transform: scale(0.4);
  animation: movetoleft 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r5 {
  top: 40%;
  transform: scale(0.8);
  animation: movetoleft 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r6 {
  top: 50%;
  transform: scale(0.6);
  animation: movetoleft 1.3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r7 {
  top: 60%;
  transform: scale(0.8);
  animation: movetoleft 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r8 {
  top: 70%;
  transform: scale(0.8);
  animation: movetoleft 1.44s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r88 {
  top: 75%;
  transform: scale(0.6);
  animation: movetoleft 1.3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r9 {
  top: 85%;
  transform: scale(0.3);
  animation: movetoleft 1.5s linear infinite, direction 3s ease-in-out infinite alternate;
}

.r10 {
  top: 90%;
  transform: scale(0.9);
  animation: movetoleft 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

/* lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */

.l1 {
  top: 2%;
  transform: scale(0.6);
  animation: movetoright 3s linear infinite, movetobottom 3s linear infinite;
}

.l11 {
  top: 6%;
  transform: scale(0.4);
  animation: movetoright 3s linear infinite, movetobottom 3s linear infinite;
}

.l2 {
  top: 8%;
  transform: scale(0.1);
  animation: movetoright 3s linear infinite, movetobottom 3s linear infinite;
}

.l22 {
  top: 10%;
  transform: scale(1);
  animation: movetoright 1.4s linear infinite, movetobottom 3s linear infinite;
}

.l2 {
  top: 15%;
  transform: scale(0.7);
  animation: movetoright 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l3 {
  top: 20%;
  transform: scale(0.8);
  animation: movetoright 4s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l4 {
  left: 25%;
  transform: scale(0.4);
  animation: movetoright 1s linear infinite, movetobottom 3s linear infinite;
}

.l5 {
  top: 40%;
  transform: scale(0.8);
  animation: movetoright 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l6 {
  top: 50%;
  transform: scale(0.6);
  animation: movetoright 1.3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l7 {
  top: 60%;
  transform: scale(1);
  animation: movetoright 2s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l8 {
  top: 70%;
  transform: scale(0.8);
  animation: movetoright 1.44s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l88 {
  top: 75%;
  transform: scale(0.6);
  animation: movetoright 1.3s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l9 {
  top: 85%;
  transform: scale(0.3);
  animation: movetoright 1.5s linear infinite, direction 3s ease-in-out infinite alternate;
}

.l10 {
  transform: scale(0.9);
  animation: movetoright 2s linear infinite, movetotop 3s linear infinite;
}

@keyframes movetotop {
  0% {
    bottom: -10%;
  }

  100% {
    bottom: 10%;
  }
}

@keyframes movetobottom {
  0% {
    top: -10%;
  }

  100% {
    top: 10%;
  }
}

@keyframes movetoleft {
  0% {
    right: 0;
  }

  100% {
    right: 10%;
  }
}

@keyframes movetoright {
  0% {
    left: 0;
  }

  100% {
    left: 10%;
  }
}
</style>
