import SvgIcon from './SvgIcon.vue'

export default {
    install(app) {
        const requireAll = requireContext => requireContext.keys().map(requireContext)
        const req = require.context('V@/svg', false, /\.svg$/)
        requireAll(req)
        app.component('svg-icon', SvgIcon)
    }
}