/**
 * Template Name: Mentor
 * Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
import AOS from "aos";
import GLightbox from "glightbox";

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader ||
      (!selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top"))
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  function initMobileNav() {
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    if (mobileNavToggleBtn) {
      function mobileNavToogle() {
        document.querySelector("body").classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
      }
      mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    } else {
      console.error("Mobile nav toggle button not found");
    }
  }

  // Initialize mobile nav functionality after DOM is fully loaded
  window.addEventListener("load", initMobileNav);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  function initDropdowns() {
    document
      .querySelectorAll(".navmenu .toggle-dropdown")
      .forEach((navmenu) => {
        navmenu.addEventListener("click", function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle("active");
          this.parentNode.nextElementSibling.classList.toggle(
            "dropdown-active"
          );
          e.stopImmediatePropagation();
        });
      });
  }

  // Initialize dropdown functionality
  window.addEventListener("load", initDropdowns);

  function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, obs) => {
      if (document.querySelector(selector)) {
        callback();
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  waitForElement("#scroll-top", initScrollTop);
  waitForElement(".mobile-nav-toggle", initMobileNav);

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  function initScrollTop() {
    const scrollTop = document.querySelector("#scroll-top");

    if (scrollTop) {
      function toggleScrollTop() {
        if (window.scrollY > 100) {
          console.log("add");
          scrollTop.classList.add("active");
        } else {
          console.log("remove");
          scrollTop.classList.remove("active");
        }
      }

      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      window.addEventListener("load", toggleScrollTop);
      document.addEventListener("scroll", toggleScrollTop);
    } else {
      console.error("Scroll top button not found");
    }
  }

  // Initialize scroll top functionality after DOM is fully loaded
  window.addEventListener("load", initScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });
})();
