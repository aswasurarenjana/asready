/* ==============================
   ASWA SURA RENJANA
   INTERACTIVE JAVASCRIPT
================================ */


/* CONFIGURATION
   Owahi informasi akunmu ing kene.
*/

const CONFIG = {
    // Ganti nganggo link undangan Saluran WhatsApp ASR sing asli.
    whatsappChannel: "https://whatsapp.com/channel/0029Vb5pSKFK5cDKn6rRuh2q",

    // Nomer iki tetep kanggo tombol Hubungi Kami.
    whatsapp: "+62 857-7788-0154",

    instagram: "https://www.instagram.com/aswasurarenjana?cplk=aXo1NjlnYjd2dGZn",
    tiktok: "https://www.tiktok.com/@aswa.sura.renjana?_r=1&_t=ZS-9Avwc7AJOw1",
    youtube: "https://youtube.com/@asrofficialaccount?si=O7zCtgDP8fd_MIix",

    // Musik lokal. Isi jeneng file yen wis duwe musik.
   music: "music/music-asr.mp3"
};


/* LOADER */

const loader = document.getElementById("loader");

function hideLoader() {
    loader.classList.add("hide");
}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 700);
});

// Supaya loading ora kakehan yen ana sumber njaba sing alon.
setTimeout(hideLoader, 3500);


/* NAVBAR */

const navbar = document.getElementById("navbar");

function updateNavbar() {
    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );
});

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll(
    "main section[id]"
);

const activeObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    "#" + entry.target.id
                );
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    activeObserver.observe(section);
});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* FOOTER YEAR */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* SOCIAL MEDIA LINKS */

const socialLinks = {
    instagram: CONFIG.instagram,
    tiktok: CONFIG.tiktok,
    youtube: CONFIG.youtube,
    whatsapp: CONFIG.whatsappChannel
};

document.querySelectorAll("[data-social]").forEach(link => {

    const platform = link.dataset.social;
    const url = socialLinks[platform];

    if (url && url.trim() !== "") {
        link.href = url;
    } else {
        link.href = "#kontak";

        link.addEventListener("click", event => {
            if (!url || url.trim() === "") {
                event.preventDefault();

                alert(
                    "Akun " + platform +
                    " durung disetel. Tambahna link akunmu " +
                    "ing CONFIG file script.js."
                );
            }
        });
    }

});


/* WHATSAPP CONTACT */

const contactButton = document.getElementById("contactButton");

contactButton.addEventListener("click", event => {

    event.preventDefault();

    const number = CONFIG.whatsapp.replace(/\D/g, "");

    if (!number) {
        alert(
            "Nomor WhatsApp durung disetel.\n\n" +
            "Bukak file script.js, banjur isi CONFIG.whatsapp " +
            "nganggo kode negara 62 lan nomormu."
        );

        return;
    }

    const message = encodeURIComponent(
        "Halo Aswa Sura Renjana, saya ingin bertanya " +
        "mengenai informasi dan undangan pertunjukan."
    );

    window.open(
        "https://wa.me/" + number + "?text=" + message,
        "_blank",
        "noopener,noreferrer"
    );

});


/* GALLERY LIGHTBOX */

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function getImageData(index) {
    const item = galleryItems[index];

    return {
        image: item.dataset.image,
        title: item.dataset.title
    };
}

function openLightbox(index) {

    currentImageIndex = index;

    const data = getImageData(index);

    const image = new Image();

    image.onload = () => {
        lightboxImage.src = data.image;
        lightboxImage.alt = data.title;
        lightboxCaption.textContent = data.title;

        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");

        lightboxClose.focus();
    };

    image.onerror = () => {
        alert(
            "Foto durung ditemokake. Priksa manawa file " +
            data.image + " wis ana ing folder assets."
        );
    };

    image.src = data.image;
}

function closeLightbox() {

    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

    lightboxImage.src = "";
}

function changeLightbox(direction) {

    currentImageIndex =
        (currentImageIndex + direction + galleryItems.length)
        % galleryItems.length;

    const data = getImageData(currentImageIndex);

    const image = new Image();

    image.onload = () => {
        lightboxImage.src = data.image;
        lightboxImage.alt = data.title;
        lightboxCaption.textContent = data.title;
    };

    image.onerror = () => {
        alert("Foto iki durung kasedhiya.");
    };

    image.src = data.image;
}

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
        openLightbox(index);
    });

});

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
    changeLightbox(-1);
});

lightboxNext.addEventListener("click", () => {
    changeLightbox(1);
});

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        changeLightbox(-1);
    }

    if (event.key === "ArrowRight") {
        changeLightbox(1);
    }

});

// MUSIK LATAR ASWA SURA RENJANA
const musicButton = document.getElementById("musicButton");
const musicLabel = musicButton.querySelector(".music-label");

const music = new Audio("music/music-asr.mp3");

music.loop = true;
music.volume = 0.35;

musicButton.addEventListener("click", async () => {
    try {
        if (music.paused) {
            await music.play();

            musicLabel.textContent = "MUSIK ON";
            musicButton.classList.add("playing");
        } else {
            music.pause();

            musicLabel.textContent = "MUSIK OFF";
            musicButton.classList.remove("playing");
        }
    } catch (error) {
        console.error("Musik ora bisa diputar:", error);
        musicLabel.textContent = "MUSIK ERROR";

        alert(
            "Musik gagal diputar. Priksa jeneng file lan lokasi folder music."
        );
    }
});
/* FINISH */

console.log(
    "%c ASWA SURA RENJANA ",
    "background:#d7ad58;color:#090909;padding:10px;font-weight:bold;"
);

console.log(
    "Website seni budaya Temanggung siap dijelajahi."
);