// photoswipe-init.js
import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--getting-started', // Sélecteur de la galerie
  children: 'a',          // Les enfants à prendre en compte dans la galerie
  pswpModule: () => import('https://unpkg.com/photoswipe')
});

lightbox.init();
// console.log(lightbox);