
/**
 * Creates a timeout wrapped in a promise that resolves after a given `duration`.
 * @param duration Duration in milliseconds
 * @returns Void promise that resolves after duration
 */
export const delay = (duration: number) => new Promise<void>(resolve => setTimeout(resolve, duration));

/**
 * Creates a timeout wrapped in a promise that resolves after a random duration between `minDuration` and `maxDuration`.
 * @param minDuration Minimum duration in milliseconds
 * @param maxDuration Maximum duration in milliseconds
 * @returns Void promise that resolves after duration
 */
export const randomDelay = (minDuration: number, maxDuration: number) => new Promise<void>(resolve => setTimeout(resolve, Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration));

/**
 * Asserts/throws error if the provided item is undefined. Otherwise returns the provided item.
 * @param item Target item
 * @returns Target item
 */
export const required = <T>(item: T) => {
	if (item === undefined)
		throw new Error("Missing one or more required config items");
	return item;
};