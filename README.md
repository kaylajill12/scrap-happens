# Scrap Happens  
### A Scrapbook for the Digital Age  

**Stick. Snap. Share.**

Welcome to *Scrap Happens*, a virtual scrapbook web app where creativity and memories collide. Upload pictures, write captions and stories, decorate them with stickers, and save your scrapbook pages to relive your memories again and again. In memory of Jay, whose Love of making every moment unforgettable inspired this project.

## 📌 Core Features
- Uses the Tenor API to search for stickers
- Uses a regular expression to validate search input
- Uses a Node.js server and Express to serve sticker search results
- Implements drag and drop interactivity with stickers
- Uses local storage to save pages and make them accessible after reload


## 🚀 Usage
To run this project locally:

1. Clone this repo:
   ```bash
   git clone https://github.com/kaylajill12/scrap-happens.git
   cd scrap-happens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Tenor API key:
   ```
   TENOR_API_KEY=your_tenor_api_key_here
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Open `studio.html` in your browser, and let the scrapbooking begin!

## 🎨 Icon Credits

Except for the GitHub icon, which was designed with ChatGPT, all other toolbar and navigation icons were made by [Stickers](https://www.flaticon.com/authors/stickers) from [flaticon.com](https://www.flaticon.com).