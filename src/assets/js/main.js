(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* Quote / contact form: client-side validation + Web3Forms submit (emails the business) */
  var forms = document.querySelectorAll("form[data-ajax-form]");
  forms.forEach(function (form) {
    var successBox = form.parentElement.querySelector(".form-success");
    var errorBox = form.parentElement.querySelector(".form-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (successBox) successBox.classList.remove("is-visible");
      if (errorBox) errorBox.classList.remove("is-visible");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Honeypot: if ticked, silently pretend success (bot trap)
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        form.reset();
        if (successBox) successBox.classList.add("is-visible");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
      }

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        if (key !== "botcheck") payload[key] = value;
      });
      // Let "Reply" in the business inbox go straight to the customer
      if (payload.email) payload.replyto = payload.email;

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().then(function (json) {
            if (!response.ok || !json.success) throw new Error(json.message || "Form submission failed");
          });
        })
        .then(function () {
          form.reset();
          if (successBox) successBox.classList.add("is-visible");
        })
        .catch(function () {
          if (errorBox) errorBox.classList.add("is-visible");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText;
          }
        });
    });
  });
})();
