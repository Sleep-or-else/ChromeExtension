import "@src/styles/tailwind.css";
import "@src/styles/app.css"
import Column from "@src/components/layout/Column";
import Header from "@src/components/typography/Header";
import Button from "@src/components/input/Button";
import Spacer from "@src/components/decoration/Spacer";
import {createResource, createSignal, Show} from "solid-js";
import {getWebsitesAccessType} from "@src/app";
import {getCurrentTab} from "@src/util/extension_utils";
import Pg from "@src/components/typography/Pg";

export function PopupPage() {
  const [accessType] = createResource(getWebsitesAccessType, {initialValue: "Add"})
  const [currentTab] = createResource(getCurrentTab)
  const [error, setError] = createSignal(false)

  async function addWebsite() {
    let tab = await getCurrentTab();
    chrome.runtime.sendMessage({
      command: "add-website",
      website: tab.url
    }, ({success}: { success: boolean }) => {
      setError(!success)
    });
  }

  function openApp() {
    chrome.runtime.sendMessage({
        command: "open-app"
      }, ({success}: { success: boolean }) => {
        console.log("Open app success", success)
      setError(!success)
      }
    );
  }

  return (
    <main class={"flex flex-col w-[300px] mx-auto my-auto"}>
      <Column center>
        <Header size={3} class={"my-8"}>
          Sleep or else
        </Header>
        <Spacer class={"my-2"}/>
        <Button class={"w-40 my-4 p-2 text-base"} onClick={async () => {
          await addWebsite()
        }}>
          {accessType()} website
        </Button>
        <Button class={"w-40 my-4 p-2 text-base"} onClick={() => {
          openApp()
        }}>
          Open app
        </Button>
        <Show when={error()} fallback={<Pg></Pg>}>
          <p class={"text text-red-400 dark:text-red-400"}>The application seems to be offline. Please open it</p>
        </Show>
      </Column>
    </main>
  );
}
