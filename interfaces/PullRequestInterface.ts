export interface PullRequestInterface {
  id: number;
  creation_date: string;
  branch_name: string;
  nb_comments: number;
  status: string;
  repository: string;
  nb_approved: number;
  author: string;
  milestone: string;
  nb_issues: number;
  files_types: string;
}
