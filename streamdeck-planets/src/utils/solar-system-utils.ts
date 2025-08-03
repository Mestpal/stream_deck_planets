import streamDeck, { JsonValue, KeyAction } from "@elgato/streamdeck";
import config from "../config/settings"
import {type SettingsObject} from "../config/settings"

const defaultSetting = config.getDefaultSettings()[0];

/**
 * Displays a magnitude label on the Stream Deck key, then shows the value and unit after a short delay.
 * @param magnitude - The label to display initially.
 * @param value - The value to display after the delay.
 * @param unit - The unit to display after the delay.
 * @param action - The Stream Deck key action instance.
 */
function showData(magnitude: string, value: number | string, unit: string, action: KeyAction): void {
	action.setTitle(magnitude);
	setTimeout(() => action.setTitle(`${value} \n ${unit}`), 1500);
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
		} else {
			let currentSetting = defaultSetting

			if (settings.objectSettings) {
				currentSetting = config.settings
					.find( setting => setting.value === settings?.objectSettings?.[settings.count]) as SettingsObject;
				
				if (!currentSetting) {
					currentSetting = defaultSetting
				}
			}
			
			const apiValue = settings.data[currentSetting.value as keyof SolarSystemApiData];
			const apiUnit = currentSetting.unit|| '';
			showData(currentSetting.label, apiValue, apiUnit, action)
	
			settings.count = pressButtonCountManagement(settings);

			await action.setSettings(settings);
		}

	} catch (e) {
		streamDeck.logger.error("Failed to fetch Solar System object info", e);
	}
}

/**
 * Increments the counter up to settings.objectSettings.length - 1, then resets to 0.
 * @param settings - The current count value.
 * @returns The updated count value.
 */
function pressButtonCountManagement(settings: SolarObjectSettings): number {
	let count = 0

	if (settings.objectSettings && settings.count < settings.objectSettings.length - 1) {
		count =  settings.count + 1;
	} 
	
	return count
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
	count: number;
	/**
	 * The data associated with Object.
	 */
	data: SolarSystemApiData;
	/**
	 * The name of the Object
	 */
	name: string;
	/**
	 * Settings to show
	 */
	objectSettings?: JsonValue[]
};

export { getSolarSystemObject, pressButtonCountManagement, SolarObjectSettings };
