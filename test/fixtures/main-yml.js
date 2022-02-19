import api from './api.yml';

t.is(api.paths['/my/path'].get.summary, 'Some GET request');