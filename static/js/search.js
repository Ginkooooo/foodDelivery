document.querySelectorAll('.heart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      
      // 这里可以添加收藏状态保存逻辑
      const isActive = this.classList.contains('active');
    });
  });