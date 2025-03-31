const openMenu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu")

openMenu.addEventListener('click', () =>{
    document.body.classList.toggle("showMenu");
})

closeMenu.addEventListener("click", () =>openMenu.click());


// let index = 0;
// const slides = document.querySelectorAll('.m-banner');
// const totalSlides = slides.length;
// const dots = document.querySelectorAll('.dot');

// function moveSlide(step) {
//     index += step;

//     if (index < 0) {
//         index = totalSlides - 1; 
//     } else if (index >= totalSlides) {
//         index = 0; 
//     }

//     updateSlider();
// }

// function updateSlider() {
//     const slider = document.querySelector('.slider-banner');
//     const offset = -index * 100;
//     slider.style.transform = `translateX(${offset}%)`;

//     for (let i = 0; i < dots.length; i++) {
//         if (i === index) {
//             dots[i].classList.add('active');
//         } else {
//             dots[i].classList.remove('active');
//         }
//     }
// }

// function currentSlide(n) {
//     index = n;
//     updateSlider();
// }

// setInterval(() => {
//     moveSlide(1); 
// }, 10000);

// updateSlider(); 


const swiper = new Swiper('.swiper', {  // Đảm bảo rằng đây là '.swiper' để khởi tạo chính xác
    // Optional parameters
    direction: 'horizontal',  // Sửa lại direction nếu bạn muốn chuyển đổi theo chiều ngang
    loop: true,

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const items = document.querySelectorAll('.news-events-item')
  const itemsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Hàm hiển thị các phần tử của trang hiện tại
  function displayItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    
    // Ẩn tất cả phần tử trước
    items.forEach(item => item.style.display = 'none');
    
    // Hiển thị phần tử theo trang
    for (let i = startIndex; i < endIndex; i++) {
      if (items[i]) {
        items[i].style.display = 'block';
      }
    }

    // Cập nhật số trang
    document.getElementById('current-page').textContent = String(currentPage).padStart(2, '0');
    document.getElementById('total-pages').textContent = String(totalPages).padStart(2, '0');
  }

  // Chức năng next (chuyển sang trang tiếp theo)
  document.getElementById('next-btn').addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayItems(currentPage);
    }
  });

  // Chức năng prev (chuyển về trang trước)
  document.getElementById('prev-btn').addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
    }
  });

  // Hiển thị trang đầu tiên khi tải trang
  displayItems(currentPage);


  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('not-sticky'); // Khi footer bắt đầu hiện ra => tắt sticky
      } else {
        header.classList.remove('not-sticky'); // Khi footer khuất => bật sticky lại
      }
    });
  }, {
    root: null,
    threshold: 0,
  });


  observer.observe(footer);
