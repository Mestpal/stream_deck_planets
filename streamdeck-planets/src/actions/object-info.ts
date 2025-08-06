import streamDeck, { action, DidReceiveSettingsEvent, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

import config from "../config/settings";
import { getSolarSystemObject } from "../utils/solar-system-utils";
import type { SolarObjectSettings } from "../utils/solar-system-utils";

/**
 * Stream Deck action for displaying information about Solar System Object.
 * Handles button appearance and key press events to fetch Solar System Object data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.object" })
export class ObjectInfo extends SingletonAction<SolarObjectSettings> {
	/**
	 * Function to get the solar sytem object
	 * @param ev The event payload for the key down event.
	 * @param name The name of the solar object to search
	 */
	public async getInfoAction(ev: KeyDownEvent<SolarObjectSettings>, name: string): Promise<void> {
		const { settings } = ev.payload;
		settings.name = name;

		await getSolarSystemObject(settings.name, ev.action, settings);
	}

	/**
	 * Function to sent the checklist options via property inspector to UI.
	 */
	public sentChecklistSettings(): void {
		streamDeck.ui.current?.sendToPropertyInspector({
			event: "getSettings",
			items: config.settings
		});
	}

	/**
	 * Function to sent the icon option via property inspector to UI.
	 * @param name name of the object
	 */
	public sentIconSettings(name: string): void{		
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
	 * @returns A promise that resolves when the title is set.
	 */
	public setDefaultSettings(ev: WillAppearEvent<SolarObjectSettings>, name: string): Promise<void> {
		return ev.action.setTitle(name);
	}

	/**
	 * Checks and update the image of the key according the iconSettings
	 * @param ev The event for update Icon
	 */
	public updateIconSeting(ev: DidReceiveSettingsEvent): void {
		ev.action.setImage(ev?.payload?.settings?.iconSettings as string);
	}
}
