import {
    Directive, ElementRef,
    Input, OnChanges,
    OnInit, SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {NexusLoadingComponent} from "./nexus-loading.component";
import {Observable} from "rxjs";

@Directive({
  selector: '[nexusLoading]',
})
export class NexusLoadingDirective implements OnInit {

    @Input('nexusLoading') isLoading!: Observable<boolean>;

    constructor(private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        this.updateLoadingState();
    }

    private updateLoadingState(): void {
        this.isLoading.subscribe(loading => {
            if (loading) {
                const componentRef = this.viewContainerRef.createComponent(NexusLoadingComponent);
                const childElement = componentRef.location.nativeElement;
                const parentElement = this.elementRef.nativeElement;
                parentElement.style.position = 'relative';
                parentElement.appendChild(childElement);
            } else {
                this.viewContainerRef.clear();
            }
        });
    }

}
