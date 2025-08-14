import streamDeck, {
	action,
	type DidReceiveSettingsEvent,
	DialAction,
	KeyAction,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
} from "@elgato/streamdeck";

import config from "../config/settings";
import { getSolarSystemObject, showData } from "../utils/solar-system-utils";
import type { SolarObjectSettings, getSolarSystemObjectType } from "../utils/solar-system-utils";
import { TextScroller } from "../utils/scroller";

/**
 * Stream Deck action for displaying information about Solar System Object.
 * Handles button appearance and key press events to fetch Solar System Object data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.object" })
export class ObjectInfo extends SingletonAction<SolarObjectSettings> {
	/**
	 * Handles when a setting changes in the UI
	 * @param ev The event received when settings in UI change
	 */
	public override onDidReceiveSettings(ev: DidReceiveSettingsEvent): void {
		this.updateIconSetting(ev.action, ev.payload.settings.iconSettings as string);
	}

	/**
	 * Function to get the solar sytem object
	 * @param ev The event payload for the key down event.
	 * @param name The name of the solar object to search
	 * @param scroller
	 */
	protected async getInfoAction(ev: KeyDownEvent<SolarObjectSettings>, name: string, scroller: TextScroller): Promise<void> {
		const { settings } = ev.payload;
		settings.name = name;

		const result = await getSolarSystemObject(ev.action, settings) as getSolarSystemObjectType;
		if (result?.apiLabel) {
			showData(result.apiLabel, result.apiValue, result.apiUnit, ev.action, scroller);
		}

		
	}

	/**
	 * Function to sent the checklist options via property inspector to UI.
	 */
	protected sentChecklistSettings(): void {
		streamDeck.ui.current?.sendToPropertyInspector({
			event: "getSettings",
			items: config.settings.filter(setting => !setting.avoid),
		});
	}

	/**
	 * Function to sent the icon option via property inspector to UI.
	 * @param name name of the space object
	 */
	protected sentIconSettings(name: string): void {
		streamDeck.ui.current?.sendToPropertyInspector({
			event: "getIconSettings",
			items: config.getIconSettings(name),
		});
	}

	/**
	 * Set the default settings of the solar system object,
	 * at the moment only the name in English
	 * @param ev The event payload for the will appear event.
	 * @param name The name of the solar system object
	 */
	protected async setDefaultSettings(ev: WillAppearEvent<SolarObjectSettings>, name: string): Promise<void> {
		ev.action.setTitle(name);
		this.updateIconSetting(ev.action, ev.payload.settings.iconSettings as string);
	}

	/**
	 * Function to sent all the setings to the plugin
	 * @param name Name of the object we want its settings
	 */
	protected setObjectPluginInfo(name: string): void {
		this.sentChecklistSettings();
		this.sentIconSettings(name);
	}
 
	/**
	 * Checks and update the image of the key according the iconSettings
	 *  @param action - The Stream Deck key action instance.
	 * @param name - The name of the object
	 */
	protected async updateIconSetting(action: DialAction | KeyAction, name: string): Promise<void> {		
		action.setImage(name);
	}
}
