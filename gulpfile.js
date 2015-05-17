var gulp = require("gulp");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync");
var runseq = require("run-sequence");
var concat = require("gulp-concat");
var wiredep = require("wiredep").stream;
var ngAnnotate = require("gulp-ng-annotate");

var paths = {
	tscripts: {
		src: ["typings/tsd.d.ts", "app/app.consts.ts", "app/app.ts", "app/**/*.ts"],
		dest: "app/build"
	},
	html: ["app/**/*.html"],
	style: "assets/styles/**/*.css",
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
	gulp.watch(paths.style, [browserSync.reload]).on("change", reportChange);
});

// ** Compilation ** //

gulp.task("build", ["compile:typescript", "bower", "html"]);
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
		.pipe(gulp.dest(paths.tscripts.dest));

});

gulp.task("html", function () {
	gulp.src(["app/**/*.html", "!app/index.html"])
		.pipe(gulp.dest(paths.dist));
});

gulp.task("bower", function () {
	gulp.src("app/index.html")
		.pipe(wiredep())
		.pipe(gulp.dest(paths.dist));
});

gulp.task("serve", ["build"], function (done) {

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