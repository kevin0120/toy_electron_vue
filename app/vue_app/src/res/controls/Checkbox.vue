<template>
    <div :class="boxClass" @click="updateData">
        <span class="text">{{text}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status:false,
        }
    },
    methods: {
        updateData(){
            this.status=!this.status
            this.$emit('update:modelValue',this.status?this.activeValue:this.staticValue)
        },
        initData(){
            this.status=this.modelValue==this.activeValue
        }
    },
    props:{
        activeValue:{
            type:null,
            default:1
        },
        staticValue:{
            type:null,
            default:0
        },
        modelValue:{
            type:null,
            default:0
        },
        size:{
            type:String,
            default:"2rem",
        }
    },
    computed:{
        boxClass(){
            return this.status?'active-box':'static-box'
        },
        text(){
            return this.status?'✔':""
        }
    },
    created() {
        this.initData()
    },
    watch:{
        modelValue(){
            this.initData()
        }
    }
}
</script>
<style scoped>
.static-box{
    position: relative;
    width: 2rem;
    height: 2rem;
    box-sizing: border-box;
    border: 0.15rem solid gray;
    border-radius:50%;
    color: rgba(255, 255, 255, 0.4);
    font-size:var(--font1_5);
    cursor: pointer;
}
.active-box{
    position: relative;
    width: 2rem;
    height: 2rem;
    background-color: var(--C00c155);
    border-radius:50%;
    color: var(--fff);
    font-size:var(--font1_5);
    cursor: pointer;
}
.text{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
}
</style>