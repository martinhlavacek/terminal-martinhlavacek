import axios from 'axios';
import config from '../../config.json';
import { createClient } from '@supabase/supabase-js';

export interface IDomains {
  id: number;
  name: string;
  url: string;
}
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getVersion = async () => {
  const { data } = await axios.get('/api/version');
  return data;
};

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return data;
};

export const updateDomain = async (id: number, name: string, url: string) => {
  let updateCommand: any = {};
  if ((name === undefined || name === null || name === '') && (url === undefined || url === null || url === '')) {
    return "Nothing to update"
  }
  if (name === undefined || name === null || name === '') {
    updateCommand = { url: url };
    await supabase.from('domains').update([
      updateCommand,
    ]).match({ id: id });
  } else if (url === undefined || url === null || url === '') {
    updateCommand = { name: name };
  } else {
    updateCommand = { name: name, url: url };
  }
  if (updateCommand.url !== undefined || updateCommand.url !== null || updateCommand.url !== '') {
    if (updateCommand.url === '*' && updateCommand.name !== undefined && updateCommand.name !== null && updateCommand.name !== '') {
      updateCommand.url = `https://www.${updateCommand.name}`
    }
  }

  await supabase.from('domains').update([
    updateCommand,
  ]).match({ id: id });
  return "Updated"
};

export const deleteDomain = async (id: number) => {
  await supabase.from('domains').delete().match({ id: id });
  return "Deleted";
};

export const createDomain = async (name: string, url: string) => {
  const { data } = await supabase.from('domains').insert([
    { name: name, url: url },
  ]);
  return data;
};

export const getDomain = async () => {
  const { data } = await supabase.from('domains').select('*');

  return data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      url: d.url,
    }
  });
  // const domains: IDomains[] = [
  //   { id: 1, name: " m2stack.com      ", url: "https://m2stack.com" },
  //   { id: 2, name: " m2stack.cz       ", url: "https://m2stack.cz" },
  //   { id: 3, name: " port42.cz        ", url: "https://port42.cz" },
  //   { id: 4, name: " m2s.dev          ", url: "https://m2s.dev" },
  //   { id: 5, name: " forkif.io        ", url: "https://forkif.io" },
  //   { id: 6, name: " forkif.cz        ", url: "https://forkif.cz" },
  //   { id: 7, name: " forkif.com       ", url: "https://forkif.com" },
  //   { id: 8, name: " fijy.fyi         ", url: "https://fijy.fyi" },
  //   { id: 9, name: " grafana.cz       ", url: "https://grafana.cz" },
  //   { id: 10, name: "grafana.sk       ", url: "https://grafana.sk" },
  //   { id: 11, name: "zvx.cz           ", url: "https://zvx.cz" },
  //   { id: 12, name: "jsvyvojar.cz     ", url: "https://jsvyvojar.cz" },
  //   { id: 13, name: "jsdeveloper.cz   ", url: "https://jsdeveloper.cz" },
  //   { id: 14, name: "onestino.cz      ", url: "https://onestino.cz" },
  //   { id: 15, name: "onestino.cz      ", url: "https://onestino.sk" },
  //   { id: 16, name: "kubectl.cz       ", url: "https://kubectl.cz" },
  //   { id: 17, name: "notebles.cz      ", url: "https://notebles.cz" },
  //   { id: 18, name: "martinhlavacek.cz", url: "https://martinhlavacek.cz" },
  // ];
  // return domains;
};

export const getBio = async () => {
  const { data } = await axios.get(config.bioUrl);

  return data;
};

export const getWeather = async (city: string) => {
  const { data } = await axios.get(`https://wttr.in/${city}?ATm`);

  return data;
};

export const getQuote = async () => {
  const { data } = await axios.get('https://api.quotable.io/random');

  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};
