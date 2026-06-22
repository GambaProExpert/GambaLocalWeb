import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomelabDataService, Service } from '../../services/homelab-data.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  service?: Service;
  embedUrl?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private data: HomelabDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service = this.data.getServiceById(id ?? '');
 
    if (this.service?.videoUrl) {
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.toEmbedUrl(this.service.videoUrl)
      );
    }
  }

   private toEmbedUrl(url: string): string {
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
 
    return url;
  }
}
