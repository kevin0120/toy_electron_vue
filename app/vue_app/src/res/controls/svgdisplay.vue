<template>
<div style="all:initial;height:160rem;max-width:50rem;overflow:scorll;">
    <div class="flex" v-for="(item, index) in svgkeys" :key="index">
            <svg-loader color="green" size="3rem" :icon="item">
                <span> {{ item }}</span>
            </svg-loader>
            <div style="all:initial;display:flex-box;top:-2rem;" > {{ item }}</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            svgkeys: [],
        };
    },

    props: {
        msg: String,
    },
    methods: {},
    mounted() {
        var tmp = require.context("@/res/svg", false, /\.svg$/).keys();
        tmp.forEach((item) => {
            this.svgkeys.push(item.match(/([%a-zA-Z0-9\-_]+)(\?.*)?/)[0]);
        });
    },
    unmounted() {},
};
</script>

<style scoped>
.flex {

    all: initial;

    
    flex: content;
    flex-direction: column;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    flex-flow: wrap;
    align-items: flex-start;
    margin: 1rem;
    width: 8rem;

}

.el-carousel__item:nth-child(3n) {
    background-color: #39393a;
}

.el-carousel__item:nth-child(3n + 1) {
    background-color: #282e33;
}

.el-carousel__item:nth-child(3n + 2) {
    background-color: #243349;
}
</style>
