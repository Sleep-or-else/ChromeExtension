import {canAccess, uninstallURL} from "@src/app";

chrome.runtime.setUninstallURL(uninstallURL)

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