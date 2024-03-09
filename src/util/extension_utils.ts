import Tab = chrome.tabs.Tab;

export async function getCurrentTab(): Promise<Tab> {
  return chrome.tabs.query({currentWindow: true, active: true}).then(v => v[0])
}

export async function sendMessageToTab(tabId: number, message: any) {
  return chrome.tabs.sendMessage(tabId, message)
}