---
name: opencode-angular-17
description: Reglas y plantillas para generar código idiomático de Angular 17 en OpenCode.
version: 1.0
labels:
  - angular
  - opencode
  - skill
  - ai
  - scaffold
---

# Objetivo

Proveer instrucciones claras para que un agente genere código Angular 17 coherente con las mejores prácticas modernas.

Prioridades:
- Componentes standalone.
- Signals para estado local.
- Formularios tipados.
- Rutas lazy.
- Testing desde el inicio.
- Código limpio, seguro y mantenible.

# Reglas globales

- TypeScript en `strict`.
- Prohibido usar `any` en producción.
- Todos los componentes, directivas y pipes deben ser `standalone`.
- Usar `inject()` cuando sea apropiado.
- Usar `signals` para estado local.
- Usar `Observable` para flujos asíncronos complejos.
- No mezclar estado mutable sin `set()` o `update()`.
- No renderizar HTML sin sanitizar.
- No exponer secretos en el repositorio.
- Mantener accesibilidad básica: teclado, roles ARIA y foco visible.
- Todo componente nuevo debe incluir prueba básica.

# Estructura recomendada

- `src/app/core/`
  - Servicios singleton.
  - Interceptores.
  - Providers globales.
- `src/app/features/feature-name/`
  - Componentes de feature.
  - Servicios de feature.
  - Rutas y pruebas.
- `src/app/shared/components/`
  - Componentes reutilizables.
- `src/app/shared/utils/`
  - Utilidades, validadores y tipos.
- `src/app/lib/`
  - Tipos compartidos y helpers generales.

# Convenciones de nombres

- Componentes, servicios y archivos en `kebab-case`.
- Clases en `PascalCase`.
- Señales con nombres descriptivos, por ejemplo `users`, `filteredUsers`, `isLoading`.
- Prefijos por feature en rutas y slices, por ejemplo `auth`, `users`, `billing`.

# Componentes

Todos los componentes deben ser `standalone`.

Reglas:
- Mantener el template simple.
- No poner lógica compleja en HTML.
- Usar `async` pipe si se trabaja con `Observable`.
- Usar `computed()` cuando derive estado de `signal()`.

Ejemplo:

```ts
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  private fb = inject(FormBuilder);

  count = signal(0);
  double = computed(() => this.count() * 2);

  userForm = this.fb.group({
    name: [''],
    email: [''],
  });

  increment(): void {
    this.count.update(value => value + 1);
  }
}
```

# Servicios

Usar servicios pequeños, claros y con una sola responsabilidad.

Reglas:
- Preferir `providedIn: 'root'` para singletons.
- Evitar lógica en el constructor.
- Inyectar dependencias con `inject()`.
- No mezclar acceso HTTP, transformación de datos y lógica de UI en la misma capa si puede evitarse.

Ejemplo:

```ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  users = signal<User[]>([]);

  fetchAll() {
    return this.http.get<User[]>('/api/users').pipe(
      map(list => {
        this.users.set(list);
        return list;
      })
    );
  }
}
```

# Estado y reactividad

Preferencias:
- `signal()` para estado local.
- `computed()` para valores derivados.
- `effect()` sólo cuando haga falta sincronizar efectos secundarios.
- `Observable` para streams, combinaciones, polling, websockets o integración con HTTP avanzada.

Reglas:
- No duplicar la misma fuente de verdad en `signal` y `Observable` sin necesidad.
- Evitar mutaciones directas de arrays y objetos.
- Preferir inmutabilidad y funciones puras para transformar datos.

# Routing

Las rutas de feature deben cargarse con lazy loading por defecto.

Ejemplo:

```ts
export const routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users.component').then(m => m.UsersComponent),
  },
];
```

Reglas:
- No cargar features grandes en el bundle principal.
- Proteger rutas privadas con guards.
- Mantener el routing simple y predecible.

# Formularios

Usar formularios reactivos tipados siempre que sea posible.

Reglas:
- Validaciones centralizadas en utilidades reutilizables.
- Mensajes de error claros y accesibles.
- Marcar campos inválidos sólo cuando corresponda.
- Evitar lógica pesada en el template.

Ejemplo de enfoque:
- `FormBuilder`.
- `Validators`.
- Tipado explícito del modelo del formulario.

# HTTP e interceptores

Usar interceptores para cross-cutting concerns.

Casos típicos:
- Adjuntar token de autenticación.
- Manejar errores globales.
- Añadir cabeceras comunes.

Ejemplo:

```ts
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'TOKEN_FROM_STORE';
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(cloned);
  }
}
```

Reglas:
- No guardar tokens en texto plano si se puede evitar.
- No mezclar lógica de presentación con interceptores.
- Centralizar el manejo de errores cuando tenga sentido.

# Seguridad

Reglas obligatorias:
- Sanitizar cualquier HTML dinámico.
- No usar `bypassSecurityTrust...` sin justificación clara.
- No exponer claves, tokens o credenciales en el frontend.
- Validar siempre en backend aunque el frontend también valide.

Si el proyecto usa backend Laravel:
- Asumir autenticación por JWT o sesión según indique el proyecto.
- Mantener el contrato API tipado.
- Separar DTOs de modelos de UI.
- Manejar expiración de token y refresh si existe.

# Accesibilidad

- Usar etiquetas semánticas.
- Mantener navegación por teclado.
- Asegurar contraste suficiente.
- Añadir `aria-label` o `aria-describedby` cuando aporte contexto.
- No depender sólo del color para comunicar estado.

# Performance

- Usar lazy loading en features grandes.
- Evitar imports innecesarios.
- Usar `NgOptimizedImage` cuando aplique.
- Mantener templates livianos.
- Medir bundles si el proyecto crece.

# Testing

Toda funcionalidad nueva debe incluir pruebas.

Reglas:
- Test unitario para componentes y servicios relevantes.
- Probar comportamiento, no sólo implementación.
- Cubrir validaciones, transformaciones y flujos críticos.
- Usar mocks sencillos y claros.

Ejemplo:

```ts
import { render } from '@testing-library/angular';
import { UserCardComponent } from './user-card.component';

it('renders the user card', async () => {
  const { getByText } = await render(UserCardComponent, {
    componentProperties: {
      name: 'Sergio',
    },
  });

  expect(getByText('Sergio')).toBeTruthy();
});
```

# CI/CD

Pipeline mínima recomendada:
- Install dependencies.
- Lint.
- Type check.
- Unit tests.
- Build production.
- E2E si aplica.

Reglas:
- Fallar rápido si hay errores de tipos.
- No permitir builds rotos.
- Ejecutar formato antes de mergear.

# Reglas estrictas

No cambiar:
- No usar `any`.
- No crear componentes sin `standalone`.
- No meter lógica de negocio en el template.
- No añadir dependencias sin necesidad.
- No introducir patrón nuevo sin justificación.

# Flujo de trabajo del agente

Cuando genere código:
1. Confirmar nombre y feature.
2. Revisar estructura existente.
3. Crear o modificar archivos mínimos necesarios.
4. Mantener estilo del repo.
5. Añadir tests.
6. Asegurar que compila.

# Plantilla de feature

```md
src/app/features/<feature-name>/
- <feature-name>.component.ts
- <feature-name>.component.html
- <feature-name>.component.scss
- <feature-name>.component.spec.ts
- <feature-name>.service.ts
- <feature-name>.routes.ts
```

# Plantillas rápidas

## Componente con signal

```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="increment()">+</button>
    <p>{{ count() }}</p>
    <p>{{ double() }}</p>
  `,
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(value => value + 1);
  }
}
```

## Servicio con HTTP

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}
```

## Ruta lazy

```ts
export const usersRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then(m => m.UsersComponent),
  },
];
```

# Ajustes por proyecto

Esta sección debe actualizarse para cada repositorio:
- Alias de imports.
- Lint rules.
- Formato de commits.
- Framework de pruebas.
- Estrategia de estado.
- Convenciones del backend.

# Nota final

Este archivo está pensado para que OpenCode genere código Angular 17 moderno, claro y consistente.
Si el proyecto tiene reglas propias, prevalecen sobre este archivo.
