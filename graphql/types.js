export default `
  type Label {
    name: String
  }

  type FileType {
    name: String
  }

  type PullRequest {
    id: String
    title: String
    date: String
    filesTypes: [FileType]
    status: String
    labels: [Label]
  }

  type Issue {
    id: String
    title: String
    date: String
    labels: [Label]
  }

  type Query {
    allPrs: [PullRequest]
  }
`;
