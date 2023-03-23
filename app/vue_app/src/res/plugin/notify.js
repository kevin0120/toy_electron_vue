import Notifications from "./notify/Notifications";
import mitt from 'mitt';

const emitter = mitt();

export default {
    install: (app, options) => {
        app.config.globalProperties.$vue_notify_bus = emitter;
        app.component(options.componentName || 'notifications', Notifications)
        const notify = (params) => {
            if (typeof params === 'string') {
                params = { title: '', text: params }
            }

            if (typeof params === 'object') {
                emitter.emit('add', params)
            }
        }
        notify.close = function (id) {
            emitter.emit('close', id)
        }

        app.config.globalProperties.$notify = notify
    }
}