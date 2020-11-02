import gql from 'graphql-tag';

export default gql`
  query allPrs {
    allPrs {
      id
      title
      date
      filesTypes
      status
      labels
    }
  }
`;
