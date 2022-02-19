import api from './api.yaml';

t.is(api.paths['/my/path'].get.summary, 'Some GET request');