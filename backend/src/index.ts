import { Hono } from "hono";
import { createUserRoutes } from "./infrastructure/http/routes/auth-routes";
import { createConsultationRoutes, createDossierMedicalRoutes, createExamenRoutes, createHopitalRoutes, createMedecinRoutes, createMedicamentRoutes, createOrdonnanceRoutes, createPaiementRoutes, createPatientRoutes, createPharmacieRoutes, createRendezVousRoutes } from "./infrastructure/http";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello from saafara-diab-backend!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.route("/consult", createConsultationRoutes());
app.route("/medical", createDossierMedicalRoutes());
app.route("/examen", createExamenRoutes());
app.route("/hopital", createHopitalRoutes());
app.route("/medecin", createMedecinRoutes());
app.route("/medicament", createMedicamentRoutes());
app.route("/ordonnance", createOrdonnanceRoutes());
app.route("/paiement", createPaiementRoutes());
app.route("/patient", createPatientRoutes());
app.route("/pharmacie", createPharmacieRoutes())
app.route("/rdv", createRendezVousRoutes());
app.route("/user", createUserRoutes());

const port = process.env.PORT ?? 3000;

console.log(`Server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
