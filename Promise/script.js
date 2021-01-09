fetch("https://restcountries.eu/rest/v2/all")
.then((data) => {
    return data.json()
}).then((data) => {
    div_container = document.createElement("div")
    div_container.setAttribute("class", "container ")
    div_row = document.createElement("div")
    div_row.setAttribute("class", "row text-center justify-content-center")
    for(var i=0; i<data.length; i++){
        div1 = document.createElement("div");
        div1.setAttribute("class", "card text-white bg-secondary mb-3")
        div1.style.maxWidth = "18rem"
        div2 = document.createElement("div");
        div2.setAttribute("class", "card-header")
        div2.innerHTML = data[i].name
        div3 = document.createElement("div");
        div_img = document.createElement("img")
        div_img.src = data[i].flag
        div_img.alt = data[i].name
        div_img.setAttribute("class", "card-img-top")
        div3.setAttribute("class","card-body")
        h = document.createElement("h5");
        h.setAttribute("class", "card-title")
        if(data[i].capital == "")
        h.innerHTML = "No capital"
        else
        h.innerHTML = "Capital: "+data[i].capital
        p = document.createElement("p");
        p.setAttribute("card","card-text")
        p.innerHTML = "Region: "+data[i].region
        p2 = document.createElement("p");
        p2.setAttribute("card","card-text")
        p2.innerHTML = "Country code: "+data[i].alpha3Code;
        let latlng = data[i].latlng
        button = document.createElement("button")
        button.setAttribute("id",latlng);
        button.setAttribute("class", "btn btn-primary")
        button.innerHTML = "Click for weather"
        button.addEventListener("click",function(){
            foo(this)
        });
        div3.append(h,p,p2,button)
        div1.append(div2,div_img,div3)
        div_col = document.createElement("div")
        div_col.setAttribute("class", "col-lg-4 col-sm-12 d-flex justify-content-sm-center")
        div_col.append(div1)
        div_row.append(div_col)
    }
    div_container.append(div_row)
    document.body.appendChild(div_container)
    
})
.catch((error) => {
    console.log(error , "is the error")
})     

function foo(n){
    console.log(n.id)
    let lat = n.id.split(',')[0]
    let lng = n.id.split(',')[1]
    console.log(lat , lng)
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=9416fa2974b338f6ff33a8f22f979545")
    .then((data1) => {
        return data1.json()
    })
    .then((data2) => {
        console.log(data2)
        console.log("The temperature is "+data2.main.temp+" Kelvin")
        console.log("Weather: ",data2.weather[0].description)
        alert("The temperature is "+data2.main.temp+" Kelvin and weather seems to have "+data2.weather[0].description)
    })
    .catch((error) => {
        console.log(error + " is the error")
    })
}