import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = 'Water Safety | Drošība pie ūdens | Home & Heart Knowledge Hub';

const video = `
  {
    type: 'Video',
    topics: ['Toolkits & Templates'],
    title: 'Water Safety | Drošība pie ūdens | Home & Heart Knowledge Hub',
    description: 'A Home & Heart Knowledge Hub video on water safety for families and coaches, supporting safer behaviour and greater awareness in and around water. After watching, you can also test your knowledge with an optional 25-question water-safety quiz.',
    audiences: ['Families', 'Coaches'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=VNUlGEVKjtI',
    image: 'https://img.youtube.com/vi/VNUlGEVKjtI/hqdefault.jpg',
    quizLink: 'https://forms.gle/krekRi8VfepGibZB8',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Water Safety resource video is already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${video}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added Water Safety video and quiz link to the Resource Library.');
