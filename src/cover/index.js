import $ from 'jquery';
import styles from './index.module.less';
import videoUrl from '../assets/movie.mp4';
import audioUrl from '../assets/music.mp3';

function init() {
    const container = $('<div>').addClass(styles.container).appendTo('#app');
    const vid = $('<video>').addClass(styles.video).prop('src', videoUrl).prop('autoplay', true).prop('loop', true).appendTo(container);
    const aud = $('<audio>').prop('src', audioUrl).prop('autoplay', true).prop('loop', true).appendTo(container);
    $('<h1>').text('豆瓣电影').addClass(styles.title).appendTo(container);
    $(window).on('scroll', function () {
        const scrollTop = document.documentElement.scrollTop;
        const vHeight = document.documentElement.clientHeight;
        if (scrollTop >= vHeight) {
            vid[0].pause();
            aud[0].pause();
        } else {
            vid[0].play();
            aud[0].play();
        }
    })
}

init();