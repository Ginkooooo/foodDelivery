
document.addEventListener('DOMContentLoaded', function() {
    // 计算配送距离
    document.querySelectorAll('.delivery-distance').forEach(span => {
        // 获取餐厅坐标（使用parseFloat转换并处理无效值）
        const lat = parseFloat(span.dataset.latitude) || 0;
        const lng = parseFloat(span.dataset.longitude) || 0;
        
        // 用户固定坐标
        const userLat = 0;
        const userLng = 0;
        
        // 计算欧氏距离
        const distance = (Math.sqrt(
            Math.pow(lat - userLat, 2) + 
            Math.pow(lng - userLng, 2)
        ))/50;
        
        // 显示结果（保留两位小数，添加单位）
        span.textContent = `${distance.toFixed(2)} km`;
        span.dataset.distance = distance.toFixed(2);

    });

    document.querySelectorAll('.delivery-time').forEach(span => {

        const distanceSpan = span.closest('.thumbnail').querySelector('.delivery-distance');
        const distance = parseFloat(distanceSpan.dataset.distance) || 0;  // **从 data 取值**

        // 计算欧氏距离
        const time = distance * 25;

        // 显示结果（保留两位小数，添加单位）
        span.textContent = `${time.toFixed(0)} min`;

    });

    document.querySelectorAll('.heart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            console.log('收藏状态:', isActive ? '已收藏' : '未收藏');
        });
    });
});