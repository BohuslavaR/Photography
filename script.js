/* ==================================================================
   SCRIPT.JS — Photo Gallery
   ------------------------------------------------------------------
   Obsah:
     JS 1  Mobilné otvorenie/zatvorenie bočného panelu
     JS 2  Filtrovanie galérie 
     JS 3  Lightbox 
   ================================================================== */

/* ============================================================
   JS 1: Mobilné otvorenie/zatvorenie bočného panelu
   ============================================================ */
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
    sidebar.classList.remove('open');
  }
});

/* ============================================================
   JS 2: Filtrovanie galérie 
   ============================================================ */
const categoryButtons = document.querySelectorAll('.category-btn');
const tiles = document.querySelectorAll('.tile');
const galleryCount = document.getElementById('gallery-count');

function applyFilter(filter) {
  let visible = 0;
  tiles.forEach(tile => {
    const cats = tile.dataset.category.split(' ');
    const show = filter === 'all' || cats.includes(filter);
    tile.hidden = !show;
    if (show) visible++;
  });
  galleryCount.textContent = visible + (visible === 1 ? ' photo' : ' photos');
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
    if (window.matchMedia('(max-width: 900px)').matches) {
      sidebar.classList.remove('open');
    }
  });
});

applyFilter('all');

/* ============================================================
   JS 3: Lightbox 
   ============================================================ */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const img = tile.querySelector('img');
    const label = tile.querySelector('.tile-label');
    if (img && img.style.display !== 'none' && img.getAttribute('src')) {
      lightboxContent.innerHTML = `<img src="${img.getAttribute('src')}" alt="${label ? label.textContent : ''}">`;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
}
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
