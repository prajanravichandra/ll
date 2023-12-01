const localhost = 'http://127.0.0.1:'

/**
 * Scripts Injector
 * @param {HTMLScriptElement[]} scripts
 */
function injectScripts(scripts) {
    scripts.forEach((path) => {
        const script = document.createElement('script')

        script.src = chrome.runtime.getURL(path)
        script.onload = () => script.remove()
        ;(document.head || document.documentElement).appendChild(script)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = chrome.runtime.getURL('css/inject.css')
    document.head.appendChild(style)

    div = document.createElement('div')
    div.id = 'iCouldPasteToast'
    div.className = 'toast-container bottom-0 end-0 p-3'
    document.body.appendChild(div)
})

window.addEventListener('message', (event) => {
    if (
        event.source === window &&
        event?.data?.direction === 'from-page-script'
    ) {
        if (location.href.startsWith(localhost))
            console.log(`MSG (from cs): "${event.data.message}"`)
        chrome.runtime.sendMessage('toggle')
    }
})

injectScripts(['js/hello.js', 'js/toast.js'])
