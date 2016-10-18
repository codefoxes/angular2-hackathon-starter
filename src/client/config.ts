import {OpaqueToken} from '@angular/core';

let config:any = {};

config.rootUrl = process.env.Root || 'http://localhost:3000';

let APP_CONFIG = new OpaqueToken('config');
export {config, APP_CONFIG};
