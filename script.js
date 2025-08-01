// Toggle the mobile toolbar menu
const toggleBtn = document.getElementById('menu-toggle');
const toolbar = document.getElementById('toolbar');

toggleBtn.addEventListener('click', () => {
  toolbar.classList.toggle('open');
});