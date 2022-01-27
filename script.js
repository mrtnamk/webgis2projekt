require([
  'esri/Map', 
  'esri/views/MapView',
  'esri/layers/FeatureLayer',
  'dijit/form/Button',
  'esri/widgets/BasemapGallery',
  'esri/widgets/Expand',
  'esri/widgets/Legend',
  'esri/widgets/LayerList',
  'esri/widgets/Measurement',
  'esri/widgets/Search',
  'esri/geometry/Point',
  ], (Map, MapView,  FeatureLayer, Button, BasemapGallery, Expand, Legend, LayerList, Measurement, Search, Point) =>{
    
  
      const map = new Map({
        basemap: "topo-vector" 
      });
  
      const view = new MapView({
        map: map,
        container: "mapDiv",
        zoom: 6,
        center: [19.11, 52.06],
        
      });
      const fl = new FeatureLayer({
        url:"https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Parki_narodowe/FeatureServer"
      });
     
      map.add(fl);
      const zoomIn = new Button({
        onClick: () => {
            view.zoom = view.zoom +1;
        }
      }, "ZoomIn");
    
      const zoomOut = new Button({
        onClick: () => {
            view.zoom = view.zoom - 1;
        }
      }, "zoomOut");
  
     const popupTmpl = {
       title: "Park Narodowy", 
       content: "<b>Nazwa:</b> {nazwa}"
     }
  
     const trailheadNarodowe = new FeatureLayer({
      url:"https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/Parki_narodowe/FeatureServer",
      outFields:["nazwa"], 
      popupTemplate: popupTmpl
  
     });
  
     map.add(trailheadNarodowe, 0);
  
    const basemapGallery = new BasemapGallery({
      view: view
    });
  
  
    let expWg = new Expand({
      view: view,
      content: basemapGallery
  
    });
  
    view.ui.add(expWg, "top-right");
  
    let legend = new Legend({
      view: view
    });
  
    let expLegend = new Expand({
      view: view,
      content: legend
  
    });
  
  
    view.ui.add(expLegend, "bottom-left");
  
    let layerList = new LayerList({
      view: view
    });
  
    let expLL = new Expand({
      view: view, 
      content: layerList
    })
  
    view.ui.add(expLL,"top-left");
  
    let measurement = new Measurement({
      view: view,
      activeTool:"distance"
    });

    let expM = new Expand({
      view: view,
      content:measurement
    });

    view.ui.add(expM, "top-left");
  
    function switchTool() {
      let tool = measurement.activeTool === "distance" ? "area" : "distance";
      measurement.activeTool = tool;
     };
  
     let searchWidget = new Search({
       view: view
  
     });
  
     view.ui.add(searchWidget, {
       position: "bottom-right",
       index: 2
     });
  
     view.on("mouse-wheel", function(evt){
      evt.startPropagation;
    });
  
    let slowinski = new Point({
      latitude: 54.688489,
      longitude: 17.317273
  
    });
  
    let babiogorski = new Point({
      latitude: 49.593175,
      longitude: 19.531148
    });
  
    let karkonoski = new Point({
      latitude:50.786624,
      longitude: 15.637128
  
    });
  
    let gorczanski = new Point({
      latitude: 49.549268,
      longitude: 20.151062
  
    });
    
    let k = document.getElementById("k");
    let s = document.getElementById("s");
    let b = document.getElementById("b");
    let g = document.getElementById("g");
  
    let opts = {
      duration: 5000
    };
  
    k.addEventListener("click", function(){
      view.goTo({
        target: karkonoski, 
        zoom: 10
      }, opts);
  
    });
  
    s.addEventListener("click", function(){
      view.goTo({
        target: slowinski, 
        zoom: 10
      }, opts);
  
    });
  
    g.addEventListener("click", function(){
      view.goTo({
        target: gorczanski, 
        zoom: 10
      }, opts);
  
    });
    
    b.addEventListener("click", function(){
      view.goTo({
        target: babiogorski, 
        zoom: 10
      }, opts);
  
    });
  
  
  
  
  
  
  
  
  
  
  });
