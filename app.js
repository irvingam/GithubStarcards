                /// Selectors ///
// root url
const APIurl = 'https://api.github.com/users/'
const form = document.getElementById('form')
const search = document.getElementById('user-search')
const button = document.getElementById('user-submit')

                /// Evnets ///
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
        console.log(res.data)
    } catch(error) {
        console.log(error)
    }
}