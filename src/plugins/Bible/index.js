import mitt from 'mitt'

export default {
    install(vue, opts) {
        const emitter = mitt()

        vue.directive('bible-links', {
            mounted(el, binding) {
                el.addEventListener('click', (event) => {
                    const linkElement = event.target.closest('a');
                    if (linkElement) {
                        // Check for Bible link class
                        if (linkElement.classList.contains("resource-link-sspm-bible")) {
                            vue.config.globalProperties.emitter.emit('bible-click',
                                { verse: linkElement.getAttribute("href"), ...binding.value }
                            );
                            event.preventDefault();
                        }

                        // Check for EGW link class
                        if (linkElement.classList.contains("resource-link-sspm-egw")) {
                            vue.config.globalProperties.emitter.emit('egw-click',
                                { reference: linkElement.getAttribute("href"), title: linkElement.textContent, ...binding.value }
                            );
                            event.preventDefault();
                        }
                    }
                });
            }
        })
    }
}