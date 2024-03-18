import {
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
                private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (this.isLoading) {
            const componentRef = this.viewContainerRef.createComponent(NexusLoadingComponent);
            const childElement = componentRef.location.nativeElement;
            const parentElement = this.elementRef.nativeElement;
            parentElement.style.position = 'relative';
            parentElement.appendChild(childElement);
        } else {
            this.viewContainerRef.clear();
        }
    }

}
