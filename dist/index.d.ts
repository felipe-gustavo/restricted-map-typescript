type GetMapMethod<T> = T extends readonly [
    readonly [infer K, infer V],
    ...infer Remain
] ? ((key: K) => V) & GetMapMethod<Readonly<Remain>> : unknown;
type ValueForEachParams<T> = T extends ReadonlyArray<readonly [unknown, unknown]> ? T extends readonly [readonly [unknown, infer V], ...infer Remain] ? [value: V] | ValueForEachParams<Readonly<Remain>> : never : never;
type KeyValueForEachParams<T> = T extends ReadonlyArray<readonly [unknown, unknown]> ? T extends readonly [readonly [infer K, infer V], ...infer Remain] ? [value: V, key: K] | KeyValueForEachParams<Readonly<Remain>> : never : never;
type AllForEachParams<M extends ReadonlyArray<readonly [unknown, unknown]>, T> = T extends ReadonlyArray<readonly [unknown, unknown]> ? T extends readonly [readonly [infer K, infer V], ...infer Remain] ? [value: V, key: K, map: RestrictedMapInterface<M>] | AllForEachParams<M, Readonly<Remain>> : never : never;
type RestrictedMapKeyType<T> = T extends readonly [
    readonly [infer K, unknown],
    ...infer Remain
] ? K | RestrictedMapKeyType<Readonly<Remain>> : never;
type RestrictedMapValueType<T> = T extends readonly [
    readonly [unknown, infer V],
    ...infer Remain
] ? V | RestrictedMapValueType<Readonly<Remain>> : never;
type RestrictedMapIteratorParam<T> = T extends readonly [
    readonly [infer K, infer V],
    ...infer Remain
] ? [K, V] | RestrictedMapIteratorParam<Readonly<Remain>> : never;
interface RestrictedMapConstructor {
    new <T extends ReadonlyArray<readonly [unknown, unknown]>>(entries: T): RestrictedMapInterface<T>;
    readonly prototype: RestrictedMapInterface<readonly [unknown, unknown][]>;
}
interface RestrictedMapInterface<T extends ReadonlyArray<readonly [unknown, unknown]>> {
    forEach(callback: (...args: AllForEachParams<T, T>) => void, thisArg?: any): void;
    forEach(callback: (...args: KeyValueForEachParams<T>) => void, thisArg?: any): void;
    forEach(callback: (...args: ValueForEachParams<T>) => void, thisArg?: any): void;
    forEach(callback: () => void, thisArg?: any): void;
    get: GetMapMethod<T>;
    has(key: unknown): boolean;
    readonly size: number;
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): MapIterator<RestrictedMapIteratorParam<T>>;
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): MapIterator<RestrictedMapIteratorParam<T>>;
    /**
     * Returns an iterable of keys in the map
     */
    keys(): MapIterator<RestrictedMapKeyType<T>>;
    /**
     * Returns an iterable of values in the map
     */
    values(): MapIterator<RestrictedMapValueType<T>>;
}
export declare const RestrictedMap: RestrictedMapConstructor;
export {};
