var map = L.map('map').setView([10.641919556440756, -61.39944669632869], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const favIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const places = [
{
    name: "Student Activity Centre (SAC)",
    latitude: 10.639604967293163,
    longitude: -61.39772219840951,
    favorited: false,
    type: "R",
    description: "The main hub for student life and extracurricular activities on campus, hosting clubs, events, and social gatherings."
},
{
    name: "UWI Sport and Physical Education Centre (SPEC)",
    latitude: 10.640352592864609,
    longitude: -61.39570438120266,
    favorited: false,
    type: "R",
    description: "A modern sports and fitness facility offering gym equipment, courts, and physical education programs for students and staff."
},
{
    name: "Alma Jordan Library",
    latitude: 10.63952713700995,
    longitude: -61.398824046211665,
    favorited: false,
    type: "SS",
    description: "The main academic library of UWI St. Augustine, providing access to extensive research resources, study spaces, and digital archives."
},
{
    name: "LRC Greens",
    latitude: 10.640408997128443,
    longitude: -61.39955298073047,
    favorited: false,
    type: "R",
    description: "An open green recreational space near the Learning Resource Centre, popular for relaxation and outdoor activities between classes."
},
{
    name: "UWI Food Court",
    latitude: 10.639012607136184,
    longitude: -61.39823316418451,
    favorited: false,
    type: "FnD",
    description: "The central dining area on campus offering a variety of local and international food vendors to serve the daily needs of students and staff."
},
{
    name: "Linda's Bakery",
    latitude: 10.638657653305126,
    longitude: -61.398590832624635,
    favorited: false,
    type: "FnD",
    description: "A popular on-campus bakery known for fresh baked goods, pastries, and light snacks — a favourite morning stop for many students."
},
{
    name: "Pita Pit",
    latitude: 10.638925684934536,
    longitude: -61.39870725674695,
    favorited: false,
    type: "FnD",
    description: "A casual eatery serving freshly filled pitas and wraps, offering a quick and customisable meal option for students on the go."
},
{
    name: "Engineering Undercroft",
    latitude: 10.639300301851948,
    longitude: -61.399984732412456,
    favorited: false,
    type: "SS",
    description: "A covered communal space beneath the Engineering faculty building where students can grab food, unwind, and socialise between lectures."
},
{
    name: "FST Undercroft",
    latitude: 10.640935258233617,
    longitude: -61.40024770881011,
    favorited: false,
    type: "R",
    description: "A multi-purpose covered area under the Faculty of Science and Technology, used for both relaxation and informal study sessions by FST students."
},
{
    name: "UWI Teaching and Learning Complex (TLC)",
    latitude: 10.641523912415689,
    longitude: -61.396712779915106,
    favorited: false,
    type: "SS",
    description: "A modern academic complex housing lecture theatres, seminar rooms, and collaborative learning spaces designed to support innovative teaching."
},
{
    name: "Panks Sweet Sauce Doubles",
    latitude: 10.639317735725193,
    longitude: -61.39801054084068,
    favorited: false,
    type: "FnD",
    description: "A beloved campus street food vendor serving Trinidad's iconic doubles — a must-visit spot for an authentic local food experience."
},
{
    name: "Campus Mini Mart",
    latitude: 10.63924116639371,
    longitude: -61.39784745398503,
    favorited: false,
    type: "FnD",
    description: "A convenient on-campus convenience store stocking snacks, beverages, stationery, and everyday essentials for students and staff."
}
];

const favs = [];

function createMarker() {
    
    for(let p of places){
        var marker = L.marker([p.latitude, p.longitude]).addTo(map);
            marker.on('click', () =>showInfo(p) );
    }
}

function showInfo(p){
    map.setView([p.latitude, p.longitude], 18);
    let info = document.getElementById("Location");
    info.classList.add("active");
    info.innerHTML =`
        <section id="LocationInfo">
                    <button class="close-btn" onclick="closeInfo()">✕</button>
                    <h2>${p.name}</h2>
                    <p>${p.description}</p>
                </section>

                <section id="ReviewSummary">
                    <h5>Reviews Summary: </h5>
                     <div class="star-rating" id="starRating">
                            <h3><span id="ratingValue">0</span> / 5</h3>
                            <span class="star" data-value="1">&#9733;</span>
                            <span class="star" data-value="2">&#9733;</span>
                            <span class="star" data-value="3">&#9733;</span>
                            <span class="star" data-value="4">&#9733;</span>
                            <span class="star" data-value="5">&#9733;</span>
                     </div>
                     <button>Write a Review <i class="bi bi-pencil-square"></i> </button>
                </section>

                <section id="Reviews">
                    <h5>Reviews: </h5>
                    <p>No reviews yet. Be the first to write a review for this location!</p>
                    <div class="card">
                        <p>UserName</p>
                        
                        <div class="star-rating" id="starRating">
                            <span class="star" data-value="1">&#9733;</span>
                            <span class="star" data-value="2">&#9733;</span>
                            <span class="star" data-value="3">&#9733;</span>
                            <span class="star" data-value="4">&#9733;</span>
                            <span class="star" data-value="5">&#9733;</span>
                        </div>
                        <p>Review content goes here.</p>
                        <button class="LikeBtn"><i class="bi bi-hand-thumbs-up"></i>Like</button>
                    </div>
                </section>
    `;

    attachStarEvents();
}


function closeInfo() {
      let info = document.getElementById('Location')
      info.classList.remove('active');
    //   info.innerHTML = "";

    }

function attachStarEvents() {
    const stars = document.querySelectorAll("#Location .star");

    stars.forEach(star => {
        // Highlight on hover
        star.addEventListener("mouseover", function () {
            const val = this.dataset.value;
            stars.forEach(s => {
                s.style.color = s.dataset.value <= val ? "gold" : "gray";
            });
        });

        // Reset on mouse leave
        star.addEventListener("mouseleave", function () {
            stars.forEach(s => {
                s.style.color = s.dataset.value <= (s.dataset.selected || 0) ? "gold" : "gray";
            });
        });

        // Lock in on click
        star.addEventListener("click", function () {
            const val = this.dataset.value;
            stars.forEach(s => {
                s.dataset.selected = val;
                s.style.color = s.dataset.value <= val ? "gold" : "gray";
            });
            document.getElementById("ratingValue").textContent = val;
        });
    });
}



createMarker();