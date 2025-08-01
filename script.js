// Toggle the mobile toolbar menu
const toggleBtn = document.getElementById('menu-toggle');
const toolbar = document.getElementById('toolbar');

toggleBtn.addEventListener('click', () => {
  toolbar.classList.toggle('open');
});

// Upload photos from device
document.getElementById('upload-photos').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('photo-preview').src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});