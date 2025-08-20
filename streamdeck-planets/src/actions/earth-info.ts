import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

const planet = "Earth";

/**
 * Stream Deck action for displaying information about Earth.
 * Handles button appearance and key press events to fetch Earth data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.earth" })
export class EarthInfo extends ObjectInfo {
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
	 * Handles the send to plugin event for the Earth action.
	 */
	public override onSendToPlugin(): void {
		this.setObjectPluginInfo(planet);
	}

	/**
	 * Sets the configuration when the plugin is shown in the device
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		this.setDefaultSettings(ev, planet);
	}
}
