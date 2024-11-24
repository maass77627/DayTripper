document.addEventListener("DOMContentLoaded", () => {

    let form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log(e.target.input.value)
        createListGroup(e.target.input.value)
    })

    let wish = document.getElementById("wish")
    wish.addEventListener("click", (e) => {
        console.log("clicked")
        // console.log(e.target.parentNode.childNodes)
        // console.log(e.target.parentNode)
        console.log(e.target.parentNode)
        bucketList(e.target.parentNode)
    })

    let carousel = document.getElementById("myCarousel")
    let map = document.getElementById("usamap")
    let ol = document.getElementById("list-group")
    // let ul = document.getElementById("details")
    let p = document.getElementById("parkdes")

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
       
        let parkimage = document.getElementById("parkimage")
        let name = e.target.innerHTML
        let park = globalData.find((park) => park.fullName == name)
        
        let images = park.images
        let p = document.getElementById("p")
        
        p.innerText = park.fullName
        
        parkimage.src = images[4].url
        imageone.src = images[0].url
        imagetwo.src = images[1].url
        imagethree.src = images[2].url

            parkInfo(park)
        }

    function parkInfo(park) {
        let hours = park.operatingHours[0].standardHours
        let header = document.getElementById("parkhead")
        header.innerText = park.fullName
        p.innerText = "\n \n Name:" + " " + park.name + "\n State: " + park.states + "\n Hours: \n" + " Monday: " + hours.monday + "\n Tuesday: " + hours.tuesday +  "\n Wednesday: " + hours.wednesday + "\n Thursday: " + hours.thursday + "\n Friday: " + hours.friday
       
        let weather = document.getElementById("weather")
        weather.addEventListener("click", (e) => {
            p.innerText = null
            p.innerText = "\n \n" + park.weatherInfo
        })
        let activities = document.getElementById("activities")
        activities.addEventListener("click", (e) => {
            p.innerText = null
            for (let i = 0; i < park.activities.length; i++) {
                   p.innerText += " " + park.activities[i].name + ",  "
                 }
        })
         let main = document.getElementById("main")
         main.addEventListener("click", (e) => {
            p.innerText = null
            p.innerText = "\n \n Name:" + " " + park.name + "\n State: " + park.states + "\n Hours: \n" + " Monday: " + hours.monday + "\n Tuesday: " + hours.tuesday +  "\n Wednesday: " + hours.wednesday + "\n Thursday: " + hours.thursday + "\n Friday: " + hours.friday
        })
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

    function bucketList(e) {
        console.log(e)
        let name = document.getElementById("parkhead")
        let pic = document.getElementById("parkimage")
        console.log(name)
        console.log(pic)
        let newname = name.innerText
        let src = pic.src
        console.log(src)
        console.log(newname)
        // let newname = name.innerHTML.slice(6)
        // console.log(newname)
        // let timg1 = document.getElementById("timg1")
        // timg1.src = src
        // let nameplace = document.getElementById("2")
        // nameplace.innerText = newname
    }



});




