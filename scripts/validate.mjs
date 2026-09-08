import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));
const feed = JSON.parse(await readFile(new URL(`../${manifest.releaseFeed}`, import.meta.url), 'utf8'));

const fail = (message) => {
  console.error(`release feed validation failed: ${message}`);
  process.exit(1);
};

if (manifest.schemaVersion !== feed.schemaVersion) {
  fail(`schemaVersion mismatch (${manifest.schemaVersion} vs ${feed.schemaVersion})`);
}

const ids = new Set();
const publishedVersions = new Set();
const tags = new Set();

for (const release of feed.releases) {
  if (ids.has(release.id)) fail(`duplicate release id ${release.id}`);
  ids.add(release.id);

  if (release.publishedBuild) {
    if (publishedVersions.has(release.publishedBuild)) fail(`duplicate published version ${release.publishedBuild}`);
    publishedVersions.add(release.publishedBuild);

    if (!release.javascript) fail(`${release.publishedBuild} is missing javascript metadata`);
    if (release.javascript.version !== release.publishedBuild) {
      fail(`${release.id} publishedBuild and javascript.version differ`);
    }
    if (tags.has(release.javascript.tag)) fail(`duplicate JavaScript tag ${release.javascript.tag}`);
    tags.add(release.javascript.tag);
  } else if (release.javascript || release.publishedAt) {
    fail(`${release.id} has published metadata without publishedBuild`);
  }
}

if (!publishedVersions.has(manifest.current)) {
  fail(`current release ${manifest.current} is not present in releases.json`);
}

if (!publishedVersions.has(manifest.announcement.release)) {
  fail(`announcement release ${manifest.announcement.release} is not present in releases.json`);
}

const packageKeys = new Set();
for (const pkg of feed.currentPackages) {
  const key = `${pkg.ecosystem}:${pkg.artifact}`;
  if (packageKeys.has(key)) fail(`duplicate package ${key}`);
  packageKeys.add(key);
}

console.log(`Validated ${feed.releases.length} release entries and ${feed.currentPackages.length} current packages.`);
