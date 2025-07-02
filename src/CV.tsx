import { useEffect, useState, type ReactNode } from 'react'
import './CV.css'

interface Link {
  text: string,
  url: string
}
type StringLike = string | Link;
type AggString = StringLike | Array<StringLike>;

function str(what: AggString | StringLike): ReactNode {
  if (Array.isArray(what)) {
    return what.map(str);
  } else if (typeof what === 'string') {
    return what;
  } else {
    return (<a href={what.url}>{what.text}</a>);
  }
}

interface Date {
  day?: number,
  month?: number,
  year: number
};

interface ContactInfo {
  location?: string,
  email?: string,
  phone?: string,
  website?: string
}

interface Position {
  company: AggString,
  title: AggString
  end?: Date,
  start: Date,
  summary?: AggString,
  highlights?: Array<AggString>
};

interface Project {
  name: AggString,
  url?: string,
  highlights?: Array<AggString>
};

interface Showcase {
  name: AggString,
  items: Array<Project>
};

interface SkillList {
  type?: AggString,
  items: Array<AggString>
};

interface CV {
  name: string,
  contact_info: ContactInfo,
  title?: AggString,
  summary?: AggString,
  keywords?: Array<string>,
  positions: Array<Position>,
  showcases?: Array<Showcase>,
  skills?: Array<SkillList>,
}

function contactInfo(name: string, ci: ContactInfo) {
  return (
    <div className='contact_info'>
      <div className='left'>
        <div className='location'>{ci.location}</div>
        <div className='phone'>{ci.phone}</div>
      </div>
      <h1 className='name'>{name}</h1>
      <div className='right'>
        <div className='email'>{ci.email}</div>
        <div className='website'>{ci.website}</div>
      </div>
    </div>
  );
}

function titleSummary(title?: AggString, summary?: AggString) {
  return (
    <>
      {title && <h2 className='title'>{str(title)}</h2>}
      {summary && <p className='cv_summary'>{str(summary)}</p>}
    </>
  );
}

function keywords(keywords?: Array<string>) {
  return keywords && (
    <ul className='keywords'>
      {keywords.map(kw => <li className='keyword'>{kw}</li>)}
    </ul>
  )
}

function date(date?: Date) {
  if (!date) {
    return 'Present';
  }

  const opts: Intl.DateTimeFormatOptions = {};
  if (date.day) {
    opts.day = 'numeric';
  }
  if (date.month) {
    opts.month = 'long';
  }
  opts.year = 'numeric';
  const formatter = new Intl.DateTimeFormat(navigator.language, opts);
  return formatter.format(new Date(date.year, (date.month ?? 1) - 1, date.day ?? 1));
}

function positions(positions: Array<Position>) {
  return (
    <div className='showcase positions'>
      <h2 className="showcase_name">Position History</h2>
      {positions.map(position => (
        <div className='position'>
          <h3 className='company'>{str(position.company)}</h3>
          <div className="position_details">
            <div className='position_title'>{str(position.title)}</div>
            <div className='position_duration'>{date(position.start)} - {date(position.end)}</div>
          </div>
          {position.summary && <div className='position_summary'>{str(position.summary)}</div>}
          {position.highlights && 
            <ul className="highlights">
            {position.highlights.map((hilite, idx) => <li key={idx}>{str(hilite)}</li>)}
            </ul>
          }
        </div>
      ))}
    </div>
  )
}

function showcases(showcases?: Array<Showcase>) {
  return showcases && showcases.map(showcase => (
    <div className="showcase">
      <h2 className="showcase_name">{str(showcase.name)}</h2>
      {showcase.items.map(item => (
        <div className="showcase_item">
          <div className="showcase_content">
            <h3 className="showcase_item_name">{str(item.name)}</h3>
            {item.url && <a href={item.url} className="showcase_item_url">{item.url}</a>}
          </div>
          {item.highlights &&
            <ul className="highlights">
              {item.highlights.map((hilite, idx) => <li key={idx}>{str(hilite)}</li>)}
            </ul>
          }
        </div>
      ))}
    </div>
  ));
}

function skills(skills?: Array<SkillList>) {
  return skills && <div className="skills">
    <h2>Skills</h2>
    {skills.map(skill => (
      <div>
        {skill.type && <h3>{str(skill.type)}</h3>}
        <ul>
          {skill.items.map((skill, idx) => <li key={idx}>{str(skill)}</li>)}
        </ul>
      </div>
    ))}
  </div>;
}

function CV() {
  const [cvdata, setCVData] = useState<CV | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/data/cv.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((json: CV) => {
        setCVData(json);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!cvdata) {
    return <div>Loading...</div>;
  }

  return <div className='cv'>
    {contactInfo(cvdata.name, cvdata.contact_info)}
    {titleSummary(cvdata.title, cvdata.summary)}
    {positions(cvdata.positions)}
    {showcases(cvdata.showcases)}
    {skills(cvdata.skills)}
    {keywords(cvdata.keywords)}
  </div>;
}

export default CV
