# Cloudflare Worker Setup — Suggest Edit PR Creator

This worker lets website visitors submit edit suggestions that become real GitHub pull requests.

## One-time setup (~5 minutes)

### 1. Create a GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens?type=beta)
2. Click "Generate new token" (Fine-grained)
3. Name: `manifesto-suggest-edit`
4. Repository access: Select **ai-memory-manifesto** only
5. Permissions: **Contents** (Read and Write) + **Pull requests** (Read and Write)
6. Copy the token

### 2. Create a Cloudflare account

Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free tier is sufficient).

### 3. Deploy the worker

```bash
cd worker/

# Install wrangler (Cloudflare CLI)
npm install -g wrangler

# Login to Cloudflare
npx wrangler login

# Store your GitHub token as a secret
npx wrangler secret put GITHUB_TOKEN
# Paste the token when prompted

# Deploy
npx wrangler deploy
```

### 4. Update the website

After deployment, wrangler will print your worker URL (e.g. `https://manifesto-suggest-edit.<your-subdomain>.workers.dev`).

Open `manifesto.html` and set:

```js
var WORKER_URL = 'https://manifesto-suggest-edit.<your-subdomain>.workers.dev';
```

That's it. The "Suggest edit" buttons on the manifesto page will now create real PRs.

## How it works

1. Visitor clicks "Suggest edit" on a manifesto section
2. They edit the text in a modal and submit
3. The worker receives the edit and uses the GitHub API to:
   - Create a branch `suggestion/<name>-<timestamp>`
   - Commit the edited file to that branch
   - Open a pull request targeting `main`
4. You review and merge/close the PR like any other

## Fallback

If the worker is not configured (WORKER_URL is empty) or fails, the form falls back to creating a pre-filled GitHub issue with the suggested changes.
