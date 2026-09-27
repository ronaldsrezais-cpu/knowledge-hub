import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);

const resources = [
  {
    marker: "title: 'Beyond Medals: How Sports Help Childrens Grow | Vairāk nekā medaļas | Home & Heart Knowledge Hub'",
    block: `
  {
    type: 'Video',
    topics: ['Toolkits & Templates'],
    title: 'Beyond Medals: How Sports Help Childrens Grow | Vairāk nekā medaļas | Home & Heart Knowledge Hub',
    description: 'A Home & Heart educational video exploring how sport can support children’s growth and development beyond competition and medals. After watching, viewers can complete an optional 12-question knowledge assessment on inclusive sports, where some questions may have more than one correct answer.',
    audiences: ['Families', 'Coaches'],
    resourceType: 'Video',
    language: 'English / Latvian',
    file: 'https://www.youtube.com/watch?v=OHKWJLcaxqw',
    image: 'https://img.youtube.com/vi/OHKWJLcaxqw/hqdefault.jpg',
    quizLink: 'https://forms.gle/bpQ66Deafpyvnoqy8',
  },
`
  },
  {
    marker: "title: 'Developing Healthy Eating Habits | Veselīgs uzturs | Home & Heart Knowledge Hub'",
    block: `
  {
    type: 'Video',
    topics: ['Toolkits & Templates'],
    title: 'Developing Healthy Eating Habits | Veselīgs uzturs | Home & Heart Knowledge Hub',
    description: 'A Home & Heart educational video on building healthy eating habits for families. After watching, viewers can complete an optional 19-question knowledge assessment on healthy eating habits, where some questions may have more than one correct answer.',
    audiences: ['Families', 'Coaches'],
    resourceType: 'Video',
    language: 'English / Latvian',
    file: 'https://www.youtube.com/watch?v=4n_Ve5mqdX8',
    image: 'https://img.youtube.com/vi/4n_Ve5mqdX8/hqdefault.jpg',
    quizLink: 'https://forms.gle/NB2Qe4GVPNjgQYtK6',
  },
`
  },
];

let source = await readFile(pagePath, 'utf8');
const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

for (const resource of resources) {
  if (source.includes(resource.marker)) {
    console.log('Resource is already present: ' + resource.marker);
    continue;
  }

  const arrayEnd = source.indexOf('\n];', arrayStart);
  if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

  source = `${source.slice(0, arrayEnd)}\n${resource.block}${source.slice(arrayEnd)}`;
}

await writeFile(pagePath, source, 'utf8');
console.log('Added the two Home & Heart educational videos and quizzes to the Resource Library.');
