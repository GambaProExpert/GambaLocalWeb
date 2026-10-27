import { TestBed } from '@angular/core/testing';
import { HomelabDataService } from './homelab-data.service';

describe('HomelabDataService', () => {
  let service: HomelabDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomelabDataService);
  });

  it('devuelve el servicio pedido por id', () => {
    expect(service.getServiceById('pi-hole')?.name).toBe('Pi-hole');
    expect(service.getServiceById('no-existe')).toBeUndefined();
  });

  it('asigna cada servicio a un nodo existente', () => {
    const nodeIds = service.nodes.map(node => node.id);

    for (const item of service.services) {
      expect(nodeIds).toContain(item.node.toLowerCase().replace('-', ''));
    }
  });

  it('usa el acento del nodo al que pertenece cada servicio', () => {
    for (const item of service.services) {
      const node = service.nodes.find(n => n.id === item.node.toLowerCase().replace('-', ''));
      expect(item.nodeAccent).toBe(node?.accent);
    }
  });
});
