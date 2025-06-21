 function loadCart() {
      const cartContainer = document.getElementById('cart-container');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<h3>${item.name}</h3><p>Price: ${item.price}</p>`;
        cartContainer.appendChild(div);
      });
    }

    function clearCart() {
      localStorage.removeItem('cart');
      location.reload();
    }

    function orderNow() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        document.getElementById('message').textContent = "Your cart is empty.";
        return;
      }

      // Optional: Save to previousOrders
      const previousOrders = JSON.parse(localStorage.getItem('previousOrders')) || [];
      previousOrders.push({
        order: cart,
        date: new Date().toLocaleString()
      });
      localStorage.setItem('previousOrders', JSON.stringify(previousOrders));

      // Clear the cart
      localStorage.removeItem('cart');

      // Show thank you message and home button
      document.getElementById('cart-container').innerHTML = '';
      document.getElementById('action-buttons').style.display = 'none';
      document.getElementById('message').textContent = "Thank you for ordering!";
      document.getElementById('home-btn').style.display = 'inline-block';
    }

    function goHome() {
      window.location.href = "index.html"; 
    }

    document.addEventListener('DOMContentLoaded', loadCart);