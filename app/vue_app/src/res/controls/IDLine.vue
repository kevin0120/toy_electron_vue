<template>
    <div class="pf-param-line">
        <div class="block1">
            <span>
                ID:{{ tid }}
            </span>
        </div>
        <div class="block2">
            <span class="time-msg">
                {{ sn }}
            </span>
        </div>
        <div class="block3">
            <span class="id-msg">
                <span>{{ batchesinfo }}</span>
            </span>
        </div>
        <span :class="lineClass"></span>
    </div>
</template>

<script>

export default {
    name: "NewSensor",
    data() {
        return {
            count: 1,
        };
    },

    props: {
        tid: {
            type: Number,
            default: 3213,
        },
        sn: {
            type: String,
            default: "1234567890",
        },
        batchesinfo: {
            type: String,
            default: "3/8",
        },
        isShowLine: {
            type: Boolean,
            default: true
        }
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
            return (
                (parseFloat(this.sensorValue) * sensor.gain + sensor.offset).toFixed(this.fixed)
            );
        },
        lineClass() {
            return (this.isShowLine ? 'line' : "")
        }
    },
};
</script>


<style scoped>
.pf-param-line {
    position: relative;
    height: 6.5625vh;
    width: 95vw;
    display: flex;
    background-color: var(--Cee);
}

.line {
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
    color: var(--C00);
}

.block2 {
    flex: 1;
    position: relative;
    top: calc(50% - 1.6rem);
    left: 4%;
}

.block3 {
    float: right;
    font-size: 1.75rem;
    position: relative;
    height: 100%;
    right: 3.25rem;
    text-align: left;
    text-indent: 2rem;
    width: 13.5vw;
}

.limit-val {
    position: absolute;
    left: 1.3rem;
    top: 50%;
    transform: translateY(-50%);
}

.time-msg {
    position: relative;
    font-size: 2.375rem;
    color: var(--C00);
}

.id-msg {
    position: absolute;
    right: -1.1875rem;
    top: 50%;
    transform: translateY(-50%);
}

.fenzi {
    font-size: var(--font1_75);
    color: #000000;
}

.fenmu {
    color: #3B3B3B;
}

</style>
