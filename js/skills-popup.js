// Skills Popup & Read More Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Read More Buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const projectContent = this.closest('.projects__content');
            const shortDescription = projectContent.querySelector('.short-description');
            const fullDescription = projectContent.querySelector('.full-description');
            const isExpanded = fullDescription.classList.contains('expanded');
            if (isExpanded) {
                fullDescription.classList.remove('expanded');
                shortDescription.style.display = 'block';
                this.textContent = 'Read more';
            } else {
                fullDescription.classList.add('expanded');
                shortDescription.style.display = 'none';
                this.textContent = 'Read less';
            }
        });
    });

    // Skills Popups
    const skillsData = document.querySelectorAll('.skills__data');
    const skillsContents = document.querySelectorAll('.skills__content');

    skillsData.forEach(skill => {
        const popup = skill.querySelector('.skills__popup');
        if (popup) {
            skill.addEventListener('mouseenter', function() {
                skillsData.forEach(otherSkill => {
                    if (otherSkill !== skill) {
                        otherSkill.classList.add('dimmed');
                    }
                });
                const popupHeight = 250;
                const rect = skill.getBoundingClientRect();
                const spaceAbove = rect.top;
                if (spaceAbove < popupHeight) {
                    popup.classList.add('popup-bottom');
                } else {
                    popup.classList.remove('popup-bottom');
                }
            });
            skill.addEventListener('mouseleave', function() {
                skillsData.forEach(otherSkill => {
                    otherSkill.classList.remove('dimmed');
                });
                skillsContents.forEach(section => {
                    section.classList.remove('dimmed');
                });
                popup.classList.remove('popup-bottom');
            });
            skill.addEventListener('focusin', function() {
                skillsData.forEach(otherSkill => {
                    if (otherSkill !== skill) {
                        otherSkill.classList.add('dimmed');
                    }
                });
                const popupHeight = 250;
                const rect = skill.getBoundingClientRect();
                const spaceAbove = rect.top;
                if (spaceAbove < popupHeight) {
                    popup.classList.add('popup-bottom');
                } else {
                    popup.classList.remove('popup-bottom');
                }
            });
            skill.addEventListener('focusout', function() {
                skillsData.forEach(otherSkill => {
                    otherSkill.classList.remove('dimmed');
                });
                skillsContents.forEach(section => {
                    section.classList.remove('dimmed');
                });
                popup.classList.remove('popup-bottom');
            });

            /* Mobile tap-to-reveal */
            skill.addEventListener('click', function(e) {
                if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
                    e.stopPropagation();
                    const isActive = skill.classList.contains('tap-active');
                    skillsData.forEach(s => s.classList.remove('tap-active'));
                    if (!isActive) {
                        skill.classList.add('tap-active');
                        const rect = skill.getBoundingClientRect();
                        if (rect.top < 250) {
                            popup.classList.add('popup-bottom');
                        }
                    }
                }
            });
        }
    });

    document.addEventListener('click', function() {
        skillsData.forEach(s => s.classList.remove('tap-active'));
    });
});
