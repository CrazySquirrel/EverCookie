/**
 * The ILocalStorage interface
 */
interface ILocalStorage {
    /**
     * Storage length
     */
    length: number;
    /**
     * Get key by number from storage
     * @param key
     */
    key(key: number): string;
    /**
     * Set item in storage
     * @param key
     * @param value
     */
    setItem(key: string, value: string): void;
    /**
     * Get item from storage
     * @param key
     */
    getItem(key: string): string;
    /**
     * Remove item from storage
     * @param key
     */
    removeItem(key: string): void;
}
/**
 * Export the ILocalStorage interface
 */
export default ILocalStorage;
