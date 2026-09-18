document.addEventListener("DOMContentLoaded", () => {

  /*
   * Automatically updates the copyright year.
   */

  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /*
   * MOBILE NAVIGATION
   *
   * This is keyboard accessible because the navigation
   * button is a real <button> element.
   */

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#primary-menu");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

      const open = navLinks.classList.toggle("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    });


    /*
     * Close the mobile menu after selecting a link.
     */

    navLinks.addEventListener("click", (event) => {

      if (event.target.matches("a")) {

        navLinks.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /*
   * DOM INTERACTION
   *
   * Shows and hides the skills list.
   */

  const skillsToggle =
    document.querySelector("#skills-toggle");

  const skillsList =
    document.querySelector("#skills-list");

  if (skillsToggle && skillsList) {

    skillsToggle.addEventListener("click", () => {

      const hidden =
        skillsList.classList.toggle("is-hidden");

      skillsToggle.textContent =
        hidden ? "Show skills" : "Hide skills";

      skillsToggle.setAttribute(
        "aria-expanded",
        String(!hidden)
      );

    });

  }


  /*
   * FORM VALIDATION
   */

  const form =
    document.querySelector("#contact-form");

  if (!form) {
    return;
  }


  const fields = {

    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#name-error"),
      message: "Please enter your name."
    },

    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      message: "Please enter a valid email address."
    },

    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#message-error"),
      message: "Please enter a message of at least 10 characters."
    }

  };


  const success =
    document.querySelector("#form-success");


  /*
   * Display an error.
   */

  function setError(field, message) {

    field.error.textContent = message;

    field.input.setAttribute(
      "aria-invalid",
      "true"
    );

  }


  /*
   * Remove an error.
   */

  function clearError(field) {

    field.error.textContent = "";

    field.input.removeAttribute(
      "aria-invalid"
    );

  }


  /*
   * Validate name.
   */

  function validateName() {

    const value =
      fields.name.input.value.trim();

    if (value.length < 2) {

      setError(
        fields.name,
        fields.name.message
      );

      return false;
    }

    clearError(fields.name);

    return true;
  }


  /*
   * Validate email.
   */

  function validateEmail() {

    const value =
      fields.email.input.value.trim();

    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {

      setError(
        fields.email,
        fields.email.message
      );

      return false;
    }

    clearError(fields.email);

    return true;
  }


  /*
   * Validate message.
   */

  function validateMessage() {

    const value =
      fields.message.input.value.trim();

    if (value.length < 10) {

      setError(
        fields.message,
        fields.message.message
      );

      return false;
    }

    clearError(fields.message);

    return true;
  }


  /*
   * Validate while the user types.
   */

  fields.name.input.addEventListener(
    "input",
    validateName
  );

  fields.email.input.addEventListener(
    "input",
    validateEmail
  );

  fields.message.input.addEventListener(
    "input",
    validateMessage
  );


  /*
   * Validate when submitted.
   */

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    success.textContent = "";

    const valid = [
      validateName(),
      validateEmail(),
      validateMessage()
    ].every(Boolean);


    /*
     * If something is invalid,
     * move keyboard focus to the first invalid field.
     */

    if (!valid) {

      const firstInvalid =
        form.querySelector(
          '[aria-invalid="true"]'
        );

      firstInvalid?.focus();

      return;
    }


    /*
     * Successful validation.
     */

    success.textContent =
      "Thanks! The form passed validation successfully.";

    form.reset();

    Object.values(fields).forEach(clearError);

  });

});