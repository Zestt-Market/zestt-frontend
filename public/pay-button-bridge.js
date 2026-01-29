// pay-button-bridge.js
// Finds a .pay-btn in the page and dispatches a CustomEvent 'zest_payment_request'
// Detail: { method: 'options'|'qr'|'apple_pay'|'google_pay', amount: number }

(function () {
  function init() {
    const btn = document.querySelector(".pay-btn");
    if (!btn) return;

    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      // allow data-method and data-amount attributes on the button
      const method = (
        btn.getAttribute("data-method") || "options"
      ).toLowerCase();
      const amtAttr =
        btn.getAttribute("data-amount") ||
        btn.getAttribute("data-valor") ||
        "0";
      const amount = parseFloat(amtAttr.toString().replace(",", ".")) || 0;

      const detail = { method, amount };
      window.dispatchEvent(new CustomEvent("zest_payment_request", { detail }));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
