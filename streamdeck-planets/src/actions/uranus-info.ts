import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

/**
 * Stream Deck action for displaying information about Uranus.
 * Handles button appearance and key press events to fetch Uranus data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.uranus" })
export class UranusInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Uranus action.
	 * Sets the name to "Uranus" and fetches Uranus data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, "Uranus");
	}

	/**
	 * Handles the send to plugin event for the Uranus action.
	 * Sends the checklist settings.
	 */
	public override onSendToPlugin(): void {
		this.sentChecklistSettings();
	}

	/**
	 * Sets the name to "Uranus" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		this.setDefaultSettings(ev, "Uranus");
	}
}
