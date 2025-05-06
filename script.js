const openMenu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu")

openMenu.addEventListener('click', () =>{
    document.body.classList.toggle("showMenu");
})

closeMenu.addEventListener("click", () =>openMenu.click());

function toggleSuccessSection(doneOrderId, closeSuccessId, successSectionSelector) {
  const doneOrder = document.getElementById(doneOrderId);
  const closeSuccess = document.getElementById(closeSuccessId);
  const successfullContent = document.querySelector(successSectionSelector);

  // Kiểm tra nếu phần tử tồn tại mới thêm sự kiện
  if (successfullContent && doneOrder && closeSuccess) {
      doneOrder.addEventListener('click', function() {
          successfullContent.style.display = successfullContent.style.display === "block" ? "none" : "block";
          document.body.classList.toggle("showSuccess");
      });

      closeSuccess.addEventListener('click', () => doneOrder.click());
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Gọi hàm với tham số thích hợp
  toggleSuccessSection('done-order', 'close-successfull', '.success-section');
});

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


// Hàm phân trang
function setupPagination(itemSelectorClass, currentPageId, totalPagesId, prevBtnId, nextBtnId, num){
  const items = document.querySelectorAll(itemSelectorClass);
  if (items.length === 0) return; // Nếu không có phần tử này, không chạy mã phân trang

  const itemsPerPage = num;
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
    document.getElementById(currentPageId).textContent = String(currentPage).padStart(2, '0');
    document.getElementById(totalPagesId).textContent = String(totalPages).padStart(2, '0');
  }

  // Chức năng next (chuyển sang trang tiếp theo)
  document.getElementById(nextBtnId).addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayItems(currentPage);
    }
  });

  // Chức năng prev (chuyển về trang trước)
  document.getElementById(prevBtnId).addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
    }
  });

  // Hiển thị trang đầu tiên khi tải trang
  displayItems(currentPage);
}

document.addEventListener('DOMContentLoaded', function () {
  // ham phan trang cho news event item
  setupPagination('.news-events-item', 'current-page', 'total-pages', 'prev-btn', 'next-btn', 6);
  // ham phan trang cho customer item
  setupPagination('.customer-item', 'cuscurrent-page', 'custotal-pages', 'cusprev-btn', 'cusnext-btn', 3);
  // ham phan trang cho product item
  setupPagination('.pro-item', 'pro-current-page', 'pro-total-pages', 'pro-prev-btn', 'pro-next-btn', 9);
  // ham phan trang cho news know skin item
  setupPagination('.news-k-s-item', 'news-k-s-current-page', 'news-k-s-total-pages', 'news-k-s-prev-btn', 'news-k-s-next-btn', 10);
});
  
function footetNotHeader() {
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");

  if (!header || !footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('not-sticky'); // Khi footer hiện => tắt sticky
      } else {
        header.classList.remove('not-sticky'); // Khi footer ẩn => bật sticky
      }
    });
  }, {
    root: null,
    threshold: 0,
  });

  observer.observe(footer);

  const dropBtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropBtn && dropdownContent) {
    dropBtn.addEventListener("click", function () {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", function(){
  footetNotHeader();
});

function postPagination(itemSelector, idPrevBtn, idNextBtn){
  const items = document.querySelectorAll(itemSelector);
  if(items.length === 0 ) return;

  let itemsPerPage = getItemsPerPage();
  let currentPage = 1;
  let totalPages = Math.ceil(items.length / itemsPerPage);

  function getItemsPerPage(){
    const width = window.innerWidth;
    if (width < 650) return 2;
    else return 3;
  }

  function displayItems(page){
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    items.forEach(item => item.style.display = 'none');

    for (let i = startIndex; i < endIndex; i++) {
      if(items[i]){
        items[i].style.display = 'block';
      }
    }
  }

  const nextBtn = document.getElementById(idNextBtn);
  const prevBtn = document.getElementById(idPrevBtn);

  nextBtn.addEventListener('click', function(){
    if (currentPage < totalPages) {
      currentPage++;
      displayItems(currentPage);
    }
  });

  prevBtn.addEventListener('click', function(){
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
    }
  });

  // cap nhat man hinh
  window.addEventListener('resize', function() {
    itemsPerPage = getItemsPerPage();
    totalPages = Math.ceil(items.length / itemsPerPage);
    currentPage = 1;
    displayItems(currentPage);
  })

  displayItems(currentPage);
}

document.addEventListener('DOMContentLoaded', function() {
  postPagination('.news-related-item', 'post-related-prev', 'post-related-next');
  postPagination('.news-suggested-item', 'post-suggested-prev', 'post-suggested-next');
  postPagination('.pro-best-seller', 'best-seller-prev', 'best-seller-next');
})


function Check(elementCheckId){
  const Oncheck = document.getElementById(elementCheckId)

  if (Oncheck){
    Oncheck.addEventListener('click', () =>{
      Oncheck.classList.toggle('checked');
  })
  }
}

document.addEventListener('DOMContentLoaded',function (){
  Check('check-box-id-1');
  Check('check-box-id-2');
  Check('check-box-id-3');

  Check('delete-id-1');
  Check('delete-id-2');
  Check('delete-id-3');
  
})

function HideAndShow(){
  const list = document.querySelectorAll(".item");

  list.forEach( item => {
    const btnShow = item.querySelector(".plus");
    const btnHide = item.querySelector(".minus");
    const content = item.querySelector(".ways");
    const title = item.querySelector(".title");
    const questionIcon = item.querySelector(".question-icon");
    const text = item.querySelector(".text");

    if (!btnShow || !btnHide || !content) return;

  btnShow.addEventListener('click', () => {
    content.style.display = "block";
    setTimeout(() => {
        content.classList.add("show");
    }, 5);
      btnShow.style.display = "none";
      btnHide.style.display = "block";
      title.classList.add("active");
      questionIcon.classList.add("active");
      text.classList.add("active");
  })

  btnHide.addEventListener('click', () => {
      content.classList.remove("show");
      btnShow.style.display = "block";
      btnHide.style.display = "none";
      title.classList.remove("active");
      questionIcon.classList.remove("active");
      text.classList.remove("active");
      setTimeout(() => {
        content.style.display = "none";
    }, 200);
  })
  })
}


document.addEventListener('DOMContentLoaded', HideAndShow)

function onlyAllowPhoneNumberInput(inputElement) {
  if (!inputElement) return;

  inputElement.setAttribute("maxlength", "11");

  inputElement.setAttribute("inputmode", "numeric");
  inputElement.setAttribute("pattern", "[0-9]{10,11}");
  inputElement.setAttribute("type", "tel");

  inputElement.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  onlyAllowPhoneNumberInput(document.getElementById("phone"));
  onlyAllowPhoneNumberInput(document.getElementById("phone-ref"));
  onlyAllowPhoneNumberInput(document.getElementById("phone-fi"));
  onlyAllowPhoneNumberInput(document.getElementById("phone-pay"));
  onlyAllowPhoneNumberInput(document.getElementById("phone-add"));
  onlyAllowPhoneNumberInput(document.getElementById("phone-acc"));
});