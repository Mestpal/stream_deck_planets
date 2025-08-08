import { KeyAction } from "@elgato/streamdeck";

/**
 *
 */
export class TextScroller {
	/**
	 *
	 */
	public text: string;
	/**
	 *
	 */
	private intervalId?: NodeJS.Timeout;
	/**
	 *
	 */
	private position: number = 0;
	/**
	 *
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
	 *
	 * @param speedMs
	 * @param action
	 */
	public startScroll(speedMs: number = 200, action: KeyAction): void {        
		if (this.text.length <= this.windowSize) {
			action.setTitle(this.text)
		} else {
			this.text += "   "
			this.intervalId = setInterval(() => {
				const visibleText = this.getVisibleText();
				action.setTitle(visibleText); 
				this.position = (this.position + 1) % this.text.length;
			}, speedMs);
		}
	}

	/**
	 *
	 */
	public stopScroll(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.position = 0
	}

	/**
	 *
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
