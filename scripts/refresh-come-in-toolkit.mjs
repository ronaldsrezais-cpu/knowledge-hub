import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
let source = await readFile(pagePath, 'utf8');

const title = 'COME IN – Inclusive Grassroots Sport Toolkit';
const oldStart = "\n  {\n    type: 'Toolkit',\n    topics: ['Activities', 'Toolkits & Templates'],\n    title: 'COME IN – Inclusive Grassroots Sport Toolkit',";
const found = source.indexOf(oldStart);

if (found !== -1) {
  const end = source.indexOf('\n  },', found);
  if (end === -1) throw new Error('Existing COME IN entry is not terminated correctly.');
  source = source.slice(0, found) + source.slice(end + '\n  },'.length);
}

const marker = "title: 'COME IN – Inclusive Grassroots Sport Toolkit'";
if (source.includes(marker)) {
  console.log('COME IN toolkit already refreshed.');
  process.exit(0);
}

const resource = `
  {
    type: 'Toolkit',
    topics: ['Activities', 'Toolkits & Templates', 'Policy & Advocacy'],
    title: 'COME IN – Inclusive Grassroots Sport Toolkit',
    description: 'An Erasmus+ COME IN toolkit for coaches, youth workers and grassroots organisations delivering inclusive sport for young people with and without disabilities. Includes the STEP adaptation model (Space, Time, Equipment, People), practical activities, pilot examples, accessibility barriers and communication tips.',
    audiences: ['Coaches', 'Organisations', 'Municipalities'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://ec.europa.eu/programmes/erasmus-plus/project-result-content/d4ea10e9-fbdd-47b6-8d01-672a3a8a43e0/COME-IN_tookit.pdf',
    image: '/visuals/resource-covers/come-in-inclusive-sport-toolkit.jpg',
  },
`;

const arrayStart = source.indexOf('const resourceItems = [');
const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayStart === -1 || arrayEnd === -1) throw new Error('Could not find resource array.');
source = source.slice(0, arrayEnd) + '\n' + resource + source.slice(arrayEnd);
await writeFile(pagePath, source, 'utf8');
console.log(`Refreshed ${title} without creating a duplicate.`);
