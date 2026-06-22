import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  tag: string;
  emoji: string;
  color: string;
  techStack: string[];
  link?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsDataService {

  readonly projects: Project[] = [
    {
      id: 'homelab-web',
      name: 'HomeLabWeb',
      shortDesc: 'Web informativa de mi infraestructura personal self-hosted.',
      longDesc: ' ',
      tag: 'Angular',
      emoji: '🖥️',
      color: '#e8a040',
      techStack: ['Angular 17', 'SCSS', 'TypeScript'],
      link: 'https://github.com/GambaProExpert'
    },
    {
      id: 'proyecto-2',
      name: 'Proyecto 2',
      shortDesc: 'Descripción breve del segundo proyecto. Rellena esto.',
      longDesc: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      tag: 'Docker',
      emoji: '🐳',
      color: '#0077b6',
      techStack: ['Docker', 'Linux', 'Bash'],
    },
    {
      id: 'proyecto-3',
      name: 'Proyecto 3',
      shortDesc: 'Descripción breve del tercer proyecto. Rellena esto.',
      longDesc: '',
      tag: 'Python',
      emoji: '🐍',
      color: '#4caf50',
      techStack: ['Python', 'FastAPI', 'PostgreSQL'],
    },
  ];

  getById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
