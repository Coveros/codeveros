import { Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

import { SwaggerService } from './swagger.service';

@Component({
  template: '<div id="swagger"></div>',
  standalone: false,
})
export class SwaggerComponent implements OnInit {
  constructor(private swaggerService: SwaggerService) {}

  ngOnInit() {
    this.swaggerService.getConfig().subscribe((spec) => {
      SwaggerUI({
        dom_id: '#swagger',
        spec,
      }).preauthorizeApiKey('bearerAuth', localStorage.getItem('access_token'));
    });
  }
}
