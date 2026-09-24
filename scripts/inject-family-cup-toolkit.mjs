import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = "title: 'Family Cup Activity Toolkit'";

const resource = `
  {
    type: 'Toolkit',
    topics: ['Toolkits & Templates'],
    title: 'Family Cup Activity Toolkit',
    description: 'A practical Home & Heart toolkit with Family Cup scoring and safety guidance plus 12 activity station concepts focused on teamwork, communication, coordination and positive family participation.',
    audiences: ['Families', 'Coaches', 'Organisations', 'Municipalities'],
    resourceType: 'Document',
    language: 'English',
    file: '/resources/family-cup-activity-toolkit.pdf',
    image: '/visuals/home-heart-logo.png',
    downloadName: 'Family Cup Activity Toolkit.pdf',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Family Cup Activity Toolkit is already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${resource}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added Family Cup Activity Toolkit to the Resource Library.');
