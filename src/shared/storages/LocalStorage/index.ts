class LocalStorage {
    static getValue(key: string): string | null {
        return localStorage.getItem(key);
    }

    static delete(key: string) {
        localStorage.removeItem(key);
    }

    static set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    static clear() {
        localStorage.clear();
    }
}

export { LocalStorage };
