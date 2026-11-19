# Graph Report - dr-house  (2026-11-18)

## Corpus Check
- 190 files · ~27,202 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 35 file(s) not represented in the graph (top: .scss 8, .css 7, .woff 6)

## Summary
- 1214 nodes · 2594 edges · 86 communities (43 shown, 43 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 169 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `36c1bed1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- relations.ts
- Pharmacie
- Medicament
- PostgreSQL Repositories
- createRendezVousRoutes
- RappelPrise
- Paiement
- desktop/package.json
- mobile/package.json
- backend/package.json
- Consultation
- hopital-use-cases.ts
- infrastructure/repositories/dossier-medical-repository.ts
- PaginationParams
- infrastructure/repositories/ordonnance-repository.ts
- DomainEvent
- infrastructure/repositories/medecin-repository.ts
- entites/enums.ts
- infrastructure/ports/storage-port.ts
- Utilisateur
- utilisateur-use-cases.ts
- HttpStatusCode
- package.json
- compilerOptions
- validation.ts
- desktop/src-tauri/tauri.conf.json
- mobile/src-tauri/tauri.conf.json
- IExamenRepository
- compilerOptions
- compilerOptions
- compilerOptions
- Patient
- []
- Email
- valeur-objets/index.ts
- Telephone
- desktop/svelte.config.js
- MotDePasse
- desktop/src-tauri/capabilities/default.json
- mobile/src-tauri/capabilities/default.json
- HeurePrise
- NumOrdre
- Poids
- Posologie
- Taille
- TransactionRef
- mobile/vite.config.js
- Main App Icon
- desktop/src-tauri/src/lib.rs
- mobile/src-tauri/src/lib.rs
- discution.ts
- Svelte Framework Logo
- config/index.ts
- desktop/src/routes/+layout.ts
- ssr
- dr-house
- dr-house
- Square107x107 Logo
- Square142x142 Logo
- Square150x150 Logo
- Square284x284 Logo
- Square30x30 Logo
- Square310x310 Logo
- Square44x44 Logo
- Square71x71 Logo
- Square89x89 Logo
- Store Logo
- devDependencies
- ActivityChart.svelte
- shadcn
- scripts
- createPatientRoutes
- patient-use-cases.ts
- GlassContainer.svelte
- dependencies

## God Nodes (most connected - your core abstractions)
1. `PaginationParams` - 70 edges
2. `PaginatedResult` - 69 edges
3. `HttpStatusCode` - 35 edges
4. `drizzle-orm` - 32 edges
5. `createErrorResponse()` - 29 edges
6. `Utilisateur` - 28 edges
7. `createSuccessResponse()` - 27 edges
8. `[]` - 24 edges
9. `RendezVous` - 23 edges
10. `RappelPrise` - 22 edges

## Surprising Connections (you probably didn't know these)
- `Bun` --semantically_similar_to--> `wycare`  [INFERRED] [semantically similar]
  backend/README.md → README.md
- `Desktop SvelteKit App Shell` --semantically_similar_to--> `Mobile SvelteKit App Shell`  [INFERRED] [semantically similar]
  desktop/src/app.html → mobile/src/app.html
- `Desktop Tauri + SvelteKit + TypeScript` --semantically_similar_to--> `Mobile Tauri + SvelteKit + TypeScript`  [INFERRED] [semantically similar]
  desktop/README.md → mobile/README.md
- `wycare` --references--> `Saafara Diab Backend`  [INFERRED]
  README.md → backend/README.md
- `wycare` --references--> `Desktop Tauri + SvelteKit + TypeScript`  [INFERRED]
  README.md → desktop/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Backend Data Layer** — backend_readme_drizzle_orm, backend_readme_postgresql, backend_todo_drizzle_orm, backend_todo_repositories [INFERRED 0.85]
- **Backend Hexagonal Architecture** — backend_readme_saafara_diab_backend, backend_todo_repositories, backend_todo_ports, backend_todo_domain_entities, backend_todo_use_cases, backend_todo_http_routes [INFERRED 0.85]
- **Frontend Tauri + SvelteKit Apps** — desktop_readme_tauri_sveltekit_typescript, mobile_readme_tauri_sveltekit_typescript, desktop_src_app_html, mobile_src_app_html [INFERRED 0.85]
- **Tech Stack Framework Logos** — mobile_static_svelte_svg_logo, mobile_static_tauri_svg_logo, mobile_static_vite_svg_logo [INFERRED 0.85]
- **Tauri App Icon Set** — mobile_src_tauri_icons_128x128_app_icon, mobile_src_tauri_icons_128x128_2x_app_icon, mobile_src_tauri_icons_32x32_app_icon, mobile_src_tauri_icons_icon_app_icon, mobile_src_tauri_icons_storelogo_logo, mobile_src_tauri_icons_square30x30logo_logo, mobile_src_tauri_icons_square44x44logo_logo, mobile_src_tauri_icons_square71x71logo_logo, mobile_src_tauri_icons_square89x89logo_logo, mobile_src_tauri_icons_square107x107logo_logo, mobile_src_tauri_icons_square142x142logo_logo, mobile_src_tauri_icons_square150x150logo_logo, mobile_src_tauri_icons_square284x284logo_logo, mobile_src_tauri_icons_square310x310logo_logo [INFERRED 0.95]

## Communities (86 total, 43 thin omitted)

### Community 0 - "relations.ts"
Cohesion: 0.11
Nodes (36): consultations, messages, room, dossiersMedicaux, groupeSanguinEnum, modePaiementEnum, sexeEnum, statutPaiementEnum (+28 more)

### Community 1 - "Pharmacie"
Cohesion: 0.13
Nodes (10): PharmacieUseCases, CreatePharmacieRequest, PharmacieResponse, UpdatePharmacieRequest, Pharmacie, IPharmacieRepository, PharmacieService, createPharmacieRoutes() (+2 more)

### Community 2 - "Medicament"
Cohesion: 0.16
Nodes (8): MedicamentUseCases, CreateMedicamentRequest, MedicamentResponse, UpdateMedicamentRequest, Medicament, IMedicamentRepository, createMedicamentRoutes(), MedicamentRepository

### Community 3 - "PostgreSQL Repositories"
Cohesion: 0.05
Nodes (44): better-auth, Bun, Drizzle ORM, Hono, PostgreSQL, Saafara Diab Backend, Domain Entities, Domain Events (+36 more)

### Community 4 - "createRendezVousRoutes"
Cohesion: 0.16
Nodes (11): RendezVousUseCases, CreateRendezVousRequest, RendezVousResponse, UpdateRendezVousRequest, StatutRendezVous, ANNULE, CONFIRME, PLANIFIE (+3 more)

### Community 5 - "RappelPrise"
Cohesion: 0.12
Nodes (9): RappelUseCases, CreateRappelRequest, RappelResponse, RappelPrise, IRappelPriseRepository, RappelPriseService, createRappelRoutes(), RappelPriseRepository (+1 more)

### Community 6 - "Paiement"
Cohesion: 0.10
Nodes (19): PaiementUseCases, CreatePaiementRequest, PaiementResponse, UpdatePaiementRequest, ModePaiement, CARTE_BANCAIRE, ESPECES, ORANGE_MONEY (+11 more)

### Community 7 - "desktop/package.json"
Cohesion: 0.06
Nodes (35): dependencies, @tauri-apps/api, @tauri-apps/plugin-opener, description, devDependencies, svelte, svelte-check, @sveltejs/adapter-static (+27 more)

### Community 8 - "mobile/package.json"
Cohesion: 0.09
Nodes (22): browserslist, description, cross-env, svelte, svelte-check, @sveltejs/adapter-static, @sveltejs/kit, @sveltejs/vite-plugin-svelte (+14 more)

### Community 9 - "backend/package.json"
Cohesion: 0.06
Nodes (33): dependencies, better-auth, @better-auth/drizzle-adapter, drizzle-orm, hono, postgres, devDependencies, drizzle-kit (+25 more)

### Community 10 - "Consultation"
Cohesion: 0.16
Nodes (9): ConsultationUseCases, ConsultationResponse, CreateConsultationRequest, UpdateConsultationRequest, Consultation, IConsultationRepository, createConsultationRoutes(), ConsultationRepository (+1 more)

### Community 11 - "hopital-use-cases.ts"
Cohesion: 0.17
Nodes (9): HopitalUseCases, CreateHopitalRequest, HopitalResponse, UpdateHopitalRequest, Hopital, IHopitalRepository, createHopitalRoutes(), HopitalRepository (+1 more)

### Community 12 - "infrastructure/repositories/dossier-medical-repository.ts"
Cohesion: 0.15
Nodes (9): DossierMedicalUseCases, CreateDossierMedicalRequest, DossierMedicalResponse, UpdateDossierMedicalRequest, DossierMedical, IDossierMedicalRepository, createDossierMedicalRoutes(), DossierMedicalRepository (+1 more)

### Community 13 - "PaginationParams"
Cohesion: 0.07
Nodes (12): Examen, RendezVous, IRendezVousRepository, PaginatedResult, PaginationParams, client, Database, db (+4 more)

### Community 14 - "infrastructure/repositories/ordonnance-repository.ts"
Cohesion: 0.13
Nodes (10): OrdonnanceUseCases, CreateOrdonnanceRequest, LigneOrdonnanceRequest, OrdonnanceResponse, LigneOrdonnance, Ordonnance, IOrdonnanceRepository, createOrdonnanceRoutes() (+2 more)

### Community 15 - "DomainEvent"
Cohesion: 0.11
Nodes (12): ConsultationTermineeEvent, DomainEvent, IEventBus, OrdonnanceCreeeEvent, PaiementEchoueEvent, PaiementRecuEvent, RappelPrisePlanifieEvent, RappelPrisePrisEvent (+4 more)

### Community 16 - "infrastructure/repositories/medecin-repository.ts"
Cohesion: 0.13
Nodes (9): MedecinUseCases, CreateMedecinRequest, MedecinResponse, UpdateMedecinRequest, Medecin, IMedecinRepository, createMedecinRoutes(), MedecinRepository (+1 more)

### Community 17 - "entites/enums.ts"
Cohesion: 0.13
Nodes (18): CreatePatientRequest, UpdatePatientRequest, GroupeSanguin, A_NEGATIF, A_POSITIF, AB_NEGATIF, AB_POSITIF, B_NEGATIF (+10 more)

### Community 18 - "infrastructure/ports/storage-port.ts"
Cohesion: 0.10
Nodes (4): INotificationPort, IStoragePort, NotificationPort, StoragePort

### Community 19 - "Utilisateur"
Cohesion: 0.19
Nodes (4): Utilisateur, IUtilisateurRepository, toDomain(), UtilisateurRepository

### Community 20 - "utilisateur-use-cases.ts"
Cohesion: 0.16
Nodes (5): LoginRequest, LoginResponse, RegisterRequest, IAuthPort, authMiddleware()

### Community 21 - "HttpStatusCode"
Cohesion: 0.06
Nodes (37): UserUseCases, ApiResponse, createErrorResponse(), createSuccessResponse(), HttpStatusCode, ACCEPTED, BAD_GATEWAY, BAD_REQUEST (+29 more)

### Community 22 - "package.json"
Cohesion: 0.08
Nodes (23): dependencies, devDependencies, cpy-cli, cross-env, cross-env, typescript, name, peerDependencies (+15 more)

### Community 23 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, jsx, lib, module, moduleDetection, moduleResolution (+12 more)

### Community 24 - "validation.ts"
Cohesion: 0.18
Nodes (10): AccesInterditError, AppError, ConflitError, NonTrouveError, RequeteInvalideError, lireCorpsJson(), lireDate(), lireHeure() (+2 more)

### Community 25 - "desktop/src-tauri/tauri.conf.json"
Cohesion: 0.11
Nodes (17): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+9 more)

### Community 26 - "mobile/src-tauri/tauri.conf.json"
Cohesion: 0.11
Nodes (17): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+9 more)

### Community 27 - "IExamenRepository"
Cohesion: 0.25
Nodes (6): ExamenUseCases, CreateExamenRequest, ExamenResponse, UpdateExamenRequest, IExamenRepository, createExamenRoutes()

### Community 28 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, module, moduleResolution (+7 more)

### Community 29 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 30 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 31 - "Patient"
Cohesion: 0.26
Nodes (4): Patient, IPatientRepository, PatientRepository, toDomain()

### Community 32 - "[]"
Cohesion: 0.12
Nodes (11): [], active, cornerRadius, curve(), {
		glyph = 18,
		axis = 'row',
		dilate = 100,
		bounce = 50,
		speed = 50,
		hug = 6,
		corner = NAV_CORNER
	}, go(), indicatorAnimate, indicatorTransition (+3 more)

### Community 38 - "desktop/src-tauri/capabilities/default.json"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 39 - "mobile/src-tauri/capabilities/default.json"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 47 - "Main App Icon"
Cohesion: 0.40
Nodes (5): 128x128@2x Retina App Icon, 128x128 App Icon, 32x32 App Icon, Main App Icon, Web Favicon

### Community 52 - "Svelte Framework Logo"
Cohesion: 1.00
Nodes (3): Svelte Framework Logo, Tauri Framework Logo, Vite Framework Logo

### Community 73 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, cross-env, daisyui, @humanspeak/svelte-motion, lucide-svelte, svelte, svelte-check, @sveltejs/adapter-static (+9 more)

### Community 74 - "ActivityChart.svelte"
Cohesion: 0.25
Nodes (5): arcChartSeries, handleKeyDown(), handleRingClick(), ringStates, series

### Community 75 - "shadcn"
Cohesion: 0.29
Nodes (6): mcp, shadcn, $schema, command, enabled, type

### Community 76 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, preview, tauri

### Community 81 - "createPatientRoutes"
Cohesion: 0.61
Nodes (3): PatientUseCases, PatientResponse, createPatientRoutes()

### Community 83 - "GlassContainer.svelte"
Cohesion: 0.29
Nodes (4): hidden, inView, shown, transition

## Knowledge Gaps
- **342 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+337 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 492 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PaginationParams` connect `PaginationParams` to `Pharmacie`, `Medicament`, `RappelPrise`, `Paiement`, `Consultation`, `hopital-use-cases.ts`, `infrastructure/repositories/ordonnance-repository.ts`, `infrastructure/repositories/medecin-repository.ts`, `entites/enums.ts`, `Utilisateur`, `validation.ts`, `Patient`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `PaginatedResult` connect `PaginationParams` to `Pharmacie`, `Medicament`, `RappelPrise`, `Paiement`, `Consultation`, `hopital-use-cases.ts`, `infrastructure/repositories/ordonnance-repository.ts`, `infrastructure/repositories/medecin-repository.ts`, `entites/enums.ts`, `Utilisateur`, `Patient`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `hono` connect `HttpStatusCode` to `validation.ts`, `backend/package.json`, `utilisateur-use-cases.ts`, `RappelPrise`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _342 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `relations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10522496371552975 - nodes in this community are weakly interconnected._
- **Should `Pharmacie` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `PostgreSQL Repositories` be split into smaller, more focused modules?**
  _Cohesion score 0.05230496453900709 - nodes in this community are weakly interconnected._