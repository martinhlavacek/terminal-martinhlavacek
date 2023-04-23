import { NextApiRequest, NextApiResponse } from "next"

import packageJson from '../../../package.json';
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({
    version: `v${packageJson.version}`,
  })
}
