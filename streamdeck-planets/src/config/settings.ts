/* eslint-disable jsdoc/require-jsdoc */
const settings = [
	{label: 'Name', value: 'englishName', default: true},
	{label: 'Gravity', value: 'gravity', unit: 'm/s²'},
	{label: 'Escape Speed', value: 'escape', unit: 'm/s'},
	{label: 'Body type', value: 'bodyType'},
	{label: 'Perihelion', value: 'perihelion', unit: 'Km'},
	{label: 'Aphelion', value: 'aphelion', unit: 'Km'},
] as SettingsObject[];

type SettingsObject = ({ 
    default: boolean; 
    label: string; 
    unit?: undefined; 
    value: string; 
} | { 
    label: string; 
    value: string; 
    default?: undefined; 
    unit?: undefined; 
} | { 
    label: string; 
    value: string; 
    unit: string; 
    default?: undefined; 
})

const getDefaultSettings = ():typeof settings => settings.filter(setting => setting?.default)


export default { settings, getDefaultSettings}
export type {SettingsObject}
