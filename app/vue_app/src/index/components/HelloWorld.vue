<template>
  <div id="app">
    <h2>Vue.js Notification
      <br>
      <a href="https://github.com/euvl/vue-notification/blob/master/README.md"
         target="readme">Readme</a>
      <a href="https://github.com/euvl/vue-notification/"
         target="issues">Github</a>
    </h2>
    <!-- CSS animation example -->
    <notifications/>
    <notifications/>


    <notifications/>
    <notifications/>    <notifications/>

<!--    &lt;!&ndash; Velocity animation example &ndash;&gt;-->
<!--    <Notifications group="foo-velocity"-->
<!--                   position="bottom right"-->
<!--                   animation-type="velocity"-->
<!--                   :speed="500" />-->

<!--    &lt;!&ndash; Custom style example &ndash;&gt;-->
<!--    <Notifications group="custom-style"-->
<!--                   position="top center"-->
<!--                   classes="n-light"-->
<!--                   :max="3"-->
<!--                   :width="400"/>-->

<!--    &lt;!&ndash; Custom template example &ndash;&gt;-->
<!--    <Notifications group="custom-template"-->
<!--                   :duration="5000"-->
<!--                   :width="500"-->
<!--                   animation-name="v-fade-left"-->
<!--                   position="top left">-->

<!--      <template #body="props">-->
<!--        <div class="custom-template">-->
<!--          <div class="custom-template-icon">-->
<!--            <i class="icon ion-android-checkmark-circle"></i>-->
<!--          </div>-->
<!--          <div class="custom-template-content">-->
<!--            <div class="custom-template-title">-->
<!--              {{props.item.title}}-->

<!--              <p>-->
<!--                Random number: {{props.item.data.randomNumber}}-->
<!--              </p>-->
<!--            </div>-->
<!--            <div class="custom-template-text"-->
<!--                 v-html="props.item.text"></div>-->
<!--          </div>-->
<!--          <div class="custom-template-close"-->
<!--               @click="props.close">-->
<!--            <i class="icon ion-android-close"></i>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Notifications>-->

<!--    &lt;!&ndash; Full width example &ndash;&gt;-->
<!--    <Notifications group="full-width"-->
<!--                   width="100%" />-->

    <div class="content">
      <p>
        CSS animation:
      </p>
      <div>
        <button class="success"
                style="width: 30%"
                @click="show('foo-css', 'success')">
          <i class="icon ion-information-circled"/>
          SUCCESS
        </button>
        <button class="warn"
                style="width: 30%"
                @click="show('foo-css', 'warn')">
          <i class="icon ion-alert-circled"/>
          WARNING
        </button>
        <button class="error"
                style="width: 30%"
                @click="show('foo-css', 'error')">
          <i class="icon ion-close-circled"/>
          ERROR
        </button>
      </div>

      <div style="padding-top: 10px"></div>

      <p>
        Velocity animation:
      </p>

      <div>
        <button class="success"
                style="width: 30%"
                @click="show('foo-velocity', 'success')">
          <i class="icon ion-information-circled"/>
          SUCCESS
        </button>
        <button class="warn"
                style="width: 30%"
                @click="show('foo-velocity', 'warn')">
          <i class="icon ion-alert-circled"/>
          WARNING
        </button>
        <button class="error"
                style="width: 30%"
                @click="show('foo-velocity', 'error')">
          <i class="icon ion-close-circled"/>
          ERROR
        </button>
      </div>
      <div style="padding-top: 20px">
        <p>Custom style:</p>
        <button @click="show('custom-style')">
          top center (max=3)
        </button>
        <p>Custom template:</p>
        <button @click="show('custom-template')">
          show top left
        </button>
        <p></p>
        <button @click="clean('custom-template')">
          <u>clean all</u> top left
        </button>
        <p></p>
        <button @click="show('full-width')">
          show bottom (full width)
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components:{
  },
  name: 'app',
  data () {
    return {
      id: 0,
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2]
        },
        leave: {
          opacity: 0,
          height: 0
        }
      },


      message: '12334',

      show1:'block'


    }
  },
  methods: {
    show (group, type = '') {
      const text = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `
      this.$notify(this,{
        group,
        title: `Test ${type} notification #${this.id++}`,
        text,
        type,
        data: {
          randomNumber: Math.random()
        }
      })
    },
    clean (group) {
      this.$notify({ group, clean: true })
    },



      addItem (event) {
      console.log("hello 1")
        this.message=event
      },

      closeItem () {
        console.log("hello 2")
        this.show1="none"
      },


  },

}
</script>
