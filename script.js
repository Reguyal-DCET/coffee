// [Keep all previous JavaScript]

// script.js — append this at the bottom, after your existing code
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-container input');

  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') runSearch();
  });
   
   //main function ng search
  function runSearch() {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) return; //s empty, do nothing

    const menu = document.getElementById('menu');
    menu.scrollIntoView({ behavior: 'smooth' });

    const categories = document.querySelectorAll('.category');
    let found = false; //tracker 

    categories.forEach(cat => {
      const header = cat.querySelector('.category-header');
      const items = cat.querySelectorAll('.drink-item');

      let categoryHasMatch = false; //tracks da matching drinks
      
      items.forEach(drink => {
        const name = drink.querySelector('.drink-name')?.textContent.toLowerCase() || '';
        const desc = drink.querySelector('.drink-desc')?.textContent.toLowerCase() || ''; //gets name and some description (with null checks)

        if (name.includes(term) || desc.includes(term)) {
          categoryHasMatch = true; //chinecheck if the s terms appear (name or description ) mark category
          if (!found) {
  drink.scrollIntoView({ behavior: 'smooth', block: 'center' });
  drink.style.transition = 'background 0.02s';
  drink.style.backgroundColor = '#fff0db';
  setTimeout(() => drink.style.backgroundColor = '', 2000);
}
          found = true;
        }
      });

      // Toggle category open/close
      const container = cat.querySelector('.drink-items');
      const icon = header.querySelector('i.fas');
      if (categoryHasMatch) {
        container.classList.add('show');
        header.classList.add('active');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
      } else {
        container.classList.remove('show');
        header.classList.remove('active');
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      }
    });

    if (!found) alert('No matching drinks found.');
  }
});
        
        //for the menu section        
        document.addEventListener('DOMContentLoaded', function() {
            // Toggle drink items when category header is clicked
            const categoryHeaders = document.querySelectorAll('.category-header');
            
            categoryHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const category = this.parentElement;
                    const items = category.querySelector('.drink-items');
                    const icon = this.querySelector('i');
                    
                    // Toggle the current category
                    this.classList.toggle('active');
                    items.classList.toggle('show');
                    
                    // Close other open categories
                    categoryHeaders.forEach(otherHeader => {
                        if (otherHeader !== header) {
                            otherHeader.classList.remove('active');
                            otherHeader.parentElement.querySelector('.drink-items').classList.remove('show');
                        }
                    });
                });
            });
            
            // Open the first category by default
            if (categoryHeaders.length > 0) {
                categoryHeaders[0].click();
            }
            
            
            // Smooth scrolling for menu links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (window.innerWidth <= 992) {
                            navContainer.classList.remove('active');
                            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                });
            });
        });




        // Wishlist Functionality
document.addEventListener('DOMContentLoaded', function () {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');

  wishlistButtons.forEach(button => {
    button.addEventListener('click', function () {
      const item = this.closest('.drink-item');
      const name = item.querySelector('.drink-name').innerText;
      const price = item.querySelector('.drink-price').innerText;
      const image = item.querySelector('.drink-image').src;

      const wishlistItem = {
        name: name,
        price: price,
        image: image
      };

      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      // Avoid duplicate entries
      const alreadyExists = wishlist.some(i => i.name === wishlistItem.name);
      if (!alreadyExists) {
        wishlist.push(wishlistItem);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${name} has been added to your wishlist!`);
      } else {
        alert(`${name} is already in your wishlist.`);
      }
    });
  });
});



        

    
  document.addEventListener('DOMContentLoaded', function () {
    
    // Add to Cart Functionality
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const item = this.closest('.drink-item');
        const name = item.querySelector('.drink-name').innerText;
        const price = item.querySelector('.drink-price').innerText;
        
        const image = item.querySelector('.drink-image').src;

const cartItem = {
  name: name,
  price: price,
  image: image
};

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${name} has been added to your cart!`);
      });
    });
  });

  function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countElement = document.querySelector('.cart-count');
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

updateCartCount(); // Initial call
