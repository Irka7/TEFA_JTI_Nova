/* ==============================
   NAVBAR AUTO ACTIVE
============================== */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Logika awal untuk halaman yang dimuat (jika navigasi berbasis file/multi-page)
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");

    // Menangani status active saat dimuat
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        // Hapus kelas 'active' dari semua tautan (untuk mencegah duplikasi jika kode sebelumnya salah)
        link.classList.remove("active"); 

        if (linkPage && linkPage.includes(currentPage)) {
            // Jika navigasi berbasis file (misalnya: index.html), tambahkan 'active'
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
