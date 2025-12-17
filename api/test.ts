// Use Node.js types instead of @vercel/node to avoid build errors
interface VercelRequest {
  method?: string;
  url?: string;
  headers: { [key: string]: string | string[] | undefined };
  body: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  send: (data: string) => void;
  end: () => void;
  setHeader: (name: string, value: string) => void;
}

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