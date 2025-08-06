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
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const scaleFactor = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
       document.getElementById('photo-preview').src = compressedDataUrl;
        window.scrapbookCompressedImage = compressedDataUrl;
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Toggle the sticker search box
const addStickersBtn = document.getElementById('add-stickers-btn');
const stickerSearchBox = document.getElementById('sticker-search-box');
const stickerArea = document.getElementById('sticker-area');

addStickersBtn.addEventListener('click', () => {
  stickerSearchBox.classList.toggle('hidden');
  stickerArea.classList.toggle('open');
});

// Validate sticker search input
function validateStickerSearch(input) {
  const validSearchRegex = /^[a-zA-Z0-9 ]+$/;
  const searchFeedback = document.getElementById('search-feedback');

  if (!input.trim()) {
    searchFeedback.textContent = 'Please enter a search term.';
    return false;
  }

  if (!validSearchRegex.test(input)) {
    searchFeedback.textContent = 'Please enter a valid search term with only letters, numbers, and spaces.';
    return false;
  }

  searchFeedback.textContent = '';
  return true;
}

// Search for stickers using the Tenor API
async function searchForStickers(searchTerm) {
  const url = `/api/search?q=${encodeURIComponent(searchTerm)}&limit=12&searchfilter=sticker&media_filter=nanogif_transparent`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching stickers: ${response.status}`);
    }

    const data = await response.json();
    
    data.results.forEach(result => {
      const img = document.createElement('img');
      img.src = result.media_formats.nanogif_transparent.url;
      img.alt = result.content_description || 'Sticker';
      img.classList.add('sticker');
      img.setAttribute('draggable', true);
      img.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', img.src);
      });
      stickerArea.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching stickers:', error);
  }
}

document.getElementById('search-stickers-btn').addEventListener('click', () => {  
  stickerArea.innerHTML = '';
  const input = document.getElementById('search-stickers').value;
  if (validateStickerSearch(input)) {
    searchForStickers(input);
  }
});

// Drag and drop functionality for stickers
const photoArea = document.querySelector('.photo-area');

photoArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

photoArea.addEventListener('drop', (e) => {
  e.preventDefault();

  const src = e.dataTransfer.getData('text/plain');
  const droppedSticker = document.createElement('img');
  droppedSticker.src = src;
  droppedSticker.alt = 'Sticker';
  droppedSticker.classList.add('sticker');

  const rect = photoArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  droppedSticker.style.position = 'absolute';
  droppedSticker.style.left = `${x}px`;
  droppedSticker.style.top = `${y}px`;

  droppedSticker.setAttribute('draggable', true);
  droppedSticker.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', droppedSticker.src);
  });

  photoArea.appendChild(droppedSticker);
});

// Save the scrapbook page
function getScrapbookData() {
  const photo = window.scrapbookCompressedImage || '';
  const caption = document.getElementById('caption-input').value;
  const stickers = Array.from(document.querySelectorAll('.photo-area .sticker')).map(sticker => ({
    src: sticker.src,
    left: sticker.style.left,
    top: sticker.style.top
  }));
  return { photo, caption, stickers };
}

document.getElementById('save-page-btn').addEventListener('click', () => {
  const scrapbookData = getScrapbookData();
  let pages = JSON.parse(localStorage.getItem('scrapHappensPages')) || [];
  pages.push(scrapbookData);
  localStorage.setItem('scrapHappensPages', JSON.stringify(pages));
  localStorage.setItem('currentPageIndex', pages.length - 1);
  alert('Page saved! 📝✨');
});

// Reload saved scrapbook page on refresh
function loadScrapbookData() {
  const pages = JSON.parse(localStorage.getItem('scrapHappensPages'));
  const index = parseInt(localStorage.getItem('currentPageIndex')) || 0;

  if (!pages || pages.length === 0) return;

  const { photo, caption, stickers } = pages[index];

  const photoArea = document.querySelector('.photo-area');
  photoArea.querySelectorAll('.sticker').forEach(el => el.remove());
  document.getElementById('caption-input').value = '';
  document.getElementById('photo-preview').src = '';

  if (photo) {
    document.getElementById('photo-preview').src = photo;
    window.scrapbookCompressedImage = photo;
  }

  if (caption) {
    document.getElementById('caption-input').value = caption;
  }

  stickers.forEach(stickerData => {
    const sticker = document.createElement('img');
    sticker.src = stickerData.src;
    sticker.alt = 'Sticker';
    sticker.classList.add('sticker');
    sticker.style.position = 'absolute';
    sticker.style.left = stickerData.left;
    sticker.style.top = stickerData.top;

    sticker.setAttribute('draggable', true);
    sticker.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', sticker.src);
    });

    photoArea.appendChild(sticker);
  });
}

window.addEventListener('DOMContentLoaded', loadScrapbookData);