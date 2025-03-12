// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有地址单选框
    const radios = document.querySelectorAll('.address-radio');
    
    // 为每个单选框添加事件监听
    radios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            if (this.checked) {
                // 添加500ms延迟让用户看到选中反馈
                setTimeout(() => {
                    // 跳转到订单页面
                    window.location.href ='confirm.html';
                    
                    // 如果需要传递选中地址参数可以这样：
                    // const addressId = this.id;
                    // window.location.href = `orders.html?address=${addressId}`;
                }, 500);
            }
        });
    });
});