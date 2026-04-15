/**
 * Cloudflare Worker: AI Memory Manifesto — Suggest Edit PR Creator
 *
 * Receives edit suggestions from the website and creates GitHub pull requests.
 *
 * Environment variables (set as secrets):
 *   GITHUB_TOKEN  — GitHub Personal Access Token with `repo` scope
 *
 * Wrangler config (wrangler.toml) sets:
 *   GITHUB_OWNER  — Repository owner (e.g. "AntonAndrusenko")
 *   GITHUB_REPO   — Repository name (e.g. "ai-memory-manifesto")
 *   ALLOWED_ORIGIN — Your GitHub Pages URL for CORS
 */

const GITHUB_API = 'https://api.github.com';
const TARGET_FILE = 'MANIFESTO.md';
const BASE_BRANCH = 'main';

export default {
  async fetch(request, env) {
    // CORS headers
    const origin = env.ALLOWED_ORIGIN || 'https://antonandrusenko.github.io';
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    try {
      const body = await request.json();
      const { section, content, name, reason } = body;

      if (!content || !section) {
        return jsonResponse({ error: 'Missing required fields: section, content' }, 400, corsHeaders);
      }

      const owner = env.GITHUB_OWNER || 'AntonAndrusenko';
      const repo = env.GITHUB_REPO || 'ai-memory-manifesto';
      const token = env.GITHUB_TOKEN;

      if (!token) {
        return jsonResponse({ error: 'Server misconfigured: missing GitHub token' }, 500, corsHeaders);
      }

      const gh = githubClient(token, owner, repo);

      // 1. Get the SHA of the base branch
      const baseBranchData = await gh.get(`/repos/${owner}/${repo}/git/refs/heads/${BASE_BRANCH}`);
      const baseSha = baseBranchData.object.sha;

      // 2. Create a new branch
      const timestamp = Date.now();
      const safeName = (name || 'anonymous').toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20);
      const branchName = `suggestion/${safeName}-${timestamp}`;

      await gh.post(`/repos/${owner}/${repo}/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      });

      // 3. Get current file content
      const fileData = await gh.get(`/repos/${owner}/${repo}/contents/${TARGET_FILE}?ref=${BASE_BRANCH}`);
      const currentContent = atob(fileData.content.replace(/\n/g, ''));

      // 4. Apply the edit — find the section heading and replace content up to next ## heading
      const sectionHeading = '## ' + section;
      const editedContent = applySectionEdit(currentContent, sectionHeading, content);

      if (editedContent === currentContent) {
        // Could not find section to replace — still create PR with full replacement note
        return jsonResponse({ error: 'Could not locate section in manifesto. Please try the GitHub issue route.' }, 422, corsHeaders);
      }

      // 5. Commit the change
      const commitMessage = `[Suggestion] ${section}\n\nSubmitted by: ${name || 'Anonymous'}\nReason: ${reason || 'No reason provided'}\n\nVia website suggest-edit feature.`;

      await gh.put(`/repos/${owner}/${repo}/contents/${TARGET_FILE}`, {
        message: commitMessage,
        content: btoa(unescape(encodeURIComponent(editedContent))),
        sha: fileData.sha,
        branch: branchName,
      });

      // 6. Create Pull Request
      const prBody = `## Suggested edit to: ${section}\n\n`
        + `**Submitted by:** ${name || 'Anonymous'}\n`
        + `**Reason:** ${reason || 'No reason provided'}\n\n`
        + `---\n\n`
        + `*This PR was created automatically via the website's "Suggest edit" feature.*`;

      const pr = await gh.post(`/repos/${owner}/${repo}/pulls`, {
        title: `[Suggestion] ${section}`,
        body: prBody,
        head: branchName,
        base: BASE_BRANCH,
      });

      return jsonResponse({ pr_url: pr.html_url, pr_number: pr.number }, 200, corsHeaders);

    } catch (err) {
      return jsonResponse({ error: err.message || 'Internal error' }, 500, corsHeaders);
    }
  },
};

/**
 * Replace a section in the markdown content.
 * Finds "## <heading>" and replaces everything up to the next "## " or end of file.
 */
function applySectionEdit(fullContent, sectionHeading, newSectionContent) {
  const idx = fullContent.indexOf(sectionHeading);
  if (idx === -1) return fullContent; // Section not found

  // Find the end of this section (next ## or EOF)
  const afterHeading = idx + sectionHeading.length;
  const rest = fullContent.substring(afterHeading);
  const nextH2 = rest.search(/\n## /);

  let before = fullContent.substring(0, idx);
  let after = nextH2 === -1 ? '' : rest.substring(nextH2);

  // Ensure the new content starts with the heading
  let replacement = newSectionContent.trim();
  if (!replacement.startsWith('## ')) {
    replacement = sectionHeading + '\n\n' + replacement;
  }

  return before + replacement + after;
}

/**
 * Minimal GitHub API client
 */
function githubClient(token, owner, repo) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'ai-memory-manifesto-worker',
    'Content-Type': 'application/json',
  };

  return {
    async get(path) {
      const res = await fetch(GITHUB_API + path, { headers });
      if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status} ${await res.text()}`);
      return res.json();
    },
    async post(path, body) {
      const res = await fetch(GITHUB_API + path, { method: 'POST', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`GitHub POST ${path}: ${res.status} ${await res.text()}`);
      return res.json();
    },
    async put(path, body) {
      const res = await fetch(GITHUB_API + path, { method: 'PUT', headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`GitHub PUT ${path}: ${res.status} ${await res.text()}`);
      return res.json();
    },
  };
}

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}
