let users = [];
function createUsersList() {
    let input = document.querySelector('.get-users__input > input[type="text"]');
    let addUserBtn = document.querySelector('.get-users__input > input[type="button"]');
    let userList = document.querySelector('.get-users__list');
    // let deleteUserBtns = document.querySelectorAll('.get-users__delete');

    function deletingUsers() {
        deleteUserBtns = document.querySelectorAll('.get-users__delete');
        deleteUserBtns.forEach(elem => {
            elem.addEventListener('click', function() {
                let li = elem.closest('li');
                let login = li.innerText;
                if (users.indexOf(login) >= 0) {
                    users.splice(users.indexOf(login), 1);
                }
                li.remove();
                // console.log(users);
            });
        });
    }

    addUserBtn.addEventListener('click', function() {
        let login = input.value;
        let li = document.createElement('li');
        let btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Удалить');
        btn.classList.add('get-users__delete');
        li.innerText = login;
        li.appendChild(btn);
        userList.appendChild(li);
        users.push(login);
        input.value = '';
        deletingUsers();
    });
}
createUsersList();


async function getUsers() {
    let urls = users.map(username => {
        return `https://api.github.com/users/${username}`
    });
    let usersOutput = [];

    for (let url of urls) {
        let user = fetch(url).then(
            successResponse => {
                if (successResponse.status == 200) {
                    return successResponse.json(); 
                } else if (successResponse.status == 404) {
                    return null;
                }
            },
            failedResponse => {
                console.log('Пользователь не найден');
                return null;
            }
        );
        usersOutput.push(user);
    }
    let results = await Promise.all(usersOutput);
    return results;
}
let getUsersBtn = document.getElementById('getUsersBtn');
getUsersBtn.addEventListener('click', async function() {
    let users = await getUsers();
    console.log(users);
});


// checkFetchLoading();