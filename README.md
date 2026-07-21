# Orion Gateway V1

Simple reverse proxy for Orion applications. Masks technical backend URLs behind a clean public URL.

## Features

- **Reverse Proxy**: Forwards all requests to a configurable backend URL
- **URL Masking**: Users never see the actual backend URL
- **HTTP Methods**: Supports GET, POST, PUT, DELETE, PATCH
- **Header Forwarding**: Transmits important headers (Authorization, Content-Type, etc.)
- **Error Handling**: Clean error page when backend is unavailable
- **Vercel Ready**: Optimized for Vercel deployment

## Architecture

```
User
  ↓
https://orionlive-gateway.vercel.app
  ↓
Orion Gateway (Next.js Middleware)
  ↓
https://orion-live-102999231659.europe-west2.run.app
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Target URL

Create a `.env` file in the root directory:

```env
TARGET_URL=https://orion-live-102999231659.europe-west2.run.app
```

Or copy the example:

```bash
cp .env.example .env
```

Then edit `.env` with your backend URL.

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment on Vercel

### Option 1: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

When prompted, set the environment variable:
- `TARGET_URL`: Your backend URL

### Option 2: Via Vercel Dashboard

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. In project settings, add environment variable:
   - **Key**: `TARGET_URL`
   - **Value**: Your backend URL (e.g., `https://orion-live-102999231659.europe-west2.run.app`)
4. Deploy

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TARGET_URL` | The backend URL to proxy requests to | Yes |

## How It Works

1. **Request**: User requests `https://orionlive-gateway.vercel.app/dashboard`
2. **Middleware**: Next.js middleware intercepts the request
3. **Proxy**: Request is forwarded to `TARGET_URL/dashboard`
4. **Response**: Backend response is returned to user
5. **URL**: User still sees `https://orionlive-gateway.vercel.app/dashboard`

## Error Handling

If the backend is unavailable or misconfigured, users see:

```
Orion Gateway
Le service est temporairement indisponible.
Please try again later
```

## Project Structure

```
.
├── app/
│   ├── error/
│   │   └── page.tsx       # Error page for backend unavailability
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage with status
├── middleware.ts          # Reverse proxy logic
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel configuration
└── .env.example           # Environment variable template
```

## Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Vercel**: Deployment platform
- **Middleware**: Edge-based request interception

## Limitations (V1)

This is a minimal MVP with:
- Single backend URL (no multi-project support)
- No authentication
- No dashboard
- No analytics
- No database

Future versions may add these features.

## License

MIT
