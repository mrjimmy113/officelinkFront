import { ComponentRef } from '@angular/core/src/render3';
import { DomService } from './dom.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadService {

  constructor(private domService: DomService) { }

  init(locationId,component: any, inputs: object, outputs: object) : ComponentRef<any> {
    let componentConfig = {
      inputs:inputs,
      outputs:outputs
    }
    return this.domService.appendComponentTo(locationId, component, componentConfig);
  }

  destroy(ref) {
    this.domService.removeByComponentRef(ref);
  }
}
