import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = "title: 'A Playbook from Let’s Play Together'";

const resource = `
  {
    type: 'Playbook',
    topics: ['Activities', 'Toolkits & Templates', 'Policy & Advocacy'],
    title: 'A Playbook from Let’s Play Together',
    description: 'A V4SPORT Foundation playbook based on 1,001 free neighbourhood sport sessions for Polish and Ukrainian children in Wrocław. Explains the Polish–Ukrainian tandem coaching model, trauma-informed practice, safeguarding, session ideas and how other communities can adapt the approach.',
    audiences: ['Coaches', 'Organisations', 'Municipalities', 'Policymakers'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://letsplaytogether.v4sport.eu/wp-content/uploads/2026/08/Lets-Play-Together_PLAYBOOK_ENG.pdf',
    image: '/visuals/resource-covers/lets-play-together-playbook.svg',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Let’s Play Together Playbook already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${resource}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added V4SPORT Let’s Play Together playbook to Resource Library.');
