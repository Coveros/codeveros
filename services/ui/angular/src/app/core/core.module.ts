import { NgModule, inject } from '@angular/core';
import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  imports: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
})
export class CoreModule {
  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true });

    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.',
      );
    }
  }
}
