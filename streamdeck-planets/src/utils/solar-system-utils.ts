import streamDeck, { KeyAction } from "@elgato/streamdeck";

/**
 * Displays a magnitude label on the Stream Deck key, then shows the value and unit after a short delay.
 * @param magnitude - The label to display initially.
 * @param value - The value to display after the delay.
 * @param unit - The unit to display after the delay.
 * @param action - The Stream Deck key action instance.
 */
function showData(magnitude: string, value: number | string, unit: string, action: KeyAction): void {
	action.setTitle(magnitude);
	setTimeout(() => action.setTitle(`${value} ${unit}`), 1500);
}

/**
 * Fetches and displays information about a Solar System object on the Stream Deck.
 * @param name - The name of the Solar System object.
 * @param action - The Stream Deck key action instance.
 * @param settings - The settings for the Solar System object.
 * @returns A promise that resolves when the operation is complete.
 */
async function getSolarSystemObject(name: string, action: KeyAction, settings: SolarObjectSettings): Promise<void> {
	try {
		if (typeof settings.count !== "number") {
			settings.count = 0;
		}

		if (!settings.data?.englishName) {
			const response = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${name}`);
			settings.data = (await response.json()) as SolarSystemApiData;
			await action.setSettings(settings);
		}

		switch (settings.count) {
			case 1:
				showData("Gravity", settings.data.gravity, "m/s²", action);
				break;
			case 2:
				showData("Escape\n speed", settings.data.escape, "m/s", action);
				break;
			case 3:
				showData("Type", settings.data.bodyType, "", action);
				break;
			default:
				action.setTitle(settings.data.englishName || settings.name);
		}

		settings.count = pressButtonCountManagement(settings.count);
		await action.setSettings(settings);
	} catch (e) {
		streamDeck.logger.error("Failed to fetch Solar System object info", e);
	}
}

/**
 * Increments the counter up to 3, then resets to 0.
 * @param counter - The current count value.
 * @returns The updated count value.
 */
function pressButtonCountManagement(counter: number): number {
	if (counter < 3) {
		return counter + 1;
	} else {
		return 0;
	}
}

/**
 * Type for the Solar System object data returned from the API.
 */
type SolarSystemApiData = {
	/**
	 * The English name of the Solar System object.
	 */
	englishName: string;
	/**
	 * The gravity of the Solar System object.
	 */
	gravity: number;
	/**
	 * The escape velocity of the Solar System object.
	 */
	escape: number;
	/**
	 * The type of the Solar System object.
	 */
	bodyType: string;
};

/**
 * Settings specific to the Solar system.
 */
type SolarObjectSettings = {
	/**
	 * The count of Object-related items.
	 */
	count?: number;
	/**
	 * The data associated with Object.
	 */
	data?: SolarSystemApiData;
	/**
	 * The name of the Object
	 */
	name?: string;
};

export { getSolarSystemObject, pressButtonCountManagement, SolarObjectSettings };
