import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private childComponentRef:any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public appendComponentTo(parentId: string, child: any, childConfig?: childConfig) : ComponentRef<any> {
    // Create a component reference from the component
    this.childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child)
      .create(this.injector);

    // Attach the config to the child (inputs and outputs)
    this.attachConfig(childConfig, this.childComponentRef);

    this.childComponentRef = this.childComponentRef;
    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.childComponentRef.hostView);

    // Get DOM element from component
    const childDomElem = (this.childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.getElementById(parentId).appendChild(childDomElem);

    return this.childComponentRef;
  }

  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  public removeByComponentRef(ref) {
    this.appRef.detachView(ref.hostView);
    this.childComponentRef.destroy();
  }


  private attachConfig(config, componentRef) {
    const inputs = config.inputs;
    const outputs = config.outputs;
    // for (const key in inputs) {
        componentRef.instance['inputs'] = inputs;
    // }
    // for (const key in outputs) {
        componentRef.instance['outputs'] = outputs;
    // }
}
}
interface childConfig{
  inputs:object,
  outputs:object
}
