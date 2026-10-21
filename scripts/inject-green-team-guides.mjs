import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);

const resources = [
  {
    title: 'Guide for Administrations – Sustainable and Inclusive Sports Events (Green Team)',
    block: `
  {
    type: 'Guide',
    topics: ['Event organisation', 'Toolkits & Templates', 'Policy & Advocacy'],
    title: 'Guide for Administrations – Sustainable and Inclusive Sports Events (Green Team)',
    description: 'A Green Team guide for municipalities and public administrations on supporting sustainable, inclusive sport events, covering accessible venues, green mobility, waste, procurement, community participation, and impact monitoring.',
    audiences: ['Organisations', 'Municipalities', 'Policymakers'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://greenteam.ufec.cat/wp-content/uploads/2025/09/D4.1-Guide-for-administrations-1.pdf',
    image: '/visuals/resource-covers/green-team-administrations.svg',
  },
`
  },
  {
    title: 'Guide for Participants – Sustainable and Inclusive Sports Events (Green Team)',
    block: `
  {
    type: 'Guide',
    topics: ['Event organisation', 'Toolkits & Templates'],
    title: 'Guide for Participants – Sustainable and Inclusive Sports Events (Green Team)',
    description: 'A Green Team practical guide for participants, supporters and volunteers with simple steps before, during and after sport events: sustainable travel, reducing waste, accessibility, fair play, respect and positive local impact.',
    audiences: ['Families', 'Coaches', 'Organisations'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://greenteam.ufec.cat/wp-content/uploads/2025/09/D4.2-Guide-for-participants-1.pdf',
    image: '/visuals/resource-covers/green-team-participants.svg',
  },
`
  },
];

let source = await readFile(pagePath, 'utf8');
const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not locate the resourceItems array.');

for (const resource of resources) {
  if (source.includes(`title: '${resource.title}'`)) {
    console.log(`Already included: ${resource.title}`);
    continue;
  }

  const arrayEnd = source.indexOf('\n];', arrayStart);
  if (arrayEnd === -1) throw new Error('Could not locate the resourceItems array end.');

  source = `${source.slice(0, arrayEnd)}\n${resource.block}${source.slice(arrayEnd)}`;
  console.log(`Added: ${resource.title}`);
}

await writeFile(pagePath, source, 'utf8');
