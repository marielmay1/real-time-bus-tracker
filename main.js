(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWVsbWF5IiwiYSI6ImNrcHAwbWNwODAydDYyb281YTBxcmg1aDcifQ.69_TdVl1BDC9zFZOZ3wE2Q';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.101, 42.358],
        zoom: 15
    })

    const marker = new mapboxgl.Marker()
        .setLngLat([-71.101, 42.358])
        .addTo(map);

    const busStops = getBusLocations();

    let counter = 0;

    function move() {
        setTimeout(() => {
            if (counter >= busStops.length) return;
            marker.setLngLat(busStops[counter]);
            counter++;
            move();
        }, 1000);
    }


    async function run() {
        const locations = await getBusLocations();
        console.log(new Date());
        console.log(locations);

        setTimeout(run, 15_000);
    }

    async function getBusLocations() {
        const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
        const response = await fetch(url);
        const json = await response.json();
        return json.data;
    }

    run();
})()