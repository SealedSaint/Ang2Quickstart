(() => {
	//Packages tell the system loader how to load when no filename and/or extension
	let packages = {
		'app': { main: 'main.js', defaultExtension: 'js' },
		'rxjs': { defaultExtension: 'js' }
	}

	//Set our angular original and custom barrels
	let barrels = [
		'@angular/common',
		'@angular/compiler',
		'@angular/core',
		'@angular/forms',
		'@angular/http',
		'@angular/platform-browser',
		'@angular/platform-browser-dynamic',
		'@angular/router',
		'@angular/router-deprecated',
		'@angular/upgrade'
	]

	//Turn our barrels into proper package entries and combine with the existing package
	packages = barrels.reduce((packages, barrel) => {
		return Object.assign(packages, { [barrel]: { main: 'index.js', defaultExtension: 'js' } })
	}, packages)

	//Maps tell the system loader where to look for things (aliases)
	let map = {
		'app': 'app',
		'@angular': 'node_modules/@angular',
		'rxjs': 'node_modules/rxjs'
	}

	System.config({
		transpiler: 'typescript',
		map: map,
		packages: packages
	})

})()