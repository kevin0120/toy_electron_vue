import svgloader from './svgloader.vue'

export default {
    install(app) {
        const requireAll = requireContext => requireContext.keys().map(requireContext)
        const req = require.context('@/res/svg', false, /\.svg$/)
        requireAll(req)
        app.component('svg-loader', svgloader)
    }
}