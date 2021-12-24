export function userAuth(currentUser) {
    return {
        type: "USER_AUTH",
        payload: currentUser
    }
}

export default function userReducer(user = JSON.parse(localStorage.getItem('authUser')), action) {
    switch(action.type) {
        case "USER_AUTH": {
            return user = action.payload
        }
        default:
            return user
    }
}