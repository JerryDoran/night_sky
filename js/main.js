const modal = document.getElementById('modal');
const images = [...document.querySelectorAll('.image-container')];
const closeBtn = document.querySelector('.close-btn');

// closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', clickOutside);

class Planets {
  async getPlanets() {
    try {
      let result = await fetch('planet.json');
      let data = await result.json();

      let planets = data.planets;

      // Mapping the planets array to return data fields that mean something to us
      planets = planets.map((planet) => {
        // Destructuring the json file to pull out the data we want
        const { id, name, distance, diameter, orbit, type, moons } = planet;

        return { id, name, distance, diameter, orbit, type, moons };
      });
      // planets.forEach(planet => console.log(planet.id));
      return planets;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayModal(planets) {
    // planets.forEach(planet => console.log(planet.name));
    images.forEach((image) => {
      image.addEventListener('click', () => {
        let id = image.dataset.id;
        openModal(planets, id);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const planets = new Planets();
  const ui = new UI();

  // Get planet information
  planets.getPlanets().then((planets) => {
    ui.displayModal(planets);
  });
});

function openModal(planets, id) {
  planets.forEach((planet) => {
    if (planet.id == id) {
      let result = `
      <div class="modal-content">
          <div class="modal-header">
            <h2>Planetary Facts - ${planet.name} </h2>
                      
          </div>
          <div class="modal-body">
            <div class="title">
                <h6>Distance From Sun:</h6>
                <h6>Diameter:</h6>
                <h6>Orbit Period:</h6>
                <h6>Classification:</h6>
                <h6># Moons:</h6>
            </div>
            <div class="fact">
                <h6>${planet.distance}</h6>
                <h6>${planet.diameter}</h6>
                <h6>${planet.orbit}</h6>
                <h6>${planet.type}</h6>
                <h6>${planet.moons}</h6>
            </div>            
          </div>
        </div>      
      `;

      modal.innerHTML = result;
    }
  });

  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
