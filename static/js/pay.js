function confirmPayment() {
    alert("Payment Success!"); // 弹出支付成功消息
        setTimeout(function() {
            window.location.href = "/orders"; // 1秒后跳转
        }, 1000);
}

function cancelPayment() {
    window.location.href = "/confirm";
}
