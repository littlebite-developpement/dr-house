# Graph Report - dr-house  (2026-10-08)

## Corpus Check
- Corpus is ~22,867 words - fits in a single context window. You may not need a graph.

## Summary
- 1135 nodes · 2510 edges · 73 communities (37 shown, 36 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 169 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Infrastructure Auth Database
- Medication Pharmacy Use Cases
- Medication Use Cases
- Backend Architecture Docs
- Appointment Use Cases
- Reminder Use Cases
- Payment Use Cases
- Desktop Package Config
- Mobile Package Config
- Backend Package Config
- Consultation Use Cases
- Hospital Use Cases
- Medical Record Use Cases
- Exam Use Cases
- Prescription Use Cases
- Domain Events
- Doctor Use Cases
- Patient Use Cases
- Application Ports
- User Use Cases
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 47
- Community 48
- Community 49
- Community 50
- Community 52
- Community 53
- Community 54
- Community 57
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72

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
- `Bun` --semantically_similar_to--> `wycare`  [INFERRED] [semantically similar]
  backend/README.md → README.md
- `Desktop Tauri + SvelteKit + TypeScript` --semantically_similar_to--> `Mobile Tauri + SvelteKit + TypeScript`  [INFERRED] [semantically similar]
  desktop/README.md → mobile/README.md
- `Desktop SvelteKit App Shell` --semantically_similar_to--> `Mobile SvelteKit App Shell`  [INFERRED] [semantically similar]
  desktop/src/app.html → mobile/src/app.html
- `wycare` --references--> `Saafara Diab Backend`  [INFERRED]
  README.md → backend/README.md
- `wycare` --references--> `Desktop Tauri + SvelteKit + TypeScript`  [INFERRED]
  README.md → desktop/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Backend Hexagonal Architecture** — backend_readme_saafara_diab_backend, backend_todo_repositories, backend_todo_ports, backend_todo_domain_entities, backend_todo_use_cases, backend_todo_http_routes [INFERRED 0.85]
- **Frontend Tauri + SvelteKit Apps** — desktop_readme_tauri_sveltekit_typescript, mobile_readme_tauri_sveltekit_typescript, desktop_src_app_html, mobile_src_app_html [INFERRED 0.85]
- **Backend Data Layer** — backend_readme_drizzle_orm, backend_readme_postgresql, backend_todo_drizzle_orm, backend_todo_repositories [INFERRED 0.85]
- **Tech Stack Framework Logos** — mobile_static_svelte_svg_logo, mobile_static_tauri_svg_logo, mobile_static_vite_svg_logo [INFERRED 0.85]
- **Tauri App Icon Set** — mobile_src_tauri_icons_128x128_app_icon, mobile_src_tauri_icons_128x128_2x_app_icon, mobile_src_tauri_icons_32x32_app_icon, mobile_src_tauri_icons_icon_app_icon, mobile_src_tauri_icons_storelogo_logo, mobile_src_tauri_icons_square30x30logo_logo, mobile_src_tauri_icons_square44x44logo_logo, mobile_src_tauri_icons_square71x71logo_logo, mobile_src_tauri_icons_square89x89logo_logo, mobile_src_tauri_icons_square107x107logo_logo, mobile_src_tauri_icons_square142x142logo_logo, mobile_src_tauri_icons_square150x150logo_logo, mobile_src_tauri_icons_square284x284logo_logo, mobile_src_tauri_icons_square310x310logo_logo [INFERRED 0.95]

## Communities (73 total, 36 thin omitted)

### Community 0 - "Infrastructure Auth Database"
Cohesion: 0.07
Nodes (44): Auth, client, Database, db, account, session, user, verification (+36 more)

### Community 1 - "Medication Pharmacy Use Cases"
Cohesion: 0.09
Nodes (13): PharmacieUseCases, CreatePharmacieRequest, PharmacieResponse, UpdatePharmacieRequest, LigneOrdonnance, Pharmacie, IPharmacieRepository, PaginatedResult (+5 more)

### Community 2 - "Medication Use Cases"
Cohesion: 0.06
Nodes (11): MedicamentUseCases, CreateMedicamentRequest, MedicamentResponse, UpdateMedicamentRequest, Medicament, IMedicamentRepository, app, authMiddleware() (+3 more)

### Community 3 - "Backend Architecture Docs"
Cohesion: 0.05
Nodes (44): better-auth, Bun, Drizzle ORM, Hono, PostgreSQL, Saafara Diab Backend, Domain Entities, Domain Events (+36 more)

### Community 4 - "Appointment Use Cases"
Cohesion: 0.11
Nodes (15): RendezVousUseCases, CreateRendezVousRequest, RendezVousResponse, UpdateRendezVousRequest, StatutRendezVous, ANNULE, CONFIRME, PLANIFIE (+7 more)

### Community 5 - "Reminder Use Cases"
Cohesion: 0.12
Nodes (9): RappelUseCases, CreateRappelRequest, RappelResponse, RappelPrise, IRappelPriseRepository, RappelPriseService, createRappelRoutes(), RappelPriseRepository (+1 more)

### Community 6 - "Payment Use Cases"
Cohesion: 0.10
Nodes (19): PaiementUseCases, CreatePaiementRequest, PaiementResponse, UpdatePaiementRequest, ModePaiement, CARTE_BANCAIRE, ESPECES, ORANGE_MONEY (+11 more)

### Community 7 - "Desktop Package Config"
Cohesion: 0.06
Nodes (35): dependencies, @tauri-apps/api, @tauri-apps/plugin-opener, description, devDependencies, svelte, svelte-check, @sveltejs/adapter-static (+27 more)

### Community 8 - "Mobile Package Config"
Cohesion: 0.06
Nodes (35): dependencies, @tauri-apps/api, @tauri-apps/plugin-opener, description, devDependencies, svelte, svelte-check, @sveltejs/adapter-static (+27 more)

### Community 9 - "Backend Package Config"
Cohesion: 0.06
Nodes (33): dependencies, better-auth, @better-auth/drizzle-adapter, drizzle-orm, hono, postgres, devDependencies, drizzle-kit (+25 more)

### Community 10 - "Consultation Use Cases"
Cohesion: 0.14
Nodes (9): ConsultationUseCases, ConsultationResponse, CreateConsultationRequest, UpdateConsultationRequest, Consultation, IConsultationRepository, createConsultationRoutes(), ConsultationRepository (+1 more)

### Community 11 - "Hospital Use Cases"
Cohesion: 0.15
Nodes (9): HopitalUseCases, CreateHopitalRequest, HopitalResponse, UpdateHopitalRequest, Hopital, IHopitalRepository, createHopitalRoutes(), HopitalRepository (+1 more)

### Community 12 - "Medical Record Use Cases"
Cohesion: 0.15
Nodes (9): DossierMedicalUseCases, CreateDossierMedicalRequest, DossierMedicalResponse, UpdateDossierMedicalRequest, DossierMedical, IDossierMedicalRepository, createDossierMedicalRoutes(), DossierMedicalRepository (+1 more)

### Community 13 - "Exam Use Cases"
Cohesion: 0.15
Nodes (10): ExamenUseCases, createSuccessResponse(), CreateExamenRequest, ExamenResponse, UpdateExamenRequest, Examen, IExamenRepository, createExamenRoutes() (+2 more)

### Community 14 - "Prescription Use Cases"
Cohesion: 0.14
Nodes (9): OrdonnanceUseCases, CreateOrdonnanceRequest, LigneOrdonnanceRequest, OrdonnanceResponse, Ordonnance, IOrdonnanceRepository, createOrdonnanceRoutes(), OrdonnanceRepository (+1 more)

### Community 15 - "Domain Events"
Cohesion: 0.11
Nodes (12): ConsultationTermineeEvent, DomainEvent, IEventBus, OrdonnanceCreeeEvent, PaiementEchoueEvent, PaiementRecuEvent, RappelPrisePlanifieEvent, RappelPrisePrisEvent (+4 more)

### Community 16 - "Doctor Use Cases"
Cohesion: 0.14
Nodes (9): MedecinUseCases, CreateMedecinRequest, MedecinResponse, UpdateMedecinRequest, Medecin, IMedecinRepository, createMedecinRoutes(), MedecinRepository (+1 more)

### Community 17 - "Patient Use Cases"
Cohesion: 0.14
Nodes (8): PatientUseCases, createErrorResponse(), CreatePatientRequest, PatientResponse, UpdatePatientRequest, IPatientRepository, DateNaissance, createPatientRoutes()

### Community 18 - "Application Ports"
Cohesion: 0.10
Nodes (4): INotificationPort, IStoragePort, NotificationPort, StoragePort

### Community 19 - "User Use Cases"
Cohesion: 0.16
Nodes (7): UserUseCases, Utilisateur, IUtilisateurRepository, sessionMiddleware(), createUserRoutes(), toDomain(), UtilisateurRepository

### Community 20 - "Community 20"
Cohesion: 0.16
Nodes (7): ApiResponse, PaginatedData, ValidationError, LoginRequest, LoginResponse, RegisterRequest, IAuthPort

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (21): HttpStatusCode, ACCEPTED, BAD_GATEWAY, BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, FOUND (+13 more)

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (20): devDependencies, @types/bun, @types/bun, typescript, name, peerDependencies, typescript, private (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, allowJs, jsx, lib, module, moduleDetection, moduleResolution (+12 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (10): AccesInterditError, AppError, ConflitError, NonTrouveError, RequeteInvalideError, lireCorpsJson(), lireDate(), lireHeure() (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (17): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (17): app, security, windows, build, beforeBuildCommand, beforeDevCommand, devUrl, frontendDist (+9 more)

### Community 27 - "Community 27"
Cohesion: 0.24
Nodes (6): Sexe, FEMININ, MASCULIN, Patient, PatientRepository, toDomain()

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, module, moduleResolution (+7 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution, resolveJsonModule, skipLibCheck (+4 more)

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (5): Role, ADMIN, MEDECIN, PATIENT, AuthVariables

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): GroupeSanguin, A_NEGATIF, A_POSITIF, AB_NEGATIF, AB_POSITIF, B_NEGATIF, B_POSITIF, O_NEGATIF (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 39 - "Community 39"
Cohesion: 0.33
Nodes (5): description, identifier, permissions, $schema, windows

### Community 47 - "Community 47"
Cohesion: 0.40
Nodes (5): 128x128@2x Retina App Icon, 128x128 App Icon, 32x32 App Icon, Main App Icon, Web Favicon

### Community 52 - "Community 52"
Cohesion: 1.00
Nodes (3): Svelte Framework Logo, Tauri Framework Logo, Vite Framework Logo

## Knowledge Gaps
- **312 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+307 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 431 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PaginationParams` connect `Medication Pharmacy Use Cases` to `Infrastructure Auth Database`, `Medication Use Cases`, `Appointment Use Cases`, `Reminder Use Cases`, `Payment Use Cases`, `Consultation Use Cases`, `Hospital Use Cases`, `Exam Use Cases`, `Prescription Use Cases`, `Doctor Use Cases`, `Patient Use Cases`, `User Use Cases`, `Community 24`, `Community 27`, `Community 31`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `PaginatedResult` connect `Medication Pharmacy Use Cases` to `Infrastructure Auth Database`, `Medication Use Cases`, `Appointment Use Cases`, `Reminder Use Cases`, `Payment Use Cases`, `Consultation Use Cases`, `Hospital Use Cases`, `Exam Use Cases`, `Prescription Use Cases`, `Doctor Use Cases`, `Patient Use Cases`, `User Use Cases`, `Community 27`, `Community 31`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `hono` connect `Medication Use Cases` to `Infrastructure Auth Database`, `Medication Pharmacy Use Cases`, `Appointment Use Cases`, `Reminder Use Cases`, `Payment Use Cases`, `Backend Package Config`, `Consultation Use Cases`, `Hospital Use Cases`, `Medical Record Use Cases`, `Exam Use Cases`, `Prescription Use Cases`, `Doctor Use Cases`, `Patient Use Cases`, `Community 20`, `Community 24`, `Community 31`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _312 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Infrastructure Auth Database` be split into smaller, more focused modules?**
  _Cohesion score 0.07205452775073028 - nodes in this community are weakly interconnected._
- **Should `Medication Pharmacy Use Cases` be split into smaller, more focused modules?**
  _Cohesion score 0.08502939846223428 - nodes in this community are weakly interconnected._
- **Should `Medication Use Cases` be split into smaller, more focused modules?**
  _Cohesion score 0.0641025641025641 - nodes in this community are weakly interconnected._