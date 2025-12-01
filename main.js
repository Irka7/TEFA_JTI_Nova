/* ==============================
   NAVBAR AUTO ACTIVE
============================== */
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage && linkPage.includes(currentPage)) {
            link.classList.add("active");
        }
    });
});

/* ==============================
   SMOOTH SCROLL (untuk link ke index)
============================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetID = this.getAttribute("href");

        if (targetID.length > 1) {
            e.preventDefault();
            document.querySelector(targetID).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* ==============================
   PLACEHOLDER JS (bisa ditambah fitur)
============================== */
console.log("Halaman Pelatihan berhasil dimuat.");
