import mitt from 'mitt'

export default {
    install(vue, opts) {
        const emitter = mitt()

        vue.directive('bible-links', {
            mounted(el, binding) {
                el.addEventListener('click', (event) => {
                    if (event.target.classList.contains("resource-link-sspm-bible")) {
                        vue.config.globalProperties.emitter.emit('bible-click',
                            { verse: event.target.getAttribute("href"), ...binding.value }
                        )
                        event.preventDefault()
                    }

                    if (event.target.classList.contains("resource-link-sspm-egw")) {
                        vue.config.globalProperties.emitter.emit('egw-click',
                            { reference: event.target.getAttribute("href"), title: event.target.textContent, ...binding.value }
                        )
                        event.preventDefault()
                    }
                });
            }
        })
    }
}