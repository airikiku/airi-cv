const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'メニューを開く');
  menuToggle.querySelector('span').textContent = '＋';
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  menuToggle.querySelector('span').textContent = open ? '−' : '＋';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 851px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const galleryDialog = document.querySelector('.gallery-dialog');
const galleries = [...document.querySelectorAll('[data-gallery]')];

if (galleries.length && galleryDialog) {
  const dialogImage = galleryDialog.querySelector('.gallery-dialog-image');
  const dialogCaption = galleryDialog.querySelector('.gallery-dialog-caption');
  const dialogTitle = galleryDialog.querySelector('#gallery-dialog-title');
  const closeDialog = galleryDialog.querySelector('.gallery-dialog-close');
  const dialogPrevious = galleryDialog.querySelector('.gallery-dialog-prev');
  const dialogNext = galleryDialog.querySelector('.gallery-dialog-next');
  const dialogCount = galleryDialog.querySelector('.gallery-dialog-count');
  let activeGallery;

  const galleryControllers = galleries.map(gallery => {
    const track = gallery.querySelector('.hub-gallery-track');
    const shots = [...gallery.querySelectorAll('.hub-shot')];
    const thumbnails = [...gallery.parentElement.querySelectorAll('.hub-thumbnail')];
    const previousButton = gallery.querySelector('.gallery-prev');
    const nextButton = gallery.querySelector('.gallery-next');
    let currentIndex = 0;

    function selectShot(index, { openDialog = false } = {}) {
      currentIndex = (index + shots.length) % shots.length;
      const shot = shots[currentIndex];
      track.scrollTo({ left: shot.offsetLeft, behavior: 'smooth' });
      thumbnails.forEach((thumbnail, thumbnailIndex) => {
        const active = thumbnailIndex === currentIndex;
        thumbnail.classList.toggle('is-active', active);
        thumbnail.setAttribute('aria-current', String(active));
      });
      if (!openDialog) return;
      activeGallery = controller;
      dialogTitle.textContent = `${gallery.dataset.galleryTitle} / SCREEN PREVIEW`;
      dialogImage.src = shot.dataset.galleryImage;
      dialogImage.alt = shot.dataset.galleryAlt;
      dialogCaption.textContent = shot.dataset.galleryAlt;
      dialogCount.textContent = `${currentIndex + 1} / ${shots.length}`;
      if (!galleryDialog.open) galleryDialog.showModal();
    }

    const controller = { previous: () => selectShot(currentIndex - 1, { openDialog: true }), next: () => selectShot(currentIndex + 1, { openDialog: true }) };
    shots.forEach((shot, index) => shot.addEventListener('click', () => selectShot(index, { openDialog: true })));
    thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => selectShot(index)));
    previousButton.addEventListener('click', () => selectShot(currentIndex - 1));
    nextButton.addEventListener('click', () => selectShot(currentIndex + 1));
    return controller;
  });

  dialogPrevious.addEventListener('click', () => activeGallery?.previous());
  dialogNext.addEventListener('click', () => activeGallery?.next());
  closeDialog.addEventListener('click', () => galleryDialog.close());
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); activeGallery?.previous(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); activeGallery?.next(); }
  });
}
