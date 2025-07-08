import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";
import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

/**
 * Stream Deck action for displaying information about Neptune.
 * Handles button appearance and key press events to fetch Neptune data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.neptune" })
export class NeptuneInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Neptune action.
	 * Sets the name to "Neptune" and fetches Neptune data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, "Neptune")
	}

	/**
	 * Handles the will appear event for the Neptune action.
	 * Sets the name to "Neptune" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>){
		this.setDefaultSettings(ev, "Neptune");
	}
}
