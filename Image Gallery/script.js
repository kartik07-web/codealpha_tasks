
const galleryItems = document.querySelectorAll('.gallery .image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterBtns = document.querySelectorAll('.filters button');


let currentIndex = 0;
let currentImages = Array.from(galleryItems).map(div => div.querySelector('img'));

function showLightbox(idx) {
  currentIndex = idx;
  lightboxImg.src = currentImages[currentIndex].src;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}
function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}
Array.from(galleryItems).forEach((item, index) => {
  const img = item.querySelector('img');
  img.addEventListener('click', () => showLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    filterBtns.forEach(b => b.classList.toggle('active', b === btn));

    const filter = btn.dataset.filter;
    currentImages = [];

    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = '';
        currentImages.push(img);
      } else {
        item.style.display = 'none';
      }
    });
    currentIndex = 0;
  });
});
