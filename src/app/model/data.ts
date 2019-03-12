export interface Tags {
  name: string;
}

export interface ILanguage {
  id: number;
  name: string;
}
export interface ISource {
  id: number;
  name: string;
}
export interface IContext {
  name: string;
  id: number;
  type: string;
}

export interface IEntry {
  title: string;
  id: number;
  time: string;
}

export interface ILanguageDetails {
  id: number;
  name: string;
  englishName: string;
  isoCode: string;
  code_1: string;
  code_2: string;
  encoding: string;
}

export interface ISourceDetails {
  id: number;
  name: string;
  type: string;
  country: string;
  speciality: string;
  official: string;
  tags: [];
  side: string;
  language: ILanguage[];
}

export interface ISourceUrl {
  id: number;
  url: string;
  type: string;
  official: string;
  tags: [];
  side: string;
  source: ISource[];
  language: ILanguage[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}
