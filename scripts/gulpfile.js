const { src, dest, series } = require('gulp');
const uglify = require('gulp-uglify');

function minifyJS() {
    return src('js/*.js') // Adjust this path to your JS files
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

exports.default = series(minifyJS);
