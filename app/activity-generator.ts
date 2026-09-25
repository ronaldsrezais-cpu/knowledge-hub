export type ActivityInput = {
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
  equipmentTags: string[];
  locations: string[];
  intensities: string[];
  peopleMin: number;
  peopleMax: number;
  summary: string;
  equipmentDetail: string;
  steps: string[];
  easier: string;
  harder: string;
  adaptation: string;
  safety: string;
  sourceTitle: string;
  sourceUrl: string;
  videoUrl?: string;
  noRunning?: boolean;
  wheelchairFriendly?: boolean;
  lowImpact?: boolean;
  sensoryFriendly?: boolean;
  youngerFriendly?: boolean;
  largeGroup?: boolean;
  weatherAdaptable?: boolean;
};

const FAMILY_CUP_SOURCE = '/resources/family-cup-activity-toolkit.pdf';

const activityTemplates: ActivityTemplate[] = [
  {
    title: 'Laser Biathlon',
    goals: ['accuracy', 'teamwork', 'energy', 'event'],
    equipmentTags: ['target equipment', 'mixed balls and markers', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    intensities: ['Medium', 'Active', 'High-energy'],
    peopleMin: 3,
    peopleMax: 8,
    summary: 'A family relay combining target accuracy with an age- and ability-adapted movement section.',
    equipmentDetail: 'Laser target equipment and timer, or a safer low-tech alternative using soft balls/targets, plus cones or distance markers.',
    steps: [
      'Set up a target station and clearly marked movement distances.',
      'Each participant completes five target attempts.',
      'After the target attempts, complete the agreed movement distance and hand over to the next family member.',
      'For a scored event version, add 10 seconds for each missed target.',
      'Continue until every participant has completed their turn.',
    ],
    easier: 'Shorten or remove the movement section and use a larger, closer target.',
    harder: 'Increase the target distance or movement distance while keeping the same five-attempt format.',
    adaptation: 'Replace running with walking, rolling or a stationary target-only role. Use the low-tech target version when specialised equipment is unavailable.',
    safety: 'Use supervised target equipment only. Keep the target zone separate and do not allow anyone to retrieve objects while attempts are in progress.',
    sourceTitle: 'Family Cup Activity Toolkit — Laser Biathlon',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/dRE2QHnY_KA',
    wheelchairFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Ringo Flamingo',
    goals: ['accuracy', 'strategy', 'teamwork', 'event'],
    equipmentTags: ['hula hoops or rope circles', 'target equipment', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    intensities: ['Low', 'Medium', 'Active'],
    peopleMin: 2,
    peopleMax: 8,
    summary: 'A target challenge where the family works together to place seven rings onto three targets as quickly as possible.',
    equipmentDetail: 'Three stable targets (the original uses flamingo figures), around 20 lightweight rings, three throwing-line markers and a timer.',
    steps: [
      'Set up three stable targets and mark closer, middle and further throwing lines.',
      'Choose each participant’s line according to age and ability.',
      'Throw rings toward any of the three targets; the family needs seven successful rings in total.',
      'Decide together who throws and who collects rings between throwing rounds.',
      'Stop when seven rings have been placed successfully.',
    ],
    easier: 'Move participants to a closer line after one minute or reduce the number of successful rings required.',
    harder: 'Use the further line, smaller targets or require successful rings on more than one target.',
    adaptation: 'Use seated throwing positions, larger rings and closer targets. A teammate can collect and return rings.',
    safety: 'All participants stay behind the throwing line while rings are being thrown; collect rings only after throwing has stopped.',
    sourceTitle: 'Family Cup Activity Toolkit — Ringo Flamingo',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/aAPfmWyRsrY',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Obstacle Course',
    goals: ['teamwork', 'connection', 'strategy', 'event'],
    equipmentTags: ['cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    intensities: ['Low', 'Medium', 'Active'],
    peopleMin: 3,
    peopleMax: 6,
    summary: 'A communication challenge where one or two participants move through a simple corridor while teammates guide them using words only.',
    equipmentDetail: 'Two clearly marked corridors, soft/light obstacles such as bottles or cones, start/finish markers and a timer. Eye coverings are optional and should only be used when appropriate.',
    steps: [
      'Create one or two clear corridors with soft obstacles and visible start/finish points.',
      'Choose a mover and a guide; the guide uses verbal instructions only.',
      'The mover travels slowly through the corridor without touching obstacles.',
      'Rotate roles so different family members practise guiding and listening.',
      'For an event version, record the finishing time and add a penalty for displaced obstacles.',
    ],
    easier: 'Keep eyes open, reduce the number of obstacles and remove timing.',
    harder: 'Add more route choices or use an eye covering only with consent, close supervision and a hazard-free course.',
    adaptation: 'Create a wide wheelchair-accessible corridor or use floor/visual markers instead of physical obstacles. A seated participant can take the guide role.',
    safety: 'Check the course before every round, use soft obstacles, keep the route clear and supervise closely. Do not use blindfolds where they create unnecessary risk.',
    sourceTitle: 'Family Cup Activity Toolkit — Obstacle Course',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/RGY-F1IpPhw',
    lowImpact: true,
    weatherAdaptable: true,
  },
  {
    title: 'Ball Path',
    goals: ['teamwork', 'balance', 'strategy', 'connection', 'event'],
    equipmentTags: ['a ball or balloon', 'mixed balls and markers'],
    locations: ['Sports hall', 'Small indoor space', 'School yard', 'Community event area'],
    intensities: ['Very low', 'Low', 'Medium'],
    peopleMin: 2,
    peopleMax: 5,
    summary: 'A precision teamwork activity where family members coordinate a shared board to guide a ball from start to finish.',
    equipmentDetail: 'A tilting ball-path board or homemade tray/board with safe barriers, a table-tennis ball, a larger tennis ball for an easier version and a timer.',
    steps: [
      'Place the ball at the marked starting point on the board.',
      'Each participant controls one side or corner of the board.',
      'Communicate and tilt the board together to guide the ball toward the finish.',
      'If the ball falls off or into a hole, restart from the starting point.',
      'Stop when the ball reaches the finishing target.',
    ],
    easier: 'Use a larger/heavier ball, simplify the path or allow younger children to hold the board directly.',
    harder: 'Use the smaller table-tennis ball and require precise placement in the finishing recess.',
    adaptation: 'This can be played seated around a table. Adjust board height and grip points so every participant can contribute.',
    safety: 'Use a stable board at a comfortable height and avoid sharp edges or unstable supports.',
    sourceTitle: 'Family Cup Activity Toolkit — Ball Path',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/dbuULaTvhCQ',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
  },
  {
    title: 'Basketball Shots',
    goals: ['accuracy', 'strategy', 'teamwork', 'event'],
    equipmentTags: ['a ball or balloon', 'mixed balls and markers', 'target equipment'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area', 'Playground'],
    intensities: ['Low', 'Medium', 'Active'],
    peopleMin: 2,
    peopleMax: 8,
    summary: 'A family shooting challenge where the team aims to score at least once in each of five different hoops or targets.',
    equipmentDetail: 'Five hoops/targets, several balls of different sizes, three distance markers and a timer. A simplified version can use buckets or marked wall/floor targets.',
    steps: [
      'Set up five different targets and mark closer, middle and further throwing lines.',
      'Choose each participant’s line according to age and ability.',
      'The family works to score at least one successful shot in every target.',
      'Team members may choose which ball and target to attempt.',
      'Stop when all five targets have received a successful shot.',
    ],
    easier: 'Use larger targets, larger balls and closer throwing lines.',
    harder: 'Use smaller targets, further lines or require a chosen target order.',
    adaptation: 'Allow seated throwing, underarm throws or rolling into low targets. Adjust target height and distance individually.',
    safety: 'No one enters the target area while balls are being thrown. Retrieve balls only after the throwing round stops.',
    sourceTitle: 'Family Cup Activity Toolkit — Basketball Shots',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/As6qlNC1N68',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    youngerFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Ball Knockdown',
    goals: ['accuracy', 'teamwork', 'energy', 'event'],
    equipmentTags: ['a ball or balloon', 'mixed balls and markers', 'cones or household objects', 'target equipment'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    intensities: ['Low', 'Medium', 'Active'],
    peopleMin: 2,
    peopleMax: 10,
    summary: 'A target activity where the family uses different balls to knock down all standing targets as quickly as possible.',
    equipmentDetail: 'Five to seven lightweight bottles/targets on stable stands, around 10 soft balls of different sizes, distance markers, a collection bucket and a timer.',
    steps: [
      'Place five to seven safe targets on stable stands and mark age/ability-adjusted throwing lines.',
      'Start with all balls in a collection bucket.',
      'Participants throw or roll balls toward the targets.',
      'After all balls have been used, collect them only when throwing has stopped.',
      'Continue until every target has been knocked down.',
    ],
    easier: 'Move closer, use larger balls or reduce the number of targets.',
    harder: 'Move further away, use smaller balls or require targets to be knocked down in a chosen order.',
    adaptation: 'Allow rolling or seated throws from a closer line and assign collection/strategy roles according to ability.',
    safety: 'Use soft balls and stable lightweight targets. Nobody collects balls while throwing is in progress.',
    sourceTitle: 'Family Cup Activity Toolkit — Ball Knockdown',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/RNtkN_qQRC8',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    youngerFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Ladder Golf',
    goals: ['accuracy', 'strategy', 'teamwork', 'event'],
    equipmentTags: ['target equipment', 'cones or household objects'],
    locations: ['Sports hall', 'School yard', 'Park / outdoor space', 'Community event area'],
    intensities: ['Very low', 'Low', 'Medium'],
    peopleMin: 2,
    peopleMax: 8,
    summary: 'A precision challenge where the family throws bolas toward three scoring rungs and works together to reach at least five points.',
    equipmentDetail: 'A ladder-golf stand with three rungs, lightweight bolas, distance markers and a timer. The top/middle/bottom rungs score 3/2/1 points.',
    steps: [
      'Set up the ladder-golf target and mark throwing lines suited to age and ability.',
      'Participants throw one after another from their chosen lines.',
      'Count 3 points for the top rung, 2 for the middle and 1 for the bottom.',
      'After all bolas have been thrown, collect them and begin the next round.',
      'Finish when the family reaches at least five points.',
    ],
    easier: 'Move closer or use a larger homemade target with wider scoring zones.',
    harder: 'Move further away or set a higher target score.',
    adaptation: 'Use seated throwing positions and lighter/softer throwing objects if needed.',
    safety: 'Everyone stays behind the throwing line while a participant is throwing. Collect equipment only after all throws stop.',
    sourceTitle: 'Family Cup Activity Toolkit — Ladder Golf',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/kEJor1x7uqo',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Duck Race',
    goals: ['teamwork', 'connection', 'strategy', 'event'],
    equipmentTags: ['air and water equipment'],
    locations: ['Community event area', 'School yard', 'Sports hall', 'Park / outdoor space'],
    intensities: ['Very low', 'Low'],
    peopleMin: 2,
    peopleMax: 6,
    summary: 'A cooperative challenge where family members use air only to move a floating duck to the opposite end of a water channel and back.',
    equipmentDetail: 'A stable water channel around 3 m long, water, a small floating duck/object, hand-operated air pumps or air-blowing water pistols and a timer.',
    steps: [
      'Secure the water channel, fill it safely and place the floating object at the starting wall.',
      'Split the family between the two ends of the channel.',
      'The first side uses air only to move the object to the opposite wall.',
      'When it touches the wall, the other side uses air to move it back.',
      'Stop when the object returns to the starting wall.',
    ],
    easier: 'Use a shorter channel or allow more than two participants to blow/pump at the same time.',
    harder: 'Use a longer channel or limit each participant to one pump at a time before rotating.',
    adaptation: 'Set the channel at an accessible seated height and position pumps so participants can operate them comfortably.',
    safety: 'The channel must be stable. Remove spilled water immediately to prevent slipping and use air only rather than spraying water.',
    sourceTitle: 'Family Cup Activity Toolkit — Duck Race',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/dD9OJDt9cqQ',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
  },
  {
    title: 'Cube Puzzle',
    goals: ['strategy', 'memory', 'teamwork', 'calm', 'event'],
    equipmentTags: ['puzzle or cards'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'Community event area'],
    intensities: ['Very low', 'Low'],
    peopleMin: 2,
    peopleMax: 8,
    summary: 'A family problem-solving challenge where participants assemble a picture puzzle together as quickly as possible.',
    equipmentDetail: 'The original uses a 3 × 3 puzzle made from nine large cubes. A conventional jigsaw of around 30 pieces is a practical alternative, plus a reference image and timer.',
    steps: [
      'Choose the target picture and prepare the puzzle pieces mixed up.',
      'Show the family the reference image.',
      'Start the timer and assemble the picture together.',
      'Encourage participants to divide roles: find colours/edges, rotate pieces and check the reference.',
      'Stop when the complete image is correct.',
    ],
    easier: 'Use fewer/larger pieces or keep the reference image visible throughout.',
    harder: 'Use more pieces, hide the reference after a short viewing period or add a time target.',
    adaptation: 'Use large high-contrast pieces and a table at accessible height. Participants can take visual-search, sorting or placement roles.',
    safety: 'Use lightweight puzzle pieces and a stable working surface with enough space for everyone.',
    sourceTitle: 'Family Cup Activity Toolkit — Cube Puzzle',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/PPnE3IjZUbA',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
  },
  {
    title: 'Recycling Game',
    goals: ['strategy', 'memory', 'teamwork', 'calm', 'event'],
    equipmentTags: ['containers and cards', 'basket or box', 'chalk or paper cards'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'School yard', 'Community event area'],
    intensities: ['Very low', 'Low', 'Medium'],
    peopleMin: 2,
    peopleMax: 10,
    summary: 'A learning and teamwork activity where families sort waste-item tokens into the correct local recycling categories.',
    equipmentDetail: 'Six labelled containers/boxes/buckets, around 30 waste-item tokens/cards, category symbols, a flat working surface and a timer.',
    steps: [
      'Label containers with the waste categories used in your local recycling system.',
      'Mix the waste-item tokens and place them in the activity area.',
      'Start the timer and sort every token into the correct container.',
      'After one minute, one participant may act as a verbal adviser using a reference guide.',
      'Finish when all items are correctly sorted.',
    ],
    easier: 'Use fewer categories, fewer tokens or allow the reference guide from the start.',
    harder: 'Increase the number of tokens, add similar-looking items or delay access to the reference guide.',
    adaptation: 'Use large high-contrast symbols, accessible table height and roles such as sorter, adviser and checker.',
    safety: 'Use clean, lightweight tokens rather than real waste and keep containers stable and easy to reach.',
    sourceTitle: 'Family Cup Activity Toolkit — Recycling Game',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/ymp-uC_6SEc',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Moving Spoons',
    goals: ['balance', 'teamwork', 'strategy', 'connection', 'event'],
    equipmentTags: ['spoons and small ball', 'a ball or balloon', 'basket or box'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'Community event area'],
    intensities: ['Very low', 'Low', 'Medium'],
    peopleMin: 2,
    peopleMax: 5,
    summary: 'A coordination activity where family members transfer a small ball through a sequence of spoons and into a bucket.',
    equipmentDetail: 'Four large spoons or spoon positions, a table-tennis ball, a tennis ball for an easier version, a small bucket and a stable stand or simple homemade setup.',
    steps: [
      'Arrange four spoon positions in sequence with a bucket after the final spoon.',
      'Assign one spoon to each participant; with fewer than four people, one person can control two positions.',
      'Transfer the ball from spoon to spoon without touching it with hands.',
      'Keep communicating so each person is ready for the next transfer.',
      'Finish when the ball drops successfully into the bucket.',
    ],
    easier: 'Start with a tennis ball, reduce the distance between spoons or remove any visual cover.',
    harder: 'Use a table-tennis ball, increase spacing slightly or limit the view from above.',
    adaptation: 'Set all spoons at seated height and allow participants to hold or stabilise their spoon in the way that works best for them.',
    safety: 'Use a stable setup, secure the spoons and keep the floor clear of dropped balls.',
    sourceTitle: 'Family Cup Activity Toolkit — Moving Spoons',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/jJgzJnqBqG8',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
  },
  {
    title: 'Blow Challenge',
    goals: ['accuracy', 'calm', 'event'],
    equipmentTags: ['sloped track and small ball', 'a ball or balloon'],
    locations: ['Home / indoor space', 'Small indoor space', 'Sports hall', 'Community event area'],
    intensities: ['Very low', 'Low'],
    peopleMin: 1,
    peopleMax: 12,
    summary: 'An individual bonus challenge where participants use breath to move a table-tennis ball as far as possible along a sloped track.',
    equipmentDetail: 'A stable sloped track/channel around 3 m long, table-tennis balls and distance markings. The original setup uses an angle of about 30–40°.',
    steps: [
      'Secure the track at a gentle slope and mark distances along it.',
      'Place the table-tennis ball at the lower starting point.',
      'The participant blows the ball along the track without touching it.',
      'Give each participant up to three attempts.',
      'Record the furthest distance achieved.',
    ],
    easier: 'Reduce the slope or shorten the measured distance.',
    harder: 'Increase the slope slightly, but keep it below 45°, or set a target distance.',
    adaptation: 'Position the starting point at a comfortable seated height. Participants who should not perform forceful blowing can take a measuring, recording or encouragement role instead.',
    safety: 'Keep the track stable and below 45°. Use individual clean balls where hygiene is relevant and avoid the activity for anyone for whom forceful blowing is unsuitable.',
    sourceTitle: 'Family Cup Activity Toolkit — Blow Challenge',
    sourceUrl: FAMILY_CUP_SOURCE,
    videoUrl: 'https://youtu.be/_OG2771_b2k',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
  {
    title: 'Everyday Movement Mix',
    goals: ['energy', 'balance', 'connection', 'calm'],
    equipmentTags: ['none', 'music', 'cones or household objects'],
    locations: ['Home / indoor space', 'Park / outdoor space', 'Beach', 'Sports hall', 'School yard', 'Playground', 'Small indoor space'],
    intensities: ['Very low', 'Low', 'Medium', 'Active'],
    peopleMin: 2,
    peopleMax: 12,
    summary: 'A simple family movement session combining balance, strength, flexibility and agility so movement can become part of everyday life.',
    equipmentDetail: 'No special equipment is required for the basic version. If music is selected, use it as the timing and movement cue for the activity; markers or chairs can also be added to structure the space.',
    steps: [
      'Choose four short movement tasks: one balance task, one strength task, one flexibility task and one agility/coordination task.',
      'Work for about 30–60 seconds at each task at a comfortable pace.',
      'Rotate together and encourage each person to choose a version that suits their ability.',
      'After one circuit, take a short recovery break and discuss which movement felt best.',
      'Repeat if time allows, or choose one task to include in the family’s regular routine.',
    ],
    easier: 'Use seated or supported movements, shorter work periods and longer recovery.',
    harder: 'Add another circuit, slightly longer work periods or more challenging balance/coordination variations.',
    adaptation: 'Every task can be performed seated, standing with support or through upper-body movement. Prioritise comfortable, controlled movement over speed.',
    safety: 'Use a clear space, choose movements appropriate to each participant and include recovery. Stop any movement that causes pain or dizziness.',
    sourceTitle: 'Movement As a Part of Everyday Life — Home & Heart Knowledge Hub',
    sourceUrl: 'https://www.youtube.com/watch?v=8gfVQ4cIrx8',
    noRunning: true,
    wheelchairFriendly: true,
    lowImpact: true,
    sensoryFriendly: true,
    youngerFriendly: true,
    weatherAdaptable: true,
    largeGroup: true,
  },
];

function peopleRange(value: string) {
  if (value === '2') return { min: 2, max: 2 };
  if (value === '12+') return { min: 12, max: 30 };
  const match = value.match(/(\d+)-(\d+)/);
  return match ? { min: Number(match[1]), max: Number(match[2]) } : { min: 2, max: 6 };
}

const selectedEquipmentGuidance: Record<string, string> = {
  none: 'No special equipment is required for this version.',
  'a ball or balloon': 'Use a ball or other soft ball as a main activity object.',
  'cones or household objects': 'Use cones or safe household markers to define distances, routes or target areas.',
  'hula hoops or rope circles': 'Use lightweight rings or hoops as the main throwing/target equipment.',
  'target equipment': 'Use safe target or throwing equipment appropriate to the participants and venue.',
  'puzzle or cards': 'Use a puzzle or picture-card set as the main problem-solving material.',
  'containers and cards': 'Use labelled boxes or containers together with sorting cards/tokens.',
  'spoons and small ball': 'Use spoons and a small lightweight ball as the core coordination equipment.',
  'air and water equipment': 'Use a stable water channel, a floating object and hand-operated air pumps.',
  'sloped track and small ball': 'Use a stable sloped track/channel and a table-tennis ball.',
  music: 'Use music as a clear timing and movement cue: music playing means move; pause means freeze, rotate or change role.',
  'chalk or paper cards': 'Use paper task/sorting cards or chalk markings as part of the activity setup.',
  'basket or box': 'Use a basket or box as a target, collection point or sorting container.',
  'mixed balls and markers': 'Use several soft balls together with clear floor/distance markers.',
};

function accessibilityScore(template: ActivityTemplate, accessibility: string) {
  if (accessibility === 'wheelchair') return template.wheelchairFriendly ? 5 : -5;
  if (accessibility === 'low') return template.lowImpact ? 4 : -2;
  if (accessibility === 'sensory') return template.sensoryFriendly ? 4 : -1;
  if (accessibility === 'norunning') return template.noRunning ? 4 : -3;
  if (accessibility === 'younger') return template.youngerFriendly ? 4 : 0;
  if (accessibility === 'large') return template.largeGroup ? 4 : -1;
  if (accessibility === 'outdoor') return template.weatherAdaptable ? 3 : 0;
  return 1;
}

export function generateActivity(input: ActivityInput, ideaIndex = 0) {
  const accessibilityText: Record<string, string> = {
    mixed: 'Offer each family member a role and movement option that matches their ability.',
    low: 'Use shorter distances, slower timing, larger targets and seated or supported alternatives.',
    wheelchair: 'Keep turning space clear, place equipment at reachable height and replace running with rolling, throwing or coordination roles.',
    sensory: 'Use clear visual instructions, predictable turns, lower noise and an optional quiet role.',
    norunning: 'Use walking, rolling, throwing, balancing or stationary coordination instead of running.',
    younger: 'Use short rounds, simple instructions, larger equipment and more adult support.',
    large: 'Use parallel stations or short rotations to reduce waiting time.',
    outdoor: 'Check the surface and weather, secure lightweight equipment and prepare an indoor/low-equipment alternative.',
  };

  const range = peopleRange(input.people);
  const equipmentMatchedTemplates = input.equipment === 'any'
    ? activityTemplates
    : activityTemplates.filter(template => template.equipmentTags.includes(input.equipment));
  const candidates = equipmentMatchedTemplates.length ? equipmentMatchedTemplates : activityTemplates;

  const scored = candidates
    .map((template, idx) => {
      let score = 0;
      if (template.goals.includes(input.goal)) score += 6;
      if (template.equipmentTags.includes(input.equipment)) score += 5;
      if (input.equipment === 'any') score += 2;
      if (template.locations.includes(input.location)) score += 3;
      if (template.intensities.includes(input.intensity)) score += 2;
      if (range.max >= template.peopleMin && range.min <= template.peopleMax) score += 2;
      score += accessibilityScore(template, input.accessibility);

      if (input.members === 'Children 3-6' && template.youngerFriendly) score += 2;
      if ((input.members === 'Parents + grandparents' || input.members === 'Mixed generations') && template.lowImpact) score += 2;
      if ((input.members === 'School/preschool group' || input.members === 'Community group') && template.largeGroup) score += 2;
      if (input.goal === 'calm' && !template.intensities.includes('Very low') && !template.intensities.includes('Low')) score -= 3;
      if (input.intensity === 'High-energy' && template.lowImpact) score -= 1;

      return { template, idx, score };
    })
    .sort((a, b) => b.score - a.score || a.idx - b.idx);

  const bestScore = scored[0]?.score ?? 0;
  const pool = scored.filter(item => item.score >= bestScore - 1).map(item => item.template);
  const template = pool[Math.abs(ideaIndex) % Math.max(pool.length, 1)] || activityTemplates[0];

  const durationNote = input.duration === '5 minutes'
    ? 'Use one short practice round rather than a full timed competition.'
    : input.duration === '60 minutes'
      ? 'Run several rounds, rotate roles and finish with a family-created variation.'
      : 'Run one or two rounds depending on group size and available time.';

  const peopleNote = input.people === '12+'
    ? 'For a large group, create parallel stations or a clear rotation schedule.'
    : input.people === '2'
      ? 'With two people, alternate active and guiding/scoring roles where needed.'
      : 'Rotate roles so everyone contributes.';

  const matchReasons = [
    template.goals.includes(input.goal) ? 'goal' : null,
    template.equipmentTags.includes(input.equipment) || input.equipment === 'any' ? 'equipment' : null,
    template.locations.includes(input.location) ? 'location' : null,
    template.intensities.includes(input.intensity) ? 'intensity' : null,
    input.accessibility !== 'mixed' ? 'accessibility' : null,
  ].filter(Boolean);

  return {
    title: template.title,
    duration: input.duration,
    bestFor: [input.members, input.people + ' people', input.location].join(' · '),
    intensity: input.intensity,
    goal: template.summary,
    equipment: input.equipment === 'any'
      ? template.equipmentDetail
      : `${selectedEquipmentGuidance[input.equipment] || ''} ${template.equipmentDetail}`.trim(),
    steps: [
      'Prepare a safe activity area and explain the objective before starting.',
      ...template.steps,
      durationNote + ' ' + peopleNote,
    ],
    easier: template.easier,
    harder: template.harder,
    adaptation: template.adaptation + ' ' + (accessibilityText[input.accessibility] || accessibilityText.mixed),
    safety: template.safety,
    sourceTitle: template.sourceTitle,
    sourceUrl: template.sourceUrl,
    videoUrl: template.videoUrl,
    matchReason: matchReasons.length ? 'Matched to your selected ' + matchReasons.join(', ') + '.' : 'Selected from the Resource Library activity materials.',
  };
}
