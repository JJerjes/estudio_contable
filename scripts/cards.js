document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/cards.json');

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.getElementById('presentacion-cards');

        data.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            cardElement.innerHTML = `
                <div class ="card-header">
                    <img src="${card.imageSrc}" alt="${card.imageAlt}">
                    <div class="card-text">
                        <h3>${card.name}</h3>
                        <p>${card.position}</p>
                    </div>
                </div>
                
                <div class="video-container">
                    <iframe
                        src="${card.videoUrl}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>               
                </div>
            `;
            container.appendChild(cardElement);
        });

        const prevBtn = document.querySelector('.prev-button');
        const nextBtn = document.querySelector('.next-button');
        const cards = container.querySelectorAll('.card');

        let currentIndex = 0;

        function getCardsPerView() {
            const screenWidth = window.innerWidth;
            return screenWidth < 768 ? 1 : 2;
        }

        function showCards() {
            const cardsPerView = getCardsPerView();
            const totalCards = cards.length;

            cards.forEach((card) => {
                card.style.display = 'none';

                for (let i = 0; i < cardsPerView; i++) {
                    const visibleIndex = (currentIndex + i) % totalCards;
                    cards[visibleIndex].style.display = 'block';
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            const totalCards = cards.length;
            currentIndex = (currentIndex + 1) % totalCards;
            showCards();
        });

        prevBtn.addEventListener('click', () => {
            const totalCards = cards.length;
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            showCards();
        });

        window.addEventListener('resize', () => {
            showCards();
        });

        showCards();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
})