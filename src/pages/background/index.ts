import {addWebsite, canAccess, openApp, uninstallURL} from "@src/app";

chrome.runtime.setUninstallURL(uninstallURL)

// don't use async! use then() instead
// also: return true so the channel remains open
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  const sendRes = (res: any) => {
    sendResponse(res)
    console.log("Response sent!")
  }
  switch (data.command || "") {
    case "add-website": {
      const website = data.website
      addWebsite(website).then(() => sendRes({success: true})).catch(() => sendRes({success: false}))
      break
    }
    case "open-app": {
      openApp().then(() => sendRes({success: true})).catch(() => sendRes({success: false}))
      break
    }
    default:
      console.log("Invalid request: ", data.command)
  }
  return true
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status == "loading") {
    const tab = await chrome.tabs.get(tabId)
    const accessAction = (await canAccess(tab.url)).toLowerCase()
    console.log(accessAction)
    switch (accessAction) {
      case "allow":
        break;
      case "block":
        let pageBlock = `https://sleep-or-else.vercel.app/blocked`;
        await chrome.tabs.update(tabId, {url: pageBlock});
        break;
      case "close":
        await chrome.tabs.remove(tabId)
        break;
    }
  }
})