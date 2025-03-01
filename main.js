mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.0060, 40.7128], // Set the initial map center (longitude, latitude)
    zoom: 10
});




map.on('load', () => {
    // map.addLayer({
    //     id: 'background',
    //     type: 'background',
    //     paint: {
    //         'background-color': 'rgba(128,128,128,0.7)' // Grey color
    //         // 'background-opacity': 0.5
    //     }
        
    // });

    map.addSource('data_map', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/data_group_viz.json'
    });

    map.addLayer({
        id: 'displacement',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'DsplcRI'],
                'Lowest', '#B3CDE0',
                'Lower', ' #6897BB',
                'Intermediate', '#1F78B4',
                'Higher', '#053061',
                'Highest', '#011627',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0.8
            
            
        }
    });

    map.addLayer({
        id: 'housing',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'HsngCnd'],
                'Lowest', '#D5E8D4',
                'Lower', '#92C47D',
                'Intermediate', '#6AA84F',
                'Higher', '#38761D',
                'Highest', '#274E13',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0
            
            
        }
    });
});


document.getElementById("displacement").addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',1);
    map.setPaintProperty('housing','fill-opacity',0);
});
    
document.getElementById("housing").addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',0);
    map.setPaintProperty('housing','fill-opacity',1);
});



const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

const propertiesToDisplay = {
    'NTAName': 'Name',
    'DsplcRI': 'Displacement Risk',
    'HsngCnd': 'Housing Conditions'
    
};

const panelProperties = {
    'NTAName': 'Name',
    'DsplcRI': 'Displacement Risk'
    
    // Add more properties as needed
};

map.on('click', 'displacement', (e) => {
    // Get the properties of the clicked feature
    const properties = e.features[0].properties;
    // Generate the content for the info panel
    let infoPanelContent = '<h3>Feature Information</h3><ul>';
    for (const property in properties) {
        infoPanelContent += `<li>${property}: ${properties[property]}</li>`;
    }
    // for (const originalProperty in panelProperties) {
    //     if (properties.hasOwnProperty(originalProperty)) {
    //         const displayName = panelProperties[originalProperty];
    //         infoPanelContent += `<li><strong>${displayName}:</strong> ${properties[originalProperty]}</li>`;
    //     }
    // }
    infoPanelContent += '</ul>';
    // Set the info panel content
    document.getElementById('feature-properties').innerHTML = infoPanelContent;
});

map.on('mousemove', 'displacement', (e) => {
    // Generate the content for the popup
    const properties = e.features[0].properties;
    let popupContent = '<h3>Basic Information</h3><ul>';
    
    for (const originalProperty in propertiesToDisplay) {
        if (properties.hasOwnProperty(originalProperty)) {
            const displayName = propertiesToDisplay[originalProperty];
            popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
        }
    }
    popupContent += '</ul>';


    // Instead of adding the popup to the map here, just set its content and location
    popup.setLngLat(e.lngLat)
        .setHTML(popupContent);

    
});


map.on('mouseenter', 'displacement', () => {
    map.getCanvas().style.cursor = 'pointer';
    popup.addTo(map); // Add the popup to the map when the cursor enters a feature
});

map.on('mouseleave', 'displacement', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});



map.on('click', 'housing', (e) => {
    // Get the properties of the clicked feature
    const properties = e.features[0].properties;
    // Generate the content for the info panel
    let infoPanelContent = '<h3>Feature Information</h3><ul>';
    for (const property in properties) {
        infoPanelContent += `<li>${property}: ${properties[property]}</li>`;
    }
    // for (const originalProperty in panelProperties) {
    //     if (properties.hasOwnProperty(originalProperty)) {
    //         const displayName = panelProperties[originalProperty];
    //         infoPanelContent += `<li><strong>${displayName}:</strong> ${properties[originalProperty]}</li>`;
    //     }
    // }
    infoPanelContent += '</ul>';
    // Set the info panel content
    document.getElementById('feature-properties').innerHTML = infoPanelContent;
});

map.on('mousemove', 'housing', (e) => {
    // Generate the content for the popup
    const properties = e.features[0].properties;
    let popupContent = '<h3>Basic Information</h3><ul>';
    
    for (const originalProperty in propertiesToDisplay) {
        if (properties.hasOwnProperty(originalProperty)) {
            const displayName = propertiesToDisplay[originalProperty];
            popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
        }
    }
    popupContent += '</ul>';


    // Instead of adding the popup to the map here, just set its content and location
    popup.setLngLat(e.lngLat)
        .setHTML(popupContent);

    
});


map.on('mouseenter', 'housing', () => {
    map.getCanvas().style.cursor = 'pointer';
    popup.addTo(map); // Add the popup to the map when the cursor enters a feature
});

map.on('mouseleave', 'housing', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
