document.addEventListener("DOMContentLoaded", () => {

    let form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e.target.input.value)
        createListGroup(e.target.input.value)
    })

    let carousel = document.getElementById("myCarousel")
    let map = document.getElementById("usamap")
    let ol = document.getElementById("list-group")

    let button = document.getElementById("togglebutton")
    button.addEventListener("click", (e) => {
        console.log(e.target)
        toggleImages(e)
    })
   
    let imageone = document.getElementById("img1"), imagetwo = document.getElementById("img2"), imagethree = document.getElementById("img3")
    
    let globalData


    fetch(`https://developer.nps.gov/api/v1/parks?api_key=1A1ysntfoonKKUeUWGZEkhfdQacwcXmb9kedUFy4`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json.data[0].states)
        console.log(json.data[0].entranceFees)
        console.log(json.data[0].operatingHours)
        console.log(json.data[0].activities)
        console.log(json.data[0].fullName)
        console.log(json.data[0].images)
        console.log(json.data[0].images[0].url)
        console.log(json.data[0])
        console.log(json.data)
        globalData = json.data
        createListGroup()
    })


    function createListGroup(state) {
        ol.innerHTML = null
        console.log(state)
        map.className = "hidden"
        form.className = "hidden"
        carousel.className = "nothidden"

        let parks = globalData.filter((park) => park.states == state)
          console.log(parks)

       for (let i = 0; i < parks.length; i++) {
        // let ol = document.getElementById("list-group")
             let listitem = document.createElement("li")
             listitem.className = "list-group-item"
             listitem.id = `${i}`
             listitem.innerText = parks[i].fullName
             listitem.addEventListener('mouseover', (e) => {
             listitem.className = "list-group-item active"
            })
            listitem.addEventListener('mouseout', (e) => {
                 listitem.className = "list-group-item"
            })
             listitem.addEventListener('click', (e) => {
                 fillCarousel(e)
              })
                 ol.appendChild(listitem)
            }
         }
    

    function fillCarousel(e) {
        console.log(imageone)
        console.log("clicked")
        console.log(e.target.innerHTML)
        let parkimage = document.getElementById("parkimage")
         
        let name = e.target.innerHTML
        let park = globalData.find((park) => park.fullName == name)
        console.log(park)
        let images = park.images
        let p = document.getElementById("p")
        console.log(p)
        p.innerText = park.fullName
        console.log(images)
        parkimage.src = images[4].url
            imageone.src = images[0].url
            imagetwo.src = images[1].url
            imagethree.src = images[2].url

            parkInfo()

    }

    function parkInfo() {
        

    }

    // <div id="myCarousel" class="carousel slide" data-ride="carousel"></div>
    function toggleImages(e) {
        if (carousel.className == "hidden") {
            carousel.className = "nothidden"
            map.className = "hidden"
            form.className = "hidden"
        } else {
            carousel.className = "hidden"
            map.className = "nothidden"
            form.className = "nothidden"
        }
    }



});




// let globalData

// async function myFunction () {
//   const res = await fetch('./../JSON.json')
//   const data = await res.json()
//   globalData = data
//   console.log(globalData)
// }
// myFunction()