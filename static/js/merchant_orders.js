document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.list-group-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.href;
            const item = this.closest('.list-group-item');

            // 添加退出动画
            // item.classList.add('exit-animation');

            // 动画结束后跳转
            item.addEventListener('animationend', function handler() {
                window.location.href = href;
                item.removeEventListener('animationend', handler);
            });
        });
    });
});