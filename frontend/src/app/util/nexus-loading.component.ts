import { Component } from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-nexus-loading',
  standalone: true,
    imports: [
        ProgressSpinnerModule
    ],
  template: `
      <div class="spinner-box">
          <p-progressSpinner ariaLabel="loading"></p-progressSpinner>
      </div>
  `,
  styles: [`
      .spinner-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(50%, 50%);
      }
  `]
})
export class NexusLoadingComponent {

}
