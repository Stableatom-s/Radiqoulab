// js/global/include.js

async function loadComponents() {
  const elements = document.querySelectorAll("[data-include]");
  
  const loadPromises = Array.from(elements).map(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (response.ok) {
        const html = await response.text();
        el.outerHTML = html;
      } else {
        console.error(`Error loading component ${file}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to load component: ${file}`, error);
    }
  });

  // Wait until every single HTML component is injected into the DOM
  await Promise.all(loadPromises);

  // Dispatch custom event for external script listeners
  document.dispatchEvent(new CustomEvent("componentsLoaded"));

  // Explicitly trigger global component initializers if defined
  if (typeof window.initTestimonials === "function") {
    window.initTestimonials();
  }

  if (typeof window.initFaq === "function") {
    window.initFaq();
  }

  if (typeof window.initForm === "function") {
    window.initForm();
  }

  if (typeof window.initServices === "function") {
    window.initServices();
  }

  if (typeof window.initIndustries === "function") {
    window.initIndustries();
  }
}

document.addEventListener("DOMContentLoaded", loadComponents);

