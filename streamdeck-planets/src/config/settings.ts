/* eslint-disable jsdoc/require-jsdoc */
const settings = [
	{ label: "Name", initial: true, value: "englishName", default: true },
	{ label: "Gravity", initial: true, value: "gravity", unit: "m/s²" },
	{ label: "Escape Speed", initial: true, value: "escape", unit: "m/s" },
	{ label: "Body type", initial: true, value: "bodyType" },
	{ label: "Perihelion", initial: false, value: "perihelion", unit: "Km" },
	{ label: "Aphelion", initial: false, value: "aphelion", unit: "Km" },
	{ label: "Eccentricity", initial: false, value: "eccentricity" },
	{ label: "Inclination", initial: false, value: "inclination", unit: "º" },
	{ label: "Density", initial: false, value: "density", unit: "g/cm3" },
	{ label: "Main Radius", initial: false, value: "meanRadius", unit: "Km" },
	{ label: "Equatorial Radius", initial: false, value: "equaRadius", unit: "Km" },
	{ label: "Polar Radius", initial: false, value: "polarRadius", unit: "Km" },
] as SettingsObject[];

type SettingsObject =
	| {
			default: boolean;
			initial: boolean;
			label: string;
			unit?: undefined;
			value: string;
	  }
	| {
			initial: boolean;
			label: string;
			value: string;
			default?: undefined;
			unit?: undefined;
	  }
	| {
			initial: boolean;
			label: string;
			value: string;
			unit: string;
			default?: undefined;
	  };

const getDefaultSettings = (): typeof settings => settings.filter((setting) => setting?.default);

export default { settings, getDefaultSettings };
export type { SettingsObject };
