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