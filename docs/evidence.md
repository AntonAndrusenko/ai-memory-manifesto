# Evidence: How AI Providers Handle Memory

Documented facts about how major AI providers accumulate, store, and reuse user memory and conversation data.

*Last updated: April 2026. All statements reflect publicly documented policies and events. URLs and policies may have changed since original publication. Verify against current versions before citing.*

**See also:** [The Manifesto](manifest.md) | [Terminology](terminology.md) | [Landscape](landscape.md)

---

## Summary Table

| Provider | Default Training on User Data | Opt-Out Available | Enterprise Exemption | On-Device Option | Persistent Memory |
|----------|-------------------------------|-------------------|----------------------|------------------|-------------------|
| OpenAI | Yes (Free/Plus) | Yes | Yes (Enterprise/Team) | No | Yes (Feb 2024) |
| Anthropic | Yes (Free tier) | No (upgrade to paid) | Yes (Pro/Team/Enterprise) | No | Beta (2025); import added March 2026 |
| Meta | Yes (public posts) | EU/UK | N/A | No | Yes (2024) |
| xAI/Grok | Yes (X data) | Yes (buried setting) | N/A | No | Limited |
| Google | Yes (Gemini Apps) | Yes | Yes (Workspace) | No | Testing (late 2024) |
| Mistral | Yes (Le Chat free) | No (upgrade to paid) | Yes (API/Enterprise) | No | Limited |
| Microsoft | Yes (Consumer Copilot) | Limited | Yes (M365/Azure) | Recall (local) | Limited |
| Apple | **No** | N/A | N/A | **Yes (primary)** | On-device context |

---

## OpenAI (ChatGPT)

### Memory Features

- **ChatGPT Memory** launched February 2024 (initially limited, then broadly to Plus/Team/Enterprise). Memory allows ChatGPT to remember facts across conversations.
- Users can view, edit, and delete individual memories via Settings > Personalization > Memory.
- **Custom Instructions** (July 2023) preceded Memory as a lighter personalization layer.
- **Temporary Chat** mode allows conversations that don't generate memories or appear in history.

### Data Retention and Reuse

- Content from Free and Plus users **may be used to train models** by default.
- **Opt-out**: Users can disable "Improve the model for everyone" in Settings > Data Controls. Data may still be retained for up to 30 days for safety monitoring.
- **API users**: Data is **not** used for training by default (since March 2023 policy update).
- **Enterprise and Team tiers**: Data is **never** used for training.

### Documented Concerns

- **Italy's Garante (March 2023)**: Temporarily banned ChatGPT over GDPR concerns — lack of age verification, unclear legal basis for processing personal data for training. Service restored after adding opt-out mechanisms.
- **FTC investigation (2023)**: Investigation into whether data practices caused consumer harm. No public enforcement action as of early 2026.
- **Training data regurgitation (November 2023)**: Nasr et al. ("Scalable Extraction of Training Data from (Production) Language Models," Google DeepMind / University of Washington, 2023) demonstrated ChatGPT could be prompted to output memorized training data.
- **Class-action lawsuits (2023)**: Multiple suits filed, including *P.M. v. OpenAI Inc.* (N.D. Cal.), alleging scraping of personal data without consent.

---

## Anthropic (Claude)

### Memory Features

- **Projects** (mid-2024): Custom instructions and uploaded documents for Pro users, scoped to a project.
- Persistent cross-conversation memory was in limited testing/beta as of early 2025. Memory import features deployed March 2026.
- Each conversation is independent by default unless within a Project.

### Data Retention and Reuse

- **Free-tier** conversations on claude.ai may be used to improve models. Unlike OpenAI, Anthropic does not offer an explicit opt-out toggle for free-tier users; the only way to ensure data is not used for training is to use a paid tier.
- **Pro/Team/Enterprise**: Inputs and outputs are **not** used for training.
- **API**: Customer data is not used for training by default.
- Conversation logs retained for trust and safety review for a limited period (generally up to 90 days).

### Documented Concerns

- Fewer major data-privacy controversies compared to other providers as of early 2025.
- Some criticism around opacity of pre-training data sources (common to all LLM providers).

---

## Meta (Meta AI)

### Memory Features

- **Meta AI** integrated into WhatsApp, Messenger, Instagram, and Facebook (September 2023).
- Can access user context from the host platform (profile information, group chat context).
- Memory feature began rolling out in 2024, allowing the assistant to remember preferences across interactions.

### Data Retention and Reuse

- Interactions with Meta AI may be used to improve AI models.
- Meta confirmed it uses **publicly available posts from Facebook and Instagram** to train AI models. Private messages are stated to be excluded.
- **EU**: Meta **paused** plans to train on European user data in June 2024 after objections from Ireland's DPC and advocacy group noyb.
- EU/UK users have an opt-out form under GDPR / UK GDPR frameworks (Article 21). **US users have no equivalent opt-out for public post data.**

### Documented Concerns

- **June 2024**: noyb filed complaints in 11 EU countries against Meta's use of user data for AI training. Meta paused training in Europe.
- **Brazil's ANPD (July 2024)**: Ordered Meta to stop using Brazilian users' data for AI training.
- WhatsApp AI integration raised questions about end-to-end encryption guarantees (Meta says AI queries are processed separately and are not E2E encrypted).
- Users reported difficulty deleting AI interaction data from Instagram and Facebook.

---

## xAI / Grok

### Memory Features

- **Grok** launched November 2023 as part of X Premium+.
- Access to real-time X (Twitter) posts for context.
- Can personalize based on the user's X profile and posting history.
- Limited persistent memory: personalization is tied to X profile data rather than explicit cross-conversation memory storage.

### Data Retention and Reuse

- xAI uses **public X (Twitter) post data** to train Grok models.
- X's privacy policy updated August-September 2023 to explicitly state user data may be shared with xAI.
- **Opt-out**: A setting under Settings > Privacy > Grok to disable data sharing. **Initially defaulted to on** without individual user notification.

### Documented Concerns

- **September 2023**: Privacy policy update enabling data sharing with xAI was applied silently with the setting enabled by default.
- **Ireland's DPC (September 2024)**: X agreed to suspend processing of EU/EEA users' personal data for Grok training following legal action.
- Tight integration between a social media platform (X) and AI company (xAI) under the same owner raised governance concerns.

---

## Google (Gemini)

### Memory Features

- **Gemini** (rebranded from Bard, February 2024) offers conversation history and "Gems" (custom personas).
- Memory feature in testing for Gemini Advanced (late 2024).
- **Gemini Memory Import** launched March 2026: users can import memories and chat history from ChatGPT, Claude, and other providers. Uses a proprietary approach rather than open standards (PAM/AMP). Not available in EEA/Switzerland/UK.
- **Gemini extensions** integrate with Gmail, Drive, Docs, Calendar, Maps — accessing personal data from these services.
- **Workspace (enterprise)**: Gemini can access organizational data with admin-controlled permissions.

### Data Retention and Reuse

- Conversations retained for up to **18 months** by default (with Gemini Apps Activity enabled). Configurable to 3 or 36 months.
- **Conversations may be reviewed by human reviewers** to improve the product.
- When Activity is turned off, conversations retained for up to 72 hours only.
- **Workspace (enterprise)**: Data is **not** used to train foundation models.

### Documented Concerns

- **February 2024**: Gemini conversations with Activity enabled are potentially accessible to human reviewers. Users warned not to share sensitive information.
- Privacy advocates raised concerns about Gemini's ability to read Gmail and Drive documents, given the breadth of Google's ecosystem.

---

## Mistral

### Memory Features

- **Le Chat** launched February 2024 with conversation history.
- Limited persistent memory features compared to ChatGPT as of early 2025.

### Data Retention and Reuse

- **Free-tier** conversations may be used to improve models.
- **Paid API/Enterprise**: Customer data is not used for training.
- Mistral emphasizes GDPR compliance as an EU-based company.

### Documented Concerns

- Fewer major controversies compared to US-based providers.
- Criticized by some EU policymakers for lobbying against strict AI regulation despite positioning as a European alternative.

---

## Microsoft (Copilot)

### Memory Features

- **Microsoft Copilot** offers conversation history and personalization.
- **Copilot for Microsoft 365**: Integrates with Word, Excel, Outlook, Teams, accessing user documents and emails.
- **Windows Recall** (announced May 2024): Takes periodic screenshots of everything on screen and uses AI to make it searchable.

### Data Retention and Reuse

- **Consumer Copilot**: Prompts and responses may be used to improve the service.
- **Microsoft 365 Copilot (enterprise)**: Customer data is **not** used to train foundation models.
- **Azure OpenAI Service**: Customer data is not used for training and is not shared with OpenAI.

### Documented Concerns

- **Windows Recall (May-June 2024)**: Widespread criticism. Security researcher Kevin Beaumont demonstrated that Recall stored screenshots in an **unencrypted SQLite database**, accessible to malware. Microsoft delayed and redesigned the feature with encryption, Windows Hello authentication, and opt-in (instead of opt-out).
- **UK ICO** investigated Recall's privacy implications.
- Recall was described by critics as potential "spyware" built into Windows.
- **Oversharing problem**: Questions about whether Copilot for M365 adequately respects document permissions.

---

## Apple (Apple Intelligence)

### Memory Features

- **Apple Intelligence** announced WWDC June 2024, rolling out with iOS 18.1 (October 2024).
- Features include Writing Tools, Smart Reply, notification summaries, Siri enhancements with on-screen awareness.
- **On-device processing**: Most features run locally on Apple Silicon.
- **Private Cloud Compute (PCC)**: Cloud requests run on Apple Silicon servers with published privacy guarantees — data is not stored, not logged, not accessible to Apple employees.

### Data Retention and Reuse

- **Apple does not use user data to train its models.** This is a core stated principle.
- On-device data stays on device. PCC data is not retained after processing.
- PCC code images published for independent security audit.
- Optional ChatGPT integration is governed by OpenAI's policy and requires per-query user consent.

### Documented Concerns

- **Notification summaries (late 2024 / early 2025)**: Produced misleading summaries of news headlines (notably BBC News). Apple disabled the feature for news apps in iOS 18.3.
- Generally viewed favorably on privacy compared to competitors.

---

## Key Patterns

1. **Two-tier model is universal.** Every provider that charges for enterprise access promises not to train on that data. Free/consumer tiers are used for training by default.

2. **Opt-out, not opt-in.** All providers (except Apple) default to using free-tier consumer data for training. Most require users to find and toggle a setting to stop it; some (notably Anthropic and Mistral) offer no free-tier opt-out at all, requiring an upgrade to a paid tier.

3. **EU regulatory pressure drives change.** Italy (OpenAI), Ireland (Meta, xAI), Brazil (Meta), and GDPR broadly have forced providers to add opt-outs, pause training, or restructure data flows. US users have fewer protections.

4. **Apple is the outlier.** The only major provider that categorically states it does not use user data for training and processes primarily on-device.

5. **Memory features are converging.** All major providers are moving toward persistent cross-conversation memory, raising the stakes for retention and deletion practices.

6. **Derivative memory is ungoverned.** No provider's terms of service or privacy policy explicitly addresses what happens to summaries, embeddings, and inferences derived from deleted conversations.
