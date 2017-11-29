var kart1 = '{"lengde": 20, "kollisjon" : [[2,0,0,20,2,0],[0,0,0,0,30],[0,20,30,20,0]], "data":[[0, 0,0, 20,0, 20,2, "green"]]}';



// JSONKART STRUKTUR
// lengde: tall --> hvor langt kartet er. spilleren kan ikke gå utenfor denne boksen
// kollisjon --> en liste med alle vegger, gulv og tak som er på et kart
//    struktur for kollisjon:
//      vegger:
//        0: 0
//        1: x1
//        2: y1
//        3: x2
//        4: y2
//
//     tak:
//        0: 1
//        1: x1
//        2: y1
//        3: x2
//        4: y2
//
//     gulv:
//        0: 2
//        1: x1
//        2: y1
//        3: x2
//        4: y2
//        5: sjekkdybde --> hvor langt under gulvet skal spilleren regnes som "oppå", for eksempel hvis sjekkdybden er 1 enhet(like høy som spilleren)
//           vil datamaskinen sjekke om spilleren sin posisjon er innenfor en rekkevidde av 1 enhet og hvis den er om spilleren er under gulvet. Hvis
//           begge kriteriene er sant blir fallfarten til spilleren kanselert og han blir plassert oppå gulvet.

function readMap(JSONtext){
    console.log ("reading map");
    var m = JSON.parse(JSONtext);

    return m;
}
// laster inn kartet fra en JSON objekt
function loadMap(object){
  console.log("loading map");


	CollisionData = [];
	for (var i = 0; i < object.kollisjon.length; i++){
		CollisionData[i] = [];
		for (var j = 0; j < object.kollisjon[i].length; j++){
			CollisionData[i][j] = object.kollisjon[i][j];
		}
  }
  

	MapData = [];
	for (var k = 0; k < object.data.length; k++){
		MapData[k] = [];
		for (var l = 0; l < object.data[k].length;l++){
			MapData[k][l] = object.data[k][l];
    }
  }


  Entities = [];
  for (var o = 0; o < object.enhet.length; o++){
      Entities[o] = new Entity(object.enhet[o][0],
                               object.enhet[o][1],
                               object.enhet[o][2],
                               object.enhet[o][3],
                               object.enhet[o][4],
                               0,
                               object.enhet[o][5]
                              );
  }

  EntityTypes = [];
  for (var p = 0; p < object.enhetID.length; p++){
    EntityTypes[p] = [];
    for (var u = 0; u < object.enhetID[p].length; u++){
      EntityTypes[p][u] = object.enhetID[p][u];
    }
  }

}

function loadDoc(url) {
    console.log("laster inn kart: " +url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState + " " + this.status);
      if(this.readyState != 4 && this.status != 200) {
        loadedData = "NOTHING";
      }
      else{
        loadedData = xhttp.responseText;
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
var loadedData = "";