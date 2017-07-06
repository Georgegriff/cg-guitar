const gulp = require("gulp");
const rev = require("gulp-rev");
const clean = require("del");
const revReplace = require("gulp-rev-replace");
const dist = "dist";
const tmp = ".tmp";

gulp.task("clean", function() {
    return clean.sync([
        '.tmp/**', 'dist/**'
    ], { force: true })
});

gulp.task("revision", ["clean"], function() {
    return gulp
        .src(["build/default/**/*.*", "!**/**/index.html", "!build/default/service-worker.js", "!build/default/images/manifest/**.*"])
        .pipe(rev())
        .pipe(gulp.dest(tmp))
        .pipe(rev.manifest())
        .pipe(gulp.dest(tmp))
})

gulp.task("manifest-files", function() {
    return gulp
        .src(["images/pageimages/**", "images/manifest/**", "build/default/service-worker.js"], { "base": '.' })
        .pipe(gulp.dest(dist));
});

gulp.task("default", [
    "revision", "manifest-files"
], function() {
    const manifest = gulp.src("./.tmp/rev-manifest.json");

    return gulp
        .src(["build/default/service-worker.js", "build/default/index.html", ".tmp/**/*.*"])
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(dist));
});