type CacheEntry<T> = {
    createdAt: number;
    val: T
}

class Cache { 
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntevalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval:number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap() {
        for (let [key, val] of this.#cache) {
            const diff = Date.now() - this.#interval
            if(val.createdAt < diff) {
                console.log('removed %s', key)
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop() {
        this.#reapIntevalId ??= setInterval(this.#reap.bind(this), this.#interval)
    }

    stopReapLoop() {
        clearInterval(this.#reapIntevalId)
        this.#reapIntevalId = undefined
    }

    add<T>(key:string, val:T):void {
        if (!this.#cache.has(key)) {
            this.#cache.set(key, val as CacheEntry<T>)
        }
    }

    get<T>(key:string) {
        return this.#cache.get(key) || undefined
    }


}


export { Cache, CacheEntry }