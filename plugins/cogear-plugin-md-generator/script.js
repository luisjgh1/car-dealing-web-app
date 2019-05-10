let api321 = { url:'http://localhost:8081/api', folderName: '_soundford' };
// do not update manualy line 1 api321 see build.sh to update its value
const axios = require('axios')
const fs = require('fs')
const path = require('path')

console.log(api321);
var generator = async () => {
	try {
		var res = await axios.get(`${api321.url}/cars`)
		let model = await fs.readFileSync('./plugins/cogear-plugin-md-generator/model.txt', 'utf8')
		// // fs.writeFileSync('asd.md' result.data)
		// fs.writeFile('hello_world.md', JSON.stringify(result.data[0]) + '\n esta es una nueva linea', function(err) {
		//   // If an error occurred, show it and return
		//   if(err) return console.error(err);
		//   // Successfully wrote to the file!
		// });
		await res.data.forEach(async (element, i) => {

			let newCar = model + '\n\ncarDetails: ' + JSON.stringify(element) + '\n\nlayout: details \n\n---'
			let name = element.make.trim().toLowerCase().replace(/\s/g, "-") + '-' + element.model.trim().toLowerCase().replace(/\s/g, "-") + '-' + element.exteriorColor.trim().toLowerCase().replace(/\s/g, "-") + '_' + i + '.md'

			switch (true) {
				case (element.price < 5000):
					name = 'under-$5000' + '-' + name
					break
				case (element.price < 10000):
					name = 'under-$10000' + '-' + name
					break
				case (element.price < 15000):
					name = 'under-$15000' + '-' + name
					break
				case (element.price < 20000):
					name = 'under-$20000' + '-' + name
					break
				case (element.price < 30000):
					name = 'under-$30000' + '-' + name
					break
				case (element.price < 40000):
					name = 'under-$40000' + '-' + name
					break
				default:
					name = 'over-$40000' + '-' + name
			}

			await fs.writeFileSync(`./${api321.folderName}/pages/${encodeURI(name)}`, newCar)
		});
	}
	catch (err) {
		// console.log(err)
	}
}

generator()
