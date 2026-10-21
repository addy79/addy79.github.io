/**
 * Main application scripts for addy79.github.io
 * Handles scroll progress, category filtering, interactive project pinning, BibTeX copying, and abstract toggling.
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

  // 2. Interactive Project Pinning & Filtering
  initProjectPinning();

  // 3. Navbar Mobile Toggle
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector("#navbarNav");
  if (toggler && collapse) {
    toggler.addEventListener("click", function () {
      collapse.classList.toggle("show");
    });
  }
});

function getPinnedProjects() {
  const saved = localStorage.getItem("pinned_projects");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  // Default pinned projects
  return ["digitwin1", "freecad-suite", "vrmechanics", "brushlesslab"];
}

function savePinnedProjects(list) {
  localStorage.setItem("pinned_projects", JSON.stringify(list));
}

function togglePin(projectId) {
  let pinned = getPinnedProjects();
  if (pinned.includes(projectId)) {
    pinned = pinned.filter(id => id !== projectId);
    showToast(`Unpinned project.`);
  } else {
    pinned.push(projectId);
    showToast(`Pinned project to Featured!`);
  }
  savePinnedProjects(pinned);
  updatePinUI();

  // If currently on pinned filter, refresh filter
  const activeBtn = document.querySelector(".filter-btn.active");
  if (activeBtn && activeBtn.getAttribute("data-filter") === "filter-pinned") {
    applyFilter("filter-pinned");
  }
}

function updatePinUI() {
  const pinned = getPinnedProjects();
  document.querySelectorAll(".project-grid-item").forEach(card => {
    const id = card.id;
    const pinBtn = card.querySelector(".btn-pin");
    if (pinBtn) {
      if (pinned.includes(id)) {
        pinBtn.innerHTML = '<i class="fa-solid fa-star text-warning"></i> Pinned';
        pinBtn.classList.add("pinned");
        card.classList.add("filter-pinned");
      } else {
        pinBtn.innerHTML = '<i class="fa-regular fa-star"></i> Pin';
        pinBtn.classList.remove("pinned");
        card.classList.remove("filter-pinned");
      }
    }
  });
}

function applyFilter(filter) {
  const projectCards = document.querySelectorAll(".project-grid-item");
  const pinned = getPinnedProjects();

  projectCards.forEach(card => {
    if (filter === "all") {
      card.style.display = "block";
      card.style.opacity = "1";
    } else if (filter === "filter-pinned") {
      if (pinned.includes(card.id)) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    } else if (card.classList.contains(filter)) {
      card.style.display = "block";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
}

function initProjectPinning() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  updatePinUI();

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.getAttribute("data-filter");
        applyFilter(filter);
      });
    });
  }
}

// Toast notification function
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2 text-info"></i> ${message}`;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
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
