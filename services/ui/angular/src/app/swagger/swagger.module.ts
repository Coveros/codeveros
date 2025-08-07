import { NgModule } from '@angular/core';
import { SwaggerComponent } from './swagger.component';
import { SwaggerRoutingModule } from './swagger-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, SwaggerRoutingModule, SwaggerComponent],
})
export class SwaggerModule {}
