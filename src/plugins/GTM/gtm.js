const GTM_ID = 'GTM-5S9TDVF'
const ALLOWED_DOMAINS = ['absg.sspmadventist.org', 'inverse.sspmadventist.org', 'localhost']

function isDomainAllowed() {
    return ALLOWED_DOMAINS.includes(window.location.hostname)
}

function injectGTMHead(id) {
    const script = document.createElement('script')
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`
    document.head.insertBefore(script, document.head.firstChild)
}

function injectGTMBody(id) {
    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.cssText = 'display:none;visibility:hidden'
    noscript.appendChild(iframe)
    document.body.insertBefore(noscript, document.body.firstChild)
}

export default {
    install() {
        if (!isDomainAllowed()) return
        injectGTMHead(GTM_ID)
        injectGTMBody(GTM_ID)
    }
}