//Full screen but have a footer
(function () {

  'use strict';

  adjustHeight();
  window.addEventListener("resize", adjustHeight)

  function adjustHeight() {
    const mapSize = document.querySelector("#map"),
      contentSize = document.querySelector("#content"),
      removeHeight = document.querySelector("#footer").offsetHeight,
      resize = window.innerHeight - removeHeight;

    mapSize.style.height = `${resize}px`

    if (window.innerWidth >= 768) {
      contentSize.style.height = `${resize}px`
      mapSize.style.height = `${resize}px`
    } else {
      contentSize.style.height = `${resize * 0.25}px`
      mapSize.style.height = `${resize * 0.75}px`
    }
  }

  //Control the button that shows the legend when the screen is smaller than 768px
  const button = document.querySelector("#legend button")
  button.addEventListener('click', function () {
    const legend = document.querySelector(".leaflet-legend")
    legend.classList.toggle('show-legend')
  })




  // initialize map, centered on Kenya
  var map = L.map("map", {
    zoomSnap: 0.1,
    zoom: 7,
    center: [-0.23, 37.8],
    zoomControl: false,
    minZoom: 6,
    maxZoom: 9,
    maxBounds: L.latLngBounds([-6.22, 27.72], [5.76, 47.83]),
  });

  // mapbox API access Token
  var accessToken = "pk.eyJ1Ijoiam5ld21hcCIsImEiOiJjbGF5bm00cGMwamNiM29xbGhzc2N2d2NlIn0.pNQuHrNdcqTh_U2pAuDnVA";
  var yourName = "jnewmap";
  var yourMap = "Monochrome";
  var styleID = "clfx55wmx001j01mpsyxe5yxd"




  // request a mapbox raster tile layer and add to map
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/${yourName}/${styleID}/tiles/256/{z}/{x}/{y}?access_token=${accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "light-v10",
      accessToken: accessToken,
    }
  ).addTo(map);


  //Add CSV file
  //Converts to two separate geojsons from Leaflet GeoJson
  omnivore.csv("backup/data/kenya_education_2014.csv")
    .on("ready", function (e) {
      //access to the GeoJSON here!
      //console.log(e.target.toGeoJSON());\
      console.log(e);
      drawMap(e.target.toGeoJSON());
      drawLegend(e.target.toGeoJSON());
    })

    .on("error", function (e) {
      console.log(e.error[0].message);
    });



  //****************************************************************
  function getColor(x) {
    // Access the fourth stylesheet referenced in the HTML head element
    const stylesheet = document.styleSheets[3];
    const colors = [];

    // Check out the rules in the stylesheet
    console.log(stylesheet.cssRules);

    // Loop through the rules in the stylesheet
    for (let i of stylesheet.cssRules) {
      // When we find girls, add it's color to an array
      if (i.selectorText === ".girls") {
        colors[0] = i.style.backgroundColor;
      }
      if (i.selectorText === ".boys") {
        colors[1] = i.style.backgroundColor;
      }
    }

    // If function was given 'girls' return that color
    if (x == "girls") {
      return colors[0];
    } else {
      return colors[1];
    }
  }


  //****************************************************************    
  function drawMap(data) {
    //console.log(data);
    const options = {
      pointToLayer: function (feature, ll) {
        return L.circleMarker(ll, {
          opacity: 1,
          weight: 2,
          fillOpacity: 0,
        });
      },
    };


    // create 2 separate layers from GeoJSON data
    const girlsLayer = L.geoJson(data, options).addTo(map),
      boysLayer = L.geoJson(data, options).addTo(map);

    // fit the bounds of the map to one of the layers
    map.fitBounds(girlsLayer.getBounds(), {
      padding: [50, 50],
    });

    //color the layers different colors
    girlsLayer.setStyle({
      color: "#D96D02",
    });
    boysLayer.setStyle({
      color: "#6E77B0",
    });

    //resize the circles using attribute data from grade 1
    resizeCircles(girlsLayer, boysLayer, 1);

    //activate listeners for using the slider UI
    sequenceUI(girlsLayer, boysLayer);

  } // end drawMap()



  //****************************************************************  
  function resizeCircles(girlsLayer, boysLayer, currentGrade) {
    //loop through the layers, calculate and set radius for each feature
    girlsLayer.eachLayer(function (layer) {
      const radius = calcRadius(
        Number(layer.feature.properties["G" + currentGrade])
      );
      layer.setRadius(radius);
    });
    boysLayer.eachLayer(function (layer) {
      const radius = calcRadius(
        Number(layer.feature.properties["B" + currentGrade])
      );
      layer.setRadius(radius);
    });

    //update the hover window with current grade
    retrieveInfo(boysLayer, currentGrade);
  }



  //**************************************************************** 
  function sequenceUI(girlsLayer, boysLayer) {

    // create Leaflet control for the slider
    const sliderControl = L.control({
      position: "bottomleft",
    });

    sliderControl.onAdd = function () {
      const controls = L.DomUtil.get("slider");

      L.DomEvent.disableScrollPropagation(controls);
      L.DomEvent.disableClickPropagation(controls);

      return controls;
    }

    // add it to the map
    sliderControl.addTo(map);

    // create Leaflet control for the slider
    const outputControl = L.control({
      position: "bottomleft",
    });

    outputControl.onAdd = function () {
      const controls = L.DomUtil.get("grade-output");

      L.DomEvent.disableScrollPropagation(controls);
      L.DomEvent.disableClickPropagation(controls);

      return controls;
    }

    // add it to the map
    outputControl.addTo(map);

    //select the slider's input and listen for change
    const slider = document.querySelector("#slider input");
    const output = document.querySelector("#grade-output span");
    //select the slider's input and listen for change
    slider.addEventListener("input", function (e) {
      // current value of slider is current grade level
      var currentGrade = e.target.value;

      // resize the circles with updated grade level
      resizeCircles(girlsLayer, boysLayer, currentGrade);

      // update the output
      output.innerHTML = currentGrade;
    });
  }




  //**************************************************************** 
  function calcRadius(val) {
    //takes a numeric value and calculates a radius for circleMakers
    const radius = Math.sqrt(val / Math.PI);
    return radius * .5; // scale factor of 0.5
  }



  //****************************************************************
  function drawLegend(data) {

    // create Leaflet control for the legend
    const legendControl = L.control({
      position: "bottomright",
    });

    // when the control is added to the map
    legendControl.onAdd = function (map) {
      // select the legend using id attribute of legend
      const div = L.DomUtil.get("legend");

      // disable scroll and click functionality
      L.DomEvent.disableScrollPropagation(div);
      L.DomEvent.disableClickPropagation(div);

      // return the selection
      return legend;
    };

    legendControl.addTo(map);

    // empty array to hold values
    const dataValues = [];

    // loop through all features (i.e., the schools)
    data.features.forEach(function (school) {
      // for each grade in a school
      for (let grade in school.properties) {
        // shorthand to each value
        const value = school.properties[grade];
        // if the value can be converted to a number
        // the + operator in front of a number returns a number
        if (+value) {
          //return the value to the array
          dataValues.push(+value);
        }
      }
    });
    // verify your results!
    //console.log(dataValues);


    // sort our array
    const sortedValues = dataValues.sort(function (a, b) {
      return b - a;
    });

    // round the highest number and use as our large circle diameter
    const maxValue = Math.round(sortedValues[0] / 1000) * 1000;



    // calc the diameters
    const largeDiameter = calcRadius(maxValue) * 2,
      smallDiameter = largeDiameter / 2;

    // create a function with a short name to select elements
    const $ = function (x) {
      return document.querySelector(x);
    };

    // select our circles container and set the height
    $(".legend-circles").style.height = `${largeDiameter.toFixed()}px`;

    // set width and height for large circle
    $(".legend-large").style.width = `${largeDiameter.toFixed()}px`;
    $(".legend-large").style.height = `${largeDiameter.toFixed()}px`;

    // set width and height for small circle and position
    $(".legend-small").style.width = `${smallDiameter.toFixed()}px`;
    $(".legend-small").style.height = `${smallDiameter.toFixed()}px`;
    $(".legend-small").style.top = `${largeDiameter - smallDiameter - 2}px`;
    $(".legend-small").style.left = `${smallDiameter / 2}px`;

    // label the max and half values
    $(".legend-large-label").innerHTML = `${maxValue.toLocaleString()}`;
    $(".legend-small-label").innerHTML = (maxValue / 2).toLocaleString();

    // adjust the position of the large based on size of circle
    $(".legend-large-label").style.top = `${-11}px`;
    $(".legend-large-label").style.left = `${largeDiameter + 30}px`;

    // adjust the position of the large based on size of circle
    $(".legend-small-label").style.top = `${smallDiameter - 13}px`;
    $(".legend-small-label").style.left = `${largeDiameter + 30}px`;

    // insert a couple hr elements and use to connect value label to top of each circle
    $("hr.small").style.top = `${largeDiameter - smallDiameter - 10}px`;

  }



  //****************************************************************
  function retrieveInfo(boysLayer, currentGrade) {
    // select the element and reference with variable
    const info = document.querySelector("#info");

    // since boysLayer is on top, use to detect mouseover events
    boysLayer.on("mouseover", function (e) {
      // replace the the display property with block and show
      info.style.display = "block";

      // access properties of target layer
      const props = e.layer.feature.properties;

      // create a function with a short name to select elements
      const $ = function (x) {
        return document.querySelector(x);
      };

      // populate HTML elements with relevant info
      $("#info span").innerHTML = props.COUNTY;
      $(".girls span:first-child").innerHTML = `(grade ${currentGrade})`;
      $(".boys span:first-child").innerHTML = `(grade ${currentGrade})`;
      $(".girls span:last-child").innerHTML = Number(
        props[`G${currentGrade}`]
      ).toLocaleString();
      $(".boys span:last-child").innerHTML = Number(
        props[`B${currentGrade}`]
      ).toLocaleString();

      // raise opacity level as visual affordance
      e.layer.setStyle({
        fillOpacity: 0.6,
      });
      // empty arrays for boys and girls values
      const girlsValues = [],
        boysValues = [];

      // loop through the grade levels and push values into those arrays
      for (let i = 1; i <= 8; i++) {
        girlsValues.push(Number(props["G" + i]));
        boysValues.push(Number(props["B" + i]));
      }

      const girlsOptions = {
        id: "girlspark",
        width: 280, // No need for units; D3 will use pixels.
        height: 50,
        color: "#D96D02",
        lineWidth: 3,
      };

      sparkLine(girlsValues, girlsOptions, currentGrade);

      const boysOptions = {
        id: "boyspark",
        width: 280,
        height: 50,
        color: "#6E77B0",
        lineWidth: 3,
      };

      sparkLine(boysValues, boysOptions, currentGrade);

    });


    // hide the info panel when mousing off layergroup and remove affordance opacity
    boysLayer.on("mouseout", function (e) {
      // hide the info panel
      info.style.display = "none";

      // reset the layer style
      e.layer.setStyle({
        fillOpacity: 0,
      });
    });

    //on window resize unset any position properties
    window.addEventListener('resize', function () {
      info.style.right = 'unset'
      info.style.top = 'unset'
      info.style.left = 'unset'
    })


    // when the mouse moves on the document
    document.addEventListener("mousemove", function (e) {
      // If the page is on the small screen, calculate the position of the info window
      if (window.innerWidth < 768) {
        info.style.right = "10px";
        info.style.top = `${window.innerHeight * 0.25 + 5}px`;
      } else {
        // Console the page coordinates to understand positioning
        // console.log(e.pageX, e.pageY);

        // offset info window position from the mouse position
        (info.style.left = `${e.pageX + 6}px`),
        (info.style.top = `${e.pageY - info.offsetHeight - 25}px`);

        // if it crashes into the right, flip it to the left
        if (e.pageX + info.offsetWidth > window.innerWidth) {
          info.style.left = `${e.pageX - info.offsetWidth - 6}px`;
        }
        // if it crashes into the top, flip it lower right
        if (e.pageY - info.offsetHeight - 25 < 0) {
          info.style.top = `${e.pageY + 6}px`;
        }
      }
    });

  }


  //****************************************************************
  function sparkLine(data, options, currentGrade) {
    d3.select(`#${options.id} svg`).remove();
    console.log(options)
    const w = options.width,
      h = options.height,
      m = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
      },
      iw = w - m.left - m.right,
      ih = h - m.top - m.bottom,
      x = d3.scaleLinear().domain([0, data.length]).range([0, iw]),
      y = d3
      .scaleLinear()
      .domain([d3.min(data), d3.max(data)])
      .range([ih, 0]);

    const svg = d3
      .select(`#${options.id}`)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${m.left},${m.top})`);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    const area = d3
      .area()
      .x((d, i) => x(i))
      .y0(d3.min(data))
      .y1((d) => y(d));

    svg
      .append("path")
      .datum(data)
      .attr("stroke-width", 0)
      .attr("fill", options.color)
      .attr("opacity", 0.5)
      .attr("d", area);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", options.color)
      .attr("stroke-width", options.lineWidth)
      .attr("d", line);

    svg
      .append("circle")
      .attr("cx", x(Number(currentGrade) - 1))
      .attr("cy", y(data[Number(currentGrade) - 1]))
      .attr("r", "4px")
      .attr("fill", "white")
      .attr("stroke", options.color)
      .attr("stroke-width", options.lineWidth / 2);
  }

})();