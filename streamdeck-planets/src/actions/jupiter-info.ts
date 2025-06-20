import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.jupiter" })
export class JupiterInfo extends SingletonAction<JupiterSettings> {

  override onWillAppear(ev: WillAppearEvent<JupiterSettings>): Promise<void> {
    return ev.action.setTitle('Jupiter');
  }

  override async onKeyDown(ev: KeyDownEvent<JupiterSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Jupiter'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type JupiterSettings = {
  count?: number;
  data?: any;
  name?: string
}