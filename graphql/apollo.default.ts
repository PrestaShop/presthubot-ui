import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import link from './link';

export default function() {
  return {
    link: new SchemaLink({ schema: link }),
    cache: new InMemoryCache(),
    defaultHttpLink: false,
  };
}
