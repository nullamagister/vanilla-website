const gulp         = require('gulp');
const gulpSequence = require('gulp-sequence');
const rename       = require('gulp-rename');
const pug          = require('gulp-pug');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const sourcemaps   = require('gulp-sourcemaps');
const zip          = require('gulp-zip');
const clean        = require('gulp-clean');
const livereload   = require('gulp-livereload');
const imagemin     = require('gulp-imagemin');


gulp.task("Pug-compile", () => {
    return gulp.src(["project/pug/*.pug", "project/pug/rtl/*.pug"])
               .pipe(pug({pretty: true}))
               .pipe(gulp.dest("dist"))
               .pipe(livereload());
});

gulp.task("Sass-compile", () => {
    return gulp.src(["project/sass/*.scss", "project/sass/rtl/*.scss", "project/css/*.css"])
               .pipe(sourcemaps.init()) 
               .pipe(sass({outputStyle: "compressed"}))
               .pipe(autoprefixer("last 3 versions"))
               .pipe(rename({suffix: ".min"}))
               .pipe(sourcemaps.write("maps"))
               .pipe(gulp.dest("dist/css"))
               .pipe(livereload());
});

gulp.task("Js-minify", () => {
    return gulp.src("project/js/*.js")
               .pipe(sourcemaps.init())
               .pipe(uglify())
               .pipe(rename({suffix: ".min"}))
               .pipe(sourcemaps.write("maps"))
               .pipe(gulp.dest("dist/js"))
               .pipe(livereload());
});

gulp.task("Image-minify", () => {
    return gulp.src("project/imgs/*.*")
               .pipe(imagemin())
               .pipe(gulp.dest("dist/imgs"));
});

gulp.task("Font-directing", () => {
    return gulp.src("project/webfonts/*.*")
               .pipe(gulp.dest("dist/webfonts"));
});

gulp.task("Dist-compress", () => {
    return gulp.src("dist/**/*.*")
               .pipe(zip("Vanilla.zip"))
               .pipe(gulp.dest("dist"));
});

gulp.task("Dist-clean", () => {
    return gulp.src("dist/!(Vanilla.zip)**")
               .pipe(clean({force: true}));
});

gulp.task("compile", gulpSequence("Pug-compile", "Sass-compile", "Js-minify", "Image-minify", "Font-directing"));

gulp.task("deploy", gulpSequence("Pug-compile", "Sass-compile", "Js-minify", "Image-minify", "Font-directing", "Dist-compress", "Dist-clean"));

gulp.task("watch", () => {
    require("./server.js");
    livereload.listen()
    gulp.watch(["project/pug/*.pug", "project/pug/**/*.pug", "project/pug/rtl/*.pug"], ["Pug-compile"]);
    gulp.watch(["project/sass/*.scss", "project/sass/**/*.scss", "project/sass/rtl/*.scss", "project/css/*.css"], ["Sass-compile"]);
    gulp.watch("project/js/*.js", ["Js-minify"]);
    gulp.watch("project/imgs", ["Image-minify"]);
    gulp.watch("project/fobts", ["Font-directing"]);
});