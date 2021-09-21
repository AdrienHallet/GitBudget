import { commonVariables } from './environment.common';

export const environment = {
  production: true,
  oauthURI: 'https://budjet.netlify.app/.netlify/functions/auth-callback',
  oauthClientId: '2e78532df6d916faa462',
  common: commonVariables,
  githubRepoName: 'budget',
  githubFileName: 'data.json',
};
