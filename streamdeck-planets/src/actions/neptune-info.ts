import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import {getSolarSystemObject} from "../utils/solar-system-utils"
@action({ UUID: "com.manuel-estvez-palencia.streamdeck-planets.neptune" })
export class NeptuneInfo extends SingletonAction<NeptuneSettings> {

  override onWillAppear(ev: WillAppearEvent<NeptuneSettings>): Promise<void> {
    return ev.action.setTitle('Neptune');
  }

  override async onKeyDown(ev: KeyDownEvent<NeptuneSettings>): Promise<void> {
    const { settings } = ev.payload;
    settings.name = 'Neptune'

    await getSolarSystemObject(settings.name, ev.action, settings);
  }
}

type NeptuneSettings = {
  count?: number;
  data?: any;
  name?: string
}