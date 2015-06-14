var gulp = require("gulp");
var tsc = require("gulp-typescript");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync");
var runseq = require("run-sequence");
var concat = require("gulp-concat");
var wiredep = require("wiredep").stream;
var ngAnnotate = require("gulp-ng-annotate");
var usemin = require("gulp-usemin");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var del = require("del");

var paths = {
	tscripts: {
		src: ["typings/tsd.d.ts", "app/app.consts.ts", "app/app.ts", "app/**/*.ts"],
		dest: "app/build"
	},
	html: ["app/**/*.html", "index.html"],
	mainHtml: "index.html",
	sass: {
		src: ["assets/styles/**/*.scss"],
		dest: "./build/styles"
	},
	fonts: {
		src: ["bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}"],
		dest: "./build/fonts"
	},
	imgs: {
		src: ["assets/imgs/*.{png,jpeg,jpg}"],
		dest: "./build/imgs"
	},
	dist: "./build"
};

gulp.task("default", function () {

});


// ** Running ** //


//gulp.task("buildrun", function (cb) {
//	runseq("build", "run", cb);
//});

// ** Watching ** //


gulp.task("watch", ["serve"], function () {
	gulp.watch(paths.tscripts.src, ["compile:typescript", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.html, ["html", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.mainHtml, ["bower", browserSync.reload]).on("change", reportChange);
	gulp.watch(paths.sass.src, ["compile:sass", browserSync.reload]).on("change", reportChange);
});

// ** Compilation ** //
gulp.task("build:prod", ["build"], function (cb) {
	runseq("minify", cb);
});
gulp.task("build", ["compile:typescript", "compile:sass", "bower", "html", "copy:fonts", "copy:imgs"]);
gulp.task("compile:typescript", function () {
	var tsResult = gulp
		.src(paths.tscripts.src)
		.pipe(sourcemaps.init())
		.pipe(tsc({
		module: "amd",
		target: "ES5",
		declarationFiles: false,
		emitError: false,
		emitDecoratorMetadata: true
	}));
		
	//tsResult.dts.pipe(gulp.dest("./def"))
	return tsResult.js
		.pipe(concat("app.js"))
		.pipe(ngAnnotate())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./build/scripts"));

});

gulp.task("compile:sass", function () {
	gulp.src(paths.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.sass.dest));
});

gulp.task("html", function () {
	gulp.src(["app/**/*.html"])
		.pipe(gulp.dest(paths.dist));
});

gulp.task("minify", function () {
	return gulp.src("build/index.html")
		.pipe(usemin({
		assetsDir: "build",
		css: [minifyCss(), "concat"],
		js: [uglify(), "concat"]
	}))
		.pipe(gulp.dest("build"));
});

gulp.task("bower", function () {
	gulp.src(paths.mainHtml)
		.pipe(wiredep())
		.pipe(gulp.dest(paths.dist));
});

gulp.task("copy:fonts", function () {
	gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
});

gulp.task("copy:imgs", function () {
	gulp.src(paths.imgs.src)
		.pipe(gulp.dest(paths.imgs.dest));
});

// ** Clean ** //
gulp.task("clean", function (cb) {
	del([paths.dist], cb);
});


// ** Utils ** //

gulp.task("serve", ["build:prod"], function (done) {

	browserSync({
		open: false,
		port: 9000,
		server: {
			baseDir: [paths.dist],
			middleware: function (req, res, next) {
				res.setHeader("Access-Control-Allow-Origin", "*");
				next();
			}
		}
	}, done);

});

function reportChange(event) {
	console.log("File " + event.path + " was " + event.type + ", running tasks...");
}