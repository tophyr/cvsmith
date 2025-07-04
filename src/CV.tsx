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
  website?: string,
  linkedin?: string
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

interface CV {
  name: string,
  contact_info: ContactInfo,
  title?: AggString,
  summary?: AggString,
  keywords?: Array<Array<AggString>>,
  positions: Array<Position>,
  showcases?: Array<Showcase>,
}

function ContactInfo({ name, ci }: { name: string, ci: ContactInfo }) {
  return (
    <div className='contact_info'>
      <div className='left'>
        {ci.location && <div className='location'>{ci.location}</div>}
        {ci.phone && <div className='phone'><a href={`tel:${ci.phone}`}>{ci.phone}</a></div>}
      </div>
      <h1 className='name'>{name}</h1>
      <div className='right'>
        {ci.email && <div className='email'><a href={`mailto:${ci.email}?subject=I+want+to+hire+you`}>{ci.email}</a></div>}
        {ci.website && <div className='website'><a href={`https://${ci.website}/`}>{ci.website}</a></div>}
        {ci.linkedin && <div className='linkedin'><a href={`https://www.linkedin.com/in/${ci.linkedin}/`}>
          <img className="contact_info_icon" src="LI-In-Bug.png" />
          {ci.linkedin}
          </a></div>}
      </div>
    </div>
  );
}

function TitleSummary({ title, summary }: { title?: AggString, summary?: AggString }) {
  return (
    <>
      {title && <h2 className='title'>{str(title)}</h2>}
      {summary && <p className='cv_summary'>{str(summary)}</p>}
    </>
  );
}

function Keywords({ keywords }: { keywords?: Array<Array<AggString>> }) {
  return keywords && <div className="keywords">
    <h2>Keywords</h2>
    {keywords.map((kwset, key) => <ul key={key} className='keyword_set'>
      {kwset.map((kw, key) => <li key={key} className='keyword'>{str(kw)}</li>)}
    </ul>)}
  </div>
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

function Positions({ positions }: { positions: Array<Position> }) {
  return (
    <div className='showcase positions'>
      <h2 className="showcase_name">Position History</h2>
      {positions.map((position, key) => (
        <div key={key} className='position'>
          <h3 className='company'>{str(position.company)}</h3>
          <div className="position_details">
            <div className='position_title'>{str(position.title)}</div>
            <div className='position_duration'>{date(position.start)} - {date(position.end)}</div>
          </div>
          {position.summary && <div className='position_summary'>{str(position.summary)}</div>}
          {position.highlights &&
            <ul className="highlights">
              {position.highlights.map((hilite, key) => <li key={key}>{str(hilite)}</li>)}
            </ul>
          }
        </div>
      ))}
    </div>
  )
}

function Showcase({ showcase }: { showcase: Showcase }) {
  return <div className="showcase">
    <h2 className="showcase_name">{str(showcase.name)}</h2>
    {showcase.items.map((item, key) => (
      <div key={key} className="showcase_item">
        <div className="showcase_content">
          <h3 className="showcase_item_name">{str(item.name)}</h3>
          {item.url && <a href={item.url} className="showcase_item_url">{item.url}</a>}
        </div>
        {item.highlights &&
          <ul className="highlights">
            {item.highlights.map((hilite, key) => <li key={key}>{str(hilite)}</li>)}
          </ul>
        }
      </div>
    ))}
  </div>
}

function CV() {
  const [cvdata, setCVData] = useState<CV | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`data/cv.json`)
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

  document.title = cvdata.name;

  return <div className="container">
    <div className="pad">hello</div>
    <div className='cv'>
      <ContactInfo name={cvdata.name} ci={cvdata.contact_info} />
      <TitleSummary title={cvdata.title} summary={cvdata.summary} />
      <Positions positions={cvdata.positions} />
      {cvdata.showcases && cvdata.showcases.map((showcase, key) => <Showcase key={key} showcase={showcase} />)}
      <Keywords keywords={cvdata.keywords} />
    </div>
    <div className="pad">hello</div>
  </div>;
}

export default CV
