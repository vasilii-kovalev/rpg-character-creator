# Dependency security audit

Open `npm audit` findings that start from a direct dependency in `package.json`. Each `Fix` line is the condition for deleting the related override, or for the finding to clear when there is nothing to delete. Each `Track` line is the issue, pull request, or commit to recheck.

## Replacements

- `cspell-check-unused-words`
  - A release on `cspell` 10.4.0: removes the second CSpell tree of 26 to 28 packages. Version 1.6.3 still pins 10.0.1.
