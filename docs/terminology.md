# Terminology

A shared vocabulary for AI memory governance. These definitions are used throughout the manifesto and related documents.

**See also:** [The Manifesto](manifest.md) | [Evidence](evidence.md) | [Landscape](landscape.md)

---

## Core Definitions

### Digital Memory

A structured, persistent representation of past interactions, preferences, and contextual knowledge retained by or on behalf of a user within digital systems. Distinguished from raw "data" (unstructured bits) and "history" (chronological logs) by its semantic organization and intended use for future recall and personalization. The concept draws from Vannevar Bush's 1945 "memex" vision and has been formalized in lifelogging and personal informatics research (Dodge & Kitchin, 2007).

### Personally Identifiable Information (PII)

Any information that can be used, alone or in combination with other data, to identify, contact, or locate a specific individual. Defined in NIST SP 800-122 (2010). The GDPR uses the broader term "personal data" (Article 4(1)), encompassing any information relating to an identified or identifiable natural person.

### History (Interaction Logs)

A chronological, typically append-only record of discrete interactions between a user and a system, including queries, responses, timestamps, and session metadata. History is raw and sequential — it preserves what happened but does not inherently encode meaning, relationships, or generalizations. Analogous to a transcript rather than a memory.

### AI Memory

The capacity of an AI system to retain, retrieve, and apply information from prior interactions with a user across sessions. This includes explicitly stored facts, user preferences, and contextual continuity. Distinct from model weights and training data. The term is used by major AI providers to describe persistent user-specific context (see OpenAI, "Memory and ChatGPT," February 2024; Anthropic, "Claude's Memory," 2025).

### Memory Object / Memory Item

A discrete, identifiable unit of stored information within an AI memory system, typically containing a fact, preference, or contextual detail about a user. Analogous to a database record. A memory object may include metadata such as source, timestamp, confidence level, and provenance.

---

## Operational Terms

### Memory Portability

The ability of a user to export, transfer, and import their memory data between different AI systems or platforms in a usable format. Conceptually grounded in the GDPR's Right to Data Portability (Article 20) and extended to encompass not just raw data but semantically structured memory representations.

### Memory Lock-in

A condition in which a user's accumulated AI memory becomes practically non-transferable to competing systems due to proprietary formats, lack of export functionality, or platform-specific embeddings. Analogous to vendor lock-in in cloud computing. Creates switching costs that grow with usage duration.

### Memory Vault / Personal Data Store

A user-controlled, secure repository for personal data and memory objects, where the individual — not the service provider — holds primary access and governance authority. Related to the Solid project (Tim Berners-Lee, MIT, 2016) and the MyData movement (MyData Declaration, 2017).

### Inference / Inferred Memory

Information that an AI system derives or concludes about a user based on patterns in their interactions, rather than information the user explicitly provided. The Article 29 Working Party (now EDPB) distinguished inferred data from provided and observed data in Guidelines on Automated Decision-Making (WP251, 2018). Inferred memories raise unique governance challenges because the user may be unaware of them.

### Provenance

The documented origin, derivation history, and chain of custody of a memory object — including when it was created, from what interaction it was derived, whether it was user-stated or system-inferred, and any transformations applied. Borrowed from archival science and database research (Buneman et al., 2001). Essential for auditability and trust.

### Memory Profile

The aggregate representation of a user constructed from accumulated memory objects, inferences, and behavioral patterns within an AI system. Functions as a composite identity model that shapes how the AI responds to and anticipates the user. Distinct from a "user profile" in that it may include inferred psychological, cognitive, and relational attributes beyond demographic or preference data.

### Memory-Free Mode

An operating mode in which an AI system does not retain, store, or build persistent memory about the user across interactions. Ensures that users can engage with AI systems without being subject to profiling or accumulation of personal context. Related to the principle of data minimization and the right to non-participation in persistent tracking.

### Memory-Based Manipulation

The use of accumulated memory and inferred knowledge about a user to influence their behavior, decisions, or beliefs in ways that serve the system operator's interests rather than the user's. Includes dark patterns enhanced by personalization, emotionally targeted persuasion, and exploitation of known vulnerabilities. Related to the EU AI Act's prohibition on AI systems that deploy "subliminal techniques" or exploit vulnerabilities (Article 5, 2024).

### Memory Lifecycle

The complete sequence of stages a memory object undergoes: creation (capture or inference), storage, retrieval, use, update, archival, and deletion. Governance frameworks must address policies and rights at each stage. Analogous to the data lifecycle concept in information governance (DAMA-DMBOK, 2017).

### Memory Expiration / Decay

A mechanism by which memory objects lose relevance, accessibility, or are automatically deleted after a defined period or upon meeting certain conditions. Modeled on human memory's natural forgetting processes. Serves data minimization principles. Viktor Mayer-Schönberger advocated for systematic digital forgetting in *Delete: The Virtue of Forgetting in the Digital Age* (2009).

### Selective Disclosure

The ability of a user to choose which specific memory objects or categories of memory are shared with, visible to, or usable by a particular AI system, agent, or third party. Rooted in privacy-by-design principles (Cavoukian, 2009) and related to contextual integrity (Nissenbaum, 2004).

### Memory Interoperability

The capacity for memory objects to be meaningfully exchanged, understood, and utilized across different AI systems, platforms, and standards. Requires common schemas, ontologies, or translation layers. A prerequisite for genuine memory portability.

### Derivative Memory

Memory objects generated through transformation of original user data — including summaries, embeddings, clusters, compressed representations, and abstracted patterns. Raises ownership questions: if a user deletes the source interaction, must derivative memories also be purged? The GDPR's right to erasure (Article 17) does not explicitly address derived or aggregated representations, creating a governance gap.

### Behavioral Profiling

The systematic collection and analysis of a user's actions, patterns, and habits to construct predictive models of their behavior. Regulated under GDPR Article 22 (automated decision-making and profiling) and defined in Article 4(4).

### Silent Repurposing

The practice of using memory objects or user data collected for one stated purpose for a different, undisclosed purpose — such as using conversational memory gathered for personalization to train models, target advertising, or inform third-party services. Violates the principle of purpose limitation (GDPR Article 5(1)(b)).

---

## Governance Principles

### User Sovereignty

The principle that individuals should hold ultimate authority over their personal data and digital memory, including the right to access, correct, delete, port, and control the use of memory objects. Extends the concept of informational self-determination. Aligned with the MyData principles (2017). Distinct from "data ownership" (a contested legal concept) in emphasizing control and governance rights rather than property rights.

### Data Minimization

The principle that personal data collection and retention should be limited to what is directly necessary and proportionate for the specified purpose. Codified in GDPR Article 5(1)(c) and the OECD Privacy Guidelines (1980, revised 2013).

### Purpose Limitation

The principle that personal data must be collected for specified, explicit, and legitimate purposes and not further processed in a manner incompatible with those purposes. Codified in GDPR Article 5(1)(b). In AI memory systems, requires clear boundaries on how memory objects may be used.

### Right to Be Forgotten (Right to Erasure)

The right of individuals to request the deletion of their personal data when it is no longer necessary, when consent is withdrawn, or when data has been unlawfully processed. Established in GDPR Article 17 and prefigured by the CJEU ruling in *Google Spain v. AEPD* (Case C-131/12, 2014). In AI memory contexts, extends to memory objects, inferred memories, and potentially derivative memories.

### Right to Reasonable Inferences

The proposed right of individuals to contest and seek justification for inferences drawn about them by automated systems. Articulated by Wachter & Mittelstadt in *A Right to Reasonable Inferences* (2019, Columbia Business Law Review). Not yet codified in law but increasingly influential. Addresses a critical gap: current frameworks protect input data but inadequately govern outputs (inferences).

### Auditability

The principle that AI memory systems must maintain sufficient records and transparency to allow independent verification of what memory is stored, how it was derived, how it has been used, and whether governance policies have been followed. Supported by the EU AI Act (Articles 12 and 14, 2024).

### Cognitive Sovereignty

The right of an individual to maintain autonomous control over the information systems that shape their thinking, decision-making, and self-perception. In AI memory contexts, it extends to the right to control what an AI "knows" about you and how that knowledge influences interactions. The term has gained traction in neuroethics (Ienca & Andorno, 2017) and is increasingly applied to AI governance.

### Distinguishability

The principle that AI memory systems must clearly differentiate between categories of memory objects based on their epistemic status: (1) facts explicitly stated by the user, (2) inferences derived by the system, and (3) summaries or abstractions generated from multiple data points. Without distinguishability, users cannot meaningfully exercise rights to correction or contest inferences.

---

## References

- Buneman et al., "Why and Where: A Characterization of Data Provenance," 2001
- Cavoukian, A., "Privacy by Design," 2009
- DAMA International, *DAMA-DMBOK: Data Management Body of Knowledge*, 2017
- Dodge & Kitchin, "Outlines of a World Coming into Existence," 2007
- EU General Data Protection Regulation (GDPR), Regulation (EU) 2016/679
- EU AI Act, Regulation (EU) 2024/1689
- Google Spain v. AEPD, CJEU Case C-131/12, 2014
- Ienca & Andorno, "Towards New Human Rights in the Age of Neuroscience and Neurotechnology," 2017
- Mayer-Schönberger, V., *Delete: The Virtue of Forgetting in the Digital Age*, 2009
- MyData Declaration, 2017
- OpenAI, "Memory and ChatGPT," February 2024
- Anthropic, "Claude's Memory," 2025
- NIST SP 800-122, "Guide to Protecting the Confidentiality of PII," 2010
- Nissenbaum, H., "Privacy as Contextual Integrity," 2004
- OECD Privacy Guidelines, 1980 (revised 2013)
- Wachter & Mittelstadt, "A Right to Reasonable Inferences," Columbia Business Law Review, 2019
