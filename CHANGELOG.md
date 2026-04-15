# Changelog

All notable changes to The AI Memory Manifesto will be documented in this file.

## [0.2.0] - 2025-04-15

### Evidence sourcing and verification

- Added **Citation Standard** section to `docs/evidence.md` — establishes sourcing rules for all factual claims
- Added **41 primary source links** across all 8 provider sections: official blog posts, privacy policies, regulatory decisions, court filings, academic papers, and news articles
- Every URL verified live in a real browser (Playwright) and content-checked against the specific claim it supports
- Created `docs/screenshots/` directory for contributor-submitted dated screenshots of UI settings and policy pages
- Updated `CONTRIBUTING.md` with sourcing requirements and screenshot contribution guidelines

### Anthropic section corrected

- **Training policy updated**: Anthropic moved to an **opt-in** model (2025). Free/Pro/Max users choose whether to allow training via a toggle — not default-on as previously stated
- **Tier exemptions corrected**: Only Team/Enterprise are exempt from consumer training policy. Pro/Max have the same opt-in toggle as Free
- **Retention period corrected**: 30 days (training off) or 5 years (training on) — not 90 days as previously stated
- **Incognito chats**: Added note that incognito chats are never used for training regardless of settings
- **Summary table updated**: All three affected columns corrected for Anthropic row
- **Key Pattern #2 rewritten**: Anthropic is now cited as an opt-in exception, not a no-opt-out offender

### Other evidence corrections

- **Google summary table**: Updated persistent memory status from "Testing (late 2024)" to "Testing (2024); import March 2026"
- **Column header renamed**: "Enterprise Exemption" to "Training Exemption (Paid)" for accuracy
- **xAI editorial tone**: "silently" replaced with neutral factual language
- **Brazil ANPD**: Added note that the July 2024 suspension was partially lifted in August 2024
- **Apple**: Softened editorial assessment to factual language
- **Key Pattern #6**: Qualified absolute claim to "None of the reviewed providers'"
- **OpenAI opt-out**: Removed unsupported "30 days for safety monitoring" claim, linked to Data Controls FAQ

## [0.1.0] - 2025-04-15

### Proofread, cross-check, and validation fixes

- **Distinguishability reconciled**: Settled on 5 canonical memory categories (user-stated facts, user preferences and instructions, system summaries, model inferences, contextual state) — applied consistently across `MANIFESTO.md` Right 4, Distinguishability principle, and `terminology.md` definition
- **Undefined term removed**: "temporary goals" replaced with "contextual state" (now defined)
- **Agent definition added** to `terminology.md` under Operational Terms
- **Contributing link added** to manifesto's "Join us" section
- **Assertions grounded**: Added EU AI Act Article 5 reference for manipulation claim; added Evidence link for error-at-scale claim
- **"Pipes" metaphor softened**: "Where others build the pipes" changed to "Where others build the infrastructure and the early policies"
- **OECD reclassified**: Moved from Technical Standards Bodies to Policy & Research Organizations in `landscape.md`
- **White House AI Bill of Rights added** to US regulatory landscape
- **ISO/IEC 42001:2023 added** to Technical Standards Bodies
- **DTI entries consolidated**: Reduced from 3 entries to 2 across `landscape.md` sections
- **Anthropic timing aligned**: "early March 2026" standardized to "March 2026" across documents
