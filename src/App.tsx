import { useEffect, useState } from 'react'
import './App.css'
// import { sharedConfig} from '../shared/config.ts'

interface Link {
  text: string,
  url: string
}
type StringLike = string | Link;
type AggString = string | Array<StringLike>;

interface ContactInfo {
  location: string | undefined,
  email: string | undefined,
  phone: string | undefined,
  website: string | undefined
};

interface Date {
  day: number | undefined,
  month: number | undefined,
  year: number
};

interface Position {
  company: AggString,
  title: AggString
  end: Date | undefined,
  begin: Date,
  summary: AggString | undefined,
  highlights: Array<AggString> | undefined
};

interface Project {
  name: AggString,
  url: string | undefined,
  highlights: Array<AggString> | undefined
};

interface Showcase {
  name: AggString,
  items: Array<Project>
};

interface SkillList {
  name: AggString | undefined,
  items: Array<AggString>
};

interface CV {
  name: string,
  contact_info: ContactInfo,
  title: AggString | undefined,
  summary: AggString | undefined,
  keywords: Array<string> | undefined,
  positions: Array<Position>,
  showcases: Array<Showcase> | undefined,
  skills: Array<SkillList> | undefined,
}

function App() {
  const [cvdata, setCVData] = useState<CV | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const base = sharedConfig().base;

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

  return <div>{JSON.stringify(cvdata)}</div>;
}

export default App
