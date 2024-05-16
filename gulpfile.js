import gulp from "gulp";
import sassLib from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(sassLib);
import sourcemaps from "gulp-sourcemaps";
import browserSyncLib from "browser-sync";
const browserSync = browserSyncLib.create();
import uglify from "gulp-uglify-es";
import del from "del";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import imagemin from "gulp-imagemin";
import fileInclude from "gulp-file-include";
import prettyHtml from "gulp-pretty-html";
import svgSprite from "gulp-svg-sprite";

gulp.task("server", () => {
	return browserSync.init({
		server: { baseDir: ["dist"] },
		port: 3000,
		open: true,
	});
});

gulp.task("scripts", () => {
	return gulp
		.src("./src/js/script.js")
		.pipe(uglify.default())
		.pipe(gulp.dest("dist/script/"))
		.pipe(browserSync.stream());
});

gulp.task("style", () => {
	return gulp
		.src("src/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
		)
		.pipe(
			cleancss({ level: { 1: { specialComments: 0 } }, format: "beautify" })
		)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./dist/css/"))
		.pipe(browserSync.stream());
});

gulp.task("index", () => {
	return gulp
		.src("./src/**/*.html")
		.pipe(fileInclude())
		.pipe(
			prettyHtml({
				indent_size: 4,
				indent_char: " ",
				unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
			})
		)
		.pipe(gulp.dest("dist/"))
		.pipe(browserSync.stream());
});

gulp.task("images", () => {
	return gulp
		.src(["./src/img/**/*", "!./src/img/**/*.svg"])
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img/"));
});

gulp.task("sprite", () => {
	return gulp
		.src("src/img/*.svg")
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg",
					},
				},
			})
		)
		.pipe(gulp.dest("dist/img/"));
});

gulp.task("fonts", () => {
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("clean", () => {
	return del(["dist/**/*"], { force: true });
});

gulp.task("watch", () => {
	gulp.watch("./src/js/*.js", gulp.series("scripts"));
	gulp.watch("./src/scss/**/*", gulp.series("style"));
	gulp.watch("./src/**/*.html", gulp.series("index"));
	gulp.watch("./src/img/**/*.png", gulp.series("images"));
});

gulp.task(
	"build",
	gulp.series("clean", "scripts", "style", "images", "index", "fonts", "sprite")
);
gulp.task("dev", gulp.series("build", gulp.parallel("watch", "server")));
