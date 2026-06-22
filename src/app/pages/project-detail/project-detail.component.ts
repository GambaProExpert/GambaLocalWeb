import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProjectsDataService, Project } from '../../services/projects-data.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private data: ProjectsDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.project = this.data.getById(id ?? '');
    });
  }

  get descriptionParagraphs(): string[] {
    const description = this.project?.longDesc?.trim() || this.project?.shortDesc || '';

    return description
      .split(/\n{2,}/)
      .map(paragraph => paragraph.trim())
      .filter(Boolean);
  }
}
