import { Component, OnInit, inject } from '@angular/core';
import SwaggerUI from 'swagger-ui';

import { SwaggerService } from './swagger.service';

@Component({ template: '<div id="swagger"></div>' })
export class SwaggerComponent implements OnInit {
  private readonly swaggerService = inject(SwaggerService);

  ngOnInit() {
    this.swaggerService.getConfig().subscribe((spec) => {
      SwaggerUI({
        dom_id: '#swagger',
        spec,
      }).preauthorizeApiKey('bearerAuth', localStorage.getItem('access_token'));
    });
  }
}
