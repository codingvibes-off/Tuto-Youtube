export interface Course {
  id: number;
  title: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  lessons: number;
  description: string;
  tags: string[];
}
