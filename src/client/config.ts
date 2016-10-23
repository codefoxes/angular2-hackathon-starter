import {OpaqueToken} from '@angular/core';

let config:any = {};
let view:string = process.env.VIEW || 'bootstrap';

config.rootUrl = process.env.Root || 'http://localhost:3000';
config.view = {
	name: view,
	path: `views/${view}`,
	styleSheet: `views/styles/${view}.css`
};

let APP_CONFIG = new OpaqueToken('config');
export {config, APP_CONFIG};
