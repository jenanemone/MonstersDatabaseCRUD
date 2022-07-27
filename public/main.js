const update = document.getElementById('update-button');

update.addEventListener('click', _ => {
    fetch(
        "updateMonster", {
        method: "put",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "type": document.getElementById('typeUpdate').value,
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

const deletayz = document.querySelectorAll('.deleter');
deletayz.forEach(e => e.addEventListener('click', deleteMonster));


// hmm no worky
async function deleteMonster() {
    const monster = this.parentNode.childNodes[1].innerText.trim()
    console.log(`monster: ${monster}`)
    try {


        const res = await fetch('/deleteMonster', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'typeToDelete': monster
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload(true)
    }
    catch(err) {
        console.log(err)
    }
}
