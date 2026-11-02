/*
 * CABA — interacción del sitio (sin dependencias).
 * Lo usa el sitio Next.js y también la vista previa estática, para que se comporten igual.
 * Menú móvil · barra al hacer scroll · filtros del portafolio · galería · formulario a WhatsApp · horario.
 */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Barra de navegación */
  var nav = $("[data-nav]");
  function onScroll() { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $("[data-menu-toggle]");
  var menu = $("#menu-movil");
  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("#menu-movil a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* Filtros del portafolio */
  var chips = $$("[data-filter]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      $$("[data-project]").forEach(function (card) {
        var tags = card.getAttribute("data-services").split(" ");
        card.hidden = !(f === "todos" || tags.indexOf(f) > -1);
      });
    });
  });

  /* Galería con teclado y gestos */
  var lb = $("[data-lightbox]");
  var lbImg = lb && $("img", lb);
  var lbCap = lb && $("[data-lightbox-caption]", lb);
  var lbCount = lb && $("[data-lightbox-count]", lb);
  var gallery = [], index = 0, lastFocus = null;
  function show(i) {
    index = (i + gallery.length) % gallery.length;
    var it = gallery[index];
    lbImg.src = it.src; lbImg.alt = it.alt;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    lbCap.textContent = it.title + " — " + it.alt;
    lbCount.textContent = (index + 1) + " / " + gallery.length;
  }
  function openLb(items, i, trigger) {
    gallery = items; lastFocus = trigger; lb.hidden = false; document.body.style.overflow = "hidden";
    show(i); $("[data-lightbox-close]", lb).focus();
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  $$("[data-gallery-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest("[data-project]");
      var title = card.getAttribute("data-title");
      var items = $$("[data-gallery-item]", card).map(function (el) { return { src: el.getAttribute("data-src"), alt: el.getAttribute("data-alt"), title: title }; });
      openLb(items, Number(btn.getAttribute("data-index") || 0), btn);
    });
  });
  if (lb) {
    $("[data-lightbox-close]", lb).addEventListener("click", closeLb);
    $("[data-lightbox-prev]", lb).addEventListener("click", function () { show(index - 1); });
    $("[data-lightbox-next]", lb).addEventListener("click", function () { show(index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) { if (e.key === "Escape") setMenu(false); return; }
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1)); x0 = null;
    });
  }

  /* Solicitud de visita: arma una plantilla con lo que escribió el cliente y abre WhatsApp */
  var form = $("[data-wa-form]");
  if (form) {
    var f = form.elements;
    var checks = [
      ["nombre", function (v) { return v.length >= 2; }, "Escribe tu nombre."],
      ["empresa", function (v) { return v.length >= 2; }, "Escribe el nombre de tu empresa."],
      ["telefono", function (v) { return v.replace(/\D/g, "").length >= 10; }, "Escribe un teléfono de 10 dígitos para confirmar la visita."],
      ["ubicacion", function (v) { return v.length >= 3; }, "Indica dónde está la planta."],
      ["necesidad", function (v) { return v.length >= 5; }, "Cuéntanos qué necesitas que revisemos."],
    ];
    function val(n) { return f[n].value.trim(); }
    function fecha(v) { var p = v.split("-"); return p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : v; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = $("[data-wa-error]", form), bad = null;
      checks.forEach(function (c) {
        var ok = c[1](val(c[0]));
        f[c[0]].setAttribute("aria-invalid", String(!ok));
        if (!ok && !bad) bad = c;
      });
      if (bad) { err.textContent = bad[2]; f[bad[0]].focus(); return; }
      err.textContent = "";

      var lines = [
        "*Solicitud de visita a planta*",
        "",
        "*Nombre:* " + val("nombre"),
        "*Empresa:* " + val("empresa"),
        "*Teléfono:* " + val("telefono"),
        "*Ubicación de la planta:* " + val("ubicacion"),
        "*Servicio de interés:* " + (val("servicio") || "Por definir"),
        "*Fecha preferida:* " + (val("fecha") ? fecha(val("fecha")) : "Por acordar"),
        "*Horario preferido:* " + (val("horario") || "Cualquier horario"),
        "",
        "*Necesidad:*",
        val("necesidad"),
        "",
        "_Enviado desde el sitio web de CABA._",
      ];
      var url = "https://wa.me/" + form.getAttribute("data-wa-form") + "?text=" + encodeURIComponent(lines.join("\n"));

      /* Copia al panel de cotizaciones (MIRAI Panel → Solicitudes). No bloquea ni reemplaza WhatsApp. */
      var endpoint = form.getAttribute("data-leads-endpoint");
      if (endpoint && window.fetch) {
        try {
          fetch(endpoint, {
            method: "POST", mode: "cors", keepalive: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: val("nombre"), empresa: val("empresa"), telefono: val("telefono"), ubicacion: val("ubicacion"),
              servicio: val("servicio"), fecha: val("fecha"), horario: val("horario"), necesidad: val("necesidad"),
              website: f.website ? f.website.value : "",
            }),
          }).catch(function () {});
        } catch { /* sin conexión: WhatsApp sigue funcionando */ }
      }
      window.open(url, "_blank", "noopener");
      var ok = $("[data-wa-ok]", form); ok.hidden = false;
      ok.querySelector("a").href = url;
    });

    /* Enlaces "Solicitar visita" de cada servicio: preseleccionan el servicio */
    $$("[data-visit-service]").forEach(function (a) {
      a.addEventListener("click", function () { f.servicio.value = a.getAttribute("data-visit-service"); });
    });
  }

  /* Abierto / cerrado según horario del centro de México */
  var status = $("[data-open-status]");
  if (status) {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
      var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find(function (p) { return p.type === "weekday"; }).value);
      var hr = Number(parts.find(function (p) { return p.type === "hour"; }).value) % 24;
      var open = wd >= 1 && wd <= 6 && hr >= Number(status.getAttribute("data-open")) && hr < Number(status.getAttribute("data-close"));
      status.textContent = open ? "Abierto ahora" : "Cerrado ahora";
      status.classList.add(open ? "is-open" : "is-closed");
      status.hidden = false;
    } catch { status.hidden = true; }
  }

})();
