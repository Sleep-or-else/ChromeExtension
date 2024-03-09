const PORT = 27182

export type AccessType = "Allow" | "Block" | "Add"

export function endpoint(url: string) {
  if (url.startsWith('/'))
    url = url.substring(1)
  return `http://localhost:${PORT}/${url}`
}

export const uninstallURL = endpoint("/extension-uninstalled")

export async function openApp() {
  return fetch(endpoint("/open-app"))
}

export async function pingApp() {
  try {
    await fetch(endpoint("/ping"));
    return true
  } catch (e) {
    return false
  }
}

export async function getWebsitesAccessType(): Promise<AccessType> {
  try {
    const r = await fetch(endpoint("/get-web-access-type"))
    return (await r.json()).accessType
  } catch (e) {
    return "Add"
  }
}

export async function addWebsite(website: string) {
  return fetch(endpoint("/add-website"), {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({site: website})
  })
}

export type AccessAction = "ALLOW" | "BLOCK" | "CLOSE"

export async function canAccess(website: string): Promise<AccessAction> {
  return fetch(endpoint("/can-access"), {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({website})
  })
    .then(v => v.json())
    .then(v => v.action)
}