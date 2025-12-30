// Expandable card functionality
document.addEventListener('DOMContentLoaded', () => {
  const expandableCards = document.querySelectorAll('[data-expandable="true"]');

  expandableCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    const expandContent = card.querySelector('.expand-content');

    if (expandBtn && expandContent) {
      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = card.classList.contains('expanded');

        // Close all other expanded cards
        expandableCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('expanded');
            const content = c.querySelector('.expand-content');
            if (content) content.style.maxHeight = '0';
          }
        });

        // Toggle current card
        card.classList.toggle('expanded');

        if (!isExpanded) {
          expandContent.style.maxHeight = expandContent.scrollHeight + 'px';
        } else {
          expandContent.style.maxHeight = '0';
        }
      });
    }
  });
});
