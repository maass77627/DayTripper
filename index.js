document.addEventListener("DOMContentLoaded", () => {

    let form = document.getElementById("form"), wish = document.getElementById("wish"), been = document.getElementById("been")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        createListGroup(e.target.input.value)
    })

    // let wish = document.getElementById("wish")
    wish.addEventListener("click", (e) => {
        
        bucketList(e.target.parentNode)
    })

    been.addEventListener("click", (e) => {
        travelsCard(e.target.parentNode)
    })

    let carousel = document.getElementById("myCarousel"), map = document.getElementById("usamap"), ol = document.getElementById("list-group"), p = document.getElementById("parkdes") 
    
    let buttontwo = document.getElementById("delete")
    buttontwo.addEventListener("click", (e) => {
        deleteWish(e.target.parentNode.parentNode)
    })

    let button = document.getElementById("togglebutton")
    button.addEventListener("click", (e) => {
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
        map.className = "hidden"
        form.className = "hidden"
        carousel.className = "nothidden"

        let parks = globalData.filter((park) => park.states == state)

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

    let count = 1
    function bucketList(e) {
        let name = document.getElementById("parkhead")
        let pic = document.getElementById("parkimage")
        let newname = name.innerText
        let src = pic.src

        if (count < 5) {
             let tablename = document.getElementById(`${count}`)
             let image = document.getElementById(`timg${count}`)
             console.log(image)
             image.src = src
             tablename.innerText = newname
            count += 1
        }
            
            console.log(count)
    }


    function deleteWish(event) {
        console.log(event)
       
    }

    function travelsCard() {
        let head = document.getElementById("parkhead")
             let title = head.innerText
             let oldimage = document.getElementById("parkimage")
             let src = oldimage.src
             let cardimage = document.getElementById("cardimage")
            let cardname = document.getElementById("cardtitle")
             let cardtext = document.getElementById("cardtext")
                cardimage.src = src,
                cardname.innerText = title,
                cardtext.innerHTML = "Ive traveled here before"
        
    }


});



