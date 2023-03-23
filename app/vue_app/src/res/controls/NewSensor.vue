<template>
    <div class="pf-param-line">
        <div class="block1">{{ sensorName }}:</div>
        <div class="block2">{{ display_value }}{{ sensorUnit }}</div>
        <div class="block3">
            <div class="top-box">
                <svg-loader class="arrow-icon" icon="StaticMax" size="1.2rem"></svg-loader>
                <span class="limit-val">{{ maxDisplayVal }}</span>
            </div>
            <div class="btm-box">
                <svg-loader class="arrow-icon" icon="StaticMin" size="1.2rem"></svg-loader>
                <span class="limit-val">{{ minDisplayVal }}</span>
            </div>
            <span></span>
        </div>
        <span class="line"></span>
    </div>
</template>

<script>
export default {
    name: "NewSensor",
    data() {
        return {
            count: 1,
            notNum:'--'
        };
    },
    props: {
        sensorName: {
            type: String,
            default: "Sensor",
        },
        sname: {
            type: String,
            default: "force",
        },
        sensorValue: {
            type: null,
            default: 10,
        },
        max: {
            type: null,
            default: '--',
        },
        min: {
            type: null,
            default: '--',
        },
        sensorUnit: {
            type: String,
            default: "KN",
        },
        fixed: {
            type: Number,
            default: 2,
        },
        height: {
            type: String,
            default: "2rem",
        },
        nameFontsize: {
            type: String,
            default: "1.8vh",
        },
        valueFontsize: {
            type: String,
            default: "3vh"
        },
        unitFontsize: {
            type: String,
            default: "1.8vh"
        },
        width: {
            type: String,
            default: ""
        },
        isShowLine: {
            type: Boolean,
            default: true
        },
        displayLimit: {
            type: Boolean,
            default: true
        },
    },
    methods: {},
    mounted() { },
    unmounted() { },
    computed: {
        limitColor() {
            if (this.sensorValue > this.max) {
                return "#f80606";
            } else if (this.sensorValue < this.min) {
                return "#2edbe7";
            } else {
                return "#121312";
            }
        },
        display_value() {
            var sensor = this.$store.state.sensors[this.sname];
            if (sensor == null) {
                sensor = {
                    gain: 1,
                    offset: 0,
                };
            }
            if(this.sensorValue=="--")return this.sensorValue
            return (parseFloat(this.sensorValue) * sensor.gain + sensor.offset).toFixed(this.fixed);
        },
        isDisplayLine() {
            return this.isShowLine ? 'block' : "none";
        },
        isDisplayLimit() {
            return this.displayLimit ? 'visible' : "collapse";
        },
        maxDisplayVal() {
            var sensor = this.$store.state.sensors[this.sname];
            if (sensor == null) {
                sensor = {
                    gain: 1,
                    offset: 0,
                };
            }
            let num=(parseFloat(this.max) * sensor.gain + sensor.offset).toFixed(1);
            return isNaN(num)?this.notNum:num
        },
        minDisplayVal() {
            var sensor = this.$store.state.sensors[this.sname];
            if (sensor == null) {
                sensor = {
                    gain: 1,
                    offset: 0,
                };
            }
            let num=(parseFloat(this.min) * sensor.gain + sensor.offset).toFixed(1);
            return isNaN(num)?this.notNum:num

        },
    },
};
</script>


<style scoped>
* {
    font-family: var(--FSY) !important;
}

.pf-param-line {
    position: relative;
    height: 6.5625vh;
    width: 95vw;
    display: flex;
    background-color: var(--Cee);

}

.line {
    display: v-bind(isDisplayLine);
    position: absolute;
    bottom: 0;
    /* width: calc(100%-3.5rem); */
    height: 1px;
    left: 2.375rem;
    right:2rem;
    background-color: var(--CD4);
}

.block1 {
    float: left;
    left: 2.375rem;
    font-size: var(--font1_75);
    position: relative;
    top: calc(50% - 0.9rem);
    color: #3b3b3b;
}

.block2 {
    font-size: 2.5rem;
    flex: 1;
    position: relative;
    top: calc(50% - 1.6rem);
    left: 1.6875rem;
}

.block3 {
    float: right;
    font-size: 1.75rem;
    position: relative;
    height: 100%;
    right: 2rem;
    width: 10rem;
    display:flex;
    flex-direction: column;
    visibility: v-bind(isDisplayLimit);
}

.block3>div {
    position: relative;
    flex: 1;
}

.arrow-icon {
    position: absolute;
    left: 3rem;
    top: 50%;
    transform: translateY(-50%);
}

.limit-val {
    position: absolute;
    right: 0;
    top: 50%;
    font-size: var(--font1_5);
    transform: translateY(-50%);
    color: var(--C00);
}
</style>
