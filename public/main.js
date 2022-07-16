const update = document.getElementById('update-button');

update.addEventListener('click', _ => async function(){
    // document.querySelector('form').method = "PUT";
    // document.querySelector('form').action = "/updateMonster";
    // fetch('/updateMonster', {
    //     method: 'put',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         "type": document.getElementById('typeInput').innerText,
    //         "features": document.getElementById('featuresInput').innerText
    //     })
    // })
    // console.log("entered update in main.js")
    const  response = await fetch(
        "updateMonster", {
            method: "put",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "type":document.getElementById('typeUpdate').innerText,
                "features": document.getElementById("featuresUpdate").innerText
            })
        }
    )
    const data = await response.json()
    console.log(data)
    location.reload()
})