document.addEventListener("DOMContentLoaded", () => {

    
    // const form = document.querySelector("form")
    //         form.addEventListener("submit", (e) => {
    //             e.preventDefault()
    //             console.log(e.target.park.value)
    //             formEntry(e.target.park.value)
    //         })
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

    function createListGroup() {
        console.log(globalData.length)
        for (let i = 0; i < globalData.length; i++) {
             console.log(i)
             let ol = document.getElementById("list-group")
             let listitem = document.createElement("li")
             listitem.className = "list-group-item"
             listitem.id = `${i}`
             listitem.innerText = globalData[i].fullName
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
        
         
        let name = e.target.innerHTML
        let park = globalData.find((park) => park.fullName == name)
        console.log(park)
        let images = park.images
        let p = document.getElementById("p")
        console.log(p)
        p.innerText = park.fullName
        console.log(images)
            imageone.src = images[0].url
            imagetwo.src = images[1].url
            imagethree.src = images[2].url

    }

    // for (let i = 0; i < 5; i++) {
    //     console.log("The number is " + i);
    //     }

    // function handleParks(data) {
    //     console.log(data)
    //    console.log(globalData)
    
    // }

    function formEntry(search) {
        console.log(search)

    }

    // function search(e, imageone, imagetwo, imagethree) {
    //     console.log(e)
        
    // }



});




// let globalData

// async function myFunction () {
//   const res = await fetch('./../JSON.json')
//   const data = await res.json()
//   globalData = data
//   console.log(globalData)
// }
// myFunction()