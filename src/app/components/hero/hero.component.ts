import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomelabDataService, LabNode, Service } from '../../services/homelab-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  nodes: LabNode[];
  services: Service[];

  constructor(private data: HomelabDataService) {
    this.nodes = this.data.nodes;
    this.services = this.data.services;
  }

  get totalRamGb(): number {
    return this.nodes.reduce((total, node) => total + parseInt(node.ram, 10), 0);
  }
}
