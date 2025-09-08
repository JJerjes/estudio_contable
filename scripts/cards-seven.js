document.addEventListener('DOMContentLoaded', async () => {
    const jsonPath = 'data/cards-seven.json';

    try {
        const response = await fetch(jsonPath);

        if (!response.ok) {
            throw new Error(`Error en la red: ${response.statusText}`);
        }

        const servicios = await response.json();
        const container = document.getElementById('cards-seven');

        servicios.forEach(servicio => {
            const cardElement = document.createElement('div');
            cardElement.className = `card-seven ${servicio.sectionClass}`;

            cardElement.innerHTML = `
                <div class="img-container">
                    <img src="${servicio.img}" alt="${servicio.imgAlt}">
                </div>
                <h3>${servicio.h3}</h3>
                <p>${servicio.description}</p>
            `;
            container.appendChild(cardElement);
        });

    } catch (error) {
        console.error('Hubo un problema al cargar los servicios:', error)
    }
});