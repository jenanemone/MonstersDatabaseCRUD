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
        window.location.reload(true)
    })
    .catch((err) => {
        console.error(err)
    })
})

const deletayz = document.querySelectorAll('delete');
// hmm no worky
deletayz.forEach(e => e.addEventListener('click', (e) => {
    let monster = e.target.type
    console.log(`monster: ${monster}`)
    fetch('/deleteMonster', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: monster
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload(true)
    })
}))