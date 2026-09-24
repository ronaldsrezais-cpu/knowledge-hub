import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = "title: 'Movement As a Part of Everyday Life | Kustība kā ikdienas sastāvdaļa | Home & Heart Knowledge Hub'";

const resource = `
  {
    type: 'Video',
    topics: ['Toolkits & Templates'],
    title: 'Movement As a Part of Everyday Life | Kustība kā ikdienas sastāvdaļa | Home & Heart Knowledge Hub',
    description: 'A Home & Heart educational video with practical guidance for families on making movement part of everyday life, including appropriate activity levels, regularity, variety, recovery and simple ways to explore balance, strength, flexibility and agility. After watching, viewers can also complete a short 7-question safe-movement quiz.',
    audiences: ['Families', 'Coaches'],
    resourceType: 'Video',
    language: 'English / Latvian',
    file: 'https://www.youtube.com/watch?v=8gfVQ4cIrx8',
    image: 'https://img.youtube.com/vi/8gfVQ4cIrx8/hqdefault.jpg',
    quizLink: 'https://forms.gle/JNpHnChTyfzfNqAZA',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Safe Movement video resource is already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${resource}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added Safe Movement video and quiz to the Resource Library.');
