let content = document.querySelector("#content")

// Crea una instancia de observer
const observer = new MutationObserver( (m) => {
    let newNodes = m[0].addedNodes;
    let pages = ['services', 'skills', 'about']
    const [url, categ] = window.location.href.split('#')
    newNodes.forEach(el => {
        if (pages.includes(el.id)) {
            let cc = document.querySelector("#"+el.id)
            fetch ("./data/"+el.id+".json")
                .then( res => res.json())
                .then( json => json.forEach(e => {
                    cc.innerHTML += `
                        <div class="card m-4" cat=${e.cat} style="width: 18rem;">
                            <img src=${e.src} class="card-img-top" alt="">
                            <div class="card-body">
                                <h4 class="card-title">${e.title}</h4>
                                <p class="card-text">${e.desc}</p>
                            </div>
                        </div>
                    `
                }))
                .then(() => filterCards(categ))
        }

    })
});

// Configura el observer:
const config = { attributes: true, childList: true, characterData: true };

// pasa al observer el nodo y la configuracion
observer.observe(content, config);

// filtrado de cards
function filterCards(category=undefined) {
    let cards = document.querySelector(".cardContainer").children
    for (let c of cards) {
        if (c.getAttribute("cat") === category || category === undefined) {
            c.style.display = ""
        } else {
            c.style.display = "none"
        }
    }
}