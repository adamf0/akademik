# Graph Report - wonderful-noether  (2026-10-27)

## Corpus Check
- 181 files · ~211,548 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .toml 4, (none) 3, .cmd 1)

## Summary
- 2157 nodes · 3962 edges · 162 communities (148 shown, 14 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f66e1716`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- setLiveState
- resumeSession
- live-browser.js
- modern-screenshot.umd.js
- el
- validate.py
- package.json
- renderDesignVisual
- compress.py
- createLiveBrowserDomHelpers
- captureElementToBlob
- auth.ts
- applyEditing
- handleManualEditActivity
- scheduleAcceptCleanup
- startVariantObserver
- Commands
- createLiveBrowserSessionState
- [lessonId].astro
- resolveLiveInjectionAnchor
- cli.py
- showBar
- Cookies
- actOnAgentTarget
- onAnnotDown
- render-test.mjs
- Layout.astro
- dependencies
- detect.py
- getUserFromSession
- live.md
- _compress_file_locked
- caveman-explore/tests/skill-file.test.mjs
- [slug].astro
- file_lock
- pages/index.astro
- caveman-explore/package.json
- caveman-learn/package.json
- impeccable/SKILL.md
- re
- dashboard/chat.astro
- write_bytes_atomic
- compilerOptions
- Responsive Design
- Product
- cleanup
- live-browser-ignores.js
- products.astro
- vouchers.astro
- caveman-compress/README.md
- onboard.md
- 3. Heal
- db.ts
- interface
- Rules
- interface
- interface
- interface
- interface
- interface
- interface
- BundlingShowcase.astro
- policy
- doctor.md
- Operate mode depth (and Read notes)
- migrate_sqlite_to_mariadb.mjs
- The Toolkit
- Agent Skill: Principal UI/UX Architect & Motion Choreographer (Awwwards-Tier)
- impeccable/SKILL.md
- connectSSE
- Tracing
- animate.md
- Handle `generate`
- Generate Report
- Browser Session Management
- Browser Automation with playwright-cli
- cavecrew/SKILL.md
- Caveman Help
- New visual work
- optimize.md
- Impeccable Asset Producer
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Rules
- Running Custom Playwright Code
- Rules
- Daftar Produk
- Daftar Produk
- Akademi Creator – 100K 3 Bulan
- Akademi Creator – 100K 3 Bulan
- Daftar Produk
- Daftar Produk
- Akademi Creator – 100K 3 Bulan
- Caveman Compress
- critique.md
- Simplify the Design
- Hardening Dimensions
- playwright-cli/SKILL.md
- bolder.md
- caveman-commit
- caveman-review
- clarify.md
- Nielsen's 10 Heuristics
- Generate Combined Critique Report
- document.md
- polish.md
- quieter.md
- mountSvelteComponentVariant
- Init flow
- Video Recording
- Common Cognitive Load Violations
- iOS platform
- Shape
- Advanced Mocking with run-code
- Ponytail Help
- Review Caveman evidence
- Manage eval-gated experiments
- caveman-setup/SKILL.md
- Android platform
- colorize.md
- Persona-Based Design Testing
- Extract Flow
- Region map
- Evaluate an optimization observation
- caveman-stats
- Generate Report
- Cognitive Load Assessment
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- caveman-discover/SKILL.md
- Diagnostic Scan
- Visualize: Direction Comps & Asset Production
- skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)
- caveman-learn skill
- Adaptation Strategies
- Impeccable Documenter
- Responsive Design
- Attaching Screenshots and Videos to Pull Requests
- 2. Generate
- ponytail-audit/SKILL.md
- Ponytail Gain
- ponytail-review/SKILL.md
- Ponytail
- DESIGN.md: Akademi Creator Visual System
- admin/index.astro
- Heuristics Scoring Guide
- scripts
- Persuade and Experience
- ponytail-debt/SKILL.md
- investigate-first/SKILL.md
- lean-build/SKILL.md
- megacave/README.md
- migration/SKILL.md
- safe-refactor/SKILL.md
- surgical-patch/SKILL.md
- ultracave/README.md
- verify-and-stop/SKILL.md
- 1. Planning
- Read

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `setLiveState()` - 33 edges
3. `resumeSession()` - 33 edges
4. `showToast()` - 31 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `buildInsertConfigureRow()` - 27 edges
8. `handleKeyDown()` - 27 edges
9. `cleanup()` - 27 edges
10. `injectSvelteComponentsFromManifest()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Step 2: Act by severity` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/doctor.md → .agents/skills/impeccable/scripts/live-browser.js
- `What this owns, and what it does not` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/doctor.md → .agents/skills/impeccable/scripts/live-browser.js
- `Commands` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/SKILL.md → .agents/skills/impeccable/scripts/live-browser.js
- `Init flow` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/init.md → .agents/skills/impeccable/scripts/live-browser.js
- `enableInlineEdit()` --indirect_call--> `own()`  [INFERRED]
  .agents/skills/impeccable/scripts/live-browser.js → .agents/skills/impeccable/scripts/live-browser-dom.js

## Import Cycles
- None detected.

## Communities (162 total, 14 thin omitted)

### Community 0 - "setLiveState"
Cohesion: 0.06
Nodes (84): agentStatusText(), attachSteerFocusGuard(), barPaletteForTheme(), beginNewLiveConfiguration(), brandMarkSvg(), buildDesignHeader(), cancelEditing(), cancelEditingToPicking() (+76 more)

### Community 1 - "resumeSession"
Cohesion: 0.13
Nodes (25): applySavedSessionMeta(), checkpointPayload(), clampVariantIndex(), clearHandled(), enterRecoveryWaitingForAnchor(), findActiveSessionSummary(), findAdoptableServerSession(), findAnyVariantsWrapper() (+17 more)

### Community 2 - "live-browser.js"
Cohesion: 0.05
Nodes (64): applyLiveBarPreference(), applyOriginalAttrsToSvelteAnchor(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), bufferToBase64(), buildPlaceholderResizeHandles(), buildSavingRow(), buildSvelteExpressionTextMap() (+56 more)

### Community 3 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 4 - "el"
Cohesion: 0.05
Nodes (81): agentHasWorkInFlight(), applyGlobalBarLabelState(), armPageChatForTyping(), attachSteerFocusDebug(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl() (+73 more)

### Community 5 - "validate.py"
Cohesion: 0.09
Nodes (21): benchmark_pair(), count_tokens(), main(), print_table(), count_bullets(), extract_code_blocks(), extract_fenced_spans(), extract_headings() (+13 more)

### Community 6 - "package.json"
Cohesion: 0.18
Nodes (12): author, description, devDependencies, @types/node@^26.6.5, typescript@^7.0.2, keywords, license, main (+4 more)

### Community 7 - "renderDesignVisual"
Cohesion: 0.08
Nodes (36): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), designEmptyMessage() (+28 more)

### Community 8 - "compress.py"
Cohesion: 0.12
Nodes (11): AnthropicSdkUnavailable, call_anthropic_sdk(), call_claude(), call_claude_cli(), call_openai_compat(), call_opencode_cli(), configured_model(), configured_provider() (+3 more)

### Community 9 - "createLiveBrowserDomHelpers"
Cohesion: 0.14
Nodes (18): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), own() (+10 more)

### Community 10 - "captureElementToBlob"
Cohesion: 0.12
Nodes (20): averageRgb01(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), compileShader(), cssColorToRgb01(), dominantRgb01(), findBackdropAncestor() (+12 more)

### Community 11 - "auth.ts"
Cohesion: 0.23
Nodes (14): astro, clearSession(), createSession(), createSessionToken(), SESSION_COOKIE_NAME, signPayload(), verifyPassword(), hashPassword() (+6 more)

### Community 12 - "applyEditing"
Cohesion: 0.07
Nodes (37): addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectEditableTextRows(), visit(), collectManualContextPieces(), walk() (+29 more)

### Community 13 - "handleManualEditActivity"
Cohesion: 0.18
Nodes (25): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+17 more)

### Community 14 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 15 - "startVariantObserver"
Cohesion: 0.09
Nodes (50): applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), buildParamsPanel(), closedClipPath(), closeTunePopover(), commitAcceptedVariantToDom(), completeParameterGenerationIfReady() (+42 more)

### Community 16 - "Commands"
Cohesion: 0.17
Nodes (12): Commands, Core, DevTools, Emulation, Keyboard, Mouse, Navigation, Network (+4 more)

### Community 17 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 18 - "[lessonId].astro"
Cohesion: 0.18
Nodes (8): allLessons, course, currentIdx, isCurrentCompleted, modulesMap, progressMap, progressRows, typeBadge

### Community 19 - "resolveLiveInjectionAnchor"
Cohesion: 0.73
Nodes (6): elementMatchesOriginalMarkup(), findLiveElementForOriginalMarkup(), findLiveElementFromAnchorSnapshot(), isUsableInjectionAnchor(), normalizeElementClassName(), resolveLiveInjectionAnchor()

### Community 20 - "cli.py"
Cohesion: 0.20
Nodes (7): main(), backup_dir_for(), compress_file(), is_sensitive_path(), legacy_backup_dir_for(), lock_path_for(), _state_base_dir()

### Community 21 - "showBar"
Cohesion: 0.13
Nodes (23): actionLabel(), applyConfigureBarChrome(), buildConfirmedRow(), buildCyclingRow(), buildDots(), buildGeneratingRow(), canCreateInsert(), cycleVariant() (+15 more)

### Community 22 - "Cookies"
Cohesion: 0.06
Nodes (35): Advanced: Multiple Cookies or Custom Options, Advanced: Multiple Operations, Authentication State Reuse, Clear All Cookies, Clear All localStorage, Clear sessionStorage, Common Patterns, Cookies (+27 more)

### Community 23 - "actOnAgentTarget"
Cohesion: 0.24
Nodes (19): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+11 more)

### Community 24 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 25 - "render-test.mjs"
Cohesion: 0.29
Nodes (4): adminCookie, invoke(), studentCookie, testAll()

### Community 26 - "Layout.astro"
Cohesion: 0.11
Nodes (13): Props, Props, UserSession, errorBox, form, submitBtn, btn, errorBox (+5 more)

### Community 27 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, astro@^7.3.8, @astrojs/node@^11.1.9, tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, @astrojs/node, tailwindcss, @tailwindcss/vite

### Community 28 - "detect.py"
Cohesion: 0.21
Nodes (5): detect_file_type(), _is_code_line(), _is_json_content(), _is_yaml_content(), should_compress()

### Community 29 - "getUserFromSession"
Cohesion: 0.27
Nodes (6): getUserFromSession(), POST(), POST(), POST(), POST(), POST()

### Community 30 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 31 - "_compress_file_locked"
Cohesion: 0.17
Nodes (7): build_compress_prompt(), build_fix_prompt(), _compress_file_locked(), _is_smaller_than_body(), read_source(), restore_code_blocks(), split_frontmatter()

### Community 32 - "caveman-explore/tests/skill-file.test.mjs"
Cohesion: 0.23
Nodes (3): md, skillFile, skill

### Community 33 - "[slug].astro"
Cohesion: 0.33
Nodes (4): lessons, lessonTypeLabel, product, typeLabel

### Community 34 - "file_lock"
Cohesion: 0.18
Nodes (4): file_lock(), LockTimeoutError, _try_lock_nonblocking(), _unlock()

### Community 35 - "pages/index.astro"
Cohesion: 0.11
Nodes (9): tracks, faqs, stageMentors, mentors, alumniCases, socialNiches, socialProfiles, testimonyCards (+1 more)

### Community 36 - "caveman-explore/package.json"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 37 - "caveman-learn/package.json"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 38 - "impeccable/SKILL.md"
Cohesion: 0.10
Nodes (18): Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode (+10 more)

### Community 39 - "re"
Cohesion: 0.22
Nodes (4): _body_candidate_error(), first_nonblank_line(), _frontmatter_block_count(), mask_code_blocks()

### Community 40 - "dashboard/chat.astro"
Cohesion: 0.29
Nodes (3): messages, room, starterPrompts

### Community 41 - "write_bytes_atomic"
Cohesion: 0.29
Nodes (3): write_bytes_atomic(), _write_target(), write_text_atomic()

### Community 42 - "compilerOptions"
Cohesion: 0.25
Nodes (7): astro/tsconfigs/strict, compilerOptions, allowJs, baseUrl, paths, strictNullChecks, extends

### Community 43 - "Responsive Design"
Cohesion: 0.12
Nodes (15): Assess Adaptation Challenge, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Techniques, Mobile Adaptation (Desktop → Mobile), Navigation Adaptation (+7 more)

### Community 45 - "Product"
Cohesion: 0.08
Nodes (25): 1. Halaman Beranda / Landing Page (`/`), 1. Modul Produk & Bundling, 2. Halaman Katalog Produk & Bundling (`/products`), 2. Sistem Voucher & Diskon, 3. Halaman Detail Produk & Paket Bundling (`/products/[slug]`), 3. Sistem Pembelajaran (LMS), 4. Halaman Checkout & Registrasi (`/checkout`, `/auth/register`), 4. Sistem Private Chat Room (+17 more)

### Community 46 - "cleanup"
Cohesion: 0.11
Nodes (33): abortSvelteComponentInjection(), buildInsertPlaceholderSnapshotFromDom(), buildPickedAnchorSnapshot(), captureAndEmit(), cleanup(), cleanupAcceptedSession(), clearMountErrorCard(), clearScrollY() (+25 more)

### Community 47 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 48 - "products.astro"
Cohesion: 0.33
Nodes (4): feedback, form, isAuthorized, submitBtn

### Community 49 - "vouchers.astro"
Cohesion: 0.29
Nodes (4): feedback, form, isAuthorized, submitBtn

### Community 50 - "caveman-compress/README.md"
Cohesion: 0.08
Nodes (22): Before / After, Benchmarks, How It Work, <img src="../../docs/assets/dancing-rock.svg" width="20" height="20" alt="rock"/> Caveman (421 tokens), Install, Original (827 tokens), Part of Caveman, Provider / model (+14 more)

### Community 51 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 52 - "3. Heal"
Cohesion: 0.15
Nodes (13): 0. How generation works, 3.1 Find failing tests, 3.2 Debug one failure, 3.3 Apply the fix, 3.4 Reconcile with the spec, 3.5 Iteration and giving up, 3. Heal, Add assertions manually (+5 more)

### Community 53 - "db.ts"
Cohesion: 0.12
Nodes (8): db, pool, isAuthorized, enrollments, latestChat, orders, products, typeLabel

### Community 54 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 55 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 56 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 57 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 58 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 59 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 60 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 61 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 62 - "BundlingShowcase.astro"
Cohesion: 0.29
Nodes (5): allProducts, fitCriteria, notFitCriteria, standaloneProducts, supportFacilities

### Community 64 - "doctor.md"
Cohesion: 0.25
Nodes (7): Monorepo notes, Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 66 - "Operate mode depth (and Read notes)"
Cohesion: 0.22
Nodes (9): Color, Components, Layout, Motion, Operate mode depth (and Read notes), Product constraints, Product permissions, The product slop test (+1 more)

### Community 67 - "migrate_sqlite_to_mariadb.mjs"
Cohesion: 0.25
Nodes (5): mariadb@^3.5.4, mariadb, pool, sqlite, sqliteDbPath

### Community 68 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 69 - "Agent Skill: Principal UI/UX Architect & Motion Choreographer (Awwwards-Tier)"
Cohesion: 0.11
Nodes (17): 1. Meta Information & Core Directive, 2. THE "ABSOLUTE ZERO" DIRECTIVE (STRICT ANTI-PATTERNS), 3. THE CREATIVE VARIANCE ENGINE, 4. HAPTIC MICRO-AESTHETICS (COMPONENT MASTERY), 5. MOTION CHOREOGRAPHY (FLUID DYNAMICS), 6. PERFORMANCE GUARDRAILS, 7. EXECUTION PROTOCOL, 8. PRE-OUTPUT CHECKLIST (+9 more)

### Community 70 - "impeccable/SKILL.md"
Cohesion: 0.10
Nodes (16): Craft floor, Refuse, Verify, Constraints, Failure modes, Flow, $impeccable hooks, Routing (+8 more)

### Community 71 - "connectSSE"
Cohesion: 0.12
Nodes (30): abandonForeignSession(), abandonSupersededGo(), commitAcceptedSvelteComponentToDom(), connectSSE(), discardOrphanedSession(), findInsertAnchorInDom(), findLiveElementForSvelteManifest(), handleDiscard() (+22 more)

### Community 72 - "Tracing"
Cohesion: 0.12
Nodes (16): 1. Start Tracing Before the Problem, 2. Clean Up Old Traces, Analyzing Performance, Basic Usage, Best Practices, Capturing Evidence, Debugging Failed Actions, Limitations (+8 more)

### Community 73 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 74 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 75 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 76 - "Browser Session Management"
Cohesion: 0.10
Nodes (20): 1. Name Browser Sessions Semantically, 2. Always Clean Up, 3. Delete Stale Browser Data, A/B Testing Sessions, Attach by channel name, Attach via browser extension, Attach via CDP endpoint, Attaching to a Running Browser (+12 more)

### Community 77 - "Browser Automation with playwright-cli"
Cohesion: 0.13
Nodes (15): Attaching screenshots and videos to pull requests, Browser Automation with playwright-cli, Browser Sessions, Example: Debugging with DevTools, Example: Form submission, Example: Interactive session, Example: Multi-tab workflow, Installation (+7 more)

### Community 78 - "cavecrew/SKILL.md"
Cohesion: 0.14
Nodes (12): cavecrew, Example chaining, How to invoke, Model overrides, See also, What it does, Auto-clarity (inherited), Chaining patterns (+4 more)

### Community 79 - "Caveman Help"
Cohesion: 0.14
Nodes (12): caveman-help, Example output, How to invoke, See also, What it does, Caveman Help, Configure Default Mode, Deactivate (+4 more)

### Community 80 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 81 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 82 - "Impeccable Asset Producer"
Cohesion: 0.15
Nodes (11): Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve, Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract (+3 more)

### Community 83 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 84 - "Rules"
Cohesion: 0.15
Nodes (12): 1. Classical register, 2. Particles carry structure, 3. Each fact once, 4. Payload in original script, 5. Tool runs, 6. Never perform, Floor, megacave (+4 more)

### Community 85 - "Running Custom Playwright Code"
Cohesion: 0.15
Nodes (13): Clipboard, Complex Workflows, Error Handling, File Downloads, Frames and Iframes, Geolocation, JavaScript Execution, Media Emulation (+5 more)

### Community 86 - "Rules"
Cohesion: 0.15
Nodes (12): 1. Fragments, 2. One word when one word is enough, 3. Each fact once, 4. Cut conjunctions only when order survives, 5. Tool runs, 6. Never perform, Floor, Persistence (+4 more)

### Community 87 - "Daftar Produk"
Cohesion: 0.15
Nodes (12): Accessibility, Brand, Component Rule Expectations, Daftar Produk, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 88 - "Daftar Produk"
Cohesion: 0.15
Nodes (12): Accessibility, Brand, Component Rule Expectations, Daftar Produk, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 89 - "Akademi Creator – 100K 3 Bulan"
Cohesion: 0.15
Nodes (12): Accessibility, Akademi Creator – 100K 3 Bulan, Brand, Component Rule Expectations, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 90 - "Akademi Creator – 100K 3 Bulan"
Cohesion: 0.15
Nodes (12): Accessibility, Akademi Creator – 100K 3 Bulan, Brand, Component Rule Expectations, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 91 - "Daftar Produk"
Cohesion: 0.15
Nodes (12): Accessibility, Brand, Component Rule Expectations, Daftar Produk, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 92 - "Daftar Produk"
Cohesion: 0.15
Nodes (12): Accessibility, Brand, Component Rule Expectations, Daftar Produk, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 93 - "Akademi Creator – 100K 3 Bulan"
Cohesion: 0.15
Nodes (12): Accessibility, Akademi Creator – 100K 3 Bulan, Brand, Component Rule Expectations, Guideline Authoring Workflow, Mission, Quality Gates, Required Output Structure (+4 more)

### Community 94 - "Caveman Compress"
Cohesion: 0.17
Nodes (11): Boundaries, Caveman Compress, Compress, Compression Rules, Pattern, Preserve EXACTLY (never modify), Preserve Structure, Process (+3 more)

### Community 95 - "critique.md"
Cohesion: 0.17
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 96 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 97 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 98 - "playwright-cli/SKILL.md"
Cohesion: 0.21
Nodes (4): Examples, Inspecting Element Attributes, Debugging Playwright Tests, Running Playwright Tests

### Community 99 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 100 - "caveman-commit"
Cohesion: 0.18
Nodes (9): caveman-commit, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 101 - "caveman-review"
Cohesion: 0.18
Nodes (9): caveman-review, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 102 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 103 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 104 - "Generate Combined Critique Report"
Cohesion: 0.18
Nodes (11): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+3 more)

### Community 105 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 106 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 107 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 108 - "mountSvelteComponentVariant"
Cohesion: 0.48
Nodes (7): componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), importFirstReachable(), loadSvelteRuntime(), mountSvelteComponentVariant(), probePreviewTree()

### Community 109 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 110 - "Video Recording"
Cohesion: 0.20
Nodes (10): 1. Use Descriptive Filenames, 2. Record entire hero scripts., 3. Attach the recording to the pull request, Basic Recording, Best Practices, Cursor, Target Highlight and Click Point, Limitations, Overlay API Summary (+2 more)

### Community 111 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 112 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 113 - "Shape"
Cohesion: 0.25
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 114 - "Advanced Mocking with run-code"
Cohesion: 0.22
Nodes (8): Advanced Mocking with run-code, CLI Route Commands, Conditional Response Based on Request, Delayed Response, Modify Real Response, Request Mocking, Simulate Network Failures, URL Patterns

### Community 115 - "Ponytail Help"
Cohesion: 0.22
Nodes (8): Band (Claude Code), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 116 - "Review Caveman evidence"
Cohesion: 0.25
Nodes (7): Hard rules, Review Caveman evidence, Step 1 — Load context, Step 2 — Establish baseline, Step 3 — Test the leading explanation with traces, Step 4 — Inspect representative traces, Step 5 — Report

### Community 117 - "Manage eval-gated experiments"
Cohesion: 0.25
Nodes (7): Manage eval-gated experiments, Non-negotiable gates, Step 1 — Load project and experiment, Step 2 — Evaluate evidence, Step 3 — Propose one action, Step 4 — Block unsafe execution, Step 5 — Re-read after external operator action

### Community 118 - "caveman-setup/SKILL.md"
Cohesion: 0.25
Nodes (7): Failure templates (use verbatim, filled in — never soften), Rules (non-negotiable), Step 1 — Find every live LLM callsite, Step 2 — Pick the app slug, Step 3 — Wire each callsite, Step 4 — Verify with one real request, Step 5 — Report

### Community 119 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 120 - "colorize.md"
Cohesion: 0.25
Nodes (7): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode

### Community 121 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 122 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 123 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 124 - "Evaluate an optimization observation"
Cohesion: 0.29
Nodes (6): 1. Read the exact observations, 2. Ask the operator to choose, 3. Design a candidate and paired eval, 4. Apply only the approved candidate, 5. Report observations, not savings, Evaluate an optimization observation

### Community 125 - "caveman-stats"
Cohesion: 0.29
Nodes (5): caveman-stats, Example output, How to invoke, See also, What it does

### Community 126 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 127 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 128 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 129 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 130 - "caveman-discover/SKILL.md"
Cohesion: 0.33
Nodes (5): Step 1 — Inventory the workflows, Step 2 — Name them, Step 3 — Propose, then apply, Step 4 — Verify, Step 5 — Report

### Community 131 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 132 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 133 - "skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)"
Cohesion: 0.40
Nodes (4): Boundary (binding), Install path, Layout, skills/caveman-learn — the Caveman Learn editing skill (Apache-2.0, public)

### Community 134 - "caveman-learn skill"
Cohesion: 0.40
Nodes (4): caveman-learn skill, Honesty, Install, What it does

### Community 135 - "Adaptation Strategies"
Cohesion: 0.25
Nodes (7): Adaptation Strategies, Assess Adaptation Challenge, Implement & Verify, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

### Community 136 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 137 - "Responsive Design"
Cohesion: 0.20
Nodes (10): Breakpoints: Content-Driven, Detect Input Method, Not Just Screen Size, Layout Adaptation Patterns, Mobile-First: Write It Right, Picture Element for Art Direction, Responsive Design, Responsive Images: Get It Right, Safe Areas: Handle the Notch (+2 more)

### Community 138 - "Attaching Screenshots and Videos to Pull Requests"
Cohesion: 0.40
Nodes (5): Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits, When to attach

### Community 139 - "2. Generate"
Cohesion: 0.40
Nodes (5): 2.1 Inputs, 2.2 Generate one scenario, 2.3 Generate multiple scenarios, 2.4 Run generated tests, 2. Generate

### Community 140 - "ponytail-audit/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Map first, 2. Look for, 3. Check before you report, 4. Output

### Community 141 - "Ponytail Gain"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 142 - "ponytail-review/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Understand first, 2. Look for, 3. Check before you report, 4. Output

### Community 143 - "Ponytail"
Cohesion: 0.40
Nodes (4): Before you write, Levels, Ponytail, The smallest complete change

### Community 144 - "DESIGN.md: Akademi Creator Visual System"
Cohesion: 0.40
Nodes (4): DESIGN.md: Akademi Creator Visual System, Design Read & Liveliness Dials, One-Line Rationale per Major Decision (R-31), Semantic Tokens

### Community 146 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 147 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, start, test

### Community 148 - "Persuade and Experience"
Cohesion: 0.50
Nodes (3): Comps, Directions, Persuade and Experience

### Community 149 - "ponytail-debt/SKILL.md"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

### Community 163 - "1. Planning"
Cohesion: 0.40
Nodes (5): 1.1 Prerequisite: workspace, 1.2 Prerequisite: seed test, 1.3 Explore the app, 1.4 Write the spec file, 1. Planning

### Community 164 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

## Knowledge Gaps
- **1 isolated node(s):** `astro/tsconfigs/strict`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1082 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `init()` connect `setLiveState` to `doctor.md`, `resumeSession`, `live-browser.js`, `el`, `impeccable/SKILL.md`, `connectSSE`, `Init flow`, `handleManualEditActivity`, `onAnnotDown`, `live.md`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `astro/tsconfigs/strict` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `setLiveState` be split into smaller, more focused modules?**
  _Cohesion score 0.059097127222982215 - nodes in this community are weakly interconnected._
- **Why does `Commands` connect `impeccable/SKILL.md` to `setLiveState`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `resumeSession` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Why does `Reference Material` connect `Heuristics Scoring Guide` to `Persona-Based Design Testing`, `Cognitive Load Assessment`, `critique.md`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._