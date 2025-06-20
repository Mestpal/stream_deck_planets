import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { MercuryInfo } from "./actions/mercury-info";
import { VenusInfo } from "./actions/venus-info";
import { EarthInfo } from "./actions/earth-info";
import { MarsInfo } from "./actions/mars-info";
import { JupiterInfo } from "./actions/jupiter-info";
import { SaturnInfo } from "./actions/saturn-info";
import { UranusInfo } from "./actions/uranus-info";
import { NeptuneInfo } from "./actions/neptune-info";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register the increment action.
streamDeck.actions.registerAction(new MercuryInfo());
streamDeck.actions.registerAction(new VenusInfo());
streamDeck.actions.registerAction(new EarthInfo());
streamDeck.actions.registerAction(new MarsInfo());
streamDeck.actions.registerAction(new JupiterInfo());
streamDeck.actions.registerAction(new SaturnInfo());
streamDeck.actions.registerAction(new UranusInfo());
streamDeck.actions.registerAction(new NeptuneInfo());

// Finally, connect to the Stream Deck.
streamDeck.connect();
