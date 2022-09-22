const http = require('http')
const accessKey = require('./config.js')
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')
const rl = readline.createInterface({ input, output })

rl.question('Введите название города \n', (answer) => {
	const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${answer}`
	http.get(url, (res) => {
		res.setEncoding('utf-8')
		let wData = ''
		res.on('data', (chunk) => wData += chunk)
		res.on('end', () => {
			let parseDate = JSON.parse(wData)
			console.log(`Текущая температура в городе ${parseDate.location.name} сосставляет ${parseDate.current.temperature}°C`)
		})
	}).on('error', (err) => {
		console.error(err)
	})
	rl.close()
})
