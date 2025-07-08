import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";
import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

/**
 * Stream Deck action for displaying information about Mars.
 * Handles button appearance and key press events to fetch Mars data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mars" })
export class MarsInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Mars action.
	 * Sets the name to "Mars" and fetches Mars data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, "Mars")
	}

	/**
	 * Handles the will appear event for the Mars action.
	 * Sets the name to "Mars" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>){
		this.setDefaultSettings(ev, "Mars");
	}
}
