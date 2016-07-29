let gulp = require('gulp')
let gulpSass = require('gulp-sass')
let gulpTs = require('gulp-typescript')
let uglify = require('gulp-uglify')
let del = require('del')
let config = require('nconf')

config.file({ file: 'config.json' })

let outDir = config.get('buildOutputDir')

gulp.task('clean', () => {
	del.sync(outDir)
})

//Compile our scss files to css
gulp.task('sass', () => {
	gulp.src('src/**/*.scss')
		.pipe(gulpSass().on('error', gulpSass.logError))
		.pipe(gulp.dest(outDir))
})

//Compile our ts files to js
gulp.task('ts', () => {
	gulp.src('src/**/*.ts')
		.pipe(gulpTs({
			target: 'ES5',
			removeComments: true,
			moduleResolution: 'node',
			experimentalDecorators: true,
			emitDecoratorMetadata: true
		}))
		//.pipe(uglify())
		.pipe(gulp.dest(outDir))
})

//Copy files that do not need to be compiled straight over
gulp.task('copy-others', () => {
	gulp.src('src/**/!(*.scss|*.ts)')
		.pipe(gulp.dest(outDir))
})

//Build will combine the individual tasks
gulp.task('build', ['sass', 'ts', 'copy-others'])

gulp.task('develop', ['build'], () => {
	gulp.watch('src/**/*.scss', ['sass'])
	gulp.watch('src/**/*.ts', ['ts'])
	gulp.watch('src/**/!(*.scss|*.ts)', (event) => {
		if(event.type == 'deleted') { //If the change was a file delete, delete that file from the outDir
			del(event.path.replace('src', outDir))
		}
		else { //If the change was not a file delete, copy the file over
			gulp.src(event.path, { base: 'src' })
				.pipe(gulp.dest(outDir))
		}
	})
})

gulp.task('default', ['develop'])