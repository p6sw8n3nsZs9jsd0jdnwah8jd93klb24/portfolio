// Project Database
const projectsData = {
    'enseignantsup': {
        title: 'EnseignantSup',
        teamSize: 4,
        tech: ['Nodejs', 'Electron', 'Python', 'Onnx'],
        description: `
            <p>Un dossier Parcoursup est un dossier contenant toutes les informations sur un étudiant lorsqu’il postule dans un établissement d’études supérieures, dont ses notes, ses appréciations et sa lettre de motivation. Evaluer les dossiers Parcoursup des étudiants est un processus qui peut être long et fastidieux pour les professeurs.</p>
            <p>L’objectif principal de ce projet était de créer une application permettant d’aider les professeurs à l’évaluation qualitative des dossiers Parcoursup, principalement en se basant sur une étude sur les statistiques du dossier tel que les occurrences de certains mots ou bien la longueur en nombre de mots de la lettre de motivation. Cet outil aurait pu également utiliser une IA pour attribuer les notes en fonction des scores des dossiers.</p>
        `,
        // Checking for exactly 7 images available based on previous directory listing
        images: [
            'images/enseignantsup1.png', 
            'images/enseignantsup2.png', 
            'images/enseignantsup3.png', 
            'images/enseignantsup4.png', 
            'images/enseignantsup5.png', 
            'images/enseignantsup6.png', 
            'images/enseignantsup7.png'
        ]
    },
    'cannes': {
        title: 'CRM Festival de Cannes',
        teamSize: 4,
        tech: ['PHP', 'Symfony', 'Composer'],
        description: `
            <p>Le Festival de Cannes est l’un des plus grands événements culturels au monde, rassemblant chaque année, au mois de mai, les plus grands noms du cinéma international. Pendant douze jours, réalisateurs, acteurs, journalistes et invités prestigieux se réunissent pour célébrer la création cinématographique et récompenser les œuvres les plus marquantes.</p>
            <p>Un tel événement demande une organisation complexe : il faut planifier les projections, loger les VIP, gérer les relations avec les VIP et coordonner les actions du staff tout au long du festival. Afin de rendre cette gestion plus fluide et centralisée, plusieurs projets ont déjà été entrepris dans le cadre de précédentes SAE.</p>
            <p>Durant notre SAE, notre objectif est d’analyser ces projets existants, d’en comprendre le fonctionnement et d’en extraire une version améliorée. Deux groupes distincts ont contribué à ces travaux :</p>
            <ul>
                <li>Le groupe A, chargé de l’informatisation de la gestion du planning et des VIP</li>
                <li>Le groupe B, en charge du projet pour la gestion des hébergements.</li>
            </ul>
            <p>Ces différents modules réunis peuvent former une base solide pour une application complète de gestion du festival. Toutefois, certaines fonctionnalités demeurent incomplètes ou manquantes, ce qui justifie notre intervention.</p>
            <p>Notre rôle consiste donc à identifier les limites des projets existants, à corriger les différents dysfonctionnements observés au sein des deux projets et à proposer des améliorations permettant d’obtenir une solution plus ergonomique et fonctionnelle. L’objectif final est de disposer d’un outil global qui fera ainsi office de consolidation de ces projets.</p>
        `,
        // Checking for exactly 7 images available based on previous directory listing
        images: [
            'images/cannes1.png', 
            'images/cannes2.png', 
            'images/cannes3.png', 
            'images/cannes4.png', 
            'images/cannes5.png', 
            'images/cannes6.png', 
            'images/cannes7.png'
        ]
    }
};

// State variables
let currentProject = null;
let currentImageIndex = 0;

// Elements
const modalOverlay = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalTeamText = document.getElementById('team-size-text');
const modalTeamContainer = document.getElementById('modal-team');
const modalTech = document.getElementById('modal-tech');
const modalDesc = document.getElementById('modal-desc');
const carouselImg = document.getElementById('carousel-img');
const carouselDotsContainer = document.getElementById('carousel-dots');

/**
 * Open Project Modal
 * @param {string} projectId 
 */
function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    currentProject = project;
    currentImageIndex = 0;

    // Set Title
    modalTitle.textContent = project.title;

    // Set Team Size
    if (project.teamSize) {
        modalTeamText.textContent = project.teamSize + (project.teamSize > 1 ? ' personnes' : ' personne');
        modalTeamContainer.style.display = 'flex';
    } else {
        modalTeamContainer.style.display = 'none';
    }

    // Set Description
    modalDesc.innerHTML = project.description;

    // Set Technologies
    modalTech.innerHTML = '';
    project.tech.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-pill';
        span.textContent = tech;
        modalTech.appendChild(span);
    });

    // Initialize Carousel
    carouselImg.src = project.images[currentImageIndex];
    carouselImg.onerror = function() {
        this.src = 'https://via.placeholder.com/800x450/1f2833/66fcf1?text=Image+Not+Found';
    };
    buildDots();

    // Show Modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling bg
}

/**
 * Close Project Modal
 */
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Change Carousel Image
 * @param {number} direction 1 for next, -1 for prev
 */
function changeImage(direction) {
    if (!currentProject) return;
    
    currentImageIndex += direction;
    
    // Auto wrap
    if (currentImageIndex >= currentProject.images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentProject.images.length - 1;
    }
    
    updateCarousel();
}

/**
 * Set Specific Carousel Image via Dots
 * @param {number} index 
 */
function setImageIndex(index) {
    currentImageIndex = index;
    updateCarousel();
}

/**
 * Update Carousel Img Source & Dots state
 */
function updateCarousel() {
    if (!currentProject) return;
    
    // Fade out effect
    carouselImg.style.opacity = 0.5;
    
    setTimeout(() => {
        carouselImg.src = currentProject.images[currentImageIndex];
        carouselImg.style.opacity = 1;
    }, 150);

    // Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Build Pagination Dots for Carousel
 */
function buildDots() {
    carouselDotsContainer.innerHTML = '';
    if (!currentProject) return;

    currentProject.images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => setImageIndex(index);
        carouselDotsContainer.appendChild(dot);
    });
}

// Close Modal when clicking outside the content
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Keyboard navigation (Escape to close, Arrows to navigate carousel)
document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    }
});
