import { NgModule } from '@angular/core';
import { SwaggerComponent } from './swagger.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, SwaggerComponent],
})
export class SwaggerModule {}
