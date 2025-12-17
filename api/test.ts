import { IncomingMessage, ServerResponse } from 'http';

// Use standard Node.js types for Vercel compatibility
type VercelRequest = IncomingMessage & {
  query: { [key: string]: string | string[] };
  body: any;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
  send: (data: string) => VercelResponse;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <html>
      <head><title>API Test</title></head>
      <body>
        <h1>API is working!</h1>
        <p>Time: ${new Date().toISOString()}</p>
        <p>Method: ${req.method}</p>
        <p>URL: ${req.url}</p>
      </body>
    </html>
  `);
}