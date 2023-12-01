chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'off',
    })
})

const ON = 'on'
const OFF = 'off'

const site = 'https://skcet530.examly.io/test'
const localhost = 'http://127.0.0.1:'

/**
 * Toggles ON/OFF Badge
 * @param {chrome.tabs.Tab} tab
 */
async function toggleBadge(tab) {
    if (!(tab.url.startsWith(site) || tab.url.startsWith(localhost))) return

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
    const nextState = prevState === ON ? OFF : ON

    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    })

    // await chrome.runtime.sendMessage(nextState);
}

// chrome.action.onClicked.addListener(toggleBadge)

chrome.runtime.onMessage.addListener((msg, sender) => {
    console.log(msg)
    toggleBadge(sender.tab)
})
