
const newClassInput = document.getElementById('new-class');
const addClassButton = document.getElementById('add-class');
const classListElement = document.getElementById('class-list');
const messageElement = document.getElementById('message');

// Load hidden classes from storage and display
function loadClasses() {
  chrome.storage.sync.get('hiddenClasses', function(data) {
    const hiddenClasses = data.hiddenClasses || [];
    displayClasses(hiddenClasses);
  });
}

// Display the list of classes
function displayClasses(hiddenClasses) {
  classListElement.innerHTML = ''; // Clear existing list
  hiddenClasses.forEach(cssClass => {
    const li = document.createElement('li');
    li.className = 'class-item row';

    // Tạo div để chứa span và button
    const containerDiv = document.createElement('div');
    containerDiv.className = 'd-flex justify-content-between align-items-center mb-1 border'; // Bootstrap class

    const span = document.createElement('span');
    span.textContent = cssClass;

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="bi bi-trash"></i>';
    removeButton.className = 'btn btn-sm p-0';
    removeButton.style.width = '24px'; 

    removeButton.onclick = function() {
      removeClass(cssClass);
    };

    containerDiv.appendChild(span);
    containerDiv.appendChild(removeButton);

    li.appendChild(containerDiv);

    classListElement.appendChild(li);
  });
}

// Add a new CSS class to storage
function addClass() {
  const newClass = "." + newClassInput.value.trim();
  if (!newClass) {
    // showMessage('Please enter a valid class name.', 'red');
    return;
  }

  chrome.storage.sync.get('hiddenClasses', function(data) {
    const hiddenClasses = data.hiddenClasses || [];
    if (hiddenClasses.includes(newClass)) {
      // showMessage('Class already exists.', 'red');
      return;
    }

    hiddenClasses.push(newClass);
    chrome.storage.sync.set({ hiddenClasses }, function() {
      newClassInput.value = '';
      loadClasses();
      // showMessage('Class added successfully.', 'green');
    });
  });
}

// Remove a CSS class from storage
function removeClass(cssClass) {
  chrome.storage.sync.get('hiddenClasses', function(data) {
    const hiddenClasses = data.hiddenClasses || [];
    const updatedClasses = hiddenClasses.filter(item => item !== cssClass);

    chrome.storage.sync.set({ hiddenClasses: updatedClasses }, function() {
      loadClasses();
      // showMessage('Class removed successfully.', 'green');
    });
  });
}

// Show a temporary message
// function showMessage(text, color) {
//   messageElement.textContent = text;
//   messageElement.style.color = color;
//   messageElement.style.display = 'block';
//   setTimeout(() => {
//     messageElement.style.display = 'none';
//   }, 2000);
// }

// Event listeners
addClassButton.addEventListener('click', addClass);
document.addEventListener('DOMContentLoaded', loadClasses);
