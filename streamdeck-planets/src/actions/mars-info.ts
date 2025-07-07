import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { getSolarSystemObject } from "../utils/solar-system-utils";
import type { SolarObjectSettings } from "../utils/solar-system-utils";

/**
 * Stream Deck action for displaying information about Mars.
 * Handles button appearance and key press events to fetch Mars data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.mars" })
export class MarsInfo extends SingletonAction<SolarObjectSettings> {
	/**
	 * Handles the key down event for the Mars action.
	 * Sets the name to "Mars" and fetches Mars data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		const { settings } = ev.payload;
		settings.name = "Mars";

		await getSolarSystemObject(settings.name, ev.action, settings);
	}

	/**
	 * Handles the will appear event for the Mars action.
	 * Sets the name to "Mars" as default
	 * @param ev The event payload for the will appear event.
	 * @returns A promise that resolves when the title is set.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): Promise<void> {
		return ev.action.setTitle("Mars");
	}
}
