const update = document.getElementById('update-button');

update.addEventListener('click', _ => {
    fetch(
        "/updateMonster", {
            method: "put",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "type":document.getElementById('typeUpdate').value,
                "features": document.getElementById("featuresUpdate").value
            })
        }
    )
    .then(() => {
        window.location.reload()
    })
    .catch((err) => {
        console.error(err)
    })
})