'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { generateActivity } from './activity-generator';
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
  Send,
  ShieldCheck,
  Sparkles,
  Tent,
  UploadCloud,
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
const typeOptions = ['All types', 'Document', 'Video', 'Photos'];

const resourceItems = [
  {
    type: 'Guidelines',
    topics: ['Activities', 'Toolkits & Templates'],
    title: 'Sport for the Whole Family – Guidelines',
    description: 'Guidelines, research findings and activity modules for designing and adapting intergenerational family sport programmes.',
    audiences: ['Families', 'Coaches', 'Organisations', 'Policymakers'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://sportforfamily.eu/docs/Guidelines/Guidelines_EN.docx',
    image: '/visuals/resource-covers/sport-for-the-whole-family-guidelines.jpg',
  },
  {
    type: 'Toolkit',
    topics: ['Activities', 'Toolkits & Templates'],
    title: 'Using Sport and Physical Activity to Promote Social Inclusion – Toolkit',
    description: 'Practical guidance for coaches, teachers and organisations using sport and physical activity to promote social inclusion and community cohesion.',
    audiences: ['Coaches', 'Organisations'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://ec.europa.eu/programmes/erasmus-plus/project-result-content/2b00fa65-d803-4b4c-a36b-81cc11ee4978/ISC_toolkit_ENG..pdf',
    image: '/visuals/resource-covers/sport-social-inclusion-toolkit.jpg',
  },
  {
    type: 'Toolkit',
    topics: ['Activities', 'Event organisation', 'Toolkits & Templates'],
    title: 'Joy in Sport and Physical Activity Toolkit',
    description: 'A practical toolkit for joyful physical activity events, including the festival method, activation ideas and station-based movement formats.',
    audiences: ['Families', 'Coaches', 'Organisations'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://www.essd.eu/api/uploads/ESSD_2023_Joy_In_Sport_toolkit_FINAL_7e28f2247f.pdf',
    image: '/visuals/resource-covers/joy-in-sport-toolkit.jpg',
  },
  {
    type: 'Policy recommendations',
    topics: ['Policy & Advocacy'],
    title: 'Family Friendly Sport – Policy Recommendations',
    description: 'Policy recommendations for local authorities and national sport federations to recognise, support and promote family friendly sport.',
    audiences: ['Policymakers', 'Municipalities', 'Organisations'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://familyfriendlysport.net/wp-content/uploads/2024/01/D4.2-FFS-policy-recommendations.pdf',
    image: '/visuals/resource-covers/family-friendly-sport-policy-recommendations.jpg',
  },
  {
    type: 'Toolkit',
    topics: ['Activities', 'Toolkits & Templates'],
    title: 'COME IN – Inclusive Grassroots Sport Toolkit',
    description: 'A toolkit for coaches, educators, volunteers and grassroots sport organisations creating inclusive sport experiences for young people with disabilities.',
    audiences: ['Coaches', 'Organisations', 'Municipalities'],
    resourceType: 'Document',
    language: 'English',
    file: 'https://ec.europa.eu/programmes/erasmus-plus/project-result-content/d4ea10e9-fbdd-47b6-8d01-672a3a8a43e0/COME-IN_tookit.pdf',
    image: '/visuals/resource-covers/come-in-inclusive-sport-toolkit.jpg',
  },
];

export default function Page() {
  const [query, setQuery] = useState('');
  const [audience, setAudience] = useState('All audiences');
  const [topic, setTopic] = useState('All topics');
  const [resourceType, setResourceType] = useState('All types');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const [members, setMembers] = useState('Mixed generations');
  const [people, setPeople] = useState('4-5');
  const [location, setLocation] = useState('Park / outdoor space');
  const [duration, setDuration] = useState('20 minutes');
  const [goal, setGoal] = useState('teamwork');
  const [equipment, setEquipment] = useState('any');
  const [accessibility, setAccessibility] = useState('mixed');
  const [intensity, setIntensity] = useState('Medium');
  const [ideaIndex, setIdeaIndex] = useState(0);

  const activity = useMemo(() => generateActivity({ members, people, location, duration, goal, equipment, accessibility, intensity }, ideaIndex), [members, people, location, duration, goal, equipment, accessibility, intensity, ideaIndex]);

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...resourceItems].reverse().filter((resource) => {
      const matchesQuery = !q || [resource.title, resource.description, resource.resourceType, resource.language, ...resource.topics, ...resource.audiences]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesAudience = audience === 'All audiences' || resource.audiences.includes(audience);
      const matchesTopic = topic === 'All topics' || resource.topics.includes(topic);
      const matchesType = resourceType === 'All types' || resource.resourceType === resourceType;
      return matchesQuery && matchesAudience && matchesTopic && matchesType;
    });
  }, [query, audience, topic, resourceType]);

  const clearFilters = () => {
    setQuery('');
    setAudience('All audiences');
    setTopic('All topics');
    setResourceType('All types');
  };

  const handleMaterialSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmissionStatus('sending');
    setSubmissionMessage('');

    try {
      const response = await fetch('/api/submit-material', {
        method: 'POST',
        body: data,
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'The submission could not be sent. Please try again later.');
      }

      form.reset();
      setSubmissionStatus('success');
      setSubmissionMessage('Thank you! Your material has been submitted for review. It will be assessed before being added to the Resource Library.');
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage(error instanceof Error ? error.message : 'The submission could not be sent. Please try again later.');
    }
  };

  const escapeHtml = (value: string) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const printActivityCard = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=720');

    if (!printWindow) {
      window.print();
      return;
    }

    const steps = activity.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('');
    const activityHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(activity.title)} | Activity card</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; background: #ffffff; color: #073f67; font-family: Arial, Helvetica, sans-serif; }
    .card { max-width: 860px; margin: 0 auto; border: 1px solid #cbe9f7; border-radius: 22px; padding: 28px; }
    .badge, .meta span { display: inline-block; background: #eef9fd; color: #0789c8; border-radius: 999px; font-weight: 800; font-size: 12px; padding: 6px 10px; }
    h1 { margin: 12px 0 12px; font-size: 30px; line-height: 1.15; color: #073f67; }
    h2 { margin: 20px 0 8px; font-size: 18px; color: #073f67; }
    p, li { color: #335b78; font-size: 14px; line-height: 1.5; }
    strong { color: #073f67; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 18px; }
    ol { padding-left: 20px; margin: 8px 0 16px; }
    .adapt { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
    .adapt p { border: 1px solid #cbe9f7; border-radius: 14px; padding: 12px; margin: 0; background: #f7fcff; }
    .source { margin-top: 18px; padding-top: 12px; border-top: 1px solid #cbe9f7; font-size: 12px; color: #5a748a; }
    @media print { body { padding: 0; } .card { border: none; border-radius: 0; padding: 0; max-width: none; } }
  </style>
</head>
<body>
  <article class="card">
    <span class="badge">Generated activity card</span>
    <h1>${escapeHtml(activity.title)}</h1>
    <div class="meta"><span>${escapeHtml(activity.duration)}</span><span>${escapeHtml(activity.bestFor)}</span><span>${escapeHtml(activity.intensity)} intensity</span></div>
    <p><strong>Goal:</strong> ${escapeHtml(activity.goal)}</p>
    <p><strong>Equipment:</strong> ${escapeHtml(activity.equipment)}</p>
    <h2>How to play</h2>
    <ol>${steps}</ol>
    <div class="adapt">
      <p><strong>Make it easier:</strong> ${escapeHtml(activity.easier)}</p>
      <p><strong>Make it harder:</strong> ${escapeHtml(activity.harder)}</p>
      <p><strong>Inclusive adaptation:</strong> ${escapeHtml(activity.adaptation)}</p>
      <p><strong>Safety note:</strong> ${escapeHtml(activity.safety)}</p>
    </div>
    <p class="source"><strong>Based on Resource Library material:</strong> ${escapeHtml(activity.sourceTitle)}${activity.videoUrl ? ' · Matching activity instruction video available online.' : ''}</p>
  </article>
  <script>
    window.onload = () => {
      window.focus();
      window.print();
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(activityHtml);
    printWindow.document.close();
  };


  return (
    <main>
      <header className="topbar">
        <div className="container nav">
          <a href="#top" aria-label="Home & Heart Digital Knowledge Hub"><img src="/visuals/home-heart-logo.png" alt="Home & Heart European Family Festival logo" /></a>
          <nav className="navlinks" aria-label="Main navigation">
            <a href="#library">Library</a>
            <a href="#tools">Activity generator</a>
            <a href="#submit-materials">Submit material</a>
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
                <p>The Hub provides resources developed throughout the project, including materials emerging from the pilot event — the European Family Festival — alongside additional tools, guides and learning materials relevant for families, sport organisations, municipalities, partners and other target groups. In the long term, it will also serve as a place for materials from other initiatives.</p>
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
                  <div className="festival-details festival-summary">
                    <p><MapPin size={19}/><strong>Place:</strong> Uzvaras Parks, Riga, Latvia</p>
                    <p><UsersRound size={19}/><strong>International participation:</strong> 50 families · 200 participants</p>
                    <p><UsersRound size={19}/><strong>Local participation:</strong> 657 families · 2,320 participants</p>
                    <p><ClipboardCheck size={19}/><strong>Programme:</strong> <a href="https://www.gimenufestivals.lv/" target="_blank" rel="noreferrer">View the programme</a></p>
                  </div>

                  <div className="festival-date-grid">
                    <div className="festival-date-card">
                      <div className="festival-date-heading">
                        <CalendarDays size={22}/>
                        <div>
                          <strong>22nd of August 2026</strong>
                          <span>Family Cup</span>
                        </div>
                      </div>
                      <div className="festival-media-links">
                        <a href="https://youtube.com/live/lIMjOrZcsyo?feature=share" target="_blank" rel="noreferrer"><Radio size={18}/> Watch the Family Cup livestream</a>
                        <a href="https://www.youtube.com/watch?v=MCNF4W-nCBE" target="_blank" rel="noreferrer"><PlayCircle size={18}/> Watch the recap video</a>
                        <a href="https://www.facebook.com/lsfp.lv/posts/pfbid051NFhdqjMFQqCXzuLYdoznhfjtaRKXiGvCJBNHUAXwcTzDqJ5DYAgzH5UfynfhStl" target="_blank" rel="noreferrer"><UsersRound size={18}/> View Family Cup photos</a>
                      </div>
                    </div>

                    <div className="festival-date-card">
                      <div className="festival-date-heading">
                        <CalendarDays size={22}/>
                        <div>
                          <strong>19th of September 2026</strong>
                          <span>European Family Festival</span>
                        </div>
                      </div>
                      <div className="festival-media-links">
                        <a href="https://www.facebook.com/lsfp.lv/posts/pfbid02tkiTxRsTg7t4XJVvDwKPeTNy45uva7v6JLxCNzCZFsTckNLqpfzkbquUG6xcomEnl" target="_blank" rel="noreferrer"><UsersRound size={18}/> View Festival photos</a>
                      </div>
                    </div>
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
                <p>Find materials by audience, topic and type</p>
              </div>
            </div>
            <p className="intro compact">Search, filter and access practical resources for families, sport organisations, municipalities, policymakers, coaches and project partners.</p>

            <div className="search-filter-card compact-filters" aria-label="Resource search and filters">
              <label className="searchbox">
                <Search size={20}/>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources by keyword, topic, audience, type or language…" />
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
                <label>
                  <span>Type</span>
                  <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
                    {typeOptions.map((item) => <option key={item}>{item}</option>)}
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
                const downloadName = 'downloadName' in resource && typeof resource.downloadName === 'string' ? resource.downloadName : undefined;
                const isDownload = Boolean(downloadName);
                const cardContent = (
                  <>
                    <div className="resource-visual resource-cover-wrap">
                      <img className="resource-cover" src={resource.image} alt={`${resource.title} cover`} />
                    </div>
                    <div className="resource-body">
                      <div className="resource-tags"><span>{resource.resourceType}</span>{resource.topics.map(tag => <span key={tag}>{tag}</span>)}<span className="language-tag">Language: {resource.language}</span></div>
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      {resource.quizLink && <a className="resource-quiz-link" href={resource.quizLink} target="_blank" rel="noopener noreferrer">Take the quiz</a>}
                      <div className="audience-tags">{resource.audiences.map(tag => <em key={tag}>{tag}</em>)}</div>
                    </div>
                    <ChevronRight className="resource-arrow" size={24}/>
                  </>
                );

                return resource.quizLink ? (
                  <div className="resource-card resource-card-with-quiz" key={resource.title}>
                    <a className="resource-card-primary-link" href={resource.file} target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.title}`} />
                    {cardContent}
                  </div>
                ) : (
                  <a className="resource-card" href={resource.file} target={isDownload ? undefined : "_blank"} rel="noopener noreferrer" download={downloadName} key={resource.title} aria-label={isDownload ? `Download ${resource.title}` : `Open ${resource.title}`}>
                    {cardContent}
                  </a>
                );
              })}
            </div>

            <div className="submit-callout">
              <div>
                <strong>Have a useful family sport or physical activity material?</strong>
                <p>Organisations can submit documents, videos or photo materials for review by the Home & Heart project team.</p>
              </div>
              <a className="btn primary compact-btn" href="#submit-materials"><UploadCloud size={18}/> Submit your material</a>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="section alt">
        <div className="container tool advanced-tool">
          <div className="panel">
            <span className="kicker light"><Activity size={16}/> Interactive tool</span>
            <h3>Family Activity Generator</h3>
            <p>Create a ready-to-use family movement idea adapted from activities and guidance in the Resource Library. The generator now matches your group, location, equipment, intensity and accessibility needs to the most relevant published material.</p>
            <div className="formgrid advanced-form">
              <label>Family members<select value={members} onChange={e => { setMembers(e.target.value); setIdeaIndex(0); }}><option>Mixed generations</option><option>Children 3-6</option><option>Children 7-12</option><option>Teenagers</option><option>Parents + children</option><option>Parents + grandparents</option><option>Full family group</option><option>School/preschool group</option><option>Community group</option></select></label>
              <label>Number of people<select value={people} onChange={e => { setPeople(e.target.value); setIdeaIndex(0); }}><option>2</option><option>2-3</option><option>3-4</option><option>4-5</option><option>6-8</option><option>9-12</option><option>12+</option></select></label>
              <label>Location<select value={location} onChange={e => { setLocation(e.target.value); setIdeaIndex(0); }}><option>Home / indoor space</option><option>Park / outdoor space</option><option>Beach</option><option>Sports hall</option><option>School yard</option><option>Playground</option><option>Small indoor space</option><option>Community event area</option></select></label>
              <label>Time available<select value={duration} onChange={e => { setDuration(e.target.value); setIdeaIndex(0); }}><option>5 minutes</option><option>10 minutes</option><option>15 minutes</option><option>20 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></label>
              <label>Goal<select value={goal} onChange={e => { setGoal(e.target.value); setIdeaIndex(0); }}><option value="energy">Energy boost</option><option value="teamwork">Teamwork</option><option value="balance">Balance & coordination</option><option value="calm">Calm movement</option><option value="connection">Intergenerational connection</option><option value="accuracy">Accuracy / target practice</option><option value="memory">Memory & focus</option><option value="strategy">Strategy & decision-making</option><option value="event">Event station / relay format</option></select></label>
              <label>Equipment available<select value={equipment} onChange={e => { setEquipment(e.target.value); setIdeaIndex(0); }}><option value="any">Any / flexible</option><option value="none">No special equipment</option><option value="a ball or balloon">Ball / soft ball</option><option value="cones or household objects">Cones / markers</option><option value="hula hoops or rope circles">Rings / hoops</option><option value="target equipment">Target / throwing equipment</option><option value="puzzle or cards">Puzzle / picture cards</option><option value="containers and cards">Boxes / containers + sorting cards</option><option value="spoons and small ball">Spoons + small ball</option><option value="air and water equipment">Water channel + hand air pumps</option><option value="sloped track and small ball">Sloped track + table-tennis ball</option><option value="music">Music</option><option value="chalk or paper cards">Paper task / sorting cards</option><option value="basket or box">Basket / box</option><option value="mixed balls and markers">Mixed balls + markers</option></select></label>
              <label>Accessibility<select value={accessibility} onChange={e => { setAccessibility(e.target.value); setIdeaIndex(0); }}><option value="mixed">Mixed abilities</option><option value="low">Limited mobility</option><option value="wheelchair">Wheelchair-friendly</option><option value="sensory">Sensory-friendly</option><option value="norunning">No running / low impact</option><option value="younger">Younger children</option><option value="large">Large group</option><option value="outdoor">Outdoor/weather adaptable</option></select></label>
              <label>Intensity<select value={intensity} onChange={e => { setIntensity(e.target.value); setIdeaIndex(0); }}><option>Very low</option><option>Low</option><option>Medium</option><option>Active</option><option>High-energy</option></select></label>
            </div>
            <p className="generator-source-note"><BookOpen size={18}/> Suggestions are adapted from published Resource Library materials. If you select specific equipment, the generator will only choose activities that actually use that equipment. Each result shows the source and, where available, the matching activity instruction video.</p>
          </div>
          <div className="result activity-card-output">
            <span className="badge">Generated activity card</span>
            <h3>{activity.title}</h3>
            <div className="activity-meta">
              <span>{activity.duration}</span><span>{activity.bestFor}</span><span>{activity.intensity} intensity</span>
            </div>
            <p><strong>Goal:</strong> {activity.goal}</p>
            <p><strong>Equipment:</strong> {activity.equipment}</p>
            <p className="activity-match"><Sparkles size={16}/> {activity.matchReason}</p>
            <div className="activity-source-box">
              <span><BookOpen size={17}/> Based on library material</span>
              <a href={activity.sourceUrl} target="_blank" rel="noopener noreferrer">{activity.sourceTitle}</a>
              {activity.videoUrl && <a href={activity.videoUrl} target="_blank" rel="noopener noreferrer">Watch activity instruction video</a>}
            </div>
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
              <button type="button" onClick={printActivityCard}><Download size={16}/> Print activity card</button>
            </div>
          </div>
          <article className="print-activity-card" aria-hidden="true">
            <span className="print-badge">Generated activity card</span>
            <h1>{activity.title}</h1>
            <div className="print-meta"><span>{activity.duration}</span><span>{activity.bestFor}</span><span>{activity.intensity} intensity</span></div>
            <p><strong>Goal:</strong> {activity.goal}</p>
            <p><strong>Equipment:</strong> {activity.equipment}</p>
            <h2>How to play</h2>
            <ol>{activity.steps.map(step => <li key={step}>{step}</li>)}</ol>
            <div className="print-adapt">
              <p><strong>Make it easier:</strong> {activity.easier}</p>
              <p><strong>Make it harder:</strong> {activity.harder}</p>
              <p><strong>Inclusive adaptation:</strong> {activity.adaptation}</p>
              <p><strong>Safety note:</strong> {activity.safety}</p>
            </div>
            <p className="print-source">Based on Resource Library material: {activity.sourceTitle}</p>
          </article>
        </div>
      </section>


      <section id="submit-materials" className="section submit-section">
        <div className="container submit-layout">
          <div className="submit-intro panel">
            <span className="kicker"><UploadCloud size={16}/> Share resources</span>
            <h3>Submit your material</h3>
            <p>Organisations are invited to submit relevant family sport, physical activity, inclusion or event organisation materials for possible publication in the Resource Library.</p>
            <div className="review-note">
              <ShieldCheck size={22}/>
              <p><strong>Review before publication:</strong> submitted materials will be reviewed by the Home & Heart project team before they are uploaded to the Resource Library.</p>
            </div>
            <p className="small-note">For large videos or photo galleries, please add a public link instead of uploading a large file.</p>
          </div>

          <form className="submission-form" onSubmit={handleMaterialSubmit}>
            <div className="form-row two">
              <label>Organisation name<input name="organisation" required placeholder="Organisation name" /></label>
              <label>Contact person<input name="contactPerson" required placeholder="Name and surname" /></label>
            </div>
            <div className="form-row two">
              <label>Email<input name="contactEmail" type="email" required placeholder="name@example.eu" /></label>
              <label>Material title<input name="materialTitle" required placeholder="Title of the submitted material" /></label>
            </div>
            <label>Short description<textarea name="description" required rows={4} placeholder="Briefly describe what the material is about and how it can support family sport or physical activity." /></label>

            <div className="form-row two">
              <fieldset>
                <legend>Target audience</legend>
                <div className="check-grid">
                  {['Families', 'Coaches', 'Organisations', 'Municipalities', 'Policymakers'].map(item => (
                    <label key={item}><input type="checkbox" name="audiences" value={item} /> {item}</label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Topic</legend>
                <div className="check-grid">
                  {['Activities', 'Toolkits & Templates', 'Event organisation', 'Policy & Advocacy'].map(item => (
                    <label key={item}><input type="checkbox" name="topics" value={item} /> {item}</label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="form-row two single-field">
              <label>Material type<select name="materialType" required defaultValue="Document"><option>Document</option><option>Video</option><option>Photos</option></select></label>
            </div>

            <label>Upload file<input name="materialFile" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.mp4,.mov,.zip" /></label>
            <label>Link to material, video or photo gallery<input name="materialLink" type="url" placeholder="https://..." /></label>

            <label className="consent-line"><input name="reviewConsent" type="checkbox" required /> I understand that the material will be reviewed before it is published in the Resource Library.</label>

            <button className="btn primary submit-btn" type="submit" disabled={submissionStatus === 'sending'}>
              <Send size={18}/>{submissionStatus === 'sending' ? 'Sending submission...' : 'Submit for review'}
            </button>
            {submissionMessage && <p className={`submission-message ${submissionStatus}`}>{submissionMessage}</p>}
          </form>
        </div>
      </section>

      <section className="section follow-section" id="follow">
        <div className="container follow-card">
          <div className="follow-copy">
            <span className="kicker"><HeartHandshake size={16}/> Project updates</span>
            <h2>Follow the project</h2>
            <p>Home & Heart: European Family Festival is an Erasmus+ Sport project promoting inclusive family sport, physical activity and shared learning across Europe.</p>
            <p>The Digital Knowledge Hub brings together practical resources, activity ideas and event organisation materials for families, coaches, sport organisations, municipalities and policymakers. Follow LSFP channels for project updates, new resources and information about the European Family Festival in Riga.</p>
          </div>
          <div className="social-grid" aria-label="Social media links">
            <a href="https://www.facebook.com/lsfp.lv/" target="_blank" rel="noopener noreferrer" aria-label="Follow LSFP on Facebook"><span className="social-icon">f</span><strong>Facebook</strong></a>
            <a href="https://www.instagram.com/lsfp.lv/" target="_blank" rel="noopener noreferrer" aria-label="Follow LSFP on Instagram"><span className="social-icon">◎</span><strong>Instagram</strong></a>
            <a href="https://www.linkedin.com/company/latvian-sports-federations-council?originalSubdomain=lv" target="_blank" rel="noopener noreferrer" aria-label="Follow LSFP on LinkedIn"><span className="social-icon">in</span><strong>LinkedIn</strong></a>
            <a href="https://www.youtube.com/@LatvijasSportafeder%C4%81cijupadome" target="_blank" rel="noopener noreferrer" aria-label="Follow LSFP on YouTube"><span className="social-icon">▶</span><strong>YouTube</strong></a>
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
                <div className="logo-card"><img src="/visuals/partners/firmasport.png" alt="FirmaSport logo" /></div>
                <div className="logo-card"><img src="/visuals/partners/hungarian-charity-service-malta.png" alt="Hungarian Charity Service of the Order of Malta logo" /></div>
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
