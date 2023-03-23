<template>
    <div :class="{'counter-box':true,'valid-text':!textValid}" :id="cid">
        <div class="sub-box" @click="subNum">
            <span  class="sub-btn" >-</span>
        </div>
        <div class="val-box">
            <span class="num">{{num}}</span>
        </div>
        <div class="add-box" @click="addNum">
            <span class="add-btn" >+</span>
        </div>
        <span class="valid-reason" v-show="!textValid">{{validReason}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            num:0,
            cid:Math.random(),
            max:0,
            min:0,
        }
    },
    props:{
        cnum:{
            type:Number,
            default:0,
        },
        _width:{
            type:String,
            default:"7.5rem"
        },
        _bWidth:{
            type:String,
            default:"1.7625rem"
        },
        _height:{
            type:String,
            default:"3.1431rem"
        },
        _ftszie:{
            type:String,
            default:"1.5rem"
        },
        _min:{
            type:Number,
            default:1
        },
        _max:{
            type:Number,
            default:10
        },
        textValid:{
            type:Boolean,
            default:true,
        },
        validReason:{
            type:String,
            default:"数据不合法"
        },
        isAllowUseCount: {
            type: Boolean,
            default: true
        }
        
    },
    methods: {
        subNum(){
            this.num=(this.num>this._min)?this.num-1:this._min
            this.$emit("update",this.num)
        },
        addNum(){
            this.num=(this.num<this._max)?this.num+1:this._max
            this.$emit("update",this.num)
        },
        initNum(){
            this.max=this._max
            this.min=this._min
            this.num=(this.cnum>=this.min && this.cnum<=this.max)?this.cnum:this.min
        },

    },
    watch:{
        cnum:{
            deep:true,
            handler:function(){
                this.initNum()
            },
        },
        _max:{
            deep:true,
            handler:function(){
                this.initNum()
            },
        },
        _min:{
            deep:true,
            handler:function(){
                this.initNum()
            },
        },
    },
    computed:{
        enabled() {
            if(!this.isAllowUseCount)
                return false
            // if (this.module == "NULL")
            //     return true
            // else if (this.module in this.$store.state.f_status.permissions && this.$store.state.f_status.permissions[this.module] == 4)
            //     return true
            else
                return true
        },
        pointerEvent() {
            return this.enabled ? "auto" : "none";
        },
        opacity() {
            return this.enabled ? 1 : 0.5;
        },
    },
    created() {
        this.initNum()
        this.$emit("update",this.num)
    },
}
</script>
<style scoped>
.counter-box{
    position: relative;
    height: v-bind(_height);
    line-height: v-bind(_height);
    width: v-bind(_width);
    display: flex;
    background-color: var(--fff);
    font-size: v-bind(_ftszie);
    border-radius: 0.25rem;
    border: 1px solid var(--C65);
    display: flex;
    pointer-events: v-bind(pointerEvent);
    opacity: v-bind(opacity);
}
.counter-box div{
    position: relative;
    flex: 1;
}
.counter-box .val-box{
    flex: 2;
    border-left: 1px solid var(--C65);
    border-right: 1px solid var(--C65);
}
.sub-btn,.add-btn{
    font-size: 2.5rem;
    color:var(--C3B);
}
.sub-btn:hover,.add-btn:hover{
    cursor: pointer;
}
.valid-text{
    color: red !important;
    border: 2px solid red !important;
    box-shadow: -1px 1px 2px red !important;
}
.valid-reason{
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 1px;
    color: red;
    font-size: 1rem;
    top: 80%;
}
</style>