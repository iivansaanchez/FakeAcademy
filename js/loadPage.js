function createDropDown(id) {
    let dropDown = document.createElement("ul")
    dropDown.id = "dropdown-" + id
    dropDown.classList.add("dropdown-content")
    return dropDown
}

function createLi(category, e) {
    let li = document.createElement("li")
    li.classList.add("dropdown-item")
    let a = document.createElement("a")
    a.href = `./${category}#${e}`
    a.innerHTML = e
    li.appendChild(a)
    return li
}

// llenar menu
function fillMenu(category) {
    let categories = []
    let menu = document.querySelector("#m"+category)
    fetch("./data/"+category+".json")
        .then( res => res.json())
        .then( json => json.forEach( e => {
            console.log(e.cat)
            if (!categories.includes(e.cat)) {
                categories.push(e.cat)
            }
        })).then( () => {
            if (categories) {
                menu.appendChild(createDropDown(category))
                let dropDown = document.querySelector("#dropdown-"+category)
                categories.forEach(e => {
                    let li = createLi(category, e)
                    dropDown.appendChild(li)
                    // menu.lastElementChild.innerHTML+= `
                    // <li class="dropdown-item"><a href='./${category}#${e}'>${e}</a></li>
                    // `
                })
            }}
        ). then(() => {

            const dropdownList = document.querySelectorAll(".dropdown-list");
            dropdownList.forEach((e) => e.addEventListener("mouseover", () => e.lastElementChild.classList.add("show")));
            dropdownList.forEach((e) => e.addEventListener("mouseout", () => e.lastElementChild.classList.remove("show")))
        
        })
}

fillMenu("skills")
fillMenu("services")
fillMenu("about")