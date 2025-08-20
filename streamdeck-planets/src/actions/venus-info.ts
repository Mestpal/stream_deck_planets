import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

const planet = "Venus";

/**
 * Stream Deck action for displaying information about Venus.
 * Handles button appearance and key press events to fetch Venus data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.venus" })
export class VenusInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Earth action.
	 * Sets the name to "Earth" and fetches Earth data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		this.resetShowData();
		await this.getInfoAction(ev, planet);
	}

	/**
	 * Handles the send to plugin event for the Venus action.
	 * Sends the checklist settings.
	 */
	public override onSendToPlugin(): void {
		this.setObjectPluginInfo(planet);
	}

	/**
	 * Sets the name to Venus as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		this.setDefaultSettings(ev, planet);
	}
}
