# Dr House

Monorepo de la plateforme médicale **Dr House** — une application de suivi du diabète et de gestion de parcours de soins.

Il regroupe trois applications qui partagent un même dépôt :

| Workspace  | Nom du package   | Rôle                                              |
| ---------- | ---------------- | ------------------------------------------------- |
| `backend/` | `dr-house-backend` | API métier (le service est aussi nommé *Saafara Diab*) |
| `mobile/`  | `dr-house-mobile`  | Application mobile (Tauri + SvelteKit)            |
| `desktop/` | `dr-house-desktop` | Application desktop (Tauri + SvelteKit)           |

Deux dossiers servent de réserves : `packages/shared` (types partagés) et `design` (maquettes & assets). Ils sont encore vides.

---

## Stack technique

| Couche        | Technologies                                                                 |
| ------------- | ---------------------------------------------------------------------------- |
| Runtime / PM  | [Bun](https://bun.com) 1.4 (workspaces, lock unique)                          |
| Backend       | Hono 4 · Drizzle ORM 0.45 + postgres.js · better-auth 1.7 · PostgreSQL        |
| Front (mobile & desktop) | Tauri 2 · SvelteKit 2 · Svelte 5 (runes) · TypeScript · Vite       |
| UI (mobile)   | Tailwind CSS 4 · daisyUI 5 · lucide-svelte · `@humanspeak/svelte-motion`      |

---

## Prérequis

- **Bun** ≥ 1.4.2 — <https://bun.com/docs/installation>
- **Rust** (stable) + `cargo` — pour Tauri
- **Dépendances système Tauri v2** (webkit2gtk, etc.) — voir <https://v2.tauri.app/start/prerequisites/>
- **PostgreSQL** — pour le backend

---

## Installation

À la racine (installe tous les workspaces d'un coup) :

```bash
bun install
```

Ou workspace par workspace :

```bash
bun run install:backend
bun run install:mobile
bun run install:desktop
```

---

## Démarrage

Depuis la racine du dépôt :

```bash
bun run dev:backend    # API sur http://localhost:3000
bun run dev:mobile     # Application mobile (Tauri)
bun run dev:desktop    # Application desktop (Tauri)
```

Build de production :

```bash
bun run build:mobile
bun run build:desktop
```

> **Linux / Wayland** — si Tauri plante au lancement (`WebKit encountered an internal error`, `GDK_IS_WAYLAND_WINDOW`), forcez le backend X11 :
>
> ```bash
> GDK_BACKEND=x11 bun run dev:mobile
> ```
>
> Le serveur de dev Tauri écoute sur le port fixe **1420**.

---

## `backend/` — API

API HTTP bâtie sur **Hono**, avec une architecture en couches inspirée du DDD (nommage métier en français).

```
src/
├── index.ts                  # Entrée Hono + montage des routes
├── domaine/                  # Cœur métier
│   ├── entites/              # Entités (utilisateur, patient, médecin, dossier-medical…)
│   ├── valeur-objets/        # Value objects
│   ├── services/             # Services de domaine
│   ├── evenements/           # Événements + bus
│   └── repositories/         # Interfaces des repositories
├── application/
│   ├── cas-d-utilisation/    # Cas d'utilisation
│   ├── dto/                  # Objets de transfert
│   └── ports/                # Ports (auth, notification, storage)
└── infrastructure/
    ├── auth/                 # Configuration better-auth
    ├── database/             # Schéma Drizzle + connexion
    ├── http/routes/          # Handlers Hono
    ├── repositories/         # Implémentations PostgreSQL
    └── ports/                # Implémentations des ports
```

### Endpoints principaux

`/health` · `/user` · `/patient` · `/medecin` · `/rdv` · `/consult` · `/medical` · `/ordonnance` ·
`/examen` · `/medicament` · `/pharmacie` · `/hopital` · `/paiement`

### Scripts

```bash
bun run dev        # Hot reload (bun --watch src/index.ts)
bun run build      # bundle vers dist/ (target bun)
bun run start      # exécute dist/index.js
bun run typecheck  # tsc --noEmit

bun run db:generate  # Génère les migrations
bun run db:push      # Pousse le schéma vers la base
bun run db:migrate   # Applique les migrations
bun run db:studio    # Ouvre Drizzle Studio
bun run db:drop      # Supprime les tables
bun run db:check     # Vérifie la synchro du schéma
bun run db:seed      # Données de test
```

### Variables d'environnement (`backend/.env`)

```env
DATABASE_URL="postgresql://…"          # PostgreSQL (Neon en dev)
BETTER_AUTH_SECRET="…"                 # secret ≥ 32 caractères
BETTER_AUTH_URL="http://localhost:3000"
PORT=3000
```

### État d'avancement

Schéma Drizzle (14 tables, 5 enums), repositories PostgreSQL, magasin de données et la
plupart des routes HTTP sont en place. Restent à faire : middlewares (auth JWT, rôles,
validation, erreurs), tests et outillage DevOps. Détail complet dans [`backend/TODO.md`](backend/TODO.md).

---

## `mobile/` — Application mobile

Application **Tauri 2 + SvelteKit** en mode SPA (`ssr = false`), dans une fenêtre **414 × 896**.

- **Routes** : `/` (Accueil) · `/patient` · `/medical` · `/profile`
- **Shell** : en-tête (logo *Dr House*, notifications, bascule de thème) + contenu scrollable +
  **barre d'onglets flottante en verre** (glassmorphism), pilotée par la route active.
- **Thème** : daisyUI **light** (défaut) / **dark**, bascule persistée dans `localStorage`.
- `src/lib/components/Navbar.svelte` — barre d'onglets animée (`svelte-motion`) et routée.
- `src-tauri/` — coquille native Tauri (Rust).

```bash
bun run dev        # Vite / SvelteKit (dev)
bun run build      # Build statique (adapter-static)
bun run preview    # Prévisualisation du build
bun run tauri      # CLI Tauri
```

---

## `desktop/` — Application desktop

Même socle **Tauri 2 + SvelteKit** que le mobile, sans le shell d'application mobile.
Squelette de démarrage.

```bash
bun run dev        # Vite / SvelteKit
bun run build      # Build statique
bun run check      # svelte-check
bun run tauri      # CLI Tauri
```

---

## Conventions

- **Nommage métier en français** dans le domaine (`rendez-vous`, `ordonnance`, `dossier-medical`).
- **Repository pattern** : interfaces dans `domaine/repositories/`, implémentations dans `infrastructure/repositories/`.
- **Cas d'utilisation** dans `application/cas-d-utilisation/`.
- **Types de résultat** en union discriminée (`string` = erreur, `object` = succès) ; réponses HTTP via `createSuccessResponse` / `createErrorResponse`.
- TypeScript en **strict**.

---

## Licence

Dépôt privé, non publié. Le workspace `desktop` déclare une licence MIT ; les autres sont sans licence explicite.
