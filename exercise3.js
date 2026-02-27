

function render(users) {

}

const userGrid = document.getElementById('userGrid');
const viewToggleButton = document.getElementById('viewToggleBtn');
const deleteInputButton = document.getElementById('deleteIdInput');
const deleteButton = document.getElementById('deleteBtn');
const sortGroupButton = document.getElementById('sortByGroupBtn');
const sortIdButton = document.getElementById('sortByIdBtn');

let users = [];
async function retrieveData() {
    let data = await fetch('https://69a1dfc02e82ee536fa26faf.mockapi.io/users_id')
    let parsedJSON = await data.json();
    users = parsedJSON;
    render(users);
    console.log(users);

}
function render(users) {
    userGrid.innerHTML = '';
    for (let user of users) {
        userGrid.innerHTML +=  `<article class="user-card">
                                <h3>${user.first_name ?? ""}</h3>
                                <p>first_name: ${user.first_name ?? ""}</p>
                                <p>user_group: ${user.user_group ?? ""}</p>
                                <p>id: ${user.id ?? ""}</p>
                                </article>
                                `;
    }
}
retrieveData();

viewToggleButton.addEventListener('click', function() {
    if(userGrid.classList.contains('grid-view')) {
        userGrid.classList.remove('grid-view');
        userGrid.classList.add('list-view');
    } else {
        userGrid.classList.remove('list-view');
        userGrid.classList.add('grid-view');
    }
});
sortGroupButton.addEventListener('click', () => {
    users.sort(function(a,b){
        return Number(a.user_group) - Number(b.user_group);
    })
    render(users);
});

sortIdButton.addEventListener('click', () => {
    users.sort(function(a,b){
        return Number(a.id) - Number(b.id);
    })
    render(users);
});


deleteButton.addEventListener('click', async () => {
    const idToDelete = deleteInputButton.value;
    try{ 
        let data = await fetch(`https://69a1dfc02e82ee536fa26faf.mockapi.io/users_id/${idToDelete}`, {method: 'DELETE'});
        retrieveData();
    }
    catch(error) {

    }
});
