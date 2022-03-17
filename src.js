var ids = [];

function clickfunc(){
    document.getElementById('a').style.color = "red";
    console.log("hello");
}

function httpGet()
{
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", 'https://ravager6969.github.io/Title_Database_Website/posts', false ); // false for synchronous request
xmlHttp.send( null );
return xmlHttp.responseText;
}

function update(){
    var data = httpGet();
    var list = document.getElementById('list');
    data = JSON.parse(data);
    for (let i = 0; i<Object.keys(data).length; i++){
        if (!ids.includes(data[i]['_id'])){
            ids.push(data[i]['_id']);
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(data[i]['title']));
            entry.id = i;
            list.appendChild(entry);
        }
    }
    var input = document.getElementById('input').value = "";

    var queries = document.querySelectorAll('li');

    for (let i = 0; i < queries.length; i++){
        queries[i].addEventListener('mouseover', hoverover);
    }
}

function post(t){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'https://ravager6969.github.io/Title_Database_Website/posts', false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify({
        title : t
    }));
    update();
}

function del(index){
    var item_id = ids[index-1];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", 'https://ravager6969.github.io/Title_Database_Website/posts' + item_id, false ); // false for synchronous request
    xmlHttp.send( null );

    update();
    location.reload();
}



function hoverover(event){
    var iddisplay = document.getElementById("id_display");
    iddisplay.textContent = "Id: "+ids[event.target.id];
}

window.onload = update;
