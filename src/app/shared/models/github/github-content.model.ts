/**
 * Defines the Github Contents GET Response
 */
export interface GithubContent {
  name: string;
  path: string;
  sha: string;
  content: string;
  git_url: string;
}
