const gulp = require("gulp");
const rev = require("gulp-rev");
const clean = require("del");
const revReplace = require("gulp-rev-replace");
const dist = "dist";
const tmp = ".tmp";

gulp.task("clean", function () {
    return clean([
        '.tmp/**', 'dist/**'
    ], {force: true})
});

gulp.task("revision", ["clean"], function () {
    return gulp
        .src(["build/default/**/*.*", "!**/**/index.html"])
        .pipe(rev())
        .pipe(gulp.dest(tmp))
        .pipe(rev.manifest())
        .pipe(gulp.dest(tmp))
})

gulp.task("default", ["revision"], function () {
    const manifest = gulp.src("./.tmp/rev-manifest.json");

    return gulp
        .src(["build/default/index.html", ".tmp/**/*.*"])
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(dist));
});