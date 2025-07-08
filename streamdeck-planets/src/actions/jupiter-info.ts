import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";
import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";

/**
 * Stream Deck action for displaying information about Jupiter.
 * Handles button appearance and key press events to fetch Jupiter data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.jupiter" })
export class JupiterInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Jupiter action.
	 * Sets the name to "Jupiter" and fetches Jupiter data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, "Jupiter")
	}

	/**
	 * Handles the will appear event for the Jupiter action.
	 * Sets the name to "Jupiter" as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>){
		this.setDefaultSettings(ev, "Jupiter");
	}
}
