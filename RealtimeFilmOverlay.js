const location = "";
const localTime = "E:LOCAL TIME";
const latitude = "A:PLANE LATITUDE";
const longitude = "A:PLANE LONGITUDE";


this.store = {
    active: false,
}
this.update_interval=.5;  //Refresh Interval (Seconds)
this.$api.datastore.import(this.store);

html_created((el) => {
	this.cellLocation = document.getElementById("location");
 this.cellLatitude = document.getElementById("latitude");
 this.cellLongitude = document.getElementById("longitude");
	
	this.update_elements();
}); 

this.update_elements = () => {
	document.getElementById("location-container").style.display=(this.store.active ? "block":"none"); 
 this.stateLatitude = this.$api.variables.get(latitude, "degrees latitude").toFixed(3);
 this.stateLongitude = this.$api.variables.get(longitude, "degrees longitude").toFixed(3); 
	
	// Uhrzeit umrechnen
let timeInSeconds = Math.round(this.$api.variables.get(localTime, "Seconds"));
let date = new Date(null);
date.setSeconds(timeInSeconds);
let hours = date.getUTCHours().toString().padStart(2, '0');
let minutes = date.getUTCMinutes().toString().padStart(2, '0');
this.stateLocalTime = `${hours}:${minutes}`;
this.cellLocalTime = document.getElementById("localtime");

// Position der Sonne
let sunPosition = this.$api.time.get_sun_position();

this.cellLatitude.innerHTML = this.stateLatitude;
this.cellLongitude.innerHTML = this.stateLongitude;
this.cellLocalTime.innerHTML = this.stateLocalTime;

switch (this.stateLatitude) {
        case "51.479":
            this.cellLocation.innerHTML = "Greenwich Park, London, UK";
            break;
        case "25.912":
            this.cellLocation.innerHTML = "Brahmaputra River, Assam, India";
            break;
        case "35.402":
            this.cellLocation.innerHTML = "Izushi River, Kyoto Province, Japan";
            break;
        case "-16.292":
            this.cellLocation.innerHTML = "Natewa Bay, Vanua Levu, Fiji";
            break;
        case "-14.626":
            this.cellLocation.innerHTML = "Minas Gerais, Brazil";
            break;
        case "-23.983":
            this.cellLocation.innerHTML = "Namib Desert, Namibia";
            break;
        case "-17.500":
            this.cellLocation.innerHTML = "Off Mo'orea-Mai'ao, French Polynesia";
            break;
        case "54.085":
            this.cellLocation.innerHTML = "Tigalda Island, Alaska, USA";
            break;
        case "60.000":
            this.cellLocation.innerHTML = "Near Novaya Arman, Russia";
            break;
        case "-21.171":
            this.cellLocation.innerHTML = "Near Bernheim, New Caledonia";
            break;
        case "39.747":
            this.cellLocation.innerHTML = "Denver, Colorado, USA";
            break;
        case "-52.000":
            this.cellLocation.innerHTML = "East Head, Falkland Islands";
            break;
        case "-14.754":
            this.cellLocation.innerHTML = "Nazca, Peru";
            break;
        case "37.000":
            this.cellLocation.innerHTML = "Near Aqdash, Iran";
            break;
        case "24.993":
            this.cellLocation.innerHTML = "Qingshui River, Xingyi Province, China";
            break;
        case "11.997":
            this.cellLocation.innerHTML = "Santa Monica Island, Phillipines";
            break;
        case "51.000":
            this.cellLocation.innerHTML = "Mashkhur Jusup, Kazakhstan";
            break;
        case "42.599":
            this.cellLocation.innerHTML = "Near Zeistecho, Georgia";
            break;
        case "62.999":
            this.cellLocation.innerHTML = "Near Herajoki, Finland";
            break;
        case "68.810":
            this.cellLocation.innerHTML = "Southeastern Greenland Ice Sheet";
            break;
        case "65.345":
            this.cellLocation.innerHTML = "Mulathing, Iceland";
            break;
        case "-23.100":
            this.cellLocation.innerHTML = "Mangareva, Gambier Islands, French Polynesia";
            break;
        case "42.848":
            this.cellLocation.innerHTML = "Waldwick, Wisconsin, USA";
            break;    
        case "48.997":
            this.cellLocation.innerHTML = "Haig Mountain, Washington, USA";
            break;
        }    
}

this.update_counter=0;	
loop_30hz(()=>{
	if(this.store.active && (this.update_counter >= (this.update_interval*30))){
		this.update_counter=0;
		this.update_elements();
	}
	this.update_counter++;
});

run(() => {
	this.store.active=!this.store.active;
	this.$api.datastore.export(this.store);
	this.update_elements();
	return 2000;
});

style(() => {
    return this.store.active ? 'active' : 'inactive';
});