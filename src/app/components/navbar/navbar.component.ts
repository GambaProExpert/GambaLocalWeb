import { Component, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsDataService, Project } from '../../services/projects-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly themeStorageKey = 'theme-preference';

  scrolled = false;
  isDark = false;
  drawerOpen = false;
  projects: Project[];

  constructor(
    private renderer: Renderer2,
    private projectsData: ProjectsDataService
  ) {
    this.projects = this.projectsData.projects;
  }

  ngOnInit(): void {
    const saved = localStorage.getItem(this.themeStorageKey);
    this.applyTheme(saved === 'dark');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
  }

  toggleTheme(): void {
    const nextThemeIsDark = !this.isDark;
    this.applyTheme(nextThemeIsDark);
    localStorage.setItem(this.themeStorageKey, nextThemeIsDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    this.isDark = isDark;

    if (isDark) {
      this.renderer.setAttribute(document.documentElement, 'data-theme', 'dark');
    } else {
      this.renderer.removeAttribute(document.documentElement, 'data-theme');
    }
  }
  openDrawer(): void {
    this.drawerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    document.body.style.overflow = '';
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
