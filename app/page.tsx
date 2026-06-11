'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Filter,
  HeartHandshake,
  MapPin,
  MonitorPlay,
  PlayCircle,
  Radio,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Tent,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react';

const audienceOptions = ['All audiences', 'Families', 'Organisations', 'Municipalities', 'Policymakers', 'Coaches'];
const topicOptions = [
  'All topics',
  'Activities',
  'Toolkits & Templates',
  'Event organisation',
  'Policy & Advocacy',
];

const resourceItems = [
  {
    type: 'Policy note',
    topics: ['Policy & Advocacy'],
    title: 'Policy Note',
    description: 'Policy-oriented recommendations and evidence from the BeActive Beach Games model, supporting inclusive and active communities.',
    audiences: ['Policymakers', 'Municipalities'],
    file: '/resources/policy-note.pdf',
    Icon: FileText,
    tone: 'yellow',
  },
  {
    type: 'Guide',
    topics: ['Activities', 'Toolkits & Templates'],
    title: 'Physical Activity Guide',
    description: 'Practical beach sport and physical activity ideas that can be adapted for families, coaches and sport organisations.',
    audiences: ['Families', 'Coaches', 'Organisations'],
    file: '/resources/physical-activity-guide.pdf',
    Icon: Activity,
    tone: 'blue',
  },
  {
    type: 'Event guide',
    topics: ['Event organisation', 'Toolkits & Templates'],
    title: 'Event Organisation Guide',
    description: 'Step-by-step guidance for planning, coordinating, implementing and evaluating inclusive sport events.',
    audiences: ['Organisations', 'Municipalities'],
    file: '/resources/event-organisation-guide.pdf',
    Icon: ClipboardCheck,
    tone: 'green',
  },
  {
    type: 'Activity booklet',
    topics: ['Activities', 'Event organisation'],
    title: 'Family Activity Booklet',
    description: 'Ready-to-use family games, relays, station formats, scoring ideas and practical set-up guidance for schools, families and organisations.',
    audiences: ['Families', 'Coaches', 'Organisations'],
    file: '/resources/family-activity-booklet.pdf',
    Icon: HeartHandshake,
    tone: 'orange',
  },
];

function daysUntilFestival() {
  const eventDate = new Date('2026-08-22T00:00:00+03:00');
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

type ActivityInput = {
  members: string;
  people: string;
  location: string;
  duration: string;
  goal: string;
  equipment: string;
  accessibility: string;
  intensity: string;
};

type ActivityTemplate = {
  title: string;
  goals: string[];
  equipment: string[];
  locations: string[];
  summary: string;
  steps: string[];
  easier: string;
  harder: string;
  adaptation: string;
  safety: string;
};

const activityTemplates: ActivityTemplate[] = [
  {
    title: 'Rescue the Balls',
    goals: ['teamwork', 'energy', 'accuracy', 'event'],
    equipment: ['hula hoops or rope circles', 'mixed balls and markers', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    summary: 'Families use hoops or rope circles attached to strings to pull balls back over a safe line without stepping into the playing area.',
    steps: [
      'Mark a safe line and place different balls in the middle of the activity zone.',
      'Each family member holds a rope/hoop tool and tries to “rescue” one ball at a time.',
      'The team works together to pull balls across the line without entering the zone.',
      'After each rescued ball, rotate who gives directions and who attempts the next catch.',
      'Finish when all balls are rescued or when the time is over.',
    ],
    easier: 'Place the balls closer to the line and use larger hoops or lighter balls.',
    harder: 'Use balls of different sizes, add a centre bonus ball, or require families to rescue balls in a chosen order.',
    adaptation: 'For seated or wheelchair users, reduce the distance and allow one person to hold the rope while another gives directions.',
    safety: 'Keep enough space between teams so ropes cannot reach other participants and remind everyone not to step into the playing area.',
  },
  {
    title: 'Three-in-a-Row Relay',
    goals: ['strategy', 'teamwork', 'event', 'energy'],
    equipment: ['hula hoops or rope circles', 'cones or household objects', 'chalk or paper cards'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Small indoor space'],
    summary: 'A movement version of tic-tac-toe where teams run, walk or roll to place markers in a 3x3 grid and try to form a line.',
    steps: [
      'Create a 3x3 grid using hoops, chalk squares or paper circles.',
      'Give each team five markers in one colour.',
      'One player at a time moves to the grid and places one marker in an empty space.',
      'After all markers are placed, players may move one of their own markers on each turn.',
      'The first team to create a horizontal, vertical or diagonal line wins the round.',
    ],
    easier: 'Allow walking and discussion before each move.',
    harder: 'Add a time limit, memory rule, or require a different movement style on every turn.',
    adaptation: 'Use table-top cards instead of floor hoops for very low-mobility groups.',
    safety: 'Leave enough space between the start line and grid and avoid fast turns on slippery floors.',
  },
  {
    title: 'Noodle Football Golf',
    goals: ['accuracy', 'balance', 'energy', 'event'],
    equipment: ['pool noodles', 'a ball or balloon', 'cones or household objects'],
    locations: ['Park / outdoor space', 'School yard', 'Sports hall', 'Community event area'],
    summary: 'Families move a ball through a cone course using a pool noodle as a soft golf club and aim to finish in a goal.',
    steps: [
      'Set up a slalom course with cones and place a small goal or target at the end.',
      'Each participant gets one controlled hit with the pool noodle, then returns to the team.',
      'The next participant continues from where the ball stopped.',
      'If the ball misses a cone, the next player guides it back through the correct route.',
      'Record the time when the ball reaches the goal.',
    ],
    easier: 'Use fewer cones and a larger ball or goal.',
    harder: 'Use a smaller target, add a turn-back cone, or require alternating strong/weak side hits.',
    adaptation: 'Seated participants can hit from marked positions while teammates retrieve and reset the ball.',
    safety: 'Use soft noodles only and keep players behind the start line until their turn.',
  },
  {
    title: 'Cone Knockdown Challenge',
    goals: ['accuracy', 'energy', 'teamwork', 'event'],
    equipment: ['a ball or balloon', 'cones or household objects', 'mixed balls and markers'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    summary: 'Participants throw, roll or kick balls from marked spots to knock down cones placed in the middle of the area.',
    steps: [
      'Place cones or safe targets in the centre of the playing area.',
      'Mark throwing or kicking spots at equal distances around the targets.',
      'Each participant takes one attempt, retrieves the ball and returns to the same spot.',
      'Continue until all targets are knocked down or the time ends.',
      'Celebrate the best teamwork strategy, not only the fastest result.',
    ],
    easier: 'Move targets closer, use larger balls or allow rolling instead of throwing.',
    harder: 'Use smaller targets, different throwing styles, or require the team to knock them down in a certain order.',
    adaptation: 'Wheelchair users can roll or push balls from a closer marked position.',
    safety: 'Use soft balls and make sure nobody retrieves balls while others are throwing.',
  },
  {
    title: 'Memory Disc Match',
    goals: ['memory', 'teamwork', 'calm', 'event'],
    equipment: ['frisbee discs or paper plates', 'chalk or paper cards'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'School yard'],
    summary: 'A movement memory game where participants turn over discs or cards to find matching symbols.',
    steps: [
      'Place 12–20 discs, paper plates or cards face down in a grid.',
      'One participant moves to the grid and turns over two items.',
      'If the symbols match, the pair stays open; if not, they are turned back over.',
      'The family may help by remembering positions and giving calm guidance.',
      'Continue until all pairs are found or the time ends.',
    ],
    easier: 'Use fewer pairs and larger symbols or allow the whole family to discuss before each turn.',
    harder: 'Increase the number of pairs or add a movement task before turning each card.',
    adaptation: 'For sensory-friendly play, remove the race element and focus on cooperation and memory.',
    safety: 'Keep cards spaced out so participants do not collide when moving to the grid.',
  },
  {
    title: 'Ball Basket Search',
    goals: ['memory', 'teamwork', 'energy', 'event'],
    equipment: ['basket or box', 'mixed balls and markers', 'chalk or paper cards'],
    locations: ['Sports hall', 'School yard', 'Community event area', 'Park / outdoor space'],
    summary: 'Families search a basket of balls for specific symbols and carry the correct balls to a sequence board.',
    steps: [
      'Attach simple symbols or colours to different balls and place them in a basket.',
      'Give the family a card showing five symbols in a specific order.',
      'Participants search together but carry only one correct ball at a time to the sequence area.',
      'If a ball is placed in the wrong order, the next participant may fix it.',
      'Finish when the correct sequence is completed.',
    ],
    easier: 'Use only three symbols and keep the basket close to the sequence board.',
    harder: 'Add more symbols, hide balls under light covers, or use a longer sequence.',
    adaptation: 'Create a seated sorting version with a nearby basket and table.',
    safety: 'Avoid heavy balls and keep the carrying route clear.',
  },
  {
    title: 'Family Ball Petanque',
    goals: ['accuracy', 'calm', 'connection', 'event'],
    equipment: ['a ball or balloon', 'mixed balls and markers'],
    locations: ['Park / outdoor space', 'Beach', 'School yard', 'Sports hall'],
    summary: 'A family-friendly target game where each person rolls or throws a ball as close as possible to a central target ball.',
    steps: [
      'Place one target ball 5–8 metres away, adjusting the distance to the group.',
      'Each participant has one ball, preferably marked by team colour.',
      'Players take turns rolling, throwing or gently kicking toward the target ball.',
      'Participants may try to improve their team position by moving another ball safely.',
      'At the end, identify which ball is closest to the target.',
    ],
    easier: 'Shorten the distance and allow rolling only.',
    harder: 'Use uneven ground, smaller balls or a bonus zone around the target.',
    adaptation: 'Works well for seated participants because rolling and precision matter more than speed.',
    safety: 'Keep everyone behind the line until all balls have stopped moving.',
  },
  {
    title: 'Guided Obstacle Path',
    goals: ['teamwork', 'balance', 'connection', 'event'],
    equipment: ['cones or household objects', 'chalk or paper cards'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Small indoor space'],
    summary: 'One participant moves through a simple obstacle path while teammates guide with clear verbal instructions.',
    steps: [
      'Create a low obstacle path using cones, soft objects or floor markers.',
      'One participant follows instructions from teammates while moving slowly through the path.',
      'Guides use clear words such as “step left”, “pause”, “move forward” and “turn”.',
      'Switch roles so everyone experiences guiding and being guided.',
      'Reflect on which communication helped the most.',
    ],
    easier: 'Keep eyes open and use fewer obstacles.',
    harder: 'Use a blindfold only if safe and consented, or add a time challenge.',
    adaptation: 'For wheelchair users, create wider routes and replace low obstacles with visual markers.',
    safety: 'Use only soft or easy-to-see obstacles and ensure close supervision.',
  },
  {
    title: 'Frisbee Target Throw',
    goals: ['accuracy', 'energy', 'event'],
    equipment: ['frisbee discs or paper plates', 'basket or box'],
    locations: ['Park / outdoor space', 'Beach', 'Sports hall', 'School yard'],
    summary: 'Participants throw discs or paper plates toward a basket, box or marked target zone.',
    steps: [
      'Place a target 3–7 metres away depending on age and skill.',
      'Each participant throws one or two discs from behind the line.',
      'Collect discs only when all throws are finished.',
      'Repeat the round from a new distance or angle.',
      'Count successful throws or celebrate personal improvement.',
    ],
    easier: 'Move the target closer or make it larger.',
    harder: 'Use a smaller target, add wind-safe outdoor rules or require different throwing styles.',
    adaptation: 'Allow underarm throws, rolling discs, or a closer seated throwing line.',
    safety: 'Never throw when someone is standing near the target.',
  },
  {
    title: 'Distance Goal Challenge',
    goals: ['accuracy', 'strategy', 'energy'],
    equipment: ['a ball or balloon', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space'],
    summary: 'Participants choose how far from the goal they want to shoot, then each person takes one attempt.',
    steps: [
      'Set up a safe goal or target and mark several distance zones.',
      'Each participant chooses a distance they think they can manage.',
      'Before shooting, players may make one final distance change.',
      'Everyone takes one attempt, starting with the closest participant.',
      'The family celebrates the furthest successful attempt or total successful shots.',
    ],
    easier: 'Use a larger target and shorter distances.',
    harder: 'Use smaller goals, angled shots or bonus points for careful distance choices.',
    adaptation: 'Kicking can be replaced with rolling, pushing or throwing from a seated position.',
    safety: 'Use soft balls and keep spectators away from the goal area.',
  },
  {
    title: 'Pool Noodle Javelin',
    goals: ['accuracy', 'energy', 'event'],
    equipment: ['pool noodles', 'hula hoops or rope circles'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    summary: 'Families throw soft pool noodles toward a hoop target fixed safely in a goal, on a wall line or held low by an adult.',
    steps: [
      'Create a visible hoop target and mark a throwing line around 3 metres away.',
      'Each participant throws one pool noodle toward the target.',
      'Collect noodles after all throws are finished.',
      'Repeat with a new distance or target height.',
      'Count hits or try to improve the team score in the second round.',
    ],
    easier: 'Move closer and use a large hoop target.',
    harder: 'Use two targets with different points or require non-dominant hand throws.',
    adaptation: 'A seated throwing line works well because noodles are light and safe.',
    safety: 'Use soft noodles only and make sure nobody stands behind or inside the target area.',
  },
  {
    title: 'Big Ball Push',
    goals: ['teamwork', 'energy', 'accuracy'],
    equipment: ['mixed balls and markers', 'a ball or balloon'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space'],
    summary: 'Teams throw or roll smaller balls to move a large ball across the opponent’s line.',
    steps: [
      'Place a large exercise ball or light beach ball in the centre.',
      'Give each participant two small soft balls and mark team lines on both sides.',
      'Participants throw or roll small balls to move the large ball away from their side.',
      'Small balls outside the main zone can be collected and reused.',
      'The round ends when the large ball crosses one team’s line or time expires.',
    ],
    easier: 'Use a light beach ball and shorter distance.',
    harder: 'Use a heavier ball, wider area or rule that throws must be underarm.',
    adaptation: 'Allow rolling from seated positions and give each person a defined safe throwing area.',
    safety: 'Use soft balls only and keep hands away from the rolling large ball.',
  },
  {
    title: 'Colour Treasure Relay',
    goals: ['teamwork', 'memory', 'energy'],
    equipment: ['cones or household objects', 'chalk or paper cards'],
    locations: ['Home / indoor space', 'School yard', 'Park / outdoor space', 'Small indoor space'],
    summary: 'Families collect colour or symbol cards in the correct order while rotating roles.',
    steps: [
      'Hide or spread colour cards around a safe area.',
      'Give the family a sequence such as blue-yellow-green-red.',
      'One person moves to collect one card, returns, and tags the next person.',
      'The team may rearrange the sequence after each return.',
      'Finish when the correct sequence is complete.',
    ],
    easier: 'Use fewer colours and keep cards visible.',
    harder: 'Add decoy cards or require a different movement for each colour.',
    adaptation: 'Place cards at accessible heights and allow a seated sorting role.',
    safety: 'Set clear boundaries and avoid hiding cards in unsafe places.',
  },
  {
    title: 'Family Islands',
    goals: ['balance', 'connection', 'calm'],
    equipment: ['hula hoops or rope circles', 'chalk or paper cards'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'School yard'],
    summary: 'Families move between “islands” and complete short cooperative balance or movement tasks together.',
    steps: [
      'Create several islands using hoops, mats, rope circles or chalk shapes.',
      'Call out a family task such as “everyone touches one island” or “make a bridge shape”.',
      'Participants move safely between islands and solve the task together.',
      'Rotate who calls the next task.',
      'End with one slow breathing or stretching island.',
    ],
    easier: 'Use larger islands and remove time pressure.',
    harder: 'Reduce the number of islands or add a “silent teamwork” round.',
    adaptation: 'Use table-top shapes or hand movements for very limited mobility.',
    safety: 'Keep islands flat, non-slippery and far enough apart for safe movement.',
  },
  {
    title: 'Partner Pass Maze',
    goals: ['teamwork', 'connection', 'balance'],
    equipment: ['a ball or balloon', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    summary: 'Pairs pass a ball through a simple cone maze without dropping it, using different passing styles.',
    steps: [
      'Set up a short cone maze with a start and finish.',
      'Two family members move through the maze while passing a ball or balloon.',
      'At each cone, they change the pass style: bounce, roll, overhead or side pass.',
      'Switch partners after each round so generations mix.',
      'Add a team cheer at the finish line.',
    ],
    easier: 'Use a balloon and wider cone spacing.',
    harder: 'Add more turns, require silent passing or use a smaller ball.',
    adaptation: 'Wheelchair users can roll or bounce-pass through a wider route.',
    safety: 'Keep movement slow and controlled when passing through turns.',
  },
  {
    title: 'Quiet Shape Builder',
    goals: ['calm', 'connection', 'strategy'],
    equipment: ['chalk or paper cards', 'cones or household objects'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall'],
    summary: 'Families use bodies, cards or objects to build shapes together, focusing on calm cooperation.',
    steps: [
      'Prepare shape cards such as circle, bridge, star, wave or house.',
      'One family member draws a card and the group builds the shape together.',
      'Use bodies, hands, scarves, cones or paper to create the shape safely.',
      'After each shape, ask: what role did each person play?',
      'End by creating a new family signature shape.',
    ],
    easier: 'Use simple shapes and allow objects instead of body poses.',
    harder: 'Add a silent round or combine two shapes into one sequence.',
    adaptation: 'Every shape can include seated, standing and object-based roles.',
    safety: 'Avoid weight-bearing poses and keep movements comfortable.',
  },
  {
    title: 'Mini Event Circuit',
    goals: ['event', 'teamwork', 'energy', 'accuracy'],
    equipment: ['mixed balls and markers', 'cones or household objects', 'frisbee discs or paper plates'],
    locations: ['Community event area', 'School yard', 'Sports hall', 'Park / outdoor space'],
    summary: 'A compact event format with three stations: target throw, movement relay and teamwork puzzle.',
    steps: [
      'Prepare three small stations that can each be completed in 3–5 minutes.',
      'Station 1: throw or roll objects into a target zone.',
      'Station 2: complete a short movement route as a family relay.',
      'Station 3: solve a quick memory, sequence or shape-building task.',
      'Rotate teams and use simple scorecards or participation stamps.',
    ],
    easier: 'Remove scoring and give participation stamps only.',
    harder: 'Add time limits, bonus points for cooperation or a final family-created station.',
    adaptation: 'Design each station with a seated version, a low-impact version and a helper role.',
    safety: 'Give clear rules at every station and keep throwing areas separated from movement areas.',
  },
  {
    title: 'Animal Movement Trail',
    goals: ['energy', 'balance', 'connection'],
    equipment: ['none', 'chalk or paper cards'],
    locations: ['Home / indoor space', 'Park / outdoor space', 'Beach', 'School yard'],
    summary: 'Families move through a trail using animal-inspired movements adapted to each person’s ability.',
    steps: [
      'Choose 5–6 animal cards such as bear, crab, flamingo, frog, penguin and turtle.',
      'Set a short route or circle where each card becomes one movement station.',
      'Participants choose a comfortable version of each animal movement.',
      'Invite children or grandparents to invent a new animal station.',
      'Finish with the slowest animal movement as a cool-down.',
    ],
    easier: 'Use walking versions and shorter distances.',
    harder: 'Add balance holds, rhythm claps or a memory sequence of animals.',
    adaptation: 'For seated participants, use arm movements and expressive gestures for each animal.',
    safety: 'Avoid jumping on hard surfaces and choose movements that fit the age group.',
  },
];

function generateActivity(input: ActivityInput, ideaIndex = 0) {
  const accessibilityText: Record<string, string> = {
    mixed: 'Offer each family member a choice of walking, rolling, stepping, throwing or seated movement.',
    low: 'Use shorter distances, slower timing, larger targets and seated alternatives for every task.',
    wheelchair: 'Create clear turning space and use object-passing, rolling or target activities instead of running.',
    sensory: 'Avoid loud sounds, give clear visual instructions and allow a quiet role such as scorekeeper or designer.',
    norunning: 'Replace running with walking, balancing, throwing, stretching or rhythm tasks.',
    younger: 'Use simple rules, short rounds, colourful markers and more adult support.',
    large: 'Run the activity as stations so families rotate without long waiting time.',
    outdoor: 'Prepare an indoor or low-equipment alternative in case of weather changes.',
  };

  const scored = activityTemplates
    .map((template, idx) => {
      let score = 0;
      if (template.goals.includes(input.goal)) score += 4;
      if (template.equipment.includes(input.equipment)) score += 3;
      if (template.locations.includes(input.location)) score += 2;
      if (input.goal === 'calm' && input.intensity.includes('High')) score -= 2;
      if (input.accessibility === 'norunning' && template.title.toLowerCase().includes('relay')) score -= 1;
      return { template, idx, score };
    })
    .sort((a, b) => b.score - a.score || a.idx - b.idx);

  const bestScore = scored[0]?.score ?? 0;
  const pool = scored.filter(item => item.score >= bestScore - 2).map(item => item.template);
  const template = pool[Math.abs(ideaIndex) % Math.max(pool.length, 1)] || activityTemplates[Math.abs(ideaIndex) % activityTemplates.length];

  const durationNote = input.duration === '5 minutes'
    ? 'Use this as one short station or warm-up round.'
    : input.duration === '60 minutes'
      ? 'Repeat the activity in several rounds and let families create their own variation.'
      : 'Run one or two rounds depending on group size.';

  const peopleNote = input.people === '12+'
    ? 'For large groups, create parallel stations and rotate families every few minutes.'
    : input.people === '2'
      ? 'For two people, take turns as mover and guide/scorekeeper.'
      : 'Rotate roles so everyone contributes.';

  const equipmentText = input.equipment === 'none'
    ? 'No special equipment is needed; use body movement, space markers or imagination.'
    : `Use ${input.equipment} as the main shared material. Adapt with household or school equipment if needed.`;

  return {
    title: template.title,
    duration: input.duration,
    bestFor: `${input.members} · ${input.people} people · ${input.location}`,
    intensity: input.intensity,
    goal: template.summary,
    equipment: equipmentText,
    steps: [
      `Prepare a safe ${input.location} space and explain that the aim is participation, cooperation and fun.`,
      ...template.steps,
      `${durationNote} ${peopleNote}`,
    ],
    easier: template.easier,
    harder: template.harder,
    adaptation: `${template.adaptation} ${accessibilityText[input.accessibility] || accessibilityText.mixed}`,
    safety: template.safety,
  };
}

export default function Page() {
  const [query, setQuery] = useState('');
  const [audience, setAudience] = useState('All audiences');
  const [topic, setTopic] = useState('All topics');

  const [members, setMembers] = useState('Mixed generations');
  const [people, setPeople] = useState('4-5');
  const [location, setLocation] = useState('Park / outdoor space');
  const [duration, setDuration] = useState('20 minutes');
  const [goal, setGoal] = useState('teamwork');
  const [equipment, setEquipment] = useState('cones or household objects');
  const [accessibility, setAccessibility] = useState('mixed');
  const [intensity, setIntensity] = useState('Medium');
  const [ideaIndex, setIdeaIndex] = useState(0);

  const activity = useMemo(() => generateActivity({ members, people, location, duration, goal, equipment, accessibility, intensity }, ideaIndex), [members, people, location, duration, goal, equipment, accessibility, intensity, ideaIndex]);
  const countdown = daysUntilFestival();

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resourceItems.filter((resource) => {
      const matchesQuery = !q || [resource.title, resource.description, resource.type, ...resource.topics, ...resource.audiences]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesAudience = audience === 'All audiences' || resource.audiences.includes(audience);
      const matchesTopic = topic === 'All topics' || resource.topics.includes(topic);
      return matchesQuery && matchesAudience && matchesTopic;
    });
  }, [query, audience, topic]);

  const clearFilters = () => {
    setQuery('');
    setAudience('All audiences');
    setTopic('All topics');
  };

  return (
    <main>
      <header className="topbar">
        <div className="container nav">
          <a href="#top" aria-label="Home & Heart Digital Knowledge Hub"><img src="/visuals/home-heart-logo.png" alt="Home & Heart European Family Festival logo" /></a>
          <nav className="navlinks" aria-label="Main navigation">
            <a href="#library">Library</a>
            <a href="#tools">Activity generator</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero hub-hero">
        <div className="container">
          <div className="hero-title">
            <span className="kicker"><Sparkles size={16}/> Home & Heart Digital Knowledge Hub</span>
            <h1>Inclusive family sport resources in one place.</h1>
            <p className="lead">An open digital platform helping families, municipalities, sport organisations and partners access practical resources, activity tools, learning materials and replication guidance.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#library"><BookOpen size={18}/> Explore resources</a>
              <a className="btn secondary" href="#tools"><HeartHandshake size={18}/> Try activity generator</a>
            </div>
          </div>

          <div className="hub-panel">
            <div className="hub-logo-row">
              <img className="logo-big" src="/visuals/home-heart-logo.png" alt="Home & Heart identity" />
            </div>
            <div className="hub-overview-grid">
              <article className="about-panel">
                <div className="panel-heading">
                  <span className="round-icon"><BookOpen size={30}/></span>
                  <div><h2>About the Hub</h2><div className="yellow-line" /></div>
                </div>
                <p>The Home & Heart Digital Knowledge Hub is part of the Erasmus+ Sport project - Home & Heart: European Family Festival.</p>
                <p>The Hub provides resources developed throughout the project, including materials emerging from the pilot event — the European Family Festival — alongside additional tools, guides and learning materials relevant for families, sport organisations, municipalities, partners and other target groups. In long-term it will also serve as a place for materials from other initiatives.</p>
                <div className="mini-graphic" aria-hidden="true">
                  <MonitorPlay size={42}/><FileText size={42}/><CheckCircle2 size={42}/>
                </div>
              </article>

              <article id="festival" className="festival-panel">
                <div className="festival-topline">
                  <span className="round-icon tent"><Tent size={31}/></span>
                  <div><h2>European Family Festival</h2><span className="badge strong">Pilot event</span></div>
                </div>
                <div className="festival-content">
                  <div className="countdown-box">
                    <span>Event starts in</span>
                    <strong>{countdown}</strong>
                    <b>days</b>
                  </div>
                  <div className="festival-details">
                    <p><CalendarDays size={19}/><strong>Date:</strong> 22 August 2026</p>
                    <p><MapPin size={19}/><strong>Place:</strong> Uzvaras Parks, Riga, Latvia</p>
                    <p><ClipboardCheck size={19}/><strong>Programme:</strong> Coming soon</p>
                    <p><Radio size={19}/><strong>Livestream:</strong> Link not available yet</p>
                  </div>
                </div>
                <div className="park-strip" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="section library-section">
        <div className="container">
          <div className="library-shell">
            <div className="library-heading">
              <span className="round-icon folder"><BookOpen size={28}/></span>
              <div>
                <h2>Resource library</h2>
                <p>Find materials by audience and purpose</p>
              </div>
            </div>
            <p className="intro compact">Search, filter and access practical resources for families, sport organisations, municipalities, policymakers, coaches and project partners.</p>

            <div className="search-filter-card compact-filters" aria-label="Resource search and filters">
              <label className="searchbox">
                <Search size={20}/>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources by keyword, topic or audience…" />
              </label>
              <div className="dropdown-filters">
                <label>
                  <span><Filter size={16}/> Audience</span>
                  <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                    {audienceOptions.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  <span>Topic</span>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    {topicOptions.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <div className="filter-meta compact-meta">
                  <strong>{filteredResources.length} resources found</strong>
                  <button className="clear" onClick={clearFilters}><X size={16}/> Clear filters</button>
                </div>
              </div>
            </div>

            <div className="resource-grid">
              {filteredResources.map((resource) => {
                const Icon = resource.Icon;
                return (
                  <a className="resource-card" href={resource.file} target="_blank" rel="noopener noreferrer" key={resource.title} aria-label={`Open ${resource.title}`}>
                    <div className={`resource-visual ${resource.tone}`}><Icon size={44}/></div>
                    <div className="resource-body">
                      <div className="resource-tags"><span>{resource.type}</span>{resource.topics.map(tag => <span key={tag}>{tag}</span>)}</div>
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      <div className="audience-tags">{resource.audiences.map(tag => <em key={tag}>{tag}</em>)}</div>
                    </div>
                    <ChevronRight className="resource-arrow" size={24}/>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="section alt">
        <div className="container tool advanced-tool">
          <div className="panel">
            <span className="kicker light"><Activity size={16}/> Interactive tool</span>
            <h3>Family Activity Generator</h3>
            <p>Create a ready-to-use family movement idea based on who is joining, where the activity will happen, time available, equipment, intensity and accessibility needs.</p>
            <div className="formgrid advanced-form">
              <label>Family members<select value={members} onChange={e => { setMembers(e.target.value); setIdeaIndex(0); }}><option>Mixed generations</option><option>Children 3-6</option><option>Children 7-12</option><option>Teenagers</option><option>Parents + children</option><option>Parents + grandparents</option><option>Full family group</option><option>School/preschool group</option><option>Community group</option></select></label>
              <label>Number of people<select value={people} onChange={e => { setPeople(e.target.value); setIdeaIndex(0); }}><option>2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>6-8</option><option>9-12</option><option>12+</option></select></label>
              <label>Location<select value={location} onChange={e => { setLocation(e.target.value); setIdeaIndex(0); }}><option>Home / indoor space</option><option>Park / outdoor space</option><option>Beach</option><option>Sports hall</option><option>School yard</option><option>Playground</option><option>Small indoor space</option><option>Community event area</option></select></label>
              <label>Time available<select value={duration} onChange={e => { setDuration(e.target.value); setIdeaIndex(0); }}><option>5 minutes</option><option>10 minutes</option><option>15 minutes</option><option>20 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></label>
              <label>Goal<select value={goal} onChange={e => { setGoal(e.target.value); setIdeaIndex(0); }}><option value="energy">Energy boost</option><option value="teamwork">Teamwork</option><option value="balance">Balance & coordination</option><option value="calm">Calm movement</option><option value="connection">Intergenerational connection</option><option value="accuracy">Accuracy / target practice</option><option value="memory">Memory & focus</option><option value="strategy">Strategy & decision-making</option><option value="event">Event station / relay format</option></select></label>
              <label>Equipment<select value={equipment} onChange={e => { setEquipment(e.target.value); setIdeaIndex(0); }}><option value="none">No special equipment</option><option value="a ball or balloon">Ball or balloon</option><option value="cones or household objects">Cones / markers</option><option value="frisbee discs or paper plates">Frisbee discs / paper plates</option><option value="hula hoops or rope circles">Hula hoops / rope circles</option><option value="pool noodles">Pool noodles</option><option value="music">Music</option><option value="chalk or paper cards">Chalk / paper cards</option><option value="basket or box">Basket / box</option><option value="mixed balls and markers">Mixed balls and markers</option></select></label>
              <label>Accessibility<select value={accessibility} onChange={e => { setAccessibility(e.target.value); setIdeaIndex(0); }}><option value="mixed">Mixed abilities</option><option value="low">Limited mobility</option><option value="wheelchair">Wheelchair-friendly</option><option value="sensory">Sensory-friendly</option><option value="norunning">No running / low impact</option><option value="younger">Younger children</option><option value="large">Large group</option><option value="outdoor">Outdoor/weather adaptable</option></select></label>
              <label>Intensity<select value={intensity} onChange={e => { setIntensity(e.target.value); setIdeaIndex(0); }}><option>Very low</option><option>Low</option><option>Medium</option><option>Active</option><option>High-energy</option></select></label>
            </div>
          </div>
          <div className="result activity-card-output">
            <span className="badge">Generated activity card</span>
            <h3>{activity.title}</h3>
            <div className="activity-meta">
              <span>{activity.duration}</span><span>{activity.bestFor}</span><span>{activity.intensity} intensity</span>
            </div>
            <p><strong>Goal:</strong> {activity.goal}</p>
            <p><strong>Equipment:</strong> {activity.equipment}</p>
            <h4>How to play</h4>
            <ol>{activity.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <div className="adapt-grid">
              <p><strong>Make it easier:</strong> {activity.easier}</p>
              <p><strong>Make it harder:</strong> {activity.harder}</p>
              <p><strong>Inclusive adaptation:</strong> {activity.adaptation}</p>
              <p><strong>Safety note:</strong> {activity.safety}</p>
            </div>
            <div className="activity-actions">
              <button type="button" onClick={() => setIdeaIndex((value) => value + 1)}><RotateCcw size={16}/> Generate another idea</button>
              <button type="button" onClick={() => window.print()}><Download size={16}/> Print / save activity card</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer eu-footer">
        <div className="container eu-footer-inner">
          <div className="partner-visibility" aria-label="Coordinator and partners">
            <div className="partner-block coordinator-block">
              <span className="partner-label">Coordinator</span>
              <div className="logo-card coordinator-card">
                <img src="/visuals/partners/lsfp.png" alt="Latvian Sports Federations Council logo" />
              </div>
            </div>
            <div className="partner-block">
              <span className="partner-label">Partners</span>
              <div className="partner-logo-grid">
                <div className="logo-card"><img src="/visuals/partners/sul-finnish-athletics.png" alt="Finnish Athletics logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/lasv.png" alt="Lithuanian Association Sport for All logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/opes.png" alt="OPES logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/ufec.png" alt="Union of Sports Federations of Catalonia logo" /></div>
                <div className="logo-card dark-card"><img src="/visuals/partners/daddyhood.png" alt="DaddyHood logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/favrholm.png" alt="Favrholm IK logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/vh-sport.png" alt="VH Sport logo" /></div>
              </div>
            </div>
          </div>

          <div className="eu-visibility" aria-label="European Union funding visibility">
            <img src="/visuals/eu-co-funded.png" alt="Co-funded by the European Union" />
            <p>Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
