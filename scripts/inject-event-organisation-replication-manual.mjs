import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = "title: 'Event Organisation and Replication Manual'";

const resource = `
  {
    type: 'Manual',
    topics: ['Toolkits & Templates'],
    title: 'Event Organisation and Replication Manual',
    description: 'A practical Home & Heart guide for organisations and municipalities planning family-centred sport events, covering event planning, coordination, participant recruitment, programme design, inclusion, safety, communication, monitoring, replication and reusable organiser templates.',
    audiences: ['Organisations', 'Municipalities'],
    resourceType: 'Document',
    language: 'English',
    file: '/resources/event-organisation-replication-manual.pdf',
    image: '/visuals/resource-covers/event-organisation-replication-manual.png',
    downloadName: 'Event Organisation and Replication Manual.pdf',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Event Organisation and Replication Manual is already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${resource}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added Event Organisation and Replication Manual to the Resource Library.');
