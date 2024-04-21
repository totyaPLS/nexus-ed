import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-bool-indicator',
  standalone: true,
    imports: [
        NgIf
    ],
  template: `
    <i class="pi pi-check-circle" *ngIf="bool"></i>
    <i class="pi pi-times-circle" *ngIf="!bool"></i>
  `,
  styles: [`
      .pi {
          font-size: 1.4rem;
      }

      .pi-check-circle {
          color: var(--green-500);
      }

      .pi-times-circle {
          color: var(--red-500);
      }
  `]
})
export class BoolIndicatorComponent {
    @Input() bool!: boolean;
}
