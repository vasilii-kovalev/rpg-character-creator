# TODO

- Investigate [TypeScript#58657](https://github.com/microsoft/TypeScript/issues/58657) and [TypeScript#56279](https://github.com/microsoft/TypeScript/issues/56279).
- Investigate TypeScript build-mode watch (`tsc --build --watch`) with project references. One watch started for an application also watches the composite projects that application depends on and rebuilds those packages when their source changes. Plain `tsc --watch`, without `--build`, does not.
