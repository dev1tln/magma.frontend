//TODO Refaire l'architecture en utilisant de vrais objets avec getter setter si projet aboutit.

export interface User {
  id: string;
  dtecre: Date;
  identifiant: string;
  nom: string;
  prenom: string;
  role: UserRole;
  unites: [Unite];
}

export enum UserRole {
  UTI,
  DET
}

export interface Unite {
  id: string;
  readonly cdeunt: string;
  dtepjc: Date;
  readonly libunt: string;
  typuni: string;
  users: [User];
  detentions: [Detention];
}

export interface Inventaire {
  id: string;
  readonly lib: string;
  dtever: Date;
  exideb: string;
  dtecre: Date;
  cdevrf: string;
  obs: string;
  articles: [Article];
  readonly detention: Detention;
}

export interface Article {
  article_id: string;
  createdAt: Date;
  readonly nno: string;
  readonly lib: string;
  untcpt: number;
  untprx: number;
  cdeapr: string;
  srvpou: string;
  typart: string;
  numser: string;
  numref: string;
  pictureUrl: string;
  detention: Detention;
}

export interface Detention {
  id: string;
  readonly lib: string;
  unite: Unite;
  inventaire: [Inventaire];
}
