import { Component } from '@angular/core';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-nexus-loading',
  standalone: true,
    imports: [
        ProgressSpinnerModule
    ],
  template: `
      <div class="blocked-bg flex justify-content-center align-items-center">
          <div class="spinner-box">
              <p-progressSpinner styleClass="w-3rem h-3rem" strokeWidth="5"></p-progressSpinner>
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
          background-color: rgba(150, 150, 150, 0.25);
      }

      .flex {
          display: flex;
      }

      .justify-content-center {
          justify-content: center;
      }

      .align-items-center {
          align-items: center;
      }
  `]
})
export class NexusLoadingComponent {

}
