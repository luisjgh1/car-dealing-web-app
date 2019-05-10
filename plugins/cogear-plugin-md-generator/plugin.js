const axios = require('axios')
const fs = require('fs')
const path = require('path')

module.exports = {
	async apply(){
		try {
			// var result = await axios.get('http://localhost:3000/api/cars')
			// let model = await fs.readFileSync('./plugins/cogear-plugin-md-generator/model.txt', 'utf8')
			// // // fs.writeFileSync('asd.md' result.data)
			// // fs.writeFile('hello_world.md', JSON.stringify(result.data[0]) + '\n esta es una nueva linea', function(err) {
			// //   // If an error occurred, show it and return
			// //   if(err) return console.error(err);
			// //   // Successfully wrote to the file!
			// // });
			// await result.data.forEach(async (element, i) => {
			// 	let newCar = model + '\n\ncarDetails: ' + JSON.stringify(element) + '\n\nlayout: details \n\n---'
			// 	let name = i + '_' + element.name.replace(' ', '_')
			// 	await fs.writeFileSync('./_ford/pages/' + name, newCar)
			// });
		}
		catch(err) {
			console.log(err)
		}
	}
}

