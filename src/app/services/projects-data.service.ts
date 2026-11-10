import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  tag: string;
  imageUrl: string;
  color: string;
  techStack: string[];
  link?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsDataService {
  readonly projects: Project[] = [
    {
      id: 'HomeLab',
      name: 'HomeLab',
      shortDesc: 'Pequeño data center a la vuelta del router de casa.',
      longDesc:
        'Me llamó la atención un youtuber llamado Jonatan Castro, utilizaba ordenadores antiguos o de oficina para realizar' +
        ' un entorno donde podía correr máquinas virtuales, contenedores con aplicaciones que me dejaron asombrado por lo bien desarrolladas ' +
        'que estaban. Muy parecidas a ciertas aplicaciones de pago. \n\n' +
        ' Me puse manos a la obra y le robé a mi padre un par de ordenadores viejos ' +
        'de la oficina. Cogí mucho ejemplo de Jonatan, estudié muy bien como poder sacarle fruto a los ordenadores. Desarrollé un plan de acción ' +
        'y lo ejecuté con creces sobre estas máquinas. Fue tan bien que decidí crear un DIY NAS con ciertas piezas que tenía guardadas en el trastero y ponerlo en marcha con más aplicaciones' +
        '. Sentíos libres de ver todo lo que contiene este proyecto en la misma web donde os encontráis.',
      tag: 'Proxmox VE',
      imageUrl: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox.svg',
      color: '#F15A2C',
      techStack: ['Proxmox VE', 'Docker', 'Debian', 'Bash'],
      link: 'https://gambalocal.es',
    },
    {
      id: 'TheSellator',
      name: 'THE SELLATOR',
      shortDesc: 'Aplicación web para sellar documentos PDF con sellos hechos a medida.',
      longDesc:
        'En las prácticas de empresa me di cuenta de la cantidad de tiempo que se pierde sellando documentos a mano, abriendo editores de PDF para colocar el mismo cajetín una y otra vez. ' +
        'Cogí todo lo que había aprendido allí y me monté mi propia herramienta. THE SELLATOR es una aplicación web donde diseñas tu sello combinando imágenes, texto, fechas y códigos QR, ' +
        'y lo estampas en las páginas que quieras de un PDF sin instalar absolutamente nada.\n\n' +
        'El backend está hecho con Laravel 13 sobre PHP 8.3 y el frontend con Vue 3 e Inertia 2, con Tailwind 4 para los estilos y SQLite como base de datos. ' +
        'El editor de sellos es un canvas donde colocas, escalas, rotas y ordenas cada elemento, y la previsualización del documento va con pdf.js para que veas exactamente dónde va a caer el sello antes de generar nada.\n\n' +
        'La parte de la que más orgulloso estoy es el motor de sellado, que lo escribí aparte en Java 8 con iText 7. No procesa los PDF desde PHP: corre como un subproceso independiente al que se le pasa toda la configuración en un XML. ' +
        'Eso me permitió resolver lo más delicado, que es sellar documentos que ya vienen firmados digitalmente. El sello se añade como actualización incremental, respetando los bytes originales, ' +
        'así la firma se sigue pudiendo verificar aunque avise de que hubo modificaciones posteriores.\n\n' +
        'Sin cuenta puedes guardar cinco diseños en el propio navegador, y registrándote (con email o con Google) suben a veinticinco sellos y veinticinco documentos archivados en el servidor. ' +
        'Por el camino salieron cosas que se han vuelto imprescindibles: el marcador ${fecha}, que se resuelve en el momento de sellar, los rangos de páginas tipo "3-9", concatenar un informe al final del documento y exportar e importar sellos en XML.\n\n' +
        'Se despliega con Docker en una sola imagen y tiene 213 pruebas de PHP y 58 de JavaScript con Vitest detrás. La licencia es AGPLv3, heredada de iText 7. Está en producción y funcionando.',
      tag: 'Laravel',
      imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      color: '#FF2D20',
      techStack: ['Laravel 13', 'Vue 3', 'Java · iText 7', 'Docker'],
      link: 'https://github.com/GambaProExpert/THE-SELLATOR',
    },
    {
      id: 'MR-RobotIA',
      name: 'MR-RobotIA',
      shortDesc: 'Herramienta Blue team para seguridad de infraestructura de IA auto-alojada.',
      longDesc: `Herramienta para la protección y auditoría de sistemas de IA auto-alojada a media y gran escala. Útil para prevención de una nueva serie de vectores de ataque que no solo afectan al host en sí, si no a todo el que hace uso del modelo abierto que haya alojado en él. Lo que nos dice o haga la IA no debe estar adulterado por terceros.

      MR-RobotIA sirve para la auditoría defensiva (hardening) para cualquier servidor LLM auto alojado (llama.cpp, Ollama, vLLM, LM Studio…).
      MRRobotIA orquesta herramientas ya consolidadas (garak, promptfoo, Trivy, DeepEval…) de forma local y offline y normaliza sus datos a un informe único con severidades y referencias a OWASP LLM Top 10 2025, MITRE ATLAS y NIST AI 600-1.
      Pero ojo porque la auditoría no la hace MRRobotIA, los datos sí los saca, la auditoría la hace un experto.

      Esta herramienta fue originalmente creada para el desarrollo de Trabajo Fin de Grado, sigo en desarrollo de la misma avanzando e investigando sobre diferentes
      módulos, herramientas reutilizables y nuevos vectores de ataques posibles.`,
      tag: 'Ciberseguridad',
      imageUrl: 'https://cyberdefenders.org/media/blog/author_images/CyberDefenders-logo.png',
      color: '#0000FF',
      techStack: [
        'Llama.cpp',
        'vLLM',
        'Python',
        'Ubuntu',
        'Trivy',
        'Garak',
        'Promptfoo',
        'DeepEval',
      ],
      link: 'https://github.com/GambaProExpert/MR-RobotIA/tree/main',
    },
    {
      id: 'ToolManager',
      name: 'ToolManager',
      shortDesc: 'Aplicación de backend bien completa.',
      longDesc:
        'ToolManager es una aplicación desarrollada por mis compañero de Ingeniería de Software II y yo para la parte práctica de la asignatura.' +
        `Esta aplicación de backend está desarrollada en C# y ASP.NET Core que permite gestionar el catálogo de herramientas de una ferretería, incluyendo funcionalidades de compra, alquiler, reparación y creación de ofertas.


        La arquitectura se basa en una API REST que expone endpoints, separando la lógica de negocio de la capa de presentación con razor.
        Para la persistencia de datos utilizamos Entity Framework Core con un enfoque Code‑First, modelando relaciones complejas (uno a muchos, muchos a muchos) y aplicando migraciones para mantener la base de datos sincronizada y definir su estructura.


        Todo el código se gestionó con Git y GitHub, siguiendo un flujo de trabajo profesional basado en ramas (features), Pull Requests y un tablero estilo Scrum para la trazabilidad de tareas.


        Se implementaron pruebas unitarias con xUnit y Moq para garantizar la calidad de los controladores, cubriendo los principales casos de uso y validando las respuestas HTTP (OK, BadRequest, NotFound, etc.).


        Además, se configuró un pipeline de Integración Continua y Entrega Continua (CI/CD) con GitHub Actions, que automatiza la compilación, ejecución de pruebas y despliegue en Microsoft Azure, parte la cual no nos salió, utilizando una instancia de Azure SQL Database como almacenamiento en producción.


        Este proyecto demuestra nuestra capacidad para desarrollar APIs robustas, aplicar buenas prácticas de ingeniería del software, todo ello trabajando en equipo con un flujo de trabajo más o menos profesional.

        Es gracioso porque nos pidieron crear un nombre de empresa para el desarrollo, nos decidimos llamar "SoftTech". Meses después estaba realizando prácticas en Imedia comunicación, en el parque tecnológico a unos 100 metros de la politécnica,
         y me di cuenta de que puerta con
        puerta de la empresa estaba una empresa llamada "Softtek", una empresa con más de 15.000 empleados, no sabía que mis compañero siguieron el camino sin mí. Me sentí de traicionado como Walter White.`,
      tag: 'C#',
      imageUrl: 'https://www.jetbrains.com/guide/assets/csharp-logo-265a149e.svg',
      color: '#9B4F96',
      techStack: ['C#', 'TypeScript', 'PostgresSQL', 'SCRUM'],
      link: 'https://github.com/ISII2526SoftTech/ISII2526SoftTech',
    },
    {
      id: 'GambaLocalWeb',
      name: 'GambaLocalWeb',
      shortDesc: 'Web informativa de mi infraestructura personal self-hosted y port-folio',
      longDesc:
        'Decidí crear una web informativa que unificara toda mi infraestructura personal. Una especie de cuaderno e bitacora de la vida de las máquinas y sus servicios, todo muy visual donde pudiera documentar cada servicio, cada equipo y cada contenedor, su propósito y enlaces directos para acceder a información sobre' +
        ' ellos. Quería que fuera rápida, bien chula y responsive,\n\n' +
        'Para el frontend elegí Angular 17, un framework que ya había usado muy poco en interacción persona-ordenador I pero al que quería darle una oportunidad en serio con su nueva sintaxis de signals y su renderizado optimizado. ' +
        'Fue la escusa perfecta para probar un IDE completamente nuevo para mí llamado WebStorm de JetBrains. El flujo de trabajo con Angular CLI, los servicios y la arquitectura de componentes me permitieron estructurar la información de forma clara y escalable.\n\n' +
        'Todo el proceso de desarrollo se vio potenciado por la ayuda del agente gratuito de Claude. Me asistió en la creación del código. Haz el trabajo de 10 horas en 1 hora y las otras 9 aprovechalas para depurar y entender lo que se ha hecho. \n\n' +
        'También aprendí a gestionar un dominio y utilizarlo para alojar una web y un subdominio para una de mis aplicaciones llamada <a href="https://gambalocal.es/service/outline" target="_blank" rel="noopener noreferrer">Outline</a>, todo en IONOS por un módico precio \n\n' +
        'El resultado es una web ligera, bonita y funcional que me permite tener un mapa completo de mi infraestructura personal. Sentíos libres de ver todo lo que contiene este proyecto en la misma web donde os encontráis.',
      tag: 'Angular',
      imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
      color: '#DD0031',
      techStack: ['Angular 17', 'SCSS', 'TypeScript'],
      link: 'https://github.com/GambaProExpert/GambaLocalWeb',
    },
  ];

  getById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }
}
