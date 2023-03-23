<template>
    <div :class="boxClass" @click="updateData">
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
            // 不让点击不执行后续事件
            if(!this.allowClick){return}
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
        },
        width:{
            type:String,
            default:'1.5rem'
        },
        color:{
            type:String,
            default:'#c7c7c7'
        },
        allowClick:{
            type:Boolean,
            default:true,
        }
    },
    computed:{
        boxClass(){
            return this.status?'active-box':'static-box'
        },

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
    position: absolute;
    width: v-bind(width);
    height: v-bind(width);
    box-sizing: border-box;
    border: 1px solid v-bind(color);
    border-radius:50%;
    font-size: 1rem;
    cursor: pointer;
    background-color: #eeeeee;
}
.active-box{
    position: absolute;
    width: v-bind(width);
    height: v-bind(width);
    background-color: var(--C00c155);
    border-radius: 50%;
    color: var(--fff);
    font-size: 1rem;
    cursor: pointer;
}
</style>