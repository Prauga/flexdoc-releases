# FlexDoc releases

Public release metadata for FlexDoc.

The FlexDoc website reads this repository at runtime so release notes and announcements can be updated independently of a website deployment.

## Files

- `manifest.json` — current release, announcement state, and the release-feed path.
- `releases.json` — public release history, published JavaScript versions, and the current package matrix.
- `schema/*.schema.json` — JSON Schema contracts for the feed.
- `scripts/validate.mjs` — cross-file consistency checks.

## Updating a release

1. Add or update the entry in `releases.json`.
2. Update `manifest.json` when the current release changes.
3. Enable or disable the optional announcement explicitly in `manifest.json`.
4. Open a PR. Validation must pass before merging.

The announcement is editorial, not automatic: a new patch can be published without showing a site-wide banner.

Do not add internal PR/commit bookkeeping to public release notes. Keep the copy concise and useful to people using FlexDoc.
