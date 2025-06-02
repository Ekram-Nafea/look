const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const allflex = document.querySelector('.allflex');
const header = document.querySelector('header');

var animation = lottie.loadAnimation({
  container: document.getElementById('SmediaAnimations'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'json/imgAnim1.json' 
});
var animation = lottie.loadAnimation({
container: document.getElementById('sidebarAnimation'),
renderer: 'svg',
loop: true,
autoplay: true,
path: 'json/Animation3.json' 
});




searchBtn.addEventListener('click' , (e)=>{
  e.stopPropagation();
  searchContainer.style.display = "flex";
  searchBtn.style.display = "none";
allflex.style.paddingTop = '50px';
header.style.paddingBottom = '50px';


})


const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});




//**************************************** */

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter').toLowerCase();

    // Remove highlight from all buttons
    filterButtons.forEach(btn => btn.classList.remove('highlight'));

    // Add highlight to clicked button
    button.classList.add('highlight');

    // Clear search input if user manually chose filter
    searchInput.value = '';
    closeIco.style.display = 'none';
    noResultsMessage.style.display = 'none';

    // Reset padding (if needed)
    allflex.style.paddingTop = '50px';
    header.style.paddingBottom = '50px';

    // Scroll to top
    scroll({ top: 0, left: 0, behavior: 'smooth' });

    // Show/hide gallery items
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category').toLowerCase();
      if (filter === 'all' || category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});



// *****************************scroll btn
const scrollBtn = document.querySelector('#scrollBtn')
window.onscroll =function(){
    if(scrollY >= 100){
        scrollBtn.style.display = 'block';

    }
    else{
        scrollBtn.style.display = 'none';

    }
}
scrollBtn.onclick=function(){
   scroll({
    left:0,
    top:0,
    behavior:"smooth"

   })
}


/************************************************** */

const menu = document.querySelector('#menu');
const closeMenu = document.querySelector('#times');

const sidebar = document.querySelector('.sidebar');
sidebar.style.display= 'none';


menu.addEventListener('click',()=>{
    sidebar.style.display= 'flex';
})
closeMenu.addEventListener('click',()=>{
    sidebar.style.display= 'none';
})

// **********************



  // Wait for the DOM to fully load
  document.addEventListener('DOMContentLoaded', function() {
    // Select all zoom icons
    document.querySelectorAll('.zoom-icon').forEach(function(icon) {
      // Add event listener for each zoom icon
      icon.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default action (e.g., following the link)
        
        // Get the image source from the clicked zoom icon
        const imageSrc = this.closest('.gallery-item').querySelector('img').src;

        // Create the popup element dynamically
        const popup = document.createElement('div');
        popup.classList.add('popup');
        
        // Add the image to the popup
        const img = document.createElement('img');
        img.src = imageSrc;
        popup.appendChild(img);
        
        // Append the popup to the body
        document.body.appendChild(popup);
        
        // Show the popup
        popup.style.display = 'flex';
        
        // Close the popup when clicking on the transparent background (outside the image)
        popup.addEventListener('click', function(e) {
          if (e.target === popup) { // Check if the click is on the background (not the image)
            popup.style.display = 'none'; // Hide the popup
            document.body.removeChild(popup); // Remove the popup from the DOM
          }
        });
      });
    });

    
  // ********************/* loader ******************* */
  window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

// ************************



document.querySelectorAll('.link-icon').forEach(function (shareIcon) {
  shareIcon.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove any existing share menu
    document.querySelectorAll('.share-menu').forEach(menu => menu.remove());

    // Get image URL
    const imageSrc = this.closest('.gallery-item').querySelector('img').src;

    // Define platforms
    const platforms = [
      { name: 'WhatsApp', id: 'whatsapp' },
      { name: 'Facebook', id: 'facebook' },
      { name: 'Twitter', id: 'twitter' },
      { name: 'Telegram', id: 'telegram' },
      { name: 'Email', id: 'email' },
      { name: 'Copy Link', id: 'copy' }
    ];

    // Create share menu
    const menu = document.createElement('div');
    menu.className = 'share-menu';
    menu.style.position = 'absolute';
    menu.style.background = '#fff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '6px 10px';
    menu.style.zIndex = '1000';
    menu.style.borderRadius = '6px';
    menu.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

    platforms.forEach(p => {
      const btn = document.createElement('button');
      btn.textContent = p.name;
      btn.style.display = 'block';
      btn.style.margin = '4px 0';
      btn.style.background = 'none';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.color = '#007bff';
      btn.style.textAlign = 'left';

      btn.addEventListener('click', () => {
        menu.remove(); // Remove the menu on click
        shareToPlatform(p.id, imageSrc);
      });

      menu.appendChild(btn);
    });

    // Position near icon
    const rect = this.getBoundingClientRect();
    menu.style.top = `${window.scrollY + rect.bottom}px`;
    menu.style.left = `${window.scrollX + rect.left}px`;
    document.body.appendChild(menu);
  });
});

// Share handler
function shareToPlatform(platform, imageSrc) {
  const title = 'Check out this image!';
  let url = '';

  // Web Share API if possible
  if (navigator.share && (platform === 'whatsapp' || platform === 'copy')) {
    navigator.share({
      title: title,
      url: imageSrc
    }).catch(err => console.error('Web Share error:', err));
    return;
  }

  switch (platform) {
    case 'whatsapp':
      url = `https://wa.me/?text=${encodeURIComponent(title + ' ' + imageSrc)}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageSrc)}`;
      break;
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(imageSrc)}`;
      break;
    case 'telegram':
      url = `https://t.me/share/url?url=${encodeURIComponent(imageSrc)}&text=${encodeURIComponent(title)}`;
      break;
    case 'email':
      url = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(imageSrc)}`;
      break;
    case 'copy':
      navigator.clipboard.writeText(imageSrc).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy link.');
      });
      return;
    default:
      return;
  }

  if (url) {
    window.open(url, '_blank');
  }
}





  });

    // ******************************** Share ******************************
  const searchInput = document.getElementById('gallery-search');
  const closeIco = document.getElementById('closeIco');
  const gallerycontainer2 = document.querySelector('.gallerycontainer2');

  const noResultsMessage = document.querySelector('.no-results-message');
  


// const galleryItems = document.querySelectorAll('.gallery-item');


const categoryKeywords = {
  flora: ['flower','plant', 'blossom', 'leaf', 'bloom'],
  nature: ['landscape', 'mountain', 'hill', 'trail'],
  sea: ['ocean', 'coast', 'water'],
  space: ['galaxy', 'stars', 'universe', 'milky way'],
  sky: ['clear', 'blue sky','sky', 'skyline'],
  cities: ['buildings', 'urban', 'metro', 'town', 'architecture'],
  mosque: ['masjid', 'minaret', 'islamic', 'prayer', 'dome'],
  art: ['painting','paint' ,'colors']
};

closeIco.addEventListener('click' ,()=>{
  noResultsMessage.style.display = 'none';
  searchBtn.style.display = 'flex';
 

  const items = gallerycontainer2.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.style.display = 'flex';
  });
  if (searchInput.value !== '') {
    searchInput.value = '';
  } else if(searchInput.value === ''){
  searchContainer.style.display = 'none';
  allflex.style.paddingTop = '0';
  header.style.paddingBottom = '0';
  }
 
})



// Hide search container when clicking outside of it
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) {
    searchContainer.style.display = 'none';
    searchBtn.style.display = "block";
    allflex.style.paddingTop = '0';
    header.style.paddingBottom = '0';
    searchInput.value = '';
   
  }
});

///////************************************ */


searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  let matchFound = false;

  scroll({
        left:0,
        top:0,
        behavior:"smooth"
    
        })

  // Show/hide close icon
  closeIco.style.display = query ? 'block' : 'none';

  // Remove highlight from all buttons
  filterButtons.forEach(button => button.classList.remove('highlight'));

  if (query === '') {
    // Show all items
    galleryItems.forEach(item => item.style.display = '');

    // Re-highlight the "All" button
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) allButton.classList.add('highlight');

    noResultsMessage.style.display = 'none';
    return;
  }

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => kw.toLowerCase() === query)) {
      const btn = document.querySelector(`.filter-btn[data-filter="${category}"], .filter-btn[data-filter="${category.charAt(0).toUpperCase() + category.slice(1)}"]`);
      if (btn) btn.classList.add('highlight');
    }
  }

  galleryItems.forEach(item => {
    const category = item.dataset.category?.toLowerCase() || '';
    const img = item.querySelector('img');

    let title = img?.alt?.toLowerCase() || '';
    if (!title && img?.src) {
      const filename = img.src.split('/').pop().split('.')[0];
      title = filename.replace(/[-_]/g, ' ').toLowerCase();
    }

    const keywords = categoryKeywords[category] || [];
    const isCategoryMatch = category === query || keywords.includes(query);
    const isTitleMatch = title.includes(query);
    const shouldDisplay = isCategoryMatch || isTitleMatch;

    if (shouldDisplay) {
      item.style.display = '';
      matchFound = true;

      const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"], .filter-btn[data-filter="${category.charAt(0).toUpperCase() + category.slice(1)}"]`);
      if (filterBtn) filterBtn.classList.add('highlight');
    } else {
      item.style.display = 'none';
    }
  });

  noResultsMessage.style.display = matchFound ? 'none' : 'block';
});








