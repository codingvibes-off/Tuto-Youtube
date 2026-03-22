export interface Profile {
  tag: string;
  description: string;
  link: string;
}
export type ProfileKey =
  | 'QA_MANUEL'
  | 'AUTOMATION'
  | 'DEVOPS'
  | 'ENGINEER'
  | 'ISTQB';