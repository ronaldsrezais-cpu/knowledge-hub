import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = 'Home & Heart Best Practice | #10 You Just Need To Start With One Activity Together';

const videos = `
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #10 You Just Need To Start With One Activity Together',
    description: 'A Home & Heart best-practice story encouraging families to begin with one shared activity and build an active routine together.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=rr8WJER1xnA',
    image: 'https://img.youtube.com/vi/rr8WJER1xnA/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #9 You Just Need To Start With One Activity Together',
    description: 'A family-focused best-practice story showing how one simple shared activity can be the first step towards being more active together.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=zXdEzzrZgog',
    image: 'https://img.youtube.com/vi/zXdEzzrZgog/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #8 Motivate Each Other To Be Active',
    description: 'A Home & Heart family story about encouraging and motivating one another to make physical activity a positive shared experience.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=XEzwxVVhEqM',
    image: 'https://img.youtube.com/vi/XEzwxVVhEqM/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #7 Being Active Is Accessible To Everyone',
    description: 'A Home & Heart best-practice story highlighting that family physical activity can be accessible and adapted so everyone can take part.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=JjiiSrhbSjo',
    image: 'https://img.youtube.com/vi/JjiiSrhbSjo/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #6 Be Active On The Weekends',
    description: 'A family best-practice story with inspiration for using weekends as an opportunity to spend active time together.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=sy7qNGghhwo',
    image: 'https://img.youtube.com/vi/sy7qNGghhwo/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #5 Be Active On The Weekend',
    description: 'A Home & Heart family story encouraging simple and enjoyable ways to include more movement in weekend routines.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=leENoxXEd9s',
    image: 'https://img.youtube.com/vi/leENoxXEd9s/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #4 Make A Plan To Be Active',
    description: 'A practical family best-practice story about planning active time in advance so movement becomes easier to include in everyday life.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=ncyRinTtTt8',
    image: 'https://img.youtube.com/vi/ncyRinTtTt8/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #3 How To Be Active As A Family',
    description: 'A Home & Heart best-practice story sharing ideas and motivation for making physical activity something the whole family can enjoy together.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=R9pKsEYsxzQ',
    image: 'https://img.youtube.com/vi/R9pKsEYsxzQ/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #2 Being Active Has No Borders',
    description: 'A Home & Heart family story showing that active lifestyles and shared movement can connect families across different places and backgrounds.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=6JloAmVVKg0',
    image: 'https://img.youtube.com/vi/6JloAmVVKg0/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities'],
    title: 'Home & Heart Best Practice | #1 Moving Together',
    description: 'The first Home & Heart best-practice story, introducing the value of moving together and enjoying physical activity as a family.',
    audiences: ['Families'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://www.youtube.com/watch?v=n2uuAhQhXz8',
    image: 'https://img.youtube.com/vi/n2uuAhQhXz8/hqdefault.jpg',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Home & Heart resource videos are already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${videos}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added 10 Home & Heart best-practice videos to the Resource Library.');
