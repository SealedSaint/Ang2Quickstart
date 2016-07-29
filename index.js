let express = require('express')
let morgan = require('morgan')
let config = require('nconf')

config.file({ file: 'config.json' })

let app = express()

app.use(morgan('dev', {
	skip: (req, res) => req.originalUrl.indexOf('node_modules') > -1
}))

app.use('/node_modules', express.static('node_modules')) //Serve up the node modules folder
app.use(express.static(config.get('buildOutputDir')))
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: config.get('buildOutputDir') })
})

app.listen(config.get('port'))
console.log(`Node is listening at port: ${config.get('port')}`)