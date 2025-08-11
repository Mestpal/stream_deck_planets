import { KeyAction } from "@elgato/streamdeck";

/**
 * Class to create an object that manage the scrolling of a text
 */
export class TextScroller {
	/**
	 * text to scroll
	 */
	public text: string;
	/**
	 * Timer Id
	 */
	private intervalId?: NodeJS.Timeout;
	/**
	 * position to start to generate the visible text in the scroll
	 */
	private position: number = 0;
	/**
	 * Size of the text to scroll
	 */
	private windowSize: number;

	/**
	 * Creates a new TextScroller instance
	 * @param text The text to scroll through
	 * @param windowSize The size of the visible text window
	 */
	constructor(text: string, windowSize: number) {
		this.text = text;
		this.windowSize = windowSize;
	}

	/**
	 * Function to start scrolling the text
	 * @param speedMs speed of the scroll in ms
	 * @param action streamdeck Keyaction
	 */
	public startScroll(speedMs: number = 200, action: KeyAction): void {        
		if (this.text.length <= this.windowSize) {
			action.setTitle(this.text)
		} else {
			this.intervalId = setInterval(() => {
				const visibleText = this.getVisibleText();
				action.setTitle(visibleText); 
				this.position = (this.position + 1) % this.text.length;
			}, speedMs);
		}
	}

	/**
	 * Function to stop scrolling text
	 */
	public stopScroll(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.position = 0
	}

	/**
	 * Function to generate the text to show in each moment of the scroll
	 * of the text
	 * @returns a string with the portion of text to show
	 */
	private getVisibleText(): string {
		const end = this.position + this.windowSize;
		if (end <= this.text.length) {
			return this.text.slice(this.position, end);
		} else {
			const firstPart = this.text.slice(this.position);
			const secondPart = this.text.slice(0, end % this.text.length);
			return firstPart + secondPart;
		}
	}
}
