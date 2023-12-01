;(() => {
    const path = window.location.href
    const localhost = 'http://127.0.0.1:'

    let isActivated = false
    let handlePaste, handleCopy, handleDrag

    let toast = {
        container: document.getElementById('iCouldPasteToast'),
        options: { delay: 2000 },
        enabled: {},
        disabled: {},
    }

    function init() {
        if (toast.enabled._) return

        var _e = createToast('<b>ITS_ME</b>  is On Progress!', '#20c997')
        var _d = createToast('<b>ITS_ME</b>  is Off Progress!', '#dc3545')

        toast.container = document.getElementById('iCouldPasteToast')
        toast.enabled._ = new iToast(_e, toast.options)
        toast.disabled._ = new iToast(_d, toast.options)

        toast.enabled.show = () => {
            toast.container.append(_e)
            toast.enabled._.show()
            _d.remove()
        }

        toast.disabled.show = () => {
            toast.container.append(_d)
            toast.disabled._.show()
            _e.remove()
        }
    }

    /**
     * Handles the pasting
     * @param {ClipboardEvent} e
     */
    const pasteHandler = (e) => {
        let text = e.clipboardData?.getData('text') ?? ''
        document.execCommand('insertText', !1, text)
    }

    const enablePaste = () => (document.onpaste = pasteHandler)

    function getAllHandlers() {
        try {
            handlePaste = handlePaste ?? __zone_symbol__pastetrue[0].callback
            handleCopy = handleCopy ?? __zone_symbol__copytrue[0].callback
            handleDrag = handleDrag ?? __zone_symbol__dragstarttrue[0].callback
        } catch {
            if (!handlePaste) {
                isActivated = false

                if (toast.container.childElementCount >= 10) {
                    toast.container.childNodes[0].remove()
                }

                Toast(
                    '<b>Unable to Activate:</b> <br> Activate in Editor mode!',
                    '#dc3545'
                )

                throw new Error(
                    'Illegal Activation: Unable to Activate! The extension should be activated in Editor mode.'
                )
            }
        }
    }

    function addHandlers() {
        addEventListener('copy', handleCopy, !0)
        addEventListener('cut', handleCopy, !0)
        addEventListener('paste', handlePaste, !0)
        addEventListener('drop', handlePaste, !0)
        addEventListener('dragstart', handleDrag, !0)
    }

    function removeHandlers() {
        removeEventListener('copy', handleCopy, !0)
        removeEventListener('cut', handleCopy, !0)
        removeEventListener('paste', handlePaste, !0)
        removeEventListener('drop', handlePaste, !0)
        removeEventListener('dragstart', handleDrag, !0)
    }

    function activate() {
        if (path.startsWith(localhost)) return console.log('activated')

        getAllHandlers()
        removeHandlers()
        enablePaste()
    }

    function deactivate() {
        if (path.startsWith(localhost)) return console.log('deactivated')

        addHandlers()
        document.onpaste = null
    }

    function sendMessage(message) {
        window.postMessage({ direction: 'from-page-script', message }, '*')
    }

    function createToast(message, color = '#007aff') {
        const toast = document.createElement('div')

        toast.className = 'toast align-items-center'
        toast.role = 'alert'
        toast.ariaLive = 'assertive'
        toast.ariaAtomic = 'true'

        toast.innerHTML = `<div class="d-flex align-items-center"><svg class="rounded ms-3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"> <rect width="100%" height="100%" fill="${color}"></rect></svg><div class="toast-body">${message}</div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`

        return toast
    }

    function Toast(message, color = '#007aff') {
        const _toast = createToast(message, color)
        new iToast(_toast, { delay: 5000 }).show()
        toast.container && toast.container.appendChild(_toast)
    }

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key == 'p') {
            init()

            isActivated = !isActivated
            isActivated ? activate() : deactivate()
            toast[isActivated ? 'enabled' : 'disabled'].show()

            sendMessage(isActivated ? 'on' : 'off')
        }
    })
})()
