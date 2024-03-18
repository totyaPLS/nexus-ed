import { Component } from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-nexus-loading',
  standalone: true,
    imports: [
        ProgressSpinnerModule
    ],
  template: `
      <div class="blocked-bg">
          <div class="spinner-box">
              <p-progressSpinner styleClass="w-4rem h-4rem" ariaLabel="loading"></p-progressSpinner>
          </div>
      </div>
  `,
  styles: [`
      .blocked-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(150, 150, 150, 0.3);
      }

      .spinner-box {
          position: absolute;
          top: 45%;
          left: 45%;
      }
  `]
})
export class NexusLoadingComponent {

}
