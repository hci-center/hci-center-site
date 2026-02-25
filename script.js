document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll background
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 12, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 12, 0.8)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Contact form setup
    const CONTACT_EMAIL = 'hci.center.inc@gmail.com';
    const contactForm = document.getElementById('contact-form');

    // Form submission processing
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const company = formData.get('company') || '記載なし';
            const email = formData.get('email');
            const subjectSelect = formData.get('subject');
            const message = formData.get('message');

            // Generate standard subject
            const subject = `【HCIセンター コーポレートサイトからのお問い合わせ】${subjectSelect}`;

            // Format body text
            const bodyText = `
※このメールはお客様のメールソフトから送信されます。
そのまま送信ボタンを押してください。

--------------------------------------------------
【お名前】
${name} 様

【貴社名・組織名】
${company}

【メールアドレス】
${email}

【お問い合わせ種別】
${subjectSelect}

【お問い合わせ内容】
${message}
--------------------------------------------------
`.trim();

            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(bodyText);

            // Open mailer
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
        });
    }
});
