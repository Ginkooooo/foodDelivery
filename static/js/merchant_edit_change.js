// merchant_edit_change.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    // 图片预览功能
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);  // 使用FormData处理文件上传
        const itemId = form.dataset.itemId;

        fetch(`/merchant/edit/change/${itemId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,
            },
            body: formData  // 直接发送FormData
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.success) {
                if (data.new_image_url) {
                    imagePreview.src = data.new_image_url;  // 更新图片预览
                }
                alert('Item updated successfully!');
                window.location.href = '/merchant/edit';
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating item: ' + error.message);
        });
    });
});