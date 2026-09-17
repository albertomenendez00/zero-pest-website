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
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
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

  /* Quote / contact form: client-side validation + Netlify AJAX submit */
  var forms = document.querySelectorAll("form[data-netlify-ajax]");
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

      // Honeypot: if filled, silently pretend success (bot trap)
      var honeypot = form.querySelector('input[name="bot-field"]');
      if (honeypot && honeypot.value) {
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

      var data = new FormData(form);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (successBox) successBox.classList.add("is-visible");
            if (window.location.hash !== "#sent") {
              history.replaceState(null, "", window.location.pathname);
            }
          } else {
            throw new Error("Form submission failed");
          }
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
