#! /usr/bin/env node

process.argv.forEach(function (val,index, array) {
	console.log(index + ': ' + val);
});

//console.log('Printing env args...')
//console.log(process.env.npm_config_task)
//console.log(process.env.npm_config_name)
//console.log(process.env.npm_config_type)
//console.log(process.env.npm_config_audio_file)
//console.log('Printing argv args...')
//console.log(process.argv)
const func = process.env.npm_config_task || 'none';



let funcs = {
	format: () =>{
		const audio = process.env.npm_config_audio_file;
		const name = process.env.npm_config_name;
		const type = process.env.npm_config_type;
		
		console.log('Formatting ' + name)

		if (!audio){
			console.log('Missing arguments. No such audio file exists.');
		}
		
		const binary_data = require('fs').readFileSync(audio)
		const audio64 = Buffer.from(binary_data).toString('base64');
		//console.log(audio64);
                var audio_obj = {
			name: name,
                	audio: audio64,
			type: type
                };
                const audio_json = JSON.stringify(audio_obj);
		//console.log(audio_json)
		
		const full_name = name + '.json'
		require('fs').writeFileSync(full_name, audio_json);
		console.log(full_name + ' successfully created');
	},
	none: function(){
		console.log('No such task. Available tasks:\nformat [audio_file].');

	}
};

funcs[func]()
