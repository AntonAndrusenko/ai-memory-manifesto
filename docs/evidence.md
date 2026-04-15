# Evidence: How AI Providers Handle Memory

Documented facts about how major AI providers accumulate, store, and reuse user memory and conversation data.

*Last updated: April 15, 2026. All statements reflect publicly documented policies and events. URLs and policies may have changed since original publication. Verify against current versions before citing.*

**See also:** [The Manifesto](../MANIFESTO.md) | [Terminology](terminology.md) | [Landscape](landscape.md)

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
| OpenAI | Yes (Free/Go/Plus) | Yes | Yes (Team/Enterprise/Edu) | Atlas browser (local-ish) | Yes (Feb 2024; overhauled Apr 2025) |
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
- **Memory overhauled April 2025** ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)): Memory now operates in two modes:
  - **Saved Memories**: Details the user explicitly asks ChatGPT to remember (e.g. "Remember that I am vegetarian"). ChatGPT may also save details proactively if it determines they may be useful. Saved memories persist until the user deletes them. Available to all tiers.
  - **Reference Chat History**: ChatGPT references all past conversations to personalize responses. Unlike saved memories, details from past chats can change over time as ChatGPT updates what's more helpful to remember. Available to Plus and Pro only; **not yet available to Enterprise and Edu** ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).
- Users can delete individual saved memories, clear all memories, or turn memory off entirely in Settings > Personalization.
- **Deleted saved memories are retained for up to 30 days** for safety and debugging purposes ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).
- Turning off "Reference Chat History" deletes the information ChatGPT remembered from past chats. That information is deleted from OpenAI's systems within 30 days ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).
- To fully remove something ChatGPT knows, users must delete both the saved memory **and** all chats where the information was shared — deleting a chat does not remove saved memories, and deleting a memory does not remove mentions from past chats ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).
- ChatGPT Plus and Pro users can enable **automatic memory management**, which prioritizes the most relevant memories and moves less important ones to the background to prevent a "memory full" state ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).
- Memory is **disabled in the EU and EEA** pending compliance reviews under the AI Act ([search results](https://www.datastudios.org/post/chatgpt-data-retention-policies-updated-rules-and-user-controls-in-2025)).
- ChatGPT Enterprise workspace owners can turn Memory on or off for all users in Admin Settings ([Memory FAQ — Business Version](https://help.openai.com/en/articles/9295112-memory-faq-business-version)).
- **[Custom Instructions](https://openai.com/index/custom-instructions-for-chatgpt/)** (July 2023) preceded Memory as a lighter personalization layer.
- **[Temporary Chat](https://help.openai.com/en/articles/8914046-temporary-chat-faq)** mode: conversations don't appear in history, don't generate memories, and are not used for training. Temporary chats are automatically deleted within 30 days ([Privacy Policy](https://openai.com/policies/us-privacy-policy/)).
- **Memory is used in ChatGPT Search**: ChatGPT may use saved memories or recent chats to rewrite search queries for more personalized results ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).

### Data Collection

OpenAI's privacy policy (updated April 1, 2026) discloses the following categories of personal data collected ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/); [ROW Privacy Policy](https://openai.com/policies/row-privacy-policy/)):

- **Account Information**: Name, contact information, credentials, date of birth, payment information, transaction history, profile picture, username.
- **User Content ("Content")**: Prompts, uploaded files, images, audio/video, Sora characters, data from connected services, and interactions with other users.
- **Communication Information**: Contents of messages sent to OpenAI (e.g. via email or social media).
- **Contact Data**: Device address book data (if user connects contacts). OpenAI checks which contacts also use Services and notifies the user when a contact signs up.
- **Log Data**: IP address, browser type/settings, date/time, interaction data.
- **Usage Data**: Content viewed/engaged with, features used, actions taken, feedback submitted, time zone, country, device type.
- **Device Information**: Device name, OS, device identifiers, browser.
- **Location Information**: General location from IP address; precise GPS location if the user opts in.
- **Cookies and Similar Technologies**: Used for authentication, preferences, and analytics.
- **Atlas Browser Data**: If user uses the Atlas browser, browsing data is collected according to user controls ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/); [Atlas Data Controls](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)).
- **Advertiser Data** (Free/Go users): OpenAI may receive information from advertisers and data partners to measure ad effectiveness ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/)).
- **Third-party sources**: Security/safety partners, marketing vendors, publicly available internet data for model training.

### Data Retention and Reuse

- Content from Free, Go, and Plus users **may be used to train models** by default ([source](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)).
- **Opt-out**: Users can disable "Improve the model for everyone" in Settings > Data Controls ([source](https://help.openai.com/en/articles/8983130-what-if-i-want-to-keep-my-history-on-but-disable-model-training)). Conversations may still be retained for abuse monitoring ([Data Controls FAQ](https://help.openai.com/en/articles/7730893-data-controls-faq)).
- **De-identified data survives deletion**: The privacy policy states that deleted data that has "already been de-identified and disassociated from your account when you allow us to use your Content to improve our models" is **not** removed upon deletion ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 4). This means training contributions made before opt-out or deletion are permanent.
- **Abuse monitoring**: API abuse monitoring logs are retained for up to 30 days by default. Eligible customers can apply for **Zero Data Retention (ZDR)** or Modified Abuse Monitoring controls ([Data Controls — Platform](https://developers.openai.com/api/docs/guides/your-data)).
- **API users**: Data is **not** used for training by default (since March 2023 policy update) ([source](https://developers.openai.com/api/docs/guides/your-data)).
- **Team, Enterprise, Edu, Healthcare, Teachers**: Data is **never** used for training by default. No opt-out required ([source](https://openai.com/enterprise-privacy/)).
- **Enterprise retention controls**: Enterprise workspace owners can set a custom data retention policy with a **minimum of 90 days** ([Enterprise Privacy](https://openai.com/enterprise-privacy/)).
- **Free/Plus chat retention**: Standard chat history retained **indefinitely** unless the user actively deletes conversations. Once deleted, chats are purged within 30 days ([Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 4).
- **Training uses memories**: If "Improve the model for everyone" is on, OpenAI may use content shared with ChatGPT — **including past chats, saved memories, and memories from those chats** — to improve models ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).

### Content Ownership and Rights

- **Users retain ownership of Input** and **own the Output**. OpenAI assigns to the user "all right, title, and interest, if any" in Output ([Terms of Use](https://openai.com/policies/row-terms-of-use/); [API Copyright FAQ](https://help.openai.com/en/articles/5008634-will-openai-claim-copyright-over-what-outputs-i-generate-with-the-api)).
- **Training license (consumer)**: Users can opt out of their Content being used to train models. If opted in, no explicit scope limitation is defined for how training data may be reused.
- **Business terms**: OpenAI will only use Customer Content as necessary to provide the Services, comply with law, and enforce policies. OpenAI **will not** use Customer Content to develop or improve Services unless the customer explicitly agrees ([Services Agreement](https://openai.com/policies/services-agreement/)).
- **Restriction**: Users are prohibited from using Output to develop models that compete with OpenAI ([Terms of Use](https://openai.com/policies/row-terms-of-use/)).

### User Rights (Privacy Policy)

The privacy policy grants the following rights ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 6; [ROW Privacy Policy](https://openai.com/policies/row-privacy-policy/), Section 6):

- Access personal data and information about how it is processed.
- Rectify or update personal data.
- Delete personal data (removed from systems within 30 days, subject to exceptions).
- Transfer personal data to a third party (right to data portability).
- Restrict processing.
- Withdraw consent.
- Lodge a complaint with a data protection authority.
- Object to processing for direct marketing or based on legitimate interests.
- **Export**: Users can export ChatGPT history and data via Settings > Data Controls.

**Accuracy caveat**: OpenAI's privacy policy explicitly notes that ChatGPT may produce factually inaccurate information about users and recommends submitting correction requests to `dsar@openai.com`, which will be considered "based on applicable law and the technical capabilities of our models" ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 6).

### Advertising

- **Ads launched February 2026** for Free and Go tier users in the U.S. ([OpenAI announcement](https://openai.com/index/testing-ads-in-chatgpt/); [Axios](https://www.axios.com/2026/02/09/chatgpt-ads-testing-go-free)). Expanded to Canada, Australia, and New Zealand in March 2026.
- Ads appear at the bottom of answers when there is a relevant sponsored product or service, and are clearly labeled.
- OpenAI states ads do not influence ChatGPT's answers, and conversations are kept private from advertisers.
- **Ad personalization uses user data**: The privacy policy states that for Free and Go users, personal data is used "to personalize the ads you see on our Services (subject to your settings), and to measure the effectiveness of ads shown on our Services" ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 2).
- OpenAI may receive data from advertisers and data partners about user purchases ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 1).
- Pro, Business, and Enterprise subscriptions do not include ads.

### Atlas Browser

- **[ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)** browser (launched October 2025) integrates ChatGPT into web browsing on Mac.
- **Browser Memories**: If opted in, ChatGPT remembers facts and insights from browsing. Web contents are deleted immediately after summarization; privacy-filtered summaries are deleted within 7 days ([Atlas Data Controls](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)).
- Users can control which sites ChatGPT can see via a per-site toggle in the address bar.
- Browsing content is **not** used to train models by default.
- Incognito mode prevents saving browsing history, cookies, or form inputs, but chats are still retained for 30 days for abuse detection.
- **Privacy concerns**: In testing, Atlas was found to memorize sensitive health queries including specific doctor names ([Proton analysis](https://proton.me/blog/is-chatgpt-atlas-safe); [Washington Post](https://www.washingtonpost.com/technology/2025/10/22/chatgpt-atlas-browser/); [NPR](https://www.npr.org/2025/11/07/nx-s1-5597010/openai-atlas-browser-chatgpt-data-privacy)).

### Documented Concerns

- **Italy's Garante (March 2023)**: Temporarily banned ChatGPT over GDPR concerns — lack of age verification, unclear legal basis for processing personal data for training. Service restored after adding opt-out mechanisms ([decision](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9870832)).
- **FTC investigation (2023)**: Investigation into whether data practices caused consumer harm. No public enforcement action as of early 2026 ([Washington Post](https://www.washingtonpost.com/technology/2023/07/13/ftc-openai-chatgpt-sam-altman-lina-khan/)).
- **Training data regurgitation (November 2023)**: Nasr et al. ("[Scalable Extraction of Training Data from (Production) Language Models](https://arxiv.org/abs/2311.17035)," Google DeepMind / University of Washington, 2023) demonstrated ChatGPT could be prompted to output memorized training data.
- **Class-action lawsuits (2023)**: Multiple suits filed, including [*P.M. v. OpenAI Inc.*](https://www.courtlistener.com/docket/67535351/pm-v-openai-lp/) (N.D. Cal.), alleging scraping of personal data without consent.
- **NYT court order (May–September 2025)**: A U.S. federal court ordered OpenAI to "preserve and segregate all output log data that would otherwise be deleted on a going forward basis" during the *New York Times v. OpenAI* copyright lawsuit. The preservation order was lifted September 26, 2025 ([Engadget](https://www.engadget.com/ai/openai-no-longer-has-to-preserve-all-of-its-chatgpt-data-with-some-exceptions-192422093.html)). Conversations from the April–September 2025 window remain in secure storage pending litigation, except for data from EEA/Switzerland/UK users.
- **Memory disabled in EU/EEA**: Memory features remain disabled in the EU and EEA pending compliance reviews under the AI Act.
- **De-identified data is permanent**: Once content has been de-identified and used for training, it survives user deletion requests — the privacy policy explicitly carves this out from the 30-day deletion commitment ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 4).
- **Sensitive information in memories**: OpenAI acknowledges that "memory raises important privacy and safety considerations" and says it has trained ChatGPT not to proactively remember sensitive information (e.g. health details) unless explicitly asked, but advises users to "avoid entering information you wouldn't want remembered" ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)).

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

3. **EU regulatory pressure drives change.** Italy (OpenAI), Ireland (Meta, xAI), Brazil (Meta), and GDPR broadly have forced providers to add opt-outs, pause training, or restructure data flows. US users have fewer protections. OpenAI's Memory feature remains disabled in the EU/EEA pending compliance reviews.

4. **Apple is the outlier.** The only major provider that categorically states it does not use user data for training and processes primarily on-device.

5. **Memory features are converging.** All major providers are moving toward persistent cross-conversation memory, raising the stakes for retention and deletion practices. OpenAI's April 2025 memory overhaul introduced two modes (saved memories + chat history reference), with ChatGPT using memory to personalize search queries — a sign of deepening integration.

6. **Derivative memory is ungoverned.** None of the reviewed providers' terms of service or privacy policies explicitly address what happens to summaries, embeddings, and inferences derived from deleted conversations. This pattern is notable for what is absent: none of the providers reviewed define retention, governance, or deletion obligations for derivative representations.

7. **De-identified training data is permanent.** OpenAI's privacy policy explicitly states that data which has been "de-identified and disassociated from your account" for model training is not removed upon deletion ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/), Section 4). Once content has contributed to training, the contribution is irreversible — even if the user later opts out or deletes their data.

8. **Advertising creates new memory incentives.** OpenAI introduced ads for Free and Go tier users in February 2026, using personal data for ad personalization and receiving purchase data from advertisers ([US Privacy Policy](https://openai.com/policies/us-privacy-policy/)). This creates an economic incentive to retain and analyze user memory beyond its original purpose of personalization.

9. **Memory deletion is fragmented and incomplete.** OpenAI requires users to delete both saved memories **and** all chats where information was shared to fully remove what ChatGPT knows. Deleting a chat does not remove saved memories; deleting a memory does not remove mentions from past chats. Deleted saved memories are retained for 30 days. De-identified training contributions survive indefinitely ([Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq); [US Privacy Policy](https://openai.com/policies/us-privacy-policy/)).
