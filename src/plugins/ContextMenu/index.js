import { createApp } from 'vue'
import ContextMenuView from './ContextMenuView.vue'
import mitt from 'mitt'

export default {
    install(vue, opts) {
        const emitter = mitt()
        const v = createApp(ContextMenuView)
        v.config.globalProperties.emitter = emitter

        emitter.on('highlight', (color) => { vue.config.globalProperties.emitter.emit('highlight', color) })
        v.mount(document.body.appendChild(document.createElement('div')))

        vue.directive('context-menu', {
            mounted(el, binding, vnode, prevVnode) {
                el.addEventListener('mouseup', async (evt) => {
                    emitter.emit(`show`, { el, selection: window.getSelection() })
                })
            }
        })
    }
}