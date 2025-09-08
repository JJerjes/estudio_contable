document.addEventListener('DOMContentLoaded', async () => {
    const jsonPath = 'data/section-eight.json';

    try {
        const response = await fetch(jsonPath);

        if (!response.ok) {
            throw new Error(`Error al cargar el JSON: ${response.statusText}`);
        }

        const items = await response.json();
        const container = document.querySelector('.eight-two-row');

        items.forEach(item => {
            const itemElement = document.createElement('section');
            itemElement.className = item.sectionClass;

            itemElement.innerHTML = `
                <div class="card-item">
                    <div class="circle-number">${item.number}</div>
                    <p>${item.paragraph}</p>
                </div>
            `;

            container.appendChild(itemElement);
        });

    } catch (error) {
        console.error('Hubo un problema al cargar los datos de la sección ocho:', error);
    }
});
