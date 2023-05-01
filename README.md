# jnewman747.github.io

This portfolio was created using a Bootstrap template. The color scheme was chosen based on my favorite color blue. I ended up choosing a darker shade of blue along with gray text to try to match some of my projects which tend to have darker themes.

Many of these projects being presented are from the New Maps Program through the University of Kentucky. I wanted to give a shoutout for all the classmates who helped me (and gave me feedback) throughout my time working on this Graduate Certificate, especially Michael Sparks for all his help during the spring semester.


# Projects

## Final Project

## Wildlfires in Alaska

## Natural Landforms in Alaska

This map examined topography and natural landforms in Alaska. We used GDAL and QGIS to convert raster elevation units (https://www.usgs.gov/3d-elevation-program) to create contours. Then we used Mapbox to create a map using an arch (https://www.usgs.gov/us-board-on-geographic-names/download-gnis-data) in our selected state (mine being Alaska).

This map was created using GDAL, QGIS, and Mapbox.


## Predicted Habitat

This is a static map from my M.S. work at Clemson University involving effects of climate chnage on green salamanders. We collected salamanders in the field and brought them back to Clemson for a laboratory experiment. All work was done conducted under proper permitting. We determined water loss rates using a flow through machine and we used the results to create a hybrid model (correlative + mechanistic model) to predict potential refugia under different climatic scenarios and retraints. More information about this project and map can be found here: https://www.researchgate.net/publication/361109903_Integrating_physiology_into_correlative_models_can_alter_projections_of_habitat_suitability_under_climate_change_for_a_threatened_amphibian

This map was created using ArcGIS and MaxEnt.


## United States Energy Sources

This interactive map highlights three different renewable energy sources found in the United States: hydro, wind, and solar. Click on the individual dots to learn more about individual power plants and their generating capacity. Use the legend to toggle on and off the different energy layers. The data for this map was collected from here: http://www.eia.gov/electricity/data/eia923/

This map was created using Leaflet.


## Taco Tuesday

This interactive map may not seem relevant to the natural resources theme at first, but it does serve an important purpose! Wildlife biologists need to eat too, and what better bonding tool is there than food? Introverts, like myself, run out of things to talk about while in the field and so often times, the topic of "food" becomes an easy target. After a long day in the field, it has become an excellent (and tasty!) tradition to find the best eateries in town with my field crews.

This map was created using Leaflet.




## Map Topic

Freshwater turtle populations are declining globally. Threats to turtles include habitat destruction, road mortality, disease, climate change, and over-exploitation for food/pets. The above-mentioned manuscript highlights 54 cases of illegal trade of 24,000 freshwater turtles in the United States between the years 1998 and 2021. Using data from this paper, this map will illustrate the source states (the states in which an illegal trade was initiated) for each of the 54 cases of illegal trade. I can also include financial information such as fines that occur when a person poaches a turtle.

### Tentative title

Turtle Trade Routes in the U.S. Between 1998 - 2021


### Anticipated methods of thematic representation methods and user interface 

Choropleth map showing number of cases per state. Pop-ups outlining individual cases (species of turtles and number of turtles poached). Upon mouseover, states will change color and on mouse-out, they will re-set to original style.

### Mockups

![Newman_mockup1.jpg"](Newman_mockup1.jpg)
![Newman_mockup2.jpg"](Newman_mockup2.jpg)

## Map Objectives and User Needs

This map is necessary to bring awareness to the issue of turtle poaching in the United States. Turtle poaching has been a problem for several decades. There are not many manuscripts outlining this important issue. The public may not have access to these scientific papers anyways. This map would be accessible to not only scientists but the public. I am designing it because I am a conservation biologist who is passionate about preserving wildlife, paticularly herpetofauna. I have 10+ years of experience working with threatened and endangered species, including turtles.


I expect the user of this map to be researchers (i.e., principal investigators, graduate students), state agencies, non-profits (i.e., Turtle Survival Alliance), environmental law enforcement, and the general public (i.e., naturalists). I would expect user needs to be variable. For example, environmental law enforement may be eager to know which species of turtles are targets of poachers. This could help them narrow down where to look for poachers. Non-profits, on the other hand, might be more interested in using the information for a public outreach tool (i.e., "Have you seen this turtle?"). State agencies may be interested in the information regarding the number of species while they create their State Wildlife Action Plans to conserve wildlife.

## Technology Stack

I plan to use Excel to manipulate the data from the manuscript. From there I will perform a join in QGIS using a states layer from a previous module. I will save the layer as a geoJSON. I will be using Leaflet as my JS library.

## STRATEGY PLANE 

I want to see a visual representation of illegal turtle poaching in the United States. I want to be able to easily access information for all 54 cases of poaching. I want to make a product that could be usable for different users (researchers, law enforecement, non-profits, etc.) to better understand where and how turtles may be getting poached in the country.

## SCOPE PLANE

I will access data from a scientific manuscript entitled "Media portrayal of the illegal trade in wildlife: The case of turtles in the US and implications for conservation." From there, I will manipulate it in Excel and QGIS to make it into a geoJSON. I'm still thinking about if I want to organize this by year or by case.


## STRUCTURE PLANE

I plan to have a side panel with title, information, and a photo. There will be a legend showing the number of cases per state. See mockups for more information.


## SKELETON PLANE

 There will be pop-ups detailing the cases of turtle poaching. Further, I would like to have a mouseover/mouseout UI where the states change color (mouseover) and reset (mouseout).


## SURFACE PLANE

This is intended to be informational. I hope to share some information about illegal turtle poaching with the users.

## Article citations

After looking through the article, I couldn't find the table listing the locations of the 54 cases of turtle poaching. Apparently, it is in the supplementary materials and you have access to it. The data has were the poaching occurred and the destinations. A lot are international connections, which is baffling. Who is doing this and why is this happening? Is it profit? 

The list of media articles seems like a great resource to examine a selected number of incidents to answer these questions – and add detail to your presentation.

[Citations CSV](ArcticleCitations.csv)
