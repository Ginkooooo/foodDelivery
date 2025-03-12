// 图片上传预览
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function(e) {
      const reader = new FileReader()
      reader.onload = function(event) {
        this.closest('.editable-image')
             .querySelector('.preview-image')
             .src = event.target.result
      }.bind(this)
      reader.readAsDataURL(this.files[0])
    })
  })
  
  // 保存逻辑示例
  document.querySelector('.btn-save').addEventListener('click', function() {
    const data = {
      title: document.querySelector('.editable-title').value,
      info: document.querySelector('.editable-info').value,
      price: document.querySelector('.price-editor input').value,
      image: document.querySelector('.preview-image').src
    }
    console.log('保存的数据:', data)
    // 这里添加实际保存逻辑
  })
  
  // 取消按钮
  document.querySelector('.btn-cancel').addEventListener('click', function() {
    // 重置表单逻辑
  })