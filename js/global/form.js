// js/global/form.js

function initForm() {
  const form = document.getElementById("contactForm") || document.querySelector(".brief-form");
  const needPills = document.querySelectorAll("#servicesSelect .option-pill, .pill-options.multi-select .option-pill");
  const timelinePills = document.querySelectorAll("#timelineSelect .option-pill, .pill-options.single-select .option-pill");
  const budgetRange = document.getElementById("budgetSlider") || document.querySelector(".budget-range");
  const budgetDisplay = document.getElementById("budgetDisplay") || document.querySelector(".current-value-bubble");

  // 1. "What do you need?" Multi-select toggle
  if (needPills.length > 0) {
    needPills.forEach((pill) => {
      pill.onclick = (e) => {
        e.preventDefault();
        pill.classList.toggle("active");
      };
    });
  }

  // 2. "Timeline" Single-select toggle
  if (timelinePills.length > 0) {
    timelinePills.forEach((pill) => {
      pill.onclick = (e) => {
        e.preventDefault();
        timelinePills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
      };
    });
  }

  // 3. Budget Slider Live Update
  if (budgetRange && budgetDisplay) {
    const updateBudget = () => {
      const val = parseInt(budgetRange.value, 10) || 0;
      budgetDisplay.textContent = `$ ${val.toLocaleString()}`;
    };

    budgetRange.oninput = updateBudget;
    budgetRange.onchange = updateBudget;
    updateBudget();
  }

  // 4. Form Submit Handler
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const selectedServices = Array.from(needPills)
        .filter((p) => p.classList.contains("active"))
        .map((p) => p.getAttribute("data-value") || p.textContent.trim());

      const selectedTimeline = Array.from(timelinePills)
        .find((p) => p.classList.contains("active"))
        ?.getAttribute("data-value") || "";

      const emailInput = form.querySelector('input[type="email"]');
      const messageInput = form.querySelector("textarea");

      console.log({
        services: selectedServices,
        budget: budgetRange ? `$ ${parseInt(budgetRange.value, 10).toLocaleString()}` : "",
        timeline: selectedTimeline,
        email: emailInput ? emailInput.value : "",
        message: messageInput ? messageInput.value : "",
      });
    };
  }
}

// Bind to window and listeners for include.js execution
window.initForm = initForm;
document.addEventListener("DOMContentLoaded", initForm);
document.addEventListener("componentsLoaded", initForm);