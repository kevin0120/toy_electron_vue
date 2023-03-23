<template>
    <div class="base-button" @click="onclick">
        <span class="base-button-text" v-if="!useIcon">{{ text }}</span>
        <svgloader class="base-button-icon" v-if="useIcon" :icon="icon"></svgloader>
    </div>
</template>

<script>
import svgloader from '../icon_font/svgloader.vue'
// import { messgaeApi } from '../message/message'
import { vuexStore } from '@/store/storeHelper'
export default {
    components: {
        svgloader
    },
    data() {
        return {
            lastclicktime: 0,
            isthrottle: false
        }
    },
    props: {
        text: {
            type: String,
            default: "测试文本",
        },
        textColor: {
            type: String,
            default: "#000000",
        },
        width: {
            type: String,
            default: "6rem"
        },
        height: {
            type: String,
            default: "4rem"
        },
        bgcColor: {
            type: String,
            default: "#f1f1f1",
        },
        borderRadius: {
            type: String,
            default: "0.5rem",
        },
        fontSize: {
            type: String,
            default: '1rem'
        },
        // 是否使用图标
        useIcon: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: "Add"
        },
        iconSize: {
            type: String,
            default: "100% - 1rem"
        },
        fontFamily: {
            type: String,
            default: "--SHSC-M"
        },
        fontWeight: {
            type: String,
            default: '400'
        },
        module: {
            type: String,
            default: 'NULL'
        },
        enablerun: {
            type: Boolean,
            default: true
        },

    },
    methods: {
        onclick() {
            let now = new Date().getTime();
            if (Math.abs(now - this.lastclicktime) < 2000) {
                this.isthrottle = true;
                setTimeout(() => {
                    this.isthrottle = false;
                }, 480)
            }
            this.lastclicktime = now;
        }
    },
    computed: {
        enabled() {
            if (this.enablerun == false && (vuexStore.state.g_status.busy || vuexStore.state.g_status.offline == 1))
                return false;
            // if (this.enableOffline == false && vuexStore.state.g_status.offline == 1)
            //     return false;
            if (this.module == "NULL")
                return true
            else if (this.module in vuexStore.state.f_status.permissions && vuexStore.state.f_status.permissions[this.module] == 4)
                return true
            else
                return false
        },
        pointerEvent() {
            return this.enabled && this.isthrottle == false ? "all" : "none";
        },
        opacity() {
            return this.enabled ? 1 : 0.5;
        },
    }

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

@keyframes kf-throttle {
    0% {
        opacity: 0.4;
    }

    25% {
        opacity: 0.55;
    }

    50% {
        opacity: 0.70;
    }

    75% {
        opacity: 0.85;
    }

    100% {
        opacity: v-bind(opacity);
    }

}

.base-button {
    position: relative;
    width: v-bind(width);
    height: v-bind(height);
    width: v-bind(width);
    animation: kf-throttle 0.5s step-end forwards;
    background-color: v-bind(bgcColor);
    border-radius: v-bind(borderRadius);
    pointer-events: v-bind(pointerEvent);
    /* opacity: v-bind(opacity); */
}


.base-button:active {
    animation: None;
}

.base-button-text {
    color: v-bind(textColor);
    font-size: v-bind(fontSize);
    font-family: var(v-bind(fontFamily));
    white-space: nowrap;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.base-button-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: calc(v-bind(iconSize));
    width: calc(v-bind(iconSize));
}

/* .base-button::after {
    display: v-bind(lockdisplay);
    position: absolute;
    font-size: 3px;
    content: "🔒";
    top: -8px;
    left: -6px;
} */
</style>