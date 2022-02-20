import api from './api.yaml';

t.is(api.paths['/my/path'].get.summary, 'Some GET request');
t.is(
  api.paths['/my/path'].get.responses['200'].content['application/json'].schema
    .type,
  'object'
);
