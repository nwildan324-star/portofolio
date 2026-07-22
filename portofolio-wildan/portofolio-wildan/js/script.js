/* ============================================================
   SCRIPT.JS — Enchanted Forest Portfolio
   Berisi:
   a) Logika pintu kayu terbuka saat scroll pertama
   b) Parallax multi-layer berdasarkan posisi scroll
   c) Smooth scroll untuk navigasi
   d) Efek tilt 3D pada kartu portfolio
============================================================= */

// -----------------------------------------------------
// (a) & (b) DOOR OPENING + PARALLAX LAYERS
// Keduanya digabung dalam satu scroll handler (rAF) demi performa.
// -----------------------------------------------------
const doorLeft  = document.querySelector('.door-left');
const doorRight = document.querySelector('.door-right');
const doorLight = document.getElementById('door-light');
const heroContent = document.getElementById('hero-content');
const doorWrapper = document.getElementById('door-wrapper');
const parallaxLayers = document.querySelectorAll('.parallax-layer');

// Jarak scroll (px) yang dibutuhkan agar pintu terbuka 100%.
// Ubah angka ini untuk membuat pintu terbuka lebih cepat/lambat.
const DOOR_OPEN_DISTANCE = Math.max(window.innerHeight * 0.9, 500);

let ticking = false;

function updateOnScroll() {
  const scrollY = window.scrollY;

  // ---- Update pintu ----
  const progress = Math.min(scrollY / DOOR_OPEN_DISTANCE, 1); // 0 -> 1
  const angle = progress * 100; // derajat rotasi maksimum

  doorLeft.style.transform  = `rotateY(-${angle}deg)`;
  doorRight.style.transform = `rotateY(${angle}deg)`;

  // Cahaya emas membesar mengiringi bukaan pintu
  doorLight.style.opacity = progress * 0.9;

  // Saat pintu hampir terbuka penuh, tampilkan konten hero
  if (progress > 0.5) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  } else {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(24px)';
  }

  // Setelah pintu terbuka penuh, nonaktifkan interaksi & sembunyikan wrapper
  if (progress >= 1) {
    doorWrapper.style.pointerEvents = 'none';
    doorWrapper.style.visibility = 'hidden';
  } else {
    doorWrapper.style.visibility = 'visible';
  }

  // ---- Update parallax layers ----
  parallaxLayers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed) || 0;
    // Hanya gunakan posisi scroll relatif terhadap section induk
    const offset = scrollY * speed;
    layer.style.transform = `translateY(${offset}px)`;
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// Jalankan sekali saat load untuk memastikan state awal benar
window.addEventListener('load', updateOnScroll);
updateOnScroll();

// -----------------------------------------------------
// (c) SMOOTH SCROLL untuk semua link navigasi (.nav-link)
// -----------------------------------------------------
document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = 72; // tinggi nav bar fixed, sesuaikan jika diubah
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// -----------------------------------------------------
// (d) EFEK TILT 3D PADA KARTU PORTFOLIO
// -----------------------------------------------------
document.querySelectorAll('.tilt-card').forEach((card) => {
  const maxTilt = 10; // derajat kemiringan maksimum — ubah untuk efek lebih kuat/lembut

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  });
});

// -----------------------------------------------------
// (e) BUKA/TUTUP PETI HARTA (CONTACT FORM)
// -----------------------------------------------------
const chest = document.getElementById('chest');
const chestLid = document.querySelector('.chest-lid');
if (chest && chestLid) {
  chestLid.addEventListener('click', () => {
    chest.classList.toggle('open');
  });
}

// -----------------------------------------------------
// (f) HANDLE SUBMIT FORM KONTAK
// Ganti bagian ini dengan integrasi backend / layanan email
// (misalnya Formspree, EmailJS, atau endpoint API Anda sendiri)
// -----------------------------------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pesan terkirim! Saya akan segera membalas. (Hubungkan form ini ke backend / layanan email Anda)');
    contactForm.reset();
  });
}
