import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = "title: 'Fair Sports | Patiess sports | Home & Heart Knowledge Hub'";

const resource = `
  {
    type: 'Video',
    topics: ['Toolkits & Templates'],
    title: 'Fair Sports | Patiess sports | Home & Heart Knowledge Hub',
    description: 'A Home & Heart educational video on safe and fair sport. After watching, viewers can complete an optional 15-question knowledge assessment on safe and fair sports, with one correct answer per question.',
    audiences: ['Families', 'Coaches'],
    resourceType: 'Video',
    language: 'English / Latvian',
    file: 'https://www.youtube.com/watch?v=u6Qf25qXCxw',
    image: 'https://img.youtube.com/vi/u6Qf25qXCxw/hqdefault.jpg',
    quizLink: 'https://forms.gle/SwxuWQ7bwMjS4GXj9',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Fair Sports video resource is already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${resource}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added Fair Sports video and quiz to the Resource Library.');
