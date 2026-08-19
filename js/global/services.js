// js/global/services.js

function initServices() {
  const accordion = document.getElementById("servicesAccordion");
  const previewIcon = document.getElementById("previewIcon");
  const previewTitle = document.getElementById("previewTitle");

  if (!accordion || !previewIcon || !previewTitle) return;

  const servicesData = [
    {
      title: "UI/UX Design",
      iconSrc: "../assets/icons/penicon.svg"
    },
    {
      title: "Service Design",
      iconSrc: "../assets/icons/handgear.svg"
    },
    {
      title: "Market Research",
      iconSrc: "../assets/icons/marketresearch.svg"
    },
    {
      title: "MVP Design",
      iconSrc: "../assets/icons/mvpicon.svg"
    },
    {
      title: "Branding",
      iconSrc: "../assets/icons/branding.svg"
    },
    {
      title: "No-Code Development",
      iconSrc: "../assets/icons/nocodeicon.svg"
    },
    {
      title: "Mobile & Web Development",
      iconSrc: "../assets/icons/mobwebdevicon.svg"
    }
  ];

  const items = accordion.querySelectorAll(".accordion-item");

  function updatePreview(index) {
    const data = servicesData[index];
    if (!data) return;

    previewIcon.style.transform = "scale(0.85)";
    previewTitle.style.opacity = "0";

    setTimeout(() => {
      previewIcon.innerHTML = `<img src="${data.iconSrc}" alt="${data.title}" />`;
      previewTitle.textContent = data.title;
      previewIcon.style.transform = "scale(1)";
      previewTitle.style.opacity = "1";
    }, 150);
  }

  items.forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    // Use data-service attribute if available, otherwise default to index
    const serviceIndex = item.hasAttribute("data-service")
      ? parseInt(item.getAttribute("data-service"), 10)
      : index;

    header.onclick = () => {
      const isAlreadyActive = item.classList.contains("active");

      // Close all accordion items
      items.forEach((el) => el.classList.remove("active"));

      // Open clicked item and update preview
      if (!isAlreadyActive) {
        item.classList.add("active");
        updatePreview(serviceIndex);
      }
    };
  });
}

// Bind to both direct render and include.js dynamic loader
window.initServices = initServices;
document.addEventListener("DOMContentLoaded", initServices);
document.addEventListener("componentsLoaded", initServices);