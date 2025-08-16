import streamDeck, { KeyAction, DialAction, JsonObject } from "@elgato/streamdeck";

import config from "../config/settings";
import {SolarSystemApiData, SolarObjectSettings, getSolarSystemObjectType, BodiesType, OptionSelectorType} from './types'
import { type SettingsObject } from "../config/settings";
import { TextScroller } from "./scroller";

const base_url = 'https://api.le-systeme-solaire.net/rest.php/bodies';
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
 * Function to get the object or objects info from the API
 * @param name - name of the object
 * @param filter - boolean to apply the search url
 * @returns - object of type SolarSystemApiData
 */
async function searchObject(name:string | undefined, filter: boolean): Promise<object> {
	if (!name) {return {} }
	
	let url = `${base_url}/${name}`

	if (filter) {
		url = `${base_url}?filter[]=id,cs,${name}`
	}
	
	const response = await fetch(url);
	return (await response.json()) as SolarSystemApiData;
}

/**
 * Fetches and displays information about a Solar System object on the Stream Deck.
 * @param action - The Stream Deck key action instance.
 * @param settings - The settings for the Solar System object.
 * @param search - (Optional) Possible Solar system object to find
 * @returns A promise that resolves when the operation is complete.
 */
async function getSolarSystemObject(action: DialAction | KeyAction, settings: SolarObjectSettings, search: string| undefined = undefined): Promise<getSolarSystemObjectType | object | undefined> {
	try {		
		let showDataInfo = {}

		if (typeof settings.count !== "number") {
			settings.count = 0;
		}

		if (search) {
			/** Response from the solar system API containing an array of celestial bodies */
			const options = await searchObject(settings.search_object, true) as BodiesType
			settings.search_results = options.bodies

			if (options?.bodies.length) {
				const selectorOptions = options.bodies.map((option: OptionSelectorType) => {
					return {
						label: option.englishName,
						value: option.englishName
					}})

				settings.options = selectorOptions
			}
		} else if (!settings.data?.englishName) {
			settings.data = await searchObject(settings.name, false) as SolarSystemApiData
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
			await action.setSettings(settings as JsonObject);

			showDataInfo = {
				apiLabel: currentSetting.label,
				apiValue: settings.data[currentSetting.value as keyof SolarSystemApiData], 
				apiUnit: currentSetting.unit || ""
			}
		}

		await action.setSettings(settings as JsonObject);
		
		return showDataInfo
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

export { getSolarSystemObject, getSolarSystemObjectType, pressButtonCountManagement, SolarObjectSettings, showData };
