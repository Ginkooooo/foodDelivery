document.querySelectorAll('.heart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');

      const isActive = this.classList.contains('active');
    });
  });