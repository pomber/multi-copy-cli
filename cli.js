#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const multicopy = require('multi-copy');
const tree = require('nodetree');

const usage = `
	Usage
	  $ mucopy <configfile>
	Examples
	  $ mucopy 'backup.json'
`;

const cli = meow(usage, {string: ['_']});
const configpath = cli.input[0];

fs.readFile(configpath, (err, data) => {
	if (err) {
		throw err;
	}
	const config = JSON.parse(data);
	multicopy(config)
		.then(dest => {
			console.log(tree(dest));
		}).catch(err => {
			throw err;
		});
});

