import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

import { getSolarSystemObject } from "../utils/solar-system-utils";
import type { SolarObjectSettings } from "../utils/solar-system-utils";

/**
 * Stream Deck action for displaying information about Saturn.
 * Handles button appearance and key press events to fetch Saturn data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.saturn" })
export class SaturnInfo extends SingletonAction<SolarObjectSettings> {
	/**
	 * Handles the key down event for the Saturn action.
	 * Sets the name to "Saturn" and fetches Saturn data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		const { settings } = ev.payload;
		settings.name = "Saturn";

		await getSolarSystemObject(settings.name, ev.action, settings);
	}

	/**
	 * Handles the will appear event for the Saturn action.
	 * Sets the button title to "Saturn".
	 * @param ev The event payload for the will appear event.
	 * @returns A promise that resolves when the title is set.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): Promise<void> {
		return ev.action.setTitle("Saturn");
	}
}
