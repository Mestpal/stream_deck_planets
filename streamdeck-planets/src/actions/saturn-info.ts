import { action, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import type { SolarObjectSettings } from "../utils/solar-system-utils";
import { ObjectInfo } from "./object-info";
import { TextScroller } from "../utils/scroller";

const planet = "Saturn";
const scroller = new TextScroller('', 8);

/**
 * Stream Deck action for displaying information about Saturn.
 * Handles button appearance and key press events to fetch Saturn data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.saturn" })
export class SaturnInfo extends ObjectInfo {
	/**
	 * Handles the key down event for the Earth action.
	 * Sets the name to "Earth" and fetches Earth data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		await this.getInfoAction(ev, planet, scroller);
	}
	/**
	 * Handles the send to plugin event for the Saturn action.
	 * Sends the checklist settings.
	 */
	public override onSendToPlugin(): void {
		this.setObjectPluginInfo(planet);
	}

	/**
	 * Sets the name to Saturn as default
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		this.setDefaultSettings(ev, planet);
	}
}
