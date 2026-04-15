# Evidence: How AI Providers Handle Memory

Documented facts about how major AI providers accumulate, store, and reuse user memory and conversation data.

*Last updated: April 2026. All statements reflect publicly documented policies and events. URLs and policies may have changed since original publication. Verify against current versions before citing.*

**See also:** [The Manifesto](manifest.md) | [Terminology](terminology.md) | [Landscape](landscape.md)

---

## Citation Standard

Every factual claim in this document must link to a primary source: an official announcement, policy page, regulatory decision, court filing, or peer-reviewed publication. Where primary sources are unavailable, major news outlets (Reuters, Washington Post, TechCrunch, etc.) are acceptable.

Contributors adding new evidence should follow this pattern:
- **Announcements and launches**: link the product or feature name to the official blog post or press release.
- **Policies**: add a ([source](url)) link after the claim.
- **Regulatory actions**: link to the official decision or press release from the regulatory body.
- **Academic research**: link to the paper (arXiv, DOI, or publisher page).
- **Screenshots**: where a claim references a UI setting, policy page, or default state that may change, contributors are encouraged to add a dated screenshot to the [`screenshots/`](screenshots/) directory and reference it inline. File naming convention: `YYYY-MM-DD-provider-description.png`.

---

## Summary Table

| Provider | Default Training on User Data | Opt-Out Available | Training Exemption (Paid) | On-Device Option | Persistent Memory |
|----------|-------------------------------|-------------------|----------------------|------------------|-------------------|
| OpenAI | Yes (Free/Plus) | Yes | Yes (Enterprise/Team) | No | Yes (Feb 2024) |
| Anthropic | Opt-in (Free/Pro/Max) | Yes (toggle in settings) | Yes (Team/Enterprise) | No | Beta (2025); import added March 2026 |
| Meta | Yes (public posts) | EU/UK | N/A | No | Yes (2024) |
| xAI/Grok | Yes (X data) | Yes (buried setting) | N/A | No | Limited |
| Google | Yes (Gemini Apps) | Yes | Yes (Workspace) | No | Testing (2024); import March 2026 |
| Mistral | Yes (Le Chat free) | No (upgrade to paid) | Yes (API/Enterprise) | No | Limited |
| Microsoft | Yes (Consumer Copilot) | Limited | Yes (M365/Azure) | Recall (local) | Limited |
| Apple | **No** | N/A | N/A | **Yes (primary)** | On-device context |

---

## OpenAI (ChatGPT)

### Memory Features

- **[ChatGPT Memory](https://openai.com/index/memory-and-new-controls-for-chatgpt/)** launched February 2024 (initially limited, then broadly to Plus/Team/Enterprise). Memory allows ChatGPT to remember facts across conversations.
- Users can view, edit, and delete individual memories via Settings > Personalization > Memory.
- **[Custom Instructions](https://openai.com/index/custom-instructions-for-chatgpt/)** (July 2023) preceded Memory as a lighter personalization layer.
- **[Temporary Chat](https://help.openai.com/en/articles/8914046-temporary-chat-faq)** mode allows conversations that don't generate memories or appear in history.

### Data Retention and Reuse

- Content from Free and Plus users **may be used to train models** by default ([source](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)).
- **Opt-out**: Users can disable "Improve the model for everyone" in Settings > Data Controls ([source](https://help.openai.com/en/articles/8983130-what-if-i-want-to-keep-my-history-on-but-disable-model-training)). Conversations may still be retained for abuse monitoring ([Data Controls FAQ](https://help.openai.com/en/articles/7730893-data-controls-faq)).
- **API users**: Data is **not** used for training by default (since March 2023 policy update) ([source](https://developers.openai.com/api/docs/guides/your-data)).
- **Enterprise and Team tiers**: Data is **never** used for training ([source](https://openai.com/enterprise-privacy/)).

### Documented Concerns

- **Italy's Garante (March 2023)**: Temporarily banned ChatGPT over GDPR concerns — lack of age verification, unclear legal basis for processing personal data for training. Service restored after adding opt-out mechanisms ([decision](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9870832)).
- **FTC investigation (2023)**: Investigation into whether data practices caused consumer harm. No public enforcement action as of early 2026 ([Washington Post](https://www.washingtonpost.com/technology/2023/07/13/ftc-openai-chatgpt-sam-altman-lina-khan/)).
- **Training data regurgitation (November 2023)**: Nasr et al. ("[Scalable Extraction of Training Data from (Production) Language Models](https://arxiv.org/abs/2311.17035)," Google DeepMind / University of Washington, 2023) demonstrated ChatGPT could be prompted to output memorized training data.
- **Class-action lawsuits (2023)**: Multiple suits filed, including [*P.M. v. OpenAI Inc.*](https://www.courtlistener.com/docket/67535351/pm-v-openai-lp/) (N.D. Cal.), alleging scraping of personal data without consent.

---

## Anthropic (Claude)

### Memory Features

- **[Projects](https://www.anthropic.com/news/projects)** (mid-2024): Custom instructions and uploaded documents for Pro users, scoped to a project.
- Persistent cross-conversation memory was in limited testing/beta as of early 2025 ([announcement](https://www.anthropic.com/news/context-management)). Memory import features deployed March 2026 ([help page](https://support.anthropic.com/en/articles/12123587-import-and-export-your-memory-from-claude)).
- Each conversation is independent by default unless within a Project.

### Data Retention and Reuse

- **Free/Pro/Max**: Training is **opt-in**. Users choose whether to allow their conversations to be used for model improvement via a "Model Improvement" toggle in [Privacy Settings](https://claude.ai/settings/data-privacy-controls). Conversations are not used for training by default ([source](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training); [consumer terms update](https://www.anthropic.com/news/updates-to-our-consumer-terms)).
- **Team/Enterprise (Claude for Work)**: Not subject to the consumer training policy. Data is **not** used for training ([source](https://www.anthropic.com/news/updates-to-our-consumer-terms)).
- **API** (including Amazon Bedrock and Google Vertex): Customer data is not used for training by default.
- **Retention**: 30 days if training is off; 5 years if training is on. Deleted conversations are excluded from future training ([source](https://www.anthropic.com/news/updates-to-our-consumer-terms); [privacy policy](https://www.anthropic.com/legal/privacy)).
- Incognito chats are never used for training, regardless of settings ([source](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)).

### Documented Concerns

- Fewer major data-privacy controversies compared to other providers as of early 2025.
- Some criticism around opacity of pre-training data sources (common to all LLM providers).

---

## Meta (Meta AI)

### Memory Features

- **[Meta AI](https://about.fb.com/news/2023/09/introducing-ai-powered-assistants-characters-and-creative-tools/)** integrated into WhatsApp, Messenger, Instagram, and Facebook (September 2023).
- Can access user context from the host platform (profile information, group chat context).
- Memory feature began rolling out in 2024, allowing the assistant to remember preferences across interactions.

### Data Retention and Reuse

- Interactions with Meta AI may be used to improve AI models.
- Meta confirmed it uses **publicly available posts from Facebook and Instagram** to train AI models. Private messages are stated to be excluded ([source](https://www.facebook.com/privacy/genai/)).
- **EU**: Meta **paused** plans to train on European user data in June 2024 after objections from Ireland's DPC and advocacy group noyb ([noyb](https://noyb.eu/en/preliminary-noyb-win-meta-stops-ai-plans-eu); [TechCrunch](https://techcrunch.com/2024/06/14/meta-pauses-plans-to-train-ai-using-european-users-data-bowing-to-regulatory-pressure/)).
- EU/UK users have an opt-out form under GDPR / UK GDPR frameworks (Article 21). **US users have no equivalent opt-out for public post data.**

### Documented Concerns

- **June 2024**: [noyb filed complaints in 11 EU countries](https://noyb.eu/en/noyb-urges-11-dpas-immediately-stop-metas-abuse-personal-data-ai) against Meta's use of user data for AI training. Meta paused training in Europe.
- **Brazil's ANPD (July 2024)**: Ordered Meta to suspend use of Brazilian users' data for AI training. The suspension was partially lifted in August 2024, allowing Meta to resume processing for adult users under conditions ([ANPD decision](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-determina-suspensao-cautelar-do-tratamento-de-dados-pessoais-para-treinamento-da-ia-da-meta); [FPF analysis](https://fpf.org/blog/processing-of-personal-data-for-ai-training-in-brazil-takeaways-from-anpds-preliminary-decisions-in-the-meta-case/)).
- WhatsApp AI integration raised questions about end-to-end encryption guarantees (Meta says AI queries are processed separately and are not E2E encrypted).
- Users reported difficulty deleting AI interaction data from Instagram and Facebook.

---

## xAI / Grok

### Memory Features

- **[Grok](https://x.ai/news/grok)** launched November 2023 as part of X Premium+.
- Access to real-time X (Twitter) posts for context.
- Can personalize based on the user's X profile and posting history.
- Limited persistent memory: personalization is tied to X profile data rather than explicit cross-conversation memory storage.

### Data Retention and Reuse

- xAI uses **public X (Twitter) post data** to train Grok models.
- X's privacy policy updated August-September 2023 to explicitly state user data may be shared with xAI ([TechCrunch](https://techcrunch.com/2023/09/01/xs-privacy-policy-confirms-it-will-use-public-data-to-train-ai-models/)).
- **Opt-out**: A setting under Settings > Privacy > Grok to disable data sharing. **Initially defaulted to on** without individual user notification.

### Documented Concerns

- **September 2023**: Privacy policy update enabling data sharing with xAI was applied without individual user notification, with the setting enabled by default.
- **Ireland's DPC (September 2024)**: X agreed to suspend processing of EU/EEA users' personal data for Grok training following legal action ([DPC press release](https://www.dataprotection.ie/en/news-media/press-releases/dpc-welcomes-xs-agreement-suspend-its-processing-personal-data-purpose-training-ai-tool-grok)).
- Tight integration between a social media platform (X) and AI company (xAI) under the same owner raised governance concerns.

---

## Google (Gemini)

### Memory Features

- **[Gemini](https://blog.google/products/gemini/bard-gemini-advanced-app/)** (rebranded from Bard, February 2024) offers conversation history and "Gems" (custom personas).
- Memory feature in testing for Gemini Advanced (late 2024).
- **[Gemini Memory Import](https://blog.google/innovation-and-ai/products/gemini-app/switch-to-gemini-app/)** launched March 2026: users can import memories and chat history from ChatGPT, Claude, and other providers. Uses a proprietary approach rather than open standards (PAM/AMP). Not available in EEA/Switzerland/UK.
- **Gemini extensions** integrate with Gmail, Drive, Docs, Calendar, Maps — accessing personal data from these services.
- **Workspace (enterprise)**: Gemini can access organizational data with admin-controlled permissions.

### Data Retention and Reuse

- Conversations retained for up to **18 months** by default (with Gemini Apps Activity enabled). Configurable to 3 or 36 months ([source](https://support.google.com/gemini/answer/13594961?hl=en)).
- **Conversations may be reviewed by human reviewers** to improve the product ([source](https://support.google.com/gemini/answer/13594961?hl=en)).
- When Activity is turned off, conversations retained for up to 72 hours only.
- **Workspace (enterprise)**: Data is **not** used to train foundation models ([source](https://workspace.google.com/security/ai-privacy/)).

### Documented Concerns

- **February 2024**: Gemini conversations with Activity enabled are potentially accessible to human reviewers. Users warned not to share sensitive information.
- Privacy advocates raised concerns about Gemini's ability to read Gmail and Drive documents, given the breadth of Google's ecosystem.

---

## Mistral

### Memory Features

- **[Le Chat](https://mistral.ai/news/le-chat-mistral)** launched February 2024 with conversation history.
- Limited persistent memory features compared to ChatGPT as of early 2025.

### Data Retention and Reuse

- **Free-tier** conversations may be used to improve models ([source](https://legal.mistral.ai/terms/commercial-terms-of-service)).
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
- **[Windows Recall](https://blogs.microsoft.com/blog/2024/05/20/introducing-copilot-pcs/)** (announced May 2024): Takes periodic screenshots of everything on screen and uses AI to make it searchable.

### Data Retention and Reuse

- **Consumer Copilot**: Prompts and responses may be used to improve the service.
- **Microsoft 365 Copilot (enterprise)**: Customer data is **not** used to train foundation models ([source](https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy)).
- **Azure OpenAI Service**: Customer data is not used for training and is not shared with OpenAI.

### Documented Concerns

- **Windows Recall (May-June 2024)**: Widespread criticism. Security researcher Kevin Beaumont [demonstrated](https://doublepulsar.com/recall-stealing-everything-youve-ever-typed-or-viewed-on-your-own-windows-pc-is-now-possible-da3e12e9465e) that Recall stored screenshots in an **unencrypted SQLite database**, accessible to malware. Microsoft delayed and redesigned the feature with encryption, Windows Hello authentication, and opt-in (instead of opt-out).
- **[UK ICO](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/05/statement-in-response-to-microsoft-recall-feature/)** investigated Recall's privacy implications.
- Recall was described by critics as potential "spyware" built into Windows.
- **Oversharing problem**: Questions about whether Copilot for M365 adequately respects document permissions.

---

## Apple (Apple Intelligence)

### Memory Features

- **[Apple Intelligence](https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/)** announced WWDC June 2024, rolling out with iOS 18.1 (October 2024).
- Features include Writing Tools, Smart Reply, notification summaries, Siri enhancements with on-screen awareness.
- **On-device processing**: Most features run locally on Apple Silicon.
- **[Private Cloud Compute (PCC)](https://security.apple.com/blog/pcc-security-research/)**: Cloud requests run on Apple Silicon servers with published privacy guarantees — data is not stored, not logged, not accessible to Apple employees.

### Data Retention and Reuse

- **Apple does not use user data to train its models.** This is a core stated principle ([source](https://www.apple.com/legal/privacy/data/en/intelligence-engine/)).
- On-device data stays on device. PCC data is not retained after processing.
- PCC code images published for independent security audit ([source](https://security.apple.com/blog/pcc-security-research/)).
- Optional ChatGPT integration is governed by OpenAI's policy and requires per-query user consent.

### Documented Concerns

- **Notification summaries (late 2024 / early 2025)**: Produced misleading summaries of news headlines (notably BBC News). Apple disabled the feature for news apps in iOS 18.3 ([9to5Mac](https://9to5mac.com/2025/01/16/ios-18-3-temporarily-disables-apple-intelligence-notification-summaries-for-select-apps-more/)).
- Widely reported as the most privacy-focused approach among major AI providers.

---

## Key Patterns

1. **Two-tier model is universal.** Every provider that charges for enterprise access promises not to train on that data. Free/consumer tiers are used for training by default.

2. **Opt-out is the norm; opt-in is emerging.** Most providers (except Apple) default to using free-tier consumer data for training and require users to find and toggle a setting to stop it. Mistral offers no free-tier opt-out, requiring an upgrade to a paid tier. Anthropic is an exception in the other direction: as of 2025, it moved to an opt-in model where free-tier users choose whether to allow training ([source](https://www.anthropic.com/news/updates-to-our-consumer-terms)).

3. **EU regulatory pressure drives change.** Italy (OpenAI), Ireland (Meta, xAI), Brazil (Meta), and GDPR broadly have forced providers to add opt-outs, pause training, or restructure data flows. US users have fewer protections.

4. **Apple is the outlier.** The only major provider that categorically states it does not use user data for training and processes primarily on-device.

5. **Memory features are converging.** All major providers are moving toward persistent cross-conversation memory, raising the stakes for retention and deletion practices.

6. **Derivative memory is ungoverned.** None of the reviewed providers' terms of service or privacy policies explicitly address what happens to summaries, embeddings, and inferences derived from deleted conversations. This pattern is notable for what is absent: none of the providers reviewed define retention, governance, or deletion obligations for derivative representations.
