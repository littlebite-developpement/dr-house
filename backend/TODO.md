# Saafara Diab Backend — Liste des tâches

## Infrastructure

### Drizzle ORM
- [x] Installer drizzle-orm, postgres, drizzle-kit
- [x] Créer le schéma Drizzle (14 tables, 5 enums, relations)
- [x] Configurer drizzle.config.ts
- [x] Créer les commandes raccourcis (db:generate, db:push, db:migrate, db:studio, db:drop, db:check, db:up, db:seed)
- [x] Créer le fichier seed.ts (données de test)
- [x] Créer les migrations initiales

### Repositories PostgreSQL (13)
- [x] IUtilisateurRepository
- [x] IMedecinRepository
- [x] IPatientRepository
- [x] IHopitalRepository
- [x] IDossierMedicalRepository
- [x] IRendezVousRepository
- [x] IConsultationRepository
- [x] IMedicamentRepository
- [x] IOrdonnanceRepository
- [x] IExamenRepository
- [x] IPharmacieRepository
- [x] IRappelPriseRepository
- [x] IPaiementRepository

### Ports (3)
- [ ] IAuthPort (hashage, token JWT)
- [x] INotificationPort (SMS, email)
- [x] IStoragePort (upload/download fichiers)

## API / Routes HTTP

### Auth
- [x] POST /auth/login
- [x] POST /auth/register

### Patients
- [x] GET /patients/:id
- [x] PUT /patients/:id
- [x] DELETE /patients/:id

### Médecins
- [x] GET /medecins/:id
- [x] PUT /medecins/:id
- [x] DELETE /medecins/:id

### Rendez-vous
- [x] POST /rendez-vous
- [x] GET /rendez-vous/:id
- [x] PATCH /rendez-vous/:id/confirm
- [x] PATCH /rendez-vous/:id/cancel
- [x] PATCH /rendez-vous/:id/complete

### Consultations
- [x] POST /consultations
- [x] GET /consultations/:id

### Ordonnances
- [x] POST /ordonnances
- [x] GET /ordonnances/:id

### Paiements
- [x] POST /paiements
- [x] GET /paiements/:id

### Rappels
- [x] POST /rappels
- [x] PATCH /rappels/:id/pris
- [x] GET /rappels/patient/:id

### Hôpitaux
- [x] GET /hopitaux
- [x] POST /hopitaux
- [x] GET /hopitaux/:id
- [x] PUT /hopitaux/:id
- [x] DELETE /hopitaux/:id

### Pharmacies
- [x] GET /pharmacies
- [x] POST /pharmacies
- [x] GET /pharmacies/:id
- [x] PUT /pharmacies/:id
- [x] DELETE /pharmacies/:id
- [x] GET /pharmacies/de-garde

### Examens
- [x] POST /examens
- [x] GET /examens/:id
- [x] PUT /examens/:id
- [x] DELETE /examens/:id

### Médicaments
- [x] GET /medicaments
- [x] POST /medicaments
- [x] GET /medicaments/:id
- [x] PUT /medicaments/:id
- [x] DELETE /medicaments/:id

### Dossiers médicaux
- [x] GET /dossiers/:patientId
- [x] POST /dossiers
- [x] PUT /dossiers/:id
- [x] DELETE /dossiers/:id

## Middleware & Sécurité
- [ ] Middleware d'authentification JWT
- [ ] Middleware d'autorisation par rôle (PATIENT, MEDECIN, ADMIN)
- [ ] Middleware de validation des données
- [ ] Gestion des erreurs centralisée

## Tests
- [ ] Tests unitaires (domain services)
- [ ] Tests d'intégration (repositories)
- [ ] Tests e2e (routes HTTP)

## DevOps
- [ ] Dockerfile
- [ ] docker-compose.yml (app + PostgreSQL)
- [ ] CI/CD (GitHub Actions)
- [ ] Variables d'environnement (.env.example)
