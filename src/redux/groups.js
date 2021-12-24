export function addGroup(newGroup, groupId) {
    return {
        type: "ADD_GROUP",
        groupName: newGroup,
        groupId: groupId
    }
}

export function deleteGroup(deletingGroup) {
    return {
        type: "DELETE_GROUP",
        payload: deletingGroup
    }
}

export function addStudent(name, lastname, studentsGroupId, studentId) {
    return {
        type: "ADD_STUDENT",
        name: name,
        lastname: lastname,
        studentsGroupId: studentsGroupId,
        studentId: studentId
    }
}

export function deleteStudent(studentId, studentsGroupId) {
    return {
        type: "DELETE_STUDENT",
        studentId: studentId,
        studentsGroupId: studentsGroupId
    }
}

// export default function userReducer(user = JSON.parse(localStorage.getItem('authUser')), action)
export default function groupReducer(state = null, action) {
    switch(action.type) {
        case "ADD_GROUP": {
            if (state) {
                return [...state,
                    {
                        id: action.groupId,
                        name: action.groupName,
                        isFinished: false,
                        students: []
                    }
                ]
            } else {
                return [
                    {
                        id: action.groupId,
                        name: action.groupName,
                        isFinished: false,
                        students: []
                    }
                ]
            }
        }
        case "DELETE_GROUP": {
            return state.filter(elem => action.payload !== elem.id)
        }
        case "ADD_STUDENT": {
            return state.map(elem => {
                if (elem.id === action.studentsGroupId) {
                    return {...elem, students: [...elem.students, {
                            id: action.studentId,
                            name: action.name,
                            lastname: action.lastname,
                            isVisited: false
                        }]}
                } else {
                    return elem
                }
            })
        }
        case "DELETE_STUDENT": {
            return state.map(elem => {
                if (elem.id === action.studentsGroupId) {
                    return {
                        ...elem,
                        students: elem.students.filter(elem => action.studentId !== elem.id)}
                } else {
                    return elem
                }
            })
        }
        default:
            return state
    }
}