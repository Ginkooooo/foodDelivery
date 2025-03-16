function confirmPayment() {
    window.location.href = "/success"; // 确认支付跳转到 /success
}

function cancelPayment() {
    window.location.href = "/confirm"; // 取消支付返回订单确认页
}
