import { headers, cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from "next"
import {
  createRouteHandlerSupabaseClient
} from '@supabase/auth-helpers-nextjs';

import packageJson from '../../../package.json';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'GET') {
    const ll = createRouteHandlerSupabaseClient({
      headers,
      cookies
    });
    const { data } = await ll.from('domains').select('*');
    response.status(200).json({
      data
    })
  } else if (request.method === 'POST') {

  } else if (request.method === 'PUT') {
    const { id, name, url } = request.query;
    let updateCommand: any = {};
    if ((name === undefined || name === null || name === '') && (url === undefined || url === null || url === '')) {
      response.status(200).json({
        message: "Nothing to update"
      })
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
    response.status(200).json({
      message: "Updated"
    })
  } else if (request.method === 'DELETE') {
    const { id } = request.query;
    await supabase.from('domains').delete().match({ id: id });
    response.status(200).json({
      message: "Deleted"
    })
  } else {
    response.status(404).json({
      eerror: 'Not found'
    })
  }

}
