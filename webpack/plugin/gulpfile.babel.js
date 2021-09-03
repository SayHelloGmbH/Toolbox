import gulp from 'gulp';

const config = {
    name: 'Hello Theme',
    key: 'sht',
    assetsDir: 'assets/',
    gulpDir: './.build/gulp/',
    assetsBuild: '.build/assets/',
    errorLog: function (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
        if (this.emit) {
            this.emit('end');
        }
    },
    reload: [
        '*.php',
        '{Classes,inc,partials,templates,includes}/**/*.{php,html,twig}',
    ],
};

import { task as taskPreact } from './.build/gulp/task-preact';
import { task as taskStyles } from './.build/gulp/task-styles';

export const preact = () => taskPreact(config);
export const styles = () => taskStyles(config);

export const watch = () => {
    const settings = { usePolling: true, interval: 100 };

    gulp.watch(
        config.assetsBuild + 'preact/**/*.{scss,css,js,jsx}',
        settings,
        gulp.series(preact)
    );

    gulp.watch(
        config.assetsBuild + 'styles/**/*.scss',
        settings,
        gulp.series(styles)
    );
};

export const taskDefault = gulp.series(gulp.parallel(preact, styles), watch);

export default taskDefault;
