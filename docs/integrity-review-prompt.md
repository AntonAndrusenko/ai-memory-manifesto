# Integrity & Accuracy Review Prompt: AI Memory Manifesto Landing Page

Use this prompt in a fresh session with a critical, adversarial mindset. The goal is to stress-test the page's intellectual honesty — not its design quality.

---

## Prompt

I need a rigorous integrity review of the landing page for the AI Memory Manifesto — a declaration of rights over the memory that AI systems build about us.

**Live URL**: https://memorymanifesto.org (or run `python3 -m http.server 8765` and open http://localhost:8765/index.html)

### Context

This page uses interactive visualization to argue that AI providers capture rich personal data from conversations but give users almost nothing back. The visualization is *conceptual* — it uses metaphor (a "vault" of data pills, a "memory.md" export, Matrix-style data rain) to communicate an asymmetry that is real but not literally structured this way inside AI systems.

The manifesto will be read by AI researchers, product leaders, policymakers, journalists, and technically literate users. It must be taken seriously. Any claim — explicit or implied through visual design — that can be debunked as inaccurate, exaggerated, or manipulative undermines the entire project.

### What the page visualizes

1. A simulated chat input where emotionally rich messages are typed (divorce, health, career, love)
2. Key phrases get highlighted and labeled (e.g., "feeling overwhelmed" → "emotion", "Meridian Corp" → "employer")
3. Data fragments flow through a Matrix-style stream into a "Provider Memory" vault
4. The vault shows 40 labeled data pills behind a frosted lock ("Access denied")
5. A counter increments: "1,200+ personal details retained"
6. An export card shows "memory.md" with 3 trivial lines and "Last updated: 47 days ago"
7. A synthesized "Inferred Profile" card appears, turning the data points into a readable paragraph about the user
8. Users can type their own message and watch it get analyzed with keyword matching
9. A "Claim your memory" section lets users unlock a sample portable JSON file
10. The punchline: "They remember everything. You own almost nothing."

### What I need you to evaluate

**Do NOT review visual design, code quality, or UX.** Focus exclusively on whether the page's claims — both explicit text and visual implications — are accurate, fair, and defensible. Review it as if you were:

- A senior AI researcher at Anthropic, OpenAI, or Google DeepMind who builds memory systems
- A tech journalist writing a critical piece about advocacy sites that distort how AI works
- A policy advisor evaluating whether to cite this manifesto in regulatory testimony

---

#### 1. Claim Accuracy Audit

For each claim (explicit or visually implied), evaluate:

| Claim | Source | Accurate? | Risk |
|-------|--------|-----------|------|
| *AI providers capture and retain personal data from conversations* | Implied by vault | ? | ? |
| *This data is structured into labeled categories (emotion, health, employer)* | Data pills, labels | ? | ? |
| *Providers retain "1,200+ personal details"* | Counter | ? | ? |
| *Users get almost nothing back ("memory.md" with 3 lines)* | Export card | ? | ? |
| *You cannot access or export your AI memory* | "Access denied", "No export available" | ? | ? |
| *AI systems infer a synthesized profile from your conversations* | Profile card | ? | ? |
| *The keyword-based analysis represents how AI actually processes text* | User input feature | ? | ? |
| *A portable JSON memory format is a viable alternative* | Claim section | ? | ? |
| *"They remember everything"* | Punchline | ? | ? |

For each row:
- **Accurate?**: True / Partially true / Misleading / False
- **Risk**: What a knowledgeable critic could say to discredit this claim
- **Recommendation**: Keep as-is / Add disclaimer / Reframe / Remove

#### 2. Metaphor vs. Misrepresentation

The page uses visual metaphor to communicate a concept. For each metaphorical element, assess whether it crosses the line from "helpful simplification" to "misleading dramatization":

- **The vault with a lock**: Does this falsely imply providers are deliberately hiding data, vs. simply not having built export tools?
- **40 labeled data pills**: Does this imply a structured database of tagged personal facts? Most AI memory uses embeddings, summaries, or conversation logs — not labeled key-value pairs.
- **"Access denied"**: Is this fair? Users can delete conversations in most providers. The real issue is *inferred memory* being opaque, not all data being locked.
- **The "memory.md" with 3 lines**: Is this a fair representation of what any specific provider exports? ChatGPT's memory feature shows stored memories. Claude's doesn't retain memory between sessions (by default). The export card doesn't specify which provider.
- **The counter ("1,200+ personal details")**: What is this number based on? Is it defensible?
- **The synthesized profile**: Is it fair to show this as something AI providers create? Do they? Or is this what *could* be inferred?
- **User keyword matching as "analysis"**: The page's keyword dictionary uses simple string matching. Does presenting this as "what AI does" trivialize the actual sophistication of NLP — or does the simplification serve the narrative without making false claims?

#### 3. Provider-Specific Accuracy

The page doesn't name specific providers, but readers will map the visualization to the ones they use. Evaluate accuracy against the current state (as of early 2026) of:

- **ChatGPT (OpenAI)**: Has a memory feature. Users can view, edit, and delete memories. Offers data export. How does the page's portrayal compare?
- **Claude (Anthropic)**: Does not retain memory between sessions by default. Has a project-based context feature. How does the visualization apply?
- **Gemini (Google)**: Has activity-based personalization. How does retention work?
- **Other providers**: Perplexity, Copilot, etc.

For each: Does the page's visualization fairly represent the current state, or does it exaggerate the problem?

#### 4. Rhetorical Fairness

- Does the page present a one-sided argument without acknowledging the user benefits of AI memory (personalization, continuity, efficiency)?
- Does the emotional language ("You own almost nothing", "You never consented to this synthesis") cross from advocacy into manipulation?
- Is the page's framing closer to a *manifesto* (declaring principles) or a *campaign* (building outrage through selective framing)?
- Would a reasonable person who works on AI memory systems feel that this page fairly represents the problem — or would they feel mischaracterized?

#### 5. Legal & Professional Risk

- Could any visual element or text be construed as defamatory toward specific AI providers?
- Does the "Inferred Profile" card risk being interpreted as something a specific provider actually generated?
- Could the keyword analysis feature be mistaken for real AI analysis, leading users to believe their actual data was processed?
- Does the downloadable JSON file create false expectations about a format or standard that doesn't exist?

#### 6. Recommendations

Produce a categorized list:

**Must fix** — Claims or implications that are factually wrong or seriously misleading. These would be cited by critics to discredit the manifesto.

**Should clarify** — Claims that are directionally correct but lack nuance. A short disclaimer, footnote, or rewording would protect credibility without weakening the argument.

**Defensible as-is** — Metaphors and simplifications that serve the narrative without making false claims. Explain why they hold up under scrutiny.

**Consider adding** — Context or nuance that would strengthen credibility:
- Acknowledging what providers *do* offer (and why it's insufficient)
- Distinguishing between stated data, conversation logs, and inferred profiles
- Noting that the visualization is conceptual, not a literal representation of any provider's architecture

---

### How to review

1. Read the full `index.html` — all CSS, HTML, and JS
2. Open the page in a browser and interact with every feature
3. Type your own message in the chat input and observe the keyword analysis
4. Click "Unlock your memory" and review the sample JSON
5. Read the full manifesto at `manifesto.html` for additional context
6. Cross-reference claims against current provider documentation (ChatGPT memory, Claude projects, Gemini activity settings)
7. Write your review with specific text quotes and line references

### Tone

Be adversarial. Assume the smartest, most knowledgeable critic is reading this page and looking for reasons to dismiss it. Your job is to find those reasons before they do — and recommend fixes that preserve the emotional power of the visualization while making every claim bulletproof.

The goal is not to water down the message. The goal is to make it *unassailable*.
