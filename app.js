                /// Selectors ///
// root url
const APIurl = 'https://api.github.com/users/'
// HTML IDs
const form = document.getElementById('form')
const search = document.getElementById('user-search')
const button = document.getElementById('user-submit')
const main = document.getElementById('main')

                /// Evnets ///
// searches username and profile
button.addEventListener('click', (e) => {
    e.preventDefault()

    const user = search.value 
    if(user) {
        getUser(user)
        search.value = ''
    }
})

                /// Functions ///
// gets username object
async function getUser(username) {
    try {
        const res = await axios(APIurl + username)
        createStarcard(res.data)
    } catch(error) {
        if(error.response.status == 404) {
            createErrorCard('No profile with that username')
        }
    }
}

function createStarcard (user) {
    const newHTML = `
<div class="starcard">
    <div>
        <img src="${user.avatar_url}" alt="user image" class="starcard_avatar">
    </div>
    <div class="starcard_user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>

        <div class="starcard_repos">
            <a href="" class="repos">Repo 1</a>
            <a href="" class="repos">Repo 2</a>
            <a href="" class="repos">Repo 3</a>
        </div>
    </div>
</div>`

    main.innerHTML = newHTML
}

// creates an error message when user isn't found
function createErrorCard (msg) {
    const errorHTML = `
        <div class="err-msg">
            <h1>${msg}</h1>
        </div>`

    main.innerHTML = errorHTML
}