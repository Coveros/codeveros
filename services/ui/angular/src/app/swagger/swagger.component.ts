import { Component, OnInit } from '@angular/core';
import * as SwaggerUI from 'swagger-ui';

import { SwaggerService } from './swagger.service';

@Component({
  template: '<div id="swagger"></div>'
})
export class SwaggerComponent implements OnInit {
  constructor(private swaggerService: SwaggerService) { }

  ngOnInit() {
    this.swaggerService.getConfig().subscribe(spec => {
      SwaggerUI({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        dom_id: '#swagger',
        spec
      }).preauthorizeApiKey('bearerAuth', localStorage.getItem('access_token'));
    });
  }

}
