/**
 * Creates a timeout wrapped in a promise that resolves after a given `duration`.
 * @param duration Duration in milliseconds
 * @returns Promise that resolves after duration
 */
export const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

/**
 * Creates a timeout wrapped in a promise that resolves after a random duration between `minDuration` and `maxDuration`.
 * @param minDuration Minimum duration in milliseconds
 * @param maxDuration Maximum duration in milliseconds
 * @returns Promise that resolves after duration
 */
export const randomDelay = (minDuration: number, maxDuration: number) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration));