/* ==========================================================================
   MAA BIDRI MOTORS DHODRA(HONDA) — Nabarangpur
   Front-end behaviour: navigation, category tabs, enquiry form, contact links.
   No build step and no dependencies — this file runs as-is in the browser.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. SHOWROOM DETAILS  —  EDIT THIS BLOCK ONCE THE OWNER CONFIRMS THE DATA
   --------------------------------------------------------------------------
   Leave a value as null to keep the placeholder shown in the HTML.
   Fill a value in and every matching link on the page updates automatically.

   phone     : full number in international format, e.g. "+919876543210"
   whatsapp  : digits only, country code first, e.g. "919876543210"
   mapsUrl   : the showroom's Google Maps link
   ---------------------------------------------------------------------- */
const SHOWROOM = {
  phone: "+919937601505",
  whatsapp: "919937601505",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=19.598010%2C82.252288"
};

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close the drawer after tapping any link inside it.
    mainNav.addEventListener('click', function (event) {
      if (event.target.closest('a') && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* ---------- Bike category tabs ---------- */
  const tabs = document.querySelectorAll('.tab');
  const bikeCards = document.querySelectorAll('.bike-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const category = tab.dataset.tab;

      tabs.forEach(function (other) {
        const isActive = other === tab;
        other.classList.toggle('active', isActive);
        other.setAttribute('aria-selected', String(isActive));
      });

      bikeCards.forEach(function (card) {
        card.hidden = card.dataset.category !== category;
      });
    });
  });

  /* ---------- Enquiry form: prefill from the button that was clicked ------
     "Enquire Now", "Book Test Ride", "Ask for Price" and "Book a Service"
     all point at #enquiry. Carry the rider's intent into the form so they
     do not have to retype it.                                             */
  const interestField = document.getElementById('f-interest');
  const messageField = document.getElementById('f-message');

  const INTENT_TO_OPTION = {
    'test-ride': 'test-ride',
    'enquiry': 'new-bike',
    'price': 'price',
    'offer': 'price',
    'service': 'service'
  };

  document.querySelectorAll('a[href="#enquiry"][data-intent]').forEach(function (link) {
    link.addEventListener('click', function () {
      const option = INTENT_TO_OPTION[link.dataset.intent];
      if (option && interestField) {
        interestField.value = option;
      }

      const model = link.dataset.model;
      if (model && messageField && !messageField.value.trim()) {
        messageField.value = 'I would like to know more about ' + model + '.';
      }
    });
  });

  /* ---------- Enquiry form: validation ---------- */
  const form = document.getElementById('enquiry-form');
  const success = document.getElementById('form-success');

  function setFieldState(field, isValid) {
    const row = field.closest('.form-row');
    if (!row) return;
    row.classList.toggle('invalid', !isValid);
    const error = row.querySelector('.field-error');
    if (error) error.hidden = isValid;
  }

  if (form) {
    const nameField = document.getElementById('f-name');
    const mobileField = document.getElementById('f-mobile');
    const consentField = document.getElementById('f-consent');

    // Strip spaces, dashes and any +91 prefix down to the bare 10 digits.
    function mobileDigits(value) {
      return value.replace(/[\s-]/g, '').replace(/^(\+?91)/, '');
    }

    // A 10-digit Indian mobile number.
    function isValidMobile(value) {
      return /^[6-9]\d{9}$/.test(mobileDigits(value));
    }

    // Re-validate as the rider corrects a field they have already been told about.
    [nameField, mobileField].forEach(function (field) {
      field.addEventListener('input', function () {
        if (!field.closest('.form-row').classList.contains('invalid')) return;
        const isValid = field === mobileField
          ? isValidMobile(field.value)
          : field.value.trim().length > 0;
        setFieldState(field, isValid);
      });
    });

    consentField.addEventListener('change', function () {
      if (consentField.closest('.form-row').classList.contains('invalid')) {
        setFieldState(consentField, consentField.checked);
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const checks = [
        { field: nameField, valid: nameField.value.trim().length > 0 },
        { field: mobileField, valid: isValidMobile(mobileField.value) },
        { field: consentField, valid: consentField.checked }
      ];

      checks.forEach(function (check) {
        setFieldState(check.field, check.valid);
      });

      const firstInvalid = checks.find(function (check) { return !check.valid; });
      if (firstInvalid) {
        if (success) success.hidden = true;
        firstInvalid.field.focus();
        return;
      }

      /* The enquiry is handed off to WhatsApp: the rider's own app opens
         with the message pre-written, and they press send. Nothing is
         stored or posted anywhere by this page. */
      const url = whatsappUrl(buildEnquiryMessage());

      /* Opening a new tab keeps the site behind them if they come back.
         A popup blocker can still stop it, so the success panel always
         carries a manual link to the same URL. */
      window.open(url, '_blank', 'noopener');

      if (success) {
        const link = success.querySelector('.wa-fallback');
        if (link) link.href = url;
        success.hidden = false;
        success.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      /* The button stays enabled — if WhatsApp did not open, or they want
         to amend and resend, a second press has to work. */
    });

    /* Assemble the message the rider will see waiting in WhatsApp. */
    function buildEnquiryMessage() {
      const interest = interestField.options[interestField.selectedIndex].text;
      const method = form.querySelector('input[name="contact-method"]:checked');
      const note = messageField.value.trim();

      const lines = [
        'New enquiry from the MAA BIDRI MOTORS DHODRA(HONDA) website',
        '',
        'Name: ' + nameField.value.trim(),
        'Mobile: +91 ' + mobileDigits(mobileField.value),
        'Interested in: ' + interest,
        'Prefers: ' + (method && method.value === 'whatsapp' ? 'WhatsApp' : 'Phone call')
      ];
      if (note) lines.push('Message: ' + note);
      return lines.join('\n');
    }
  }

  function whatsappUrl(text) {
    return 'https://wa.me/' + SHOWROOM.whatsapp + '?text=' + encodeURIComponent(text);
  }

  /* ---------- Apply confirmed showroom details, when supplied ---------- */
  if (SHOWROOM.phone) {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.href = 'tel:' + SHOWROOM.phone;
    });
  }

  if (SHOWROOM.whatsapp) {
    document.querySelectorAll('a[href*="wa.me"]:not(.wa-fallback)').forEach(function (link) {
      link.href = 'https://wa.me/' + SHOWROOM.whatsapp;
    });
  }

  document.querySelectorAll('[data-maps]').forEach(function (link) {
    if (SHOWROOM.mapsUrl) {
      link.href = SHOWROOM.mapsUrl;
      link.target = '_blank';
      link.rel = 'noopener';
    } else {
      // Until a real map link is confirmed, keep the button inert rather
      // than sending riders to a broken destination.
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
  });

  /* ---------- Product photos ------------------------------------------
     The cards currently ship illustrations only, so nothing matches this
     selector. It stays wired up so a card can opt into a real photo by
     adding <img class="bike-photo" data-src="assets/img/….jpg" alt="…" hidden>
     beside its <svg>: the photo is swapped in only once it has actually
     loaded, so a missing file leaves the illustration rather than a broken
     image, and no request is made for a file that is not referenced.    */
  document.querySelectorAll('.bike-photo[data-src], .strip-photo[data-src]').forEach(function (photo) {
    const probe = new Image();
    probe.onload = function () {
      photo.src = probe.src;
      photo.hidden = false;
      /* Hide whatever was standing in for it — an illustration on a product
         card, a text label in the photo strip. Set the attribute directly
         rather than the .hidden IDL property: on an <svg> some browsers
         apply the property without reflecting it to the attribute, so the
         [hidden] CSS rule never matches and the illustration stays shown. */
      const art = photo.parentElement.querySelector('svg, .photo-ph-label');
      if (art) art.setAttribute('hidden', '');
    };
    probe.src = photo.dataset.src;
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
