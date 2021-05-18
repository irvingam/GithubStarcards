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
        const { data } = await axios(APIurl + username)
        createStarcard(data)
        getRepo(username)
    } catch(error) {
        if(error.response.status == 404) {
            createErrorCard('No profile with that username')
        }
    }
}

// fetches repositories of username searched
async function getRepo(username) {
    try {
        const { data } = await axios(APIurl + username + '/repos?sort=created')
        addRepo(data)
    } catch(error) {
        if(error.response.status == 404) {
            createErrorCard('Problem fetching repos')
        }
    }
}

// creates a starcard for username searched
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

        <div class="starcard_repos" id="repos"></div>

        <div class="profile-links">
            <a href"${user.html_url}" class="links">Visit Page</a>
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

// adds repos to starcard
function addRepo(repos) {
    const reposElement = document.getElementById('repos')

    repos
        .slice(0, 4) // limits the number of repos to 4
        .forEach(repo => {
        const repoElement = document.createElement('a')
        repoElement.classList.add('repo')
        repoElement.href = repo.html_url
        repoElement.target = '_blank'
        repoElement.innerText = repo.name

        reposElement.appendChild(repoElement)
    })
}