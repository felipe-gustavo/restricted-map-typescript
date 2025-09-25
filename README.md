# Restricted Map Typescript Extension

This is an enhanced TypeScript extension that provides a way to create `Map`s with restricted key and value types.

---

# Why Use This Extension?

When working with `Map`s in TypeScript, you might want to restrict the keys and values to specific types. This can be achieved by creating a custom map type that enforces these restrictions.

using this extension you can correctly infer the types of keys and values in a `Map`, providing better type safety and autocompletion in your IDE.

# When Should I Use This Extension?

> **This extension should only be used when you have a fully controlled environment where you can guarantee the identity and equality of your map keys at runtime.**

JavaScript's `Map` uses [`sameValueZero`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#same-value-zero_equality) for key equality, which means that two different objects or functions—even if they have the same structure or implementation—are not considered equal as keys. TypeScript's type system is static and cannot enforce or check key identity at runtime. This can lead to situations where TypeScript infers that a value will always be present for a given key, but at runtime, the lookup may return `undefined` if the key instance is not the exact same object reference.

For example:
```ts
const foo = () => true

const MAP = new Map<unknown, string>([
  [foo, 'foo']
])

function getValueFromMap(value: typeof foo): string
function getValueFromMap(value: unknown): undefined
function getValueFromMap(value: unknown): undefined | string {
  return MAP.get(value)
}

const bar = () => true

const valueFromMap = getValueFromMap(bar) // TypeScript thinks this is 'string', but it's actually undefined
```
In the example above, `foo` and `bar` are different function instances, so `MAP.get(bar)` returns `undefined` even though TypeScript infers the return type as `string`.

**Therefore, only use this extension if:**
- You have full control over the creation and usage of map keys (e.g., using primitive values or unique symbols).
- You can guarantee that the same key instance will be used for both setting and getting values.
- You understand that TypeScript's type inference does not account for JavaScript's runtime key equality.

If you cannot guarantee these conditions (for example, if keys are dynamically created objects or functions), this extension may give you a false sense of type safety and should be avoided.

---

## Creating a Restricted Map Type

You can create a restricted map type by using the class `RestrictedMap` provided by this extension module.

```typescript
import { RestrictedMap } from 'restricted-map-typescript'

const RESTRICTED_MAP = new RestrictedMap([
  ['foo', 'foo'],
  ['bar', 1],
] as const)

RESTRICTED_MAP.set('baz', true) // Throws an error, restricted map does not have `set` method
const foo = RESTRICTED_MAP.get('foo') // foo is of type 'foo'
const bar = RESTRICTED_MAP.get('bar') // bar is of type 1

RESTRICTED_MAP.forEach((value, key) => {
  if (key === 'foo') {
    value.toUpperCase()
    // value is of type 'foo'
    return
  }
  value.toExponential(2)
  // value is of type 1
})
```

## Contributing

### Installing Dependencies

This package works under [`yarn@4`](https://yarnpkg.com/getting-started/install).

### Changelog

All notable changes to this project will be documented in `CHANGELOG.md`.

### Repository Structure

This is a TypeScript declared module, so the main file is `src/index.ts`.

There is no need to test this package, as it is a simple type declaration.

### How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your changes to your fork.
5. Create a pull request to the main repository.
6. Ensure builds pass for new features or bug fixes.
7. Your pull request will be reviewed and merged if approved.
