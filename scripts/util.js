#! /usr/bin/env node

const {existsSync, readFileSync} = require('fs');
const jsonfile = require('jsonfile');
const { Observable, forkJoin } = require('rxjs');
const cp = require('child_process'),
exec = cp.exec;

var dotenv = require('dotenv');

process.argv.forEach(function (val,index, array) {
	console.log(index + ': ' + val);
});

if(existsSync('.env-local')) {
  const localEnv = dotenv.parse(readFileSync('.env-local'));
  for(var i in localEnv) {
    process.env[i] = localEnv[i];
  }
}

//console.log(process.env)
console.log(process.argv)
const func = process.env.npm_config_func || 'none';



let funcs = {
	format: () =>{
		const audio = process.env.npm_config_audio_file;

		if (!audio){
			console.log('Missing arguments. No such audio file exists.');
		}
		const audio64 = Buffer.from(audio).toString('base64');
                var audio_obj = {
                	audio: audio64
                };
                const audio_json = JSON.stringify(audio_obj);

		return audio_json 
	},
	none: function(){
		console.log('No such task. Available tasks:\nformat [audio_file].');

	}
};

funcs[func]()
