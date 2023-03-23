<template>
    <div class="base-button" @click="clickButton">
        <svgloader class="base-button base-button-icon" :icon="iconName"></svgloader>
        <div class="base-button base-button-text">{{ text }}</div>
    </div>
</template>

<script>
import svgloader from '../icon_font/svgloader.vue'
// import { messgaeApi } from '../message/message'
export default {
    components: {
        svgloader
    },
    props: {
        // 文本内容
        text: {
            type: String,
            default: "测试文本",
        },
        textColor: {
            type: String,
            default: "#000000",
        },
        bgcColor: {
            type: String,
            default: "transparent",
        },
        // 回调函数
        clbck: {
            type: Function,
            default: function () {
                return () => { }
            }
        },
        borderRadius: {
            type: String,
            default: "0.5rem",
        },
        fontSize: {
            type: String,
            default: '1rem'
        },
        iconName: {
            type: String,
            default: "StaticStartOne"
        },
        // iconSize: {
        //     type: String,
        //     default: "1rem"
        // },
        fontFamily: {
            type: String,
            default: "--SHSC-M"
        },
        fontWeight: {
            type: String,
            default: '400'
        },
        interval: {
            type: String,
            default: '0rem'
        },
        module: {
            type: String,
            default: 'NULL'
        },
        isUseDev: {
            type: Boolean,
            default: true
        },
        permission:{
            type:Number,
            default:4
        }

    },
    data() {
        return {
          iconSize:"1rem"
        }
    },
    methods: {
        // clickButton(e) {
        //     console.log("event" ,e);
        //     this.clbck && this.clbck()
        // },
    },
    computed: {
        enabled() {
            if (this.isUseDev === false)
                return false
            // if (this.$store.state.g_status.offline == 1)
            //     return false;
            if (this.module === "NULL")
                return true
            else if (this.module in this.$store.state.f_status.permissions && this.$store.state.f_status.permissions[this.module] >= this.permission)
                return true
            else
                return false
        },
        color() {
            if (!this.enabled) {
                return "#969696"
            }
            return this.textColor
        },
        pointerEvent() {
            return this.enabled ? "auto" : "none";
        },
        opacity() {
            return this.enabled ? 1 : 0.7;
        },

    }

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.base-button {
    position: relative;
    width: auto;
    background-color: v-bind(bgcColor);
    pointer-events: v-bind(pointerEvent);
    opacity: v-bind(opacity);
}
.base-button-icon {
    position: relative;
    height: 3rem;
    width: v-bind(iconSize);
    pointer-events: v-bind(pointerEvent);
    opacity: v-bind(opacity);
}

.base-button-text {
    color: v-bind(color);
    text-align: center;
    font-size: v-bind(fontSize);
    font-family: var(v-bind(fontFamily));
    white-space: nowrap;
    margin-top: v-bind(interval);
    widows: auto;
}
</style>