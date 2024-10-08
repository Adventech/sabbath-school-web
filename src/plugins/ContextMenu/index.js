import { createApp } from 'vue'
import ContextMenuView from './ContextMenuView.vue'
import mitt from 'mitt'

export default {
    install(vue, opts) {
        const emitter = mitt()
        const v = createApp(ContextMenuView)
        v.config.globalProperties.emitter = emitter

        emitter.on('comment', () => { vue.config.globalProperties.emitter.emit('comment') })

        emitter.on('highlight', (color) => { vue.config.globalProperties.emitter.emit('highlight', color) })
        v.mount(document.body.appendChild(document.createElement('div')))

        let element

        const ev = async (evt) => {
            emitter.emit(`show`, { element, selection: window.getSelection() })
        }

        vue.directive('context-menu', {
            mounted(el, binding, vnode, prevVnode) {
                element = el
                el.addEventListener('mouseup', ev)
                el.addEventListener('touchend', ev)
                el.addEventListener('selectionchange', ev)
            },

            unmounted(el, binding, vnode) {
                el.removeEventListener('mouseup', ev)
                el.removeEventListener('touchend', ev)
                el.removeEventListener('selectionchange', ev)
            }
        })
    }
}