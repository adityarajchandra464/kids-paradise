document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Sticky Header & Active Link Highlighting
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// WhatsApp Form Handler
const waForm = document.getElementById('whatsapp-form');
if (waForm) {
    waForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('wa-name').value;
        const phone = document.getElementById('wa-phone').value;
        const message = document.getElementById('wa-message').value;

        // Your WhatsApp Number (Replace with actual number, including country code)
        const waNumber = '918077167027';

        // Format the message
        const waText = `Hello Kids Paradise!%0A%0A*New Enquiry from Website*%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Message:* ${message}`;

        // Construct the URL and open in new tab
        const waUrl = `https://wa.me/${waNumber}?text=${waText}`;
        window.open(waUrl, '_blank');

        // Optional: reset form after sending
        waForm.reset();
    });
}

// Modal Logic
const enquiryModal = document.getElementById('enquiry-modal');
const openModalBtns = document.querySelectorAll('.open-enquiry-modal-btn');
const closeModalBtn = document.getElementById('close-enquiry-modal');
const admissionForm = document.getElementById('admission-form');

if (openModalBtns.length > 0 && enquiryModal) {
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            enquiryModal.classList.add('active');
        });
    });
}

if (closeModalBtn && enquiryModal) {
    closeModalBtn.addEventListener('click', () => {
        enquiryModal.classList.remove('active');
    });
}

// Close when clicking outside modal
if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.classList.remove('active');
        }
    });
}

// Admission Form Submit
if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const parentName = document.getElementById('parent-name').value;
        const phone = document.getElementById('phone-number').value;
        const childAge = document.getElementById('child-age').value;
        const classApplying = document.getElementById('class-applying').value;
        
        const submitBtn = admissionForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const data = {
            'Parent Name': parentName,
            'Phone Number': phone,
            'Child Age': childAge,
            'Class Applying For': classApplying
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzP-x1OZ5Yvge-QdlDySJLXbbixTQIokN4Wl19SUkWNPvaZ9lGqpNpfGU9jRfXyvs2VcQ/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            alert('Enquiry submitted successfully! We will contact you soon.');
            admissionForm.reset();
            enquiryModal.classList.remove('active');
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error submitting your enquiry. Please try again or contact us via WhatsApp.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Image Zoom Modal Logic
const imageModal = document.getElementById('image-modal');
const zoomedImage = document.getElementById('zoomed-image');
const closeImageModalBtn = document.getElementById('close-image-modal');
const zoomableItems = document.querySelectorAll('.teacher-card, .gallery-item');

if (zoomableItems.length > 0 && imageModal && zoomedImage) {
    zoomableItems.forEach(card => {
        // Add cursor pointer so it's obvious it's clickable
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                zoomedImage.src = img.src;
                imageModal.classList.add('active');
            }
        });
    });
}

if (closeImageModalBtn && imageModal) {
    closeImageModalBtn.addEventListener('click', () => {
        imageModal.classList.remove('active');
    });
}

if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
        }
    });
}

// First Time Welcome Popup Logic
const welcomePopup = document.getElementById('welcome-popup');
const closeWelcomeBtn = document.getElementById('close-welcome-popup');

if (welcomePopup) {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenAdmissionPopup');
    
    if (!hasSeenPopup) {
        // Show popup after a short delay
        setTimeout(() => {
            welcomePopup.classList.add('active');
            localStorage.setItem('hasSeenAdmissionPopup', 'true');
        }, 1500);
    }
}

if (closeWelcomeBtn && welcomePopup) {
    closeWelcomeBtn.addEventListener('click', () => {
        welcomePopup.classList.remove('active');
    });
}

if (welcomePopup) {
    welcomePopup.addEventListener('click', (e) => {
        if (e.target === welcomePopup) {
            welcomePopup.classList.remove('active');
        }
    });
}

// Gallery Slideshow
const slidesWrapper = document.querySelector('.slides-wrapper');
const slidePrevBtn = document.querySelector('.slide-btn.prev');
const slideNextBtn = document.querySelector('.slide-btn.next');

if (slidesWrapper && slidePrevBtn && slideNextBtn) {
    slideNextBtn.addEventListener('click', () => {
        const itemWidth = slidesWrapper.querySelector('.gallery-item').offsetWidth + 20; // 20 is gap
        slidesWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
    
    slidePrevBtn.addEventListener('click', () => {
        const itemWidth = slidesWrapper.querySelector('.gallery-item').offsetWidth + 20; // 20 is gap
        slidesWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
}