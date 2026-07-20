const industries = [
  { name: 'Restaurants & F&B', desc: 'Reels, geo-targeted Meta Ads and delivery-app funnels.' },
  { name: 'Fitness & Wellness', desc: 'Membership lead generation and community building.' },
  { name: 'Real Estate', desc: 'High-intent lead capture and long-form video campaigns.' },
  { name: 'D2C & E-commerce', desc: 'ROAS-focused Meta and Google Ads with creative testing.' },
  { name: 'Education & Coaching', desc: 'Webinar funnels, retargeting and organic content systems.' },
  { name: 'Healthcare & Clinics', desc: 'Local SEO, reputation and appointment lead flows.' },
  { name: 'B2B & Professional', desc: 'LinkedIn thought leadership and Google search capture.' },
  { name: 'Beauty & Lifestyle', desc: 'Influencer collaborations and content-led social growth.' },
];

const faqs = [
  {
    q: 'What does HydroBlaze Media do as a digital marketing agency?',
    a: 'HydroBlaze Media is a performance-driven digital marketing agency in Bangalore offering social media marketing, Meta Ads, Google Ads, branding, website development and lead generation. We combine data-led strategy with creative execution to help brands generate qualified leads and grow revenue.',
  },
  {
    q: 'Do you run Meta Ads and Google Ads campaigns?',
    a: 'Yes. Our performance marketing team runs full-funnel Meta Ads (Facebook and Instagram) and Google Ads (Search, Performance Max, YouTube). Every campaign is structured around clear KPIs — cost per lead, ROAS and pipeline value — with weekly optimisation and transparent reporting.',
  },
  {
    q: 'How is your social media marketing different?',
    a: 'We treat social as a growth channel, not a posting calendar. Every account gets a strategy-first plan covering positioning, content pillars, reel hooks and community engagement — executed by dedicated designers and editors, not junior interns.',
  },
  {
    q: 'Do you build websites and landing pages?',
    a: 'Yes. Our website development team ships fast, SEO-friendly marketing sites and high-converting landing pages built on modern stacks. Every build is optimised for Core Web Vitals, mobile performance and conversion tracking.',
  },
  {
    q: 'How do you generate qualified leads for businesses?',
    a: 'We design end-to-end lead generation systems — paid traffic, landing pages, lead magnets, CRM automation and follow-up sequences — so sales teams receive qualified enquiries, not just form fills.',
  },
  {
    q: 'Are you a digital marketing agency in Bangalore?',
    a: 'Yes, HydroBlaze Media is headquartered in Bangalore, Karnataka. We work with clients across Bangalore, pan-India and internationally, delivering strategy, creative and paid media remotely with structured weekly touchpoints.',
  },
  {
    q: 'What does branding include?',
    a: 'Our branding services cover logo design, colour and typography systems, brand guidelines, tone of voice and launch collateral — everything needed to present a professional identity across digital and offline surfaces.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free discovery call or request an audit through the contact form. We review your current performance, share a growth plan tailored to your goals, and only start once the fit is right.',
  },
];

const HomeSeoContent = () => {
  return (
    // Content kept in the DOM for crawlers (sr-only) but hidden from visual UI.
    // FAQ schema is still emitted via JSON-LD in src/pages/Index.tsx.
    <div className="sr-only" aria-hidden="true">
      <section>
        <h2>About HydroBlaze Media — Digital Marketing Agency in Bangalore</h2>
        <p>
          HydroBlaze Media is a performance-driven digital marketing agency based in Bangalore, Karnataka, working with ambitious brands across India and internationally. We combine analytical strategy with editorial-grade creative to help businesses generate leads, grow revenue and scale sustainably.
        </p>
        <p>
          We are a full-service marketing partner — social media marketing, Meta Ads, Google Ads, branding, website development, content production and lead generation all sit under one roof. Instead of stitching together freelancers or juggling multiple vendors, teams work with a single accountable partner that owns the outcome end to end.
        </p>
        <p>
          Every engagement starts with a growth diagnosis: audience research, channel mix, funnel gaps and creative benchmarks. From there we build a 90-day roadmap tied to real business KPIs — cost per lead, return on ad spend, pipeline value and revenue — and execute in tight weekly cycles with transparent reporting.
        </p>
      </section>

      <section>
        <h2>Industries We Serve</h2>
        <ul>
          {industries.map((i) => (
            <li key={i.name}><strong>{i.name}:</strong> {i.desc}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <dl>
          {faqs.map((f) => (
            <div key={f.q}>
              <dt><h3>{f.q}</h3></dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default HomeSeoContent;