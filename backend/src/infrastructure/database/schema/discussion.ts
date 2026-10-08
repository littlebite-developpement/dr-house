import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { patients } from "./patient";
import { medecins } from "./medecin";
import { utilisateurs } from "./utilisateur";

export const room = pgTable('room', {
    id: uuid('id').primaryKey().defaultRandom(),
    patientId: text('patient_id').notNull().references(() => patients.id),
    medecinId: text('medecin_id').notNull().references(() => medecins.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    roomId: uuid('room_id').notNull().references(() => room.id),
    userId: text('user_id').notNull().references(() => utilisateurs.id) ,
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
