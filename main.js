/* ==============================
   NAVBAR AUTO ACTIVE
============================== */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Logika awal untuk halaman yang dimuat (jika navigasi berbasis file/multi-page)
    // Normalize current page: if the user is on root '/' the `pop()` returns an empty string
    // which can cause `includes('')` to return true for all links. Default to 'index.html'.
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll(".nav-link");

    // Menangani status active saat dimuat
    navLinks.forEach(link => {
        // Use the resolved URL to determine the page name the link points to.
        const linkHref = link.getAttribute("href");
        const linkUrl = new URL(linkHref, window.location.href);
        const linkPage = linkUrl.pathname.split("/").pop() || 'index.html';

        // Hapus kelas 'active' dari semua tautan (untuk mencegah duplikasi jika kode sebelumnya salah)
        link.classList.remove("active");

        // If the link is an anchor (#...), handle hash-based active link
        if (linkHref && linkHref.startsWith('#')) {
            // If the current URL has a hash and it matches this link, mark active
            if (window.location.hash && window.location.hash === linkHref) {
                link.classList.add('active');
            }
            // If there is no hash in the URL, default to 'Beranda' (#beranda) as active
            else if (!window.location.hash && linkHref === '#beranda') {
                link.classList.add('active');
            }
        }
        // Otherwise, check by page name
        else if (linkPage && linkPage === currentPage) {
            link.classList.add("active");
        }
    });

/* ==============================
   SMOOTH SCROLL (untuk link ke index)
============================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetID = this.getAttribute("href");

            if (targetID.length > 1) {
                e.preventDefault();

                // --- BAGIAN TAMBAHAN UNTUK MENGUBAH STATUS ACTIVE ---
                // Hapus kelas 'active' dari semua tautan
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                // Tambahkan kelas 'active' ke tautan yang baru diklik
                this.classList.add("active");
                // ---------------------------------------------------

                // Lakukan smooth scroll
                document.querySelector(targetID).scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});

/* ==============================
   PLACEHOLDER JS (bisa ditambah fitur)
============================== */
console.log("Halaman Pelatihan berhasil dimuat.");

// if (currentPage !== 'index.html') {
//     // Jangan hapus active pada halaman anak
//     return;
// }

