import streamDeck, { action, DidReceiveSettingsEvent, KeyDownEvent, WillAppearEvent } from "@elgato/streamdeck";

import config from "../config/settings";
import { getSolarSystemObject, showData } from "../utils/solar-system-utils";
import { getSolarSystemObjectType, SolarObjectSettings, SolarSystemApiData } from "../utils/types";
import { ObjectInfo } from "./object-info";

let solarObjectType: string = "";

/**
 * Stream Deck action for displaying information about Custom Solar System object.
 * Handles button appearance and key press events to fetch Custom Solar System object data.
 */
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.custom" })
export class CustomInfo extends ObjectInfo {
	/**
	 * Handles when a setting changes in the UI
	 * @param ev The event received when settings in UI change
	 */
	public override async onDidReceiveSettings(ev: DidReceiveSettingsEvent): Promise<void> {
		let { settings } = ev.payload;

		if (settings.launch_search) {
			(await getSolarSystemObject(
				ev.action,
				settings as SolarObjectSettings,
				settings.search_object as string,
			)) as getSolarSystemObjectType;
			settings = ev.payload.settings;

			streamDeck.ui.current?.sendToPropertyInspector({
				event: "getObjectOptions",
				items: settings.options,
			});

			delete settings.launch_search;
		}

		if (settings.selectedObject && Array.isArray(settings?.search_results)) {
			const name = settings.selectedObject;
			let data = settings.data as SolarSystemApiData;

			if (!this.previousObject || this.previousObject !== name) {
				data = settings?.search_results?.find(
					(body) => typeof body === "object" && body !== null && "englishName" in body && body.englishName === name,
				) as SolarSystemApiData;

				this.previousObject = name as string;
				if (data && data?.bodyType) {
					solarObjectType = data?.bodyType as string;
				}

				this.setObjectPluginInfo(name as string, solarObjectType);
				this.resetShowData();

				const imageInfo = config.getIconSettings(name as string, solarObjectType);

				settings.data = { ...data };
				settings.iconSettings = imageInfo[0].value;
				this.scroller.text = name as string;

				showData("Name", name as string, "", ev.action, this.scroller);
			}
		}

		if (settings.iconSettings) {
			this.updateIconSetting(ev.action, settings.iconSettings as string);
		}
		
		await ev.action.setSettings(settings);
	}

	/**
	 * Handles the key down event for the Custom Solar System object action.
	 * Sets the name to "Custom Solar System object" and fetches Custom Solar System object data.
	 * @param ev The event payload for the key down event.
	 */
	public override async onKeyDown(ev: KeyDownEvent<SolarObjectSettings>): Promise<void> {
		this.resetShowData();

		if (ev.payload.settings.iconSettings) {
			this.updateIconSetting(ev.action, ev.payload.settings.iconSettings);
		}

		await this.getInfoAction(ev, ev.payload.settings.name);
	}

	/**
	 * Handles the send to plugin event for the Custom Solar System object action.
	 */
	public override onSendToPlugin(): void {
		if (this.previousObject) {
			this.setObjectPluginInfo(this.previousObject, solarObjectType);
		}
	}

	/**
	 * Sets the configuration when the plugin is shown in the device
	 * @param ev The event payload for the will appear event.
	 */
	public override onWillAppear(ev: WillAppearEvent<SolarObjectSettings>): void {
		if (ev.payload.settings.selectedObject) {
			const objectName = ev.payload.settings.selectedObject as string;
			this.setDefaultSettings(ev, objectName);
			this.scroller.text = objectName;
			this.scroller.startScroll(300, ev.action);
		}
	}
}
