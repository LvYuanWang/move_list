import $ from 'jquery';
import styles from './index.module.less';
let container;

/**
 * 初始化函数,负责创建容器
 */
function init() {
    container = $('<div>').addClass(styles.container).appendTo('#app');
}

init();

/**
 * 根据传入的电影数组,创建元素,填充到容器中
 * @param {Array} movies 电影数组 
 */
export function createMovieTag(movies) {
    const movie = movies.map(item => {
        return `<div>
            <a href=${item.url} target="_blank"><img src=${item.cover}></a>
            <a href=${item.url} target="_blank"><p class=${styles.title}>${item.title}</p></a>
            <p class=${styles.rate}>${item.rate}</p>
        </div>`;
    }).join('');
    container.html(movie);
}