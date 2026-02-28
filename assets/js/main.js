/**
* Template Name: DevFolio - v4.10.0
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /* Portfolio works */
  document.addEventListener("DOMContentLoaded", () => {
    const worksData = [
      [
        { date: '2025.11.08', title: 'OPEN SASA 부스 운영: 나를 죽게 만든 건 & MAD HOUSE', fold: false },
        { date: '2023.05.16', title: 'Linux 학습 OverTheWire: Wargame', fold: false },
        { date: '2022.06.30', title: 'FlutterFlow 학습 / 앱 제작', fold: true },
        { date: '2021.05.13', title: 'C언어 강의 재능기부', fold: true }
      ],
      [
        { date: '2025.09.26', title: '정보과학의 날: CODE The Day 부스 운영', fold: false },
        { date: '2022.10.28', title: 'OPEN SASA 부스 운영 및 앱 개발', fold: false },
        { date: '2022.05.12', title: 'C언어 강의 영상 제작', fold: true }
      ],
      [
        { date: '2023.11.11', title: 'OPEN SASA 부스 운영: ESCAPE & 노래방탈출', fold: false },
        { date: '2022.10.07', title: '달빛사사 개발', fold: false },
        { date: '2021.08.28', title: '더 지니어스: SASA 개최', fold: true }
      ]
    ];

    const worksContainer = document.getElementById('works');
    if (!worksContainer) return;
    worksData.forEach(colItems => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-4';

      let colHTML = '';

      colItems.forEach(item => {
        const imgNum = item.date.substring(2).replace(/\./g, '');
        const imgSrc = `assets/img/work-${imgNum}.jpg`;
        const displayDate = `${item.date}.`; 
        const collapseClass = item.fold ? ' collapse' : '';
        const collapseId = item.fold ? ' id="fold"' : '';
        colHTML += `
          <div class="work-box${collapseClass}"${collapseId}>
            <a href="${imgSrc}" data-gallery="portfolioGallery" class="portfolio-lightbox">
              <div class="work-img"><img src="${imgSrc}" alt="" class="img-fluid"></div>
            </a>
            <div class="work-content">
              <div class="row">
                <div class="col-sm-10">
                  <h2 class="w-title">${item.title}</h2>
                  <div class="w-more">${displayDate}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      colDiv.innerHTML = colHTML;
      worksContainer.appendChild(colDiv);
    });
  });
  
  const worksCollapse = document.getElementById('fold');
  const worksBtn = document.querySelector('[data-bs-target="#fold"]');
  if (worksCollapse && worksBtn) {
    worksCollapse.addEventListener('show.bs.collapse', function () {
      worksBtn.innerHTML = '접기 <i class="bi bi-chevron-up ms-1"></i>';
    });
    worksCollapse.addEventListener('hide.bs.collapse', function () {
      worksBtn.innerHTML = '펼치기 <i class="bi bi-chevron-down ms-1"></i>';
    });
  }

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()