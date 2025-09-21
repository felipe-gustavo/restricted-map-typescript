# Restricted Map Typescript Extension

This is an enhanced TypeScript extension that provides a way to create `Map`s with restricted key and value types.

---

# Why Use This Extension?

When working with `Map`s in TypeScript, you might want to restrict the keys and values to specific types. This can be achieved by creating a custom map type that enforces these restrictions.

using this extension you can correctly infer the types of keys and values in a `Map`, providing better type safety and autocompletion in your IDE.

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
