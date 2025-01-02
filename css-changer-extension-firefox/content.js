let hiddenClasses = [];

// Lấy danh sách CSS classes từ browser.storage khi tải trang
browser.storage.sync.get('hiddenClasses').then(function(data) {
  hiddenClasses = data.hiddenClasses || [];  // Lưu danh sách các CSS class vào biến toàn cục
  hideElements(); // Gọi ngay sau khi tải danh sách class từ storage
});

function hideElements() {
  hiddenClasses.forEach(cssClass => {
    const elements = document.querySelectorAll(cssClass);
    elements.forEach(element => {
      element.style.display = 'none';
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto'; 
    });
  });
}

hideElements(); // Gọi hàm ngay sau khi script được tải

const observer = new MutationObserver(() => {
  hideElements(); // Khi có thay đổi trên trang, ẩn các phần tử tương ứng
});

// Cấu hình observer để theo dõi thay đổi trong toàn bộ document
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,        
});

// Sự kiện để dừng observer khi thoát trang
window.addEventListener('beforeunload', () => {
  observer.disconnect(); // Dừng MutationObserver khi thoát trang
});
