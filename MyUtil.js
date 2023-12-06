const fs = require('fs');
const readline = require('readline');

exports.ProcessLineByLine = async function ProcessLineByLine(filename, callback) { 
	const fileStream = fs.createReadStream(filename);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	// crlfDelay option used to recognize cross-platform EOL chars
	
	for await(const line of rl) {
		callback(line);
	}
}

exports.GetNumbersFromString = function getNumbersFromString(str){
	return str.split(' ').map((a)=>(+a)).filter((a)=>(Number.isInteger(a)));
}