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

function generateActivity(input: ActivityInput) {
  const duration = input.duration;
  const activityMap: Record<string, string> = {
    teamwork: 'Family Mission Relay',
    balance: 'Balance Trail Adventure',
    calm: 'Move & Breathe Together',
    connection: 'Generations in Motion',
    energy: 'Home & Heart Movement Circuit',
  };

  const goalText: Record<string, string> = {
    teamwork: 'cooperation, communication and encouragement',
    balance: 'coordination, balance and body awareness',
    calm: 'gentle movement, breathing and wellbeing',
    connection: 'intergenerational connection and shared roles',
    energy: 'an active energy boost with safe movement variety',
  };

  const accessibilityText: Record<string, string> = {
    mixed: 'Offer each family member a choice of walking, rolling, stepping or seated movement.',
    low: 'Use shorter distances, slower timing and seated alternatives for every task.',
    wheelchair: 'Create clear turning space and use object-passing, rolling or target activities instead of running.',
    sensory: 'Avoid loud sounds, give clear visual instructions and allow a quiet role such as scorekeeper or designer.',
    norunning: 'Replace running with walking, balancing, throwing, stretching or rhythm tasks.',
  };

  const equipmentText = input.equipment === 'none'
    ? 'No special equipment is needed.'
    : `Use ${input.equipment} as the main shared material.`;

  return {
    title: activityMap[input.goal] || 'Family Play Challenge',
    duration,
    bestFor: `${input.members} · ${input.people} people · ${input.location}`,
    intensity: input.intensity,
    goal: goalText[input.goal] || 'movement, play and family cooperation',
    equipment: equipmentText,
    steps: [
      `Prepare a safe ${input.location} space and agree that the aim is participation, not winning.`,
      `Start with a two-minute warm-up where each family member suggests one simple movement.`,
      `Create three short stations focused on ${goalText[input.goal] || 'movement and cooperation'}.`,
      `Rotate roles after each station: mover, encourager, timekeeper and creative rule-maker.`,
      `Finish with a calm cool-down and one reflection question: what helped everyone feel included?`,
    ],
    easier: 'Reduce distance, remove time pressure, use fewer stations or allow seated movements.',
    harder: 'Add memory tasks, teamwork rules, balance challenges or a family-created final round.',
    adaptation: accessibilityText[input.accessibility] || accessibilityText.mixed,
    safety: 'Keep the route clear, avoid slippery surfaces, check that everyone understands the activity and prioritise controlled movement over speed.',
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

  const activity = useMemo(() => generateActivity({ members, people, location, duration, goal, equipment, accessibility, intensity }), [members, people, location, duration, goal, equipment, accessibility, intensity]);
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
              <label>Family members<select value={members} onChange={e => setMembers(e.target.value)}><option>Mixed generations</option><option>Children 3-6</option><option>Children 7-12</option><option>Teenagers</option><option>Parents + grandparents</option></select></label>
              <label>Number of people<select value={people} onChange={e => setPeople(e.target.value)}><option>2-3</option><option>4-5</option><option>6+</option></select></label>
              <label>Location<select value={location} onChange={e => setLocation(e.target.value)}><option>Home / indoor space</option><option>Park / outdoor space</option><option>Beach</option><option>Sports hall</option><option>School yard</option><option>Small indoor space</option></select></label>
              <label>Time available<select value={duration} onChange={e => setDuration(e.target.value)}><option>10 minutes</option><option>20 minutes</option><option>30 minutes</option><option>45 minutes</option></select></label>
              <label>Goal<select value={goal} onChange={e => setGoal(e.target.value)}><option value="energy">Energy boost</option><option value="teamwork">Teamwork</option><option value="balance">Balance & coordination</option><option value="calm">Calm movement</option><option value="connection">Intergenerational connection</option></select></label>
              <label>Equipment<select value={equipment} onChange={e => setEquipment(e.target.value)}><option value="none">No special equipment</option><option value="a ball or balloon">Ball or balloon</option><option value="cones or household objects">Cones / markers</option><option value="music">Music</option><option value="chalk or paper cards">Chalk / paper cards</option></select></label>
              <label>Accessibility<select value={accessibility} onChange={e => setAccessibility(e.target.value)}><option value="mixed">Mixed abilities</option><option value="low">Limited mobility</option><option value="wheelchair">Wheelchair-friendly</option><option value="sensory">Sensory-friendly</option><option value="norunning">No running / low impact</option></select></label>
              <label>Intensity<select value={intensity} onChange={e => setIntensity(e.target.value)}><option>Low</option><option>Medium</option><option>Active</option></select></label>
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
              <button><RotateCcw size={16}/> Generate another idea</button>
              <button><Download size={16}/> Print / save activity card</button>
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
