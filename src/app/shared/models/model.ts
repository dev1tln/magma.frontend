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
  detenteurs: [User];
  localisations: [Localisation];
  inventaires: [Inventaire];
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
  readonly unite: Unite;
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
  localisation: Localisation;
}

export interface Localisation {
  id: string;
  readonly lib: string;
}

export enum UserType {
  UTI,
  DET
}
