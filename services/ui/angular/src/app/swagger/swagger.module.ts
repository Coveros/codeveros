import { NgModule } from '@angular/core';
import { SwaggerComponent } from './swagger.component';
import { SwaggerRoutingModule } from './swagger-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SwaggerComponent],
  imports: [SharedModule, SwaggerRoutingModule],
})
export class SwaggerModule {}
