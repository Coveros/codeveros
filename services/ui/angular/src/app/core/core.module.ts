import {NgModule, Optional, SkipSelf} from '@angular/core';
import {PageNotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
