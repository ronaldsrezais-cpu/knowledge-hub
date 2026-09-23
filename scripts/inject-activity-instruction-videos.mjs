import { readFile, writeFile } from 'node:fs/promises';

const pagePath = new URL('../app/page.tsx', import.meta.url);
const marker = '#1 Laser Biathlon | Home & Heart Activity Instruction';

const videos = `
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#1 Laser Biathlon | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video introducing Laser Biathlon as an engaging family activity suitable for community and event settings.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/dRE2QHnY_KA',
    image: 'https://img.youtube.com/vi/dRE2QHnY_KA/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#2 Ringo Flamingo | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video demonstrating Ringo Flamingo as a playful family activity that can be used at events and in community programmes.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/aAPfmWyRsrY',
    image: 'https://img.youtube.com/vi/aAPfmWyRsrY/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#3 Ball Path | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video showing the Ball Path activity for families, group sessions and community sport events.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/dbuULaTvhCQ',
    image: 'https://img.youtube.com/vi/dbuULaTvhCQ/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#4 Obstacle Course | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video presenting an obstacle-course activity that can be adapted for families and organised events.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/RGY-F1IpPhw',
    image: 'https://img.youtube.com/vi/RGY-F1IpPhw/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#5 Basketball Shots | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video demonstrating a basketball shooting challenge for families and event activity stations.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/As6qlNC1N68',
    image: 'https://img.youtube.com/vi/As6qlNC1N68/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#6 Ball Knockdown | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video demonstrating the Ball Knockdown challenge for family participation and sport event stations.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/RNtkN_qQRC8',
    image: 'https://img.youtube.com/vi/RNtkN_qQRC8/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#7 Ladder Golf | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video introducing Ladder Golf as a simple target activity for families and community events.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/kEJor1x7uqo',
    image: 'https://img.youtube.com/vi/kEJor1x7uqo/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#8 Duck Race | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video presenting the Duck Race activity as a fun family challenge for organised events and community programmes.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/dD9OJDt9cqQ',
    image: 'https://img.youtube.com/vi/dD9OJDt9cqQ/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#9 Recycling Game | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video demonstrating a Recycling Game that combines family participation, movement and an environmental theme.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/ymp-uC_6SEc',
    image: 'https://img.youtube.com/vi/ymp-uC_6SEc/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#10 Cube Puzzle | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video presenting the Cube Puzzle as a family-friendly activity combining movement, cooperation and problem solving.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/PPnE3IjZUbA',
    image: 'https://img.youtube.com/vi/PPnE3IjZUbA/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#11 Moving Spoons | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video demonstrating Moving Spoons as a playful coordination activity for families and event stations.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/jJgzJnqBqG8',
    image: 'https://img.youtube.com/vi/jJgzJnqBqG8/hqdefault.jpg',
  },
  {
    type: 'Video',
    topics: ['Activities', 'Event organisation'],
    title: '#12 Blow Challenge | Home & Heart Activity Instruction',
    description: 'A short Home & Heart activity instruction video presenting the Blow Challenge as a light and playful family activity for community and event settings.',
    audiences: ['Families', 'Organisations', 'Municipalities'],
    resourceType: 'Video',
    language: 'English',
    file: 'https://youtu.be/_OG2771_b2k',
    image: 'https://img.youtube.com/vi/_OG2771_b2k/hqdefault.jpg',
  },
`;

let source = await readFile(pagePath, 'utf8');

if (source.includes(marker)) {
  console.log('Home & Heart activity instruction videos are already present.');
  process.exit(0);
}

const arrayStart = source.indexOf('const resourceItems = [');
if (arrayStart === -1) throw new Error('Could not find resourceItems array.');

const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayEnd === -1) throw new Error('Could not find end of resourceItems array.');

source = `${source.slice(0, arrayEnd)}\n${videos}${source.slice(arrayEnd)}`;
await writeFile(pagePath, source, 'utf8');
console.log('Added 12 Home & Heart activity instruction videos to the Resource Library.');
