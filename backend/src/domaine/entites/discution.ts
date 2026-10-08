export type Room = {
  id: number;
  patientId: string;
  medecinId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
