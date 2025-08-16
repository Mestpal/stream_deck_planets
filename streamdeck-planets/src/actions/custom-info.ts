import streamDeck, { action, KeyDownEvent, WillAppearEvent, DidReceiveSettingsEvent} from "@elgato/streamdeck";

import { ObjectInfo } from "./object-info";
import { SolarObjectSettings, getSolarSystemObjectType} from "../utils/types";
import { getSolarSystemObject } from "../utils/solar-system-utils";
import { TextScroller } from "../utils/scroller";

const scroller = new TextScroller('', 8);
let solarObjectName: string | undefined = undefined

/**
 * Stream Deck action for displaying information about Custom Solar System object.
 * Handles button appearance and key press events to fetch Custom Solar System object data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.custom" })
export class CustomInfo extends ObjectInfo {
	/**
	 * Handles when a setting changes in the UI
	 * @param ev The event received when settings in UI change
	 */
	public override async onDidReceiveSettings(ev: DidReceiveSettingsEvent): Promise<void> {
		let { settings } = ev.payload
		console.log('onDidReceiveSettings', settings);

		if (settings.launch_search) {
			await getSolarSystemObject(ev.action, settings as SolarObjectSettings, settings.search_object as string) as getSolarSystemObjectType;
			settings = ev.payload.settings

			streamDeck.ui.current?.sendToPropertyInspector({
				event: "getObjectOptions",
				items: settings.options,
			});

			delete settings.launch_search
		}

		if (settings.selectedObject && !settings.data && Array.isArray(settings?.search_results)) {
			const name = settings.selectedObject

			settings.data = settings?.search_results?.find( body  => 
				typeof body === 'object' && body !== null && 'englishName' in body 
				&& body.englishName === name
			)
			
			solarObjectName = name as string
			this.setObjectPluginInfo(solarObjectName as string)
			ev.action.setTitle(solarObjectName)
		}
		
		ev.action.setSettings(settings)
		this.updateIconSetting(ev.action, settings.iconSettings as string);
	}

	/**
	 * Handles the key down event for the Custom Solar System object action.
	 * Sets the name to "Custom Solar System object" and fetches Custom Solar System object data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, ev.payload.settings.name, scroller);
	}

	/**
	 * Handles the send to plugin event for the Custom Solar System object action.
	 */
	public override onSendToPlugin(): void {		
		if (solarObjectName) {
			this.setObjectPluginInfo(solarObjectName);
		}
	}

	/**
	 * Sets the configuration when the plugin is shown in the device
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		if (ev.payload.settings.search_object) {
			this.setDefaultSettings(ev, ev.payload.settings.search_object);
		}
	}
}
