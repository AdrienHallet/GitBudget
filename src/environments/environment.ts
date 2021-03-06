// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The table of file replacements can be found in `angular.json`.

import {commonVariables} from './environment.common';

export const environment = {
  production: false,
  oauthURI: 'http://localhost:3000/auth-callback',
  oauthClientId: '2ff4005a4a71bedf0c50',
  common: commonVariables,
  githubRepoName: 'budget-dev',
  githubFileName: 'data.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
