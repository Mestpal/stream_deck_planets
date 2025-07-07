import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

import { getSolarSystemObject } from "../utils/solar-system-utils";
import type { SolarObjectSettings } from "../utils/solar-system-utils";

/**
 * Stream Deck action for displaying information about Jupiter.
 * Handles button appearance and key press events to fetch Jupiter data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.jupiter" })
export class JupiterInfo extends SingletonAction<SolarObjectSettings> {
	/**
	 * Handles the key down event for the Jupiter action.
	 * Sets the name to "Jupiter" and fetches Jupiter data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		const { settings } = ev.payload;
		settings.name = "Jupiter";

		await getSolarSystemObject(settings.name, ev.action, settings);
	}

	/**
	 * Handles the will appear event for the Jupiter action.
	 * Sets the name to "Jupiter" as default
	 * @param ev The event payload for the will appear event.
	 * @returns A promise that resolves when the title is set.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): Promise<void> {
		return ev.action.setTitle("Jupiter");
	}
}
