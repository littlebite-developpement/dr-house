# Graph Report - dr-house  (2026-10-13)

## Corpus Check
- 188 files · ~24,771 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 35 file(s) not represented in the graph (top: .scss 8, .css 7, .woff 6)

## Summary
- 1189 nodes · 2563 edges · 81 communities (41 shown, 40 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 169 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6db81d57`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- relations.ts
- types.ts
- infrastructure/repositories/medicament-repository.ts
- PostgreSQL Repositories
- RendezVous
- RappelPrise
- entites/enums.ts
- desktop/package.json
- mobile/package.json
- backend/package.json
- infrastructure/repositories/consultation-repository.ts
- infrastructure/repositories/hopital-repository.ts
- infrastructure/repositories/dossier-medical-repository.ts
- PaginationParams
- createErrorResponse
- DomainEvent
- infrastructure/repositories/medecin-repository.ts
- infrastructure/repositories/patient-repository.ts
- infrastructure/ports/storage-port.ts
- Utilisateur
- createSuccessResponse
- HttpStatusCode
- package.json
- compilerOptions
- validation.ts
- desktop/src-tauri/tauri.conf.json
- mobile/src-tauri/tauri.conf.json
- src/index.ts
- compilerOptions
- compilerOptions
- compilerOptions
- Role
- Navbar.svelte
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
- medecin-use-cases.ts
- shadcn
- scripts

## God Nodes (most connected - your core abstractions)
1. `PaginationParams` - 70 edges
2. `PaginatedResult` - 69 edges
3. `HttpStatusCode` - 35 edges
4. `drizzle-orm` - 32 edges
5. `createErrorResponse()` - 29 edges
6. `Utilisateur` - 28 edges
7. `createSuccessResponse()` - 27 edges
8. `RendezVous` - 23 edges
9. `RappelPrise` - 22 edges
10. `hono` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Desktop SvelteKit App Shell` --semantically_similar_to--> `Mobile SvelteKit App Shell`  [INFERRED] [semantically similar]
  desktop/src/app.html → mobile/src/app.html
- `Bun` --semantically_similar_to--> `wycare`  [INFERRED] [semantically similar]
  backend/README.md → README.md
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

## Communities (81 total, 40 thin omitted)

### Community 0 - "relations.ts"
Cohesion: 0.11
Nodes (36): consultations, messages, room, dossiersMedicaux, groupeSanguinEnum, modePaiementEnum, sexeEnum, statutPaiementEnum (+28 more)

### Community 1 - "types.ts"
Cohesion: 0.13
Nodes (10): PharmacieUseCases, CreatePharmacieRequest, PharmacieResponse, UpdatePharmacieRequest, Pharmacie, IPharmacieRepository, PharmacieService, createPharmacieRoutes() (+2 more)

### Community 2 - "infrastructure/repositories/medicament-repository.ts"
Cohesion: 0.15
Nodes (8): MedicamentUseCases, CreateMedicamentRequest, MedicamentResponse, UpdateMedicamentRequest, Medicament, IMedicamentRepository, createMedicamentRoutes(), MedicamentRepository

### Community 3 - "PostgreSQL Repositories"
Cohesion: 0.05
Nodes (44): better-auth, Bun, Drizzle ORM, Hono, PostgreSQL, Saafara Diab Backend, Domain Entities, Domain Events (+36 more)

### Community 4 - "RendezVous"
Cohesion: 0.11
Nodes (15): RendezVousUseCases, CreateRendezVousRequest, RendezVousResponse, UpdateRendezVousRequest, StatutRendezVous, ANNULE, CONFIRME, PLANIFIE (+7 more)

### Community 5 - "RappelPrise"
Cohesion: 0.12
Nodes (9): RappelUseCases, CreateRappelRequest, RappelResponse, RappelPrise, IRappelPriseRepository, RappelPriseService, createRappelRoutes(), RappelPriseRepository (+1 more)

### Community 6 - "entites/enums.ts"
Cohesion: 0.10
Nodes (19): PaiementUseCases, CreatePaiementRequest, PaiementResponse, UpdatePaiementRequest, ModePaiement, CARTE_BANCAIRE, ESPECES, ORANGE_MONEY (+11 more)

### Community 7 - "desktop/package.json"
Cohesion: 0.06
Nodes (35): dependencies, @tauri-apps/api, @tauri-apps/plugin-opener, description, devDependencies, svelte, svelte-check, @sveltejs/adapter-static (+27 more)

### Community 8 - "mobile/package.json"
Cohesion: 0.09
Nodes (22): browserslist, dependencies, description, cross-env, svelte, svelte-check, @sveltejs/adapter-static, @sveltejs/kit (+14 more)

### Community 9 - "backend/package.json"
Cohesion: 0.06
Nodes (33): dependencies, better-auth, @better-auth/drizzle-adapter, drizzle-orm, hono, postgres, devDependencies, drizzle-kit (+25 more)

### Community 10 - "infrastructure/repositories/consultation-repository.ts"
Cohesion: 0.14
Nodes (9): ConsultationUseCases, ConsultationResponse, CreateConsultationRequest, UpdateConsultationRequest, Consultation, IConsultationRepository, createConsultationRoutes(), ConsultationRepository (+1 more)

### Community 11 - "infrastructure/repositories/hopital-repository.ts"
Cohesion: 0.16
Nodes (9): HopitalUseCases, CreateHopitalRequest, HopitalResponse, UpdateHopitalRequest, Hopital, IHopitalRepository, createHopitalRoutes(), HopitalRepository (+1 more)

### Community 12 - "infrastructure/repositories/dossier-medical-repository.ts"
Cohesion: 0.15
Nodes (9): DossierMedicalUseCases, CreateDossierMedicalRequest, DossierMedicalResponse, UpdateDossierMedicalRequest, DossierMedical, IDossierMedicalRepository, createDossierMedicalRoutes(), DossierMedicalRepository (+1 more)

### Community 13 - "PaginationParams"
Cohesion: 0.11
Nodes (11): ExamenUseCases, CreateExamenRequest, ExamenResponse, UpdateExamenRequest, Examen, IExamenRepository, PaginatedResult, PaginationParams (+3 more)

### Community 14 - "createErrorResponse"
Cohesion: 0.12
Nodes (11): OrdonnanceUseCases, createErrorResponse(), CreateOrdonnanceRequest, LigneOrdonnanceRequest, OrdonnanceResponse, LigneOrdonnance, Ordonnance, IOrdonnanceRepository (+3 more)

### Community 15 - "DomainEvent"
Cohesion: 0.11
Nodes (12): ConsultationTermineeEvent, DomainEvent, IEventBus, OrdonnanceCreeeEvent, PaiementEchoueEvent, PaiementRecuEvent, RappelPrisePlanifieEvent, RappelPrisePrisEvent (+4 more)

### Community 16 - "infrastructure/repositories/medecin-repository.ts"
Cohesion: 0.19
Nodes (4): Medecin, IMedecinRepository, MedecinRepository, toDomain()

### Community 17 - "infrastructure/repositories/patient-repository.ts"
Cohesion: 0.08
Nodes (25): PatientUseCases, CreatePatientRequest, PatientResponse, UpdatePatientRequest, GroupeSanguin, A_NEGATIF, A_POSITIF, AB_NEGATIF (+17 more)

### Community 18 - "infrastructure/ports/storage-port.ts"
Cohesion: 0.10
Nodes (4): INotificationPort, IStoragePort, NotificationPort, StoragePort

### Community 19 - "Utilisateur"
Cohesion: 0.17
Nodes (5): Utilisateur, IUtilisateurRepository, sessionMiddleware(), toDomain(), UtilisateurRepository

### Community 20 - "createSuccessResponse"
Cohesion: 0.14
Nodes (10): UserUseCases, ApiResponse, createSuccessResponse(), PaginatedData, ValidationError, LoginRequest, LoginResponse, RegisterRequest (+2 more)

### Community 21 - "HttpStatusCode"
Cohesion: 0.10
Nodes (21): HttpStatusCode, ACCEPTED, BAD_GATEWAY, BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, FOUND (+13 more)

### Community 22 - "package.json"
Cohesion: 0.06
Nodes (33): dependencies, framework7, framework7-svelte, devDependencies, cpy-cli, cross-env, framework7, framework7-icons (+25 more)

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

### Community 27 - "src/index.ts"
Cohesion: 0.09
Nodes (3): app, authMiddleware(), hono

### Community 28 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, module, moduleResolution (+7 more)

### Community 29 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 30 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 31 - "Role"
Cohesion: 0.22
Nodes (10): Role, ADMIN, MEDECIN, PATIENT, Auth, account, session, user (+2 more)

### Community 32 - "Navbar.svelte"
Cohesion: 0.12
Nodes (9): active, cornerRadius, curve(), {
		glyph = 17,
		axis = 'row',
		dilate = 100,
		bounce = 50,
		speed = 50,
		hug = 6,
		corner = NAV_CORNER
	}, HTMLButtonElement, indicatorAnimate, indicatorTransition, settle() (+1 more)

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

### Community 74 - "medecin-use-cases.ts"
Cohesion: 0.38
Nodes (5): MedecinUseCases, CreateMedecinRequest, MedecinResponse, UpdateMedecinRequest, createMedecinRoutes()

### Community 75 - "shadcn"
Cohesion: 0.29
Nodes (6): mcp, shadcn, $schema, command, enabled, type

### Community 76 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, preview, tauri

## Knowledge Gaps
- **344 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+339 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 474 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PaginationParams` connect `PaginationParams` to `types.ts`, `infrastructure/repositories/medicament-repository.ts`, `RendezVous`, `RappelPrise`, `entites/enums.ts`, `infrastructure/repositories/consultation-repository.ts`, `infrastructure/repositories/hopital-repository.ts`, `createErrorResponse`, `infrastructure/repositories/medecin-repository.ts`, `infrastructure/repositories/patient-repository.ts`, `Utilisateur`, `validation.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `PaginatedResult` connect `PaginationParams` to `types.ts`, `infrastructure/repositories/medicament-repository.ts`, `RendezVous`, `RappelPrise`, `entites/enums.ts`, `infrastructure/repositories/consultation-repository.ts`, `infrastructure/repositories/hopital-repository.ts`, `createErrorResponse`, `infrastructure/repositories/medecin-repository.ts`, `infrastructure/repositories/patient-repository.ts`, `Utilisateur`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `hono` connect `src/index.ts` to `types.ts`, `infrastructure/repositories/medicament-repository.ts`, `RendezVous`, `RappelPrise`, `entites/enums.ts`, `backend/package.json`, `infrastructure/repositories/consultation-repository.ts`, `infrastructure/repositories/hopital-repository.ts`, `infrastructure/repositories/dossier-medical-repository.ts`, `PaginationParams`, `medecin-use-cases.ts`, `createErrorResponse`, `infrastructure/repositories/patient-repository.ts`, `createSuccessResponse`, `validation.ts`, `Role`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _344 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `relations.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10522496371552975 - nodes in this community are weakly interconnected._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12513842746400886 - nodes in this community are weakly interconnected._
- **Should `infrastructure/repositories/medicament-repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14583333333333334 - nodes in this community are weakly interconnected._