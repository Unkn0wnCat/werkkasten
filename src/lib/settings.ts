import { writable } from 'svelte/store';

export type Settings = {
    theme: "auto"|"light"|"dark"
}

export type SettingsPatch = {
    theme?: "auto"|"light"|"dark"
}

export type PatchAction = {
    action: "patch",
    patch: SettingsPatch
}

const defaultSettings: Settings = {
    theme: "auto"
}

const settingsBroadcast = new BroadcastChannel("werkkiste_settings");

const createSettings = () => {
    let persistedSettings: SettingsPatch = {};
    
    if(typeof localStorage !== "undefined")
        persistedSettings = JSON.parse(localStorage.getItem("werkkiste_settings")||"{}");

    const initialSettings = Object.assign(defaultSettings, persistedSettings);


    const { subscribe, update } = writable<Settings>(initialSettings);

    settingsBroadcast.addEventListener("message", (ev) => {
        const data = JSON.parse(ev.data)

        if(data.action === "patch") {
            update((previous) => {
                return Object.assign(previous, (data as PatchAction).patch)
            })
        }
    })

    return {
        subscribe, 
        patch: (patchObject: SettingsPatch) => {
            settingsBroadcast.postMessage(JSON.stringify({"action": "patch", "patch": patchObject}))

            update((previous) => {
                const next = Object.assign(previous, patchObject);

                localStorage.setItem("werkkiste_settings", JSON.stringify(next))

                return next
            })
        }
    }
}

const settings = createSettings();

export default settings;