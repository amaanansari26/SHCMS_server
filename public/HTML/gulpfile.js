var gulp = require('gulp');
sass = require("gulp-sass"),
postcss = require("gulp-postcss");
autoprefixer = require("autoprefixer");
var sourcemaps = require('gulp-sourcemaps'); 
var browserSync = require('browser-sync').create(); 
cssbeautify = require('gulp-cssbeautify');
var beautify = require('gulp-beautify');


//_______ task for scss folder to css main style 
gulp.task('watch', function() {
	console.log('Command executed successfully compiling SCSS in assets.');
	 return gulp.src('Azea/assets/scss/**/*.scss') 
		.pipe(sourcemaps.init())                       
		.pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
		.pipe(sourcemaps.write(''))   
		.pipe(gulp.dest('Azea/assets/css'))
		.pipe(browserSync.reload({
		  stream: true
	}))
})


//_______task for color-skin(color1)
gulp.task('color1', function(){
   return gulp.src('Azea/assets/colors/color1.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('Azea/assets/colors'));
		
})

//_______task for dark theme
gulp.task('dark', function(){
   return gulp.src('Azea/assets/css/dark.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(beautify.css({ indent_size: 4 }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('Azea/assets/css'));
		
})

//_______task for skin-modes
gulp.task('skins', function(){
        return gulp.src('Azea/assets/css/skin-modes.scss')
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(beautify.css({ indent_size: 4 }))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('Azea/assets/css'));
                     
     })


    


