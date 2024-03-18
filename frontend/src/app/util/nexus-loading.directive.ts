import {
    ComponentFactoryResolver,
    Directive, ElementRef,
    Input,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {NexusLoadingComponent} from "./nexus-loading.component";

@Directive({
  selector: '[nexusLoading]',
})
export class NexusLoadingDirective implements OnInit {

    @Input('nexusLoading') isLoading!: boolean;

    constructor(private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (this.isLoading) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NexusLoadingComponent);
            this.viewContainerRef.clear();
            const componentRef = this.viewContainerRef.createComponent(componentFactory);
            this.elementRef.nativeElement.appendChild(componentRef.location.nativeElement);
        } else {
            this.viewContainerRef.clear();
        }
    }


}
