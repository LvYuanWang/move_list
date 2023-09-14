import $ from 'jquery';
import styles from './index.module.less';
import { createMovieTag } from '../list';
import getMovies from '@/api/movie';
let container;

/**
 * 初始化函数,负责创建容器
 */
function init() {
    container = $('<div>').addClass(styles.pager).appendTo('#app');
}

init();

/**
 * 根据传入的页码、页容量、总记录数、创建分页区域的标签
 * @param {Number} page 页码
 * @param {Number} limit 页容量
 * @param {Number} total 总页数
 */
export function createPagers(page, limit, total) {
    container.empty();
    /**
     * 辅助函数,负责帮忙创建一个页码标签
     * @param {Text} text 标签的文本
     * @param {status} status 标签的状态,空字符串-普通状态, disabled-禁用状态,active-选中状态
     * @param {*} targetPage 跳转到第几页
     */
    function createTag(text, status, targetPage) {
        const span = $('<span>').text(text).appendTo(container);
        const className = styles[status];
        span.addClass(className);
        if (status === '') {
            span.on('click', async () => {
                console.log('正在跳转到第' + targetPage + '页');
                // 1. 重新拿数据
                const resp = await getMovies(targetPage, limit);
                // 2. 重新生成列表
                createMovieTag(resp.data.movieList);
                // 3. 重新生成分页区域
                createPagers(targetPage, limit, resp.data.movieTotal);
            })
        }
    }
    const maxPageNumber = Math.ceil(total / limit); // 最大页码数
    //1. 创建首页标签
    createTag('首页', page === 1 ? 'disabled' : '', 1);
    //2. 创建上一页标签
    createTag('上一页', page === 1 ? 'disabled' : '', page - 1);
    //3. 创建数字页码标签
    const pageNumber = 10; // 页码数
    let min = Math.floor(page - pageNumber / 2);
    min < 1 && (min = 1);
    let max = Math.floor(min + pageNumber - 1);
    max > maxPageNumber && (max = maxPageNumber);
    for (let i = min; i <= max; i++) {
        createTag(i, page === i ? 'active' : '', i);
    }
    //4. 创建下一页标签
    createTag('下一页', page === maxPageNumber ? 'disabled' : '', page + 1);
    //5. 创建尾页标签
    createTag('尾页', page === maxPageNumber ? 'disabled' : '', maxPageNumber);
}