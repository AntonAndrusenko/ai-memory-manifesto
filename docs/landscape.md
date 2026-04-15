# Landscape: AI Memory Governance Initiatives

A map of projects, standards, regulations, and organizations working on AI memory portability, governance, and user rights.

*Last updated: April 2026.*

**See also:** [The Manifesto](manifest.md) | [Terminology](terminology.md) | [Evidence](evidence.md)

---

## Open Standards & Protocols

| Initiative | Description | Status | URL |
|-----------|-------------|--------|-----|
| **Portable AI Memory (PAM)** | Vendor-neutral JSON interchange format for AI user memories. Defines 11 memory types (facts, preferences, skills, goals, relationships, instructions, context, identity, environment, projects, custom) with full provenance. Described as "vCard for AI memories." | Active, schema v1.0 published | [GitHub](https://github.com/portable-ai-memory/portable-ai-memory) |
| **AI Memory Protocol (AMP)** | Open standard for AI conversation portability. Normalizes exports from ChatGPT, Claude, Gemini, Cursor, Perplexity, Grok into a unified schema. Provides CLI migration tools. | Active, tools via npm | [GitHub](https://github.com/purmemo-ai/purmemo-amp) |
| **Model Context Protocol (MCP)** | Originally by Anthropic, now under the Agentic AI Foundation (Linux Foundation). Standardizes how AI agents connect to external tools, APIs, and data sources. Over 97 million installs. | Active, open governance | [modelcontextprotocol.io](https://modelcontextprotocol.io/) |
| **IETF AIPREF Working Group** | Standardizing vocabulary and HTTP mechanisms for expressing preferences about how content is collected and processed for AI. Two key drafts in progress. | Active, targeting Proposed Standard | [IETF](https://datatracker.ietf.org/wg/aipref/about/) |
| **Open Memory Alliance** | Coalition of developers, privacy advocates, and enterprises working toward open APIs, portable schemas, and user-first policies for AI memory. | Active | [openmemoryalliance.org](https://openmemoryalliance.org/) |
| **Data Transfer Initiative (DTI)** | Nonprofit stewarding the open-source Data Transfer Project (Google, Microsoft, Meta, Apple). Published AI portability principles in 2025 and shipped a conversation history data model. | Active | [dtinit.org](https://dtinit.org/) |

---

## Open Source Infrastructure

| Project | Description | Status | URL |
|---------|-------------|--------|-----|
| **Mem0 / OpenMemory** | Universal memory layer for AI agents. OpenMemory MCP Server provides a private, local-first memory layer (Docker + Postgres + Qdrant) that works with Cursor, VS Code, Claude, and any MCP-compatible tool. All data stays local. | Active, production-ready | [GitHub](https://github.com/mem0ai/mem0) |
| **Letta (formerly MemGPT)** | Platform for stateful AI agents with three-tier memory: core (in-context/RAM), archival (vector store/disk), and recall (conversation history). Memory-first agent architecture. | Active, open source | [GitHub](https://github.com/letta-ai/letta) |
| **Zep** | Hybrid vector+graph memory for long-running agent sessions. Structures interactions into meaningful episodes rather than flat logs. | Active, open source core | [getzep.com](https://www.getzep.com/) |
| **Solid Project (Solid Pods)** | Tim Berners-Lee's decentralized data platform. Individuals store data in "pods" (Personal Online Data Stores) and grant granular access to applications. Deployments in Flanders, BBC, NHS. | Active, maturing | [solidproject.org](https://solidproject.org/) |
| **mcp-memory-service** | Persistent memory for AI agent pipelines (LangGraph, CrewAI, AutoGen) and Claude. REST API + knowledge graph + autonomous consolidation. | Active, open source | [GitHub](https://github.com/doobidoo/mcp-memory-service) |

---

## Regulatory Frameworks

### European Union

| Regulation | Description | Status | Relevance to AI Memory |
|-----------|-------------|--------|----------------------|
| **GDPR** | EU-wide data protection. Article 20 establishes right to data portability — but the right covers only data "provided by" the data subject. Inferred or derived data is **not covered** under current interpretation. This means AI-generated inferences about a user are not portable under GDPR. | Active, enforced | **Critical gap**: the core of AI memory (inferences) falls outside portability rights. |
| **EU AI Act** | First comprehensive AI regulation. Prohibits manipulative AI practices, requires transparency for chatbots. Fines up to 7% of global turnover. Full application August 2026. | Active, phased implementation | Prohibits memory-based manipulation (subliminal/exploitative techniques). Does not address memory portability. |

### United States

| Regulation | Description | Status | Relevance to AI Memory |
|-----------|-------------|--------|----------------------|
| **California ADMT Regulations** | Automated Decision-Making Technology regulations under CCPA/CPRA. Require pre-use notices, opt-out rights, access rights for automated decision-making systems. | Effective January 2026 | Access rights could extend to AI memory inspection. |
| **California SB 53** | Transparency in Frontier AI Act. Targets frontier models (>10^26 FLOPs). Requires safety evaluations and reporting. | Effective January 2026 | Accountability for the most capable systems — those most likely to build rich memory profiles. |
| **California AB 2013** | Generative AI Training Data Transparency Act. Requires disclosure of training datasets including personal information. | Effective 2026 | Transparency about whether user memories are used for training. |
| **Colorado AI Act (SB 24-205)** | Requires reasonable care to protect consumers from algorithmic discrimination in high-risk AI systems. | Effective June 2026 | Addresses risks from AI profiling that relies on accumulated memory. |
| **US Federal Executive Order on AI (Dec 2025)** | Establishes federal policy to preempt state AI regulations that obstruct national competitiveness. | Active | May preempt state-level memory/portability protections. |

---

## Policy & Research Organizations

| Organization | Focus | Key Output | URL |
|-------------|-------|-----------|-----|
| **New America OTI** | AI agents, MCP, and memory risks | "AI Agents and Memory" policy brief (Nov 2025) — examines risks and proposes interventions | [newamerica.org](https://www.newamerica.org/oti/briefs/ai-agents-and-memory/) |
| **MyData Global** | Human-centric personal data | "Human-centric Roadmap for Europe" (May 2025) with European Commission. AI Symposium on compliance and data governance. | [mydata.org](https://mydata.org/) |
| **Future of Privacy Forum** | AI privacy policy research | Tracks 210+ AI bills across 42 US states. Identified agentic AI and algorithmic pricing as key 2026 policy topics. | [fpf.org](https://fpf.org/) |
| **Data Transfer Initiative (DTI)** | Data portability | Published AI portability principles: users should download and transfer AI data in structured formats. Shipped conversation history data model. See also Open Standards & Protocols above. | [dtinit.org](https://dtinit.org/) |
| **Stanford HAI** | AI governance and sovereignty | Research on AI sovereignty and user autonomy | [hai.stanford.edu](https://hai.stanford.edu/) |
| **Cambridge Forum on AI** | Cognitive freedom and law | Research on cognitive freedom as legal framework — right to form thoughts free from covert AI influence | [cambridge.org](https://www.cambridge.org/core/journals/cambridge-forum-on-ai-law-and-governance/) |

---

## Industry Commitments

| Initiative | Description | Status |
|-----------|-------------|--------|
| **Agentic AI Foundation (Linux Foundation)** | Formed December 2025. Founding members: Anthropic, OpenAI, Block, Microsoft, Google. Anchored by MCP. Mission: open standards for agentic AI to avoid fragmentation and vendor lock-in. | Active, newly formed |
| **Google Gemini Memory Import** | Launched March 2026. Users can import memories and chat history from ChatGPT, Claude, and other providers. Uses proprietary approach, not PAM/AMP. Not available in EEA/Switzerland/UK. | Active |
| **Anthropic Memory Import** | Memory import features for Claude deployed early March 2026. Users can export raw personal data. | Active |
| **Data Transfer Project** | Open-source portability infrastructure backed by Google, Apple, Meta, Microsoft, X (formerly Twitter). Stewarded by DTI (see Open Standards & Protocols above). | Active |

---

## Technical Standards Bodies

| Body | Relevant Work | Status |
|------|--------------|--------|
| **IETF** | AIPREF Working Group — vocabulary for AI usage preferences and HTTP attachment mechanisms | Active, drafts in progress |
| **W3C** | WebMCP incubation (AI agents on the web), Solid specifications (user data pods), DID v1.1 (decentralized identity), voice agent standards | Active, various stages |
| **IEEE** | 7000 series — ethical AI design standards. CertifAIEd certification for accountability, privacy, transparency. No memory-specific standard yet. | Active, standards published |
| **NIST** | AI Risk Management Framework (AI RMF 1.0, January 2023). Voluntary framework for managing AI risks across governance, mapping, measuring, and managing. No memory-specific guidance, but applicable to memory-bearing AI systems. | Active, voluntary | 
| **OECD** | OECD AI Principles (2019, updated 2024). Adopted by 46 countries. Establish values-based principles for trustworthy AI including transparency, accountability, and human-centred values. No memory-specific provisions. | Active, intergovernmental |

---

## Gaps

1. **No formal memory portability standard exists** at IETF, W3C, or IEEE level. PAM and AMP are community efforts, not standards body outputs.

2. **GDPR explicitly excludes inferred data from portability.** The data that constitutes AI memory — inferences, summaries, behavioral patterns — falls outside Article 20. This is the single biggest regulatory gap.

3. **No US federal legislation addresses AI memory or portability.** The landscape is state-level and focused on discrimination/transparency rather than memory rights.

4. **Industry memory import features use proprietary approaches** rather than adopting open standards like PAM or AMP, risking fragmentation.

5. **Cognitive sovereignty and inference rights remain academic.** No regulatory framework has codified rights over AI-inferred representations of individuals.

6. **Derivative memory is ungoverned.** No provider or regulation clearly addresses the retention, governance, or deletion obligations for summaries, embeddings, and inferences derived from user conversations.
