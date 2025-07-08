import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";
import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

/**
 * Stream Deck action for displaying information about Mercury.
 * Handles button appearance and key press events to fetch Mercury data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mercury" })
export class MercuryInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Mercury action.
	 * Sets the name to "Mercury" and fetches Mercury data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, "Mercury")
	}

	/**
	 * Handles the will appear event for the Mercury action.
	 * Sets the name to "Mercury" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>){
		this.setDefaultSettings(ev, "Mercury");
	}
}
