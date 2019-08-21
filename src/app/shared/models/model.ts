export interface User {
  id: string;
  dtecre: Date;
  nom: string;
  prenom: string;
  type: UserType;
  unites: [Unite];
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
  id: string;
  createdAt: Date;
  readonly nno: string;
  readonly lib: string;
  untcpt: number;
  untprx: number;
  cdeapr: string;
  srvpou: string;
  typart: string;
  numser: string;
  pictureUrl: string;
  detention: Detention;
}

export interface Detention {
  id: string;
  readonly lib: string;
  unite: Unite;
  inventaire: [Inventaire];
}

export enum UserType {
  UTI,
  DET
}
