# FlexDoc releases

Public release metadata for FlexDoc.

The FlexDoc website reads this repository at runtime so release notes and announcements can be updated independently of a website deployment.

## Files

- `manifest.json` — current release, announcement state, and release index.
- `releases/*.json` — customer-facing release notes and download/package metadata.
- `schema/*.schema.json` — JSON Schema contracts for the feed.

## Updating a release

1. Add or update the release JSON under `releases/`.
2. Update `manifest.json`.
3. Enable or disable the optional announcement explicitly in `manifest.json`.
4. Open a PR. Validation must pass before merging.

Do not add internal PR/commit bookkeeping to public release notes. Keep the copy concise and useful to people using FlexDoc.
