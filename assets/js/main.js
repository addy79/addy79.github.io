/**
 * Main application scripts for addy79.github.io
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Scroll progress bar
  const progressBar = document.getElementById("progress");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      progressBar.value = progress;
    });
  }

  // 2. Project Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-grid-item");

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        projectCards.forEach(card => {
          if (filter === "all" || card.classList.contains(filter)) {
            card.style.display = "block";
            card.style.opacity = "1";
          } else {
            card.style.display = "none";
            card.style.opacity = "0";
          }
        });
      });
    });
  }

  // 3. Navbar Mobile Toggle
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector("#navbarNav");
  if (toggler && collapse) {
    toggler.addEventListener("click", function () {
      collapse.classList.toggle("show");
    });
  }
});

// Toast notification function
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-check-circle mr-2 text-success"></i> ${message}`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2800);
}

// Copy BibTeX to clipboard
function copyBibtex(id) {
  const elem = document.getElementById(id);
  if (!elem) return;
  const text = elem.innerText || elem.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("BibTeX citation copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
}

// Toggle Abstract accordion
function toggleAbstract(id) {
  const elem = document.getElementById(id);
  if (!elem) return;
  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
}
