let hiddenClasses = [];
// Lấy danh sách CSS classes từ chrome.storage khi tải trang
chrome.storage.sync.get('hiddenClasses', function(data) {
  hiddenClasses = data.hiddenClasses || [];  // Lưu danh sách các CSS class vào biến toàn cục
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
  
hideElements();

const observer = new MutationObserver(() => {
  hideElements();
});


// Tạo một MutationObserver để theo dõi các thay đổi trong DOM
// const observer = new MutationObserver(() => {
 
//   const elements = document.querySelectorAll('.fixed-bottom-bar, .fixedBottombar, .el-dialog__wrapper, .v-modal, .el-dialog__body, .el-dialog__header, .el-dialog, .el-dialog--center, .popup-remind-login');
//   elements.forEach(element => {
//     element.style.display = 'none';
//     document.body.style.overflow = 'auto';  
//     document.documentElement.style.overflow = 'auto';  
//   });  
  
// });

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


