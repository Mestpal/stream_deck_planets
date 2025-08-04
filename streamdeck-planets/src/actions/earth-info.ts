import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

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
		await this.getInfoAction(ev, "Earth");
	}

	/**
	 * Handles the send to plugin event for the Earth action.
	 * Sends the checklist settings.
	 */
	public override onSendToPlugin(): void {
		this.sentChecklistSettings();
	}

	/**
	 * Sets the name to "Earth" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		this.setDefaultSettings(ev, "Earth");
	}
}
