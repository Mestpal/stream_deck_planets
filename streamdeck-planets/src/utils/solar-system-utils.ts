import streamDeck, { JsonValue, KeyAction } from "@elgato/streamdeck";

import config from "../config/settings";
import { type SettingsObject } from "../config/settings";
import { TextScroller } from "./scroller";

const defaultSetting = config.getDefaultSettings()[0];
const maximunLength = 8;
const emptyString = Array(maximunLength).fill(' ').join('')
const waitingTime = 300;


/**
 * Displays a magnitude label on the Stream Deck key, then shows the value and unit after a short delay.
 * @param magnitude - The label to display initially.
 * @param value - The value to display after the delay.
 * @param unit - The unit to display after the delay.
 * @param action - The Stream Deck key action instance.
 * @param scroller - TextScroller object
 */
function showData(magnitude: string, value: number | string, unit: string, action: KeyAction, scroller: TextScroller): void {
	scroller.stopScroll()

	if (magnitude.length <= maximunLength) {		
		scroller.text = magnitude
	} else {
		scroller.text = `${emptyString}${magnitude}`
	}

	scroller.startScroll(waitingTime, action)

	setTimeout(() => {
		scroller.stopScroll()
		action.setTitle(' ')
		if (magnitude === 'Name') {
			scroller.text = `${value}`
		} else {
			scroller.text = `${emptyString}${value}${unit}${emptyString}${magnitude}`
		}
		
		if (scroller.text.length > maximunLength) {
			scroller.startScroll(waitingTime, action);
		} else {
			action.setTitle(scroller.text)
		}
	}, waitingTime * scroller.text.length);

}

/**
 * Fetches and displays information about a Solar System object on the Stream Deck.
 * @param action - The Stream Deck key action instance.
 * @param settings - The settings for the Solar System object.
 * @returns A promise that resolves when the operation is complete.
 */
async function getSolarSystemObject(action: KeyAction, settings: SolarObjectSettings): Promise<getSolarSystemObjectType | object | undefined> {
	try {
		if (typeof settings.count !== "number") {
			settings.count = 0;
		}

		if (!settings.data?.englishName) {
			const response = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${settings.name}`);
			settings.data = (await response.json()) as SolarSystemApiData;
			await action.setSettings(settings);
			return {};
		} else {
			let currentSetting = defaultSetting;

			if (settings.objectSettings) {
				currentSetting = config.settings.find(
					(setting) => setting.value === settings?.objectSettings?.[settings.count],
				) as SettingsObject;

				if (!currentSetting) {
					currentSetting = defaultSetting;
				}
			}

			settings.count = pressButtonCountManagement(settings);
			await action.setSettings(settings);

			return {
				apiLabel: currentSetting.label,
				apiValue: settings.data[currentSetting.value as keyof SolarSystemApiData], 
				apiUnit: currentSetting.unit || ""
			}
		}
	} catch (e) {
		streamDeck.logger.error("Failed to fetch Solar System object info", e);
		return undefined;
	}
}

/**
 * Increments the counter up to settings.objectSettings.length - 1, then resets to 0.
 * @param settings - The current count value.
 * @returns The updated count value.
 */
function pressButtonCountManagement(settings: SolarObjectSettings): number {
	let count = 0;

	if (settings.objectSettings && settings.count < settings.objectSettings.length) {
		count = settings.count + 1;
	}

	return count;
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
	 * Settings for checklist
	 */
	objectSettings?: JsonValue[];
	/**
	 * Settings for checklist
	 */
	iconSettings?: string;
};

/**
 * Type representing the return value from getSolarSystemObject function.
 */
type getSolarSystemObjectType = {
	/**
	 * The label for the API data point.
	 */
	apiLabel: string,
	/**
	 * The value from the Solar System API data.
	 */
	apiValue: keyof SolarSystemApiData,
	/**
	 * The unit of measurement for the value.
	 */
	apiUnit: string
}

export { getSolarSystemObject, getSolarSystemObjectType, pressButtonCountManagement, SolarObjectSettings, showData };
