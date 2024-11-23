document.addEventListener("DOMContentLoaded", () => {

    
    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e.target.park.value)
        formEntry(e.target.park.value)
    })
    // const imageone = document.getElementById("img1"), imagetwo = document.getElementById("img2"), imagethree = document.getElementById("img3")
    
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
        handleParks(json.data)
    })


    function handleParks(data) {
        console.log(data)
       console.log(globalData)
    
    }

    // function formEntry(search,) {

    //  }

    // function search(e, imageone, imagetwo, imagethree) {
    //     console.log(e)
        
    // }



});

