export const metadata = {
  title: 'Family Cup Activity Toolkit | Home & Heart Digital Knowledge Hub',
  description: 'A practical toolkit for organising the Home & Heart Family Cup, with scoring, safety guidance and 12 family activity stations.',
};

const activities = [
  ['Laser Biathlon', 'A four-person relay combining five target shots per participant with an age-adapted running section.'],
  ['Ringo Flamingo', 'A family target challenge where participants throw rings onto flamingo figures and work together to complete seven successful throws.'],
  ['Obstacle Course', 'A communication challenge where participants cross an obstacle course while relying on verbal guidance from family teammates.'],
  ['Ball Path', 'A teamwork activity where participants coordinate a shared board to guide a ball from the start to the finish.'],
  ['Basketball Shots', 'A target activity where the family works to score successfully in five different basketball hoops.'],
  ['Ball Knockdown', 'A throwing challenge where participants work together to knock down all target bottles as quickly as possible.'],
  ['Ladder Golf', 'A target game where the team throws bolas onto ladder rungs and aims to reach the required score.'],
  ['Duck Race', 'A cooperative challenge where participants use air to move a floating duck along a water channel and back.'],
  ['Cube Puzzle', 'A family problem-solving activity where participants assemble a large picture puzzle together as quickly as possible.'],
  ['Recycling Game', 'A teamwork and learning activity where families sort waste-item tokens into the correct recycling categories.'],
  ['Moving Spoons', 'A coordination challenge where participants transfer a ball through vertically arranged spoons and into a bucket.'],
  ['Blow Challenge', 'An individual bonus station where participants blow a table-tennis ball along a sloped track and record the furthest distance.'],
];

export default function FamilyCupActivityToolkitPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f4fbff', color: '#073f67', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ width: 'min(1040px, calc(100% - 32px))', margin: '0 auto', padding: '48px 0 64px' }}>
        <a href="/" style={{ color: '#0789c8', fontWeight: 800, textDecoration: 'none' }}>← Back to the Knowledge Hub</a>

        <section style={{ marginTop: 24, background: '#fff', border: '1px solid #cbe9f7', borderRadius: 24, padding: 28 }}>
          <p style={{ margin: 0, color: '#0789c8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 13 }}>Home & Heart European Family Festival</p>
          <h1 style={{ margin: '10px 0 14px', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.05 }}>Family Cup Activity Toolkit</h1>
          <p style={{ margin: 0, color: '#335b78', fontSize: 18, lineHeight: 1.6 }}>
            A practical toolkit for families, coaches, organisations and municipalities wishing to organise cooperative family activity stations inspired by the Home & Heart Family Cup.
          </p>
        </section>

        <section style={{ marginTop: 22, display: 'grid', gap: 18 }}>
          <article style={{ background: '#fff', border: '1px solid #cbe9f7', borderRadius: 20, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>How the Family Cup works</h2>
            <p style={{ color: '#335b78', lineHeight: 1.65 }}>
              The activities are designed to promote teamwork, communication, cooperation and a positive family experience rather than focusing only on strength or speed. Activities can use age- and gender-based starting positions or progressive difficulty adjustments to help balance differences in physical ability.
            </p>
            <p style={{ color: '#335b78', lineHeight: 1.65 }}>
              The programme consists of 11 team stations and one individual bonus station. Team stations are ranked by finishing time, with lower total points producing the better overall result; the individual station can award bonus points in age and gender categories.
            </p>
          </article>

          <article style={{ background: '#fff', border: '1px solid #cbe9f7', borderRadius: 20, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>General safety principle</h2>
            <p style={{ color: '#335b78', lineHeight: 1.65, marginBottom: 0 }}>
              Safety takes priority at every station. Participants should follow the supervisor's instructions, and nobody should enter an active throwing or movement zone until it is safe to do so.
            </p>
          </article>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 30, marginBottom: 16 }}>Activity stations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {activities.map(([title, description], index) => (
              <article key={title} style={{ background: '#fff', border: '1px solid #cbe9f7', borderRadius: 18, padding: 20 }}>
                <span style={{ display: 'inline-flex', background: '#eef9fd', color: '#0789c8', borderRadius: 999, padding: '6px 10px', fontSize: 12, fontWeight: 800 }}>
                  Activity {index + 1}
                </span>
                <h3 style={{ margin: '12px 0 8px', fontSize: 20 }}>{title}</h3>
                <p style={{ margin: 0, color: '#335b78', lineHeight: 1.55 }}>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28, background: '#fff', border: '1px solid #cbe9f7', borderRadius: 20, padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>Using the toolkit</h2>
          <p style={{ color: '#335b78', lineHeight: 1.65, marginBottom: 0 }}>
            Station distances, equipment, difficulty and timing can be adapted to the age, ability and size of the participating group. The emphasis should remain on communication, mutual support, safe participation and enjoying the activity together as a family.
          </p>
        </section>
      </div>
    </main>
  );
}
