export function addClass(date, group) {
    return {
        type: "ADD_CLASS",
        date: date,
        group: group
    }
}

// export function deleteClass(groupId) {
//
// }

export function checkClass(date, groupId) {
    return {
        type: "CHECK_CLASS",
        date: date,
        groupId: groupId
    }
}

export function checkVisit(studentId, date, group) {
    return {
        type: "CHECK_VISIT",
        studentId: studentId,
        date: date,
        group: group
    }
}

export default function classesReducer(state = null, action) {
    switch(action.type) {
        case "ADD_CLASS": {
            if (state) {
                return {...state, [action.date]: (state[`${action.date}`] ?
                        [...state[`${action.date}`], action.group] :
                        [action.group])}
            } else {
                const result = {}
                result[action.date] = [action.group]
                return result
            }
        }
        case "CHECK_CLASS": {
            console.log("I've 22222got it")
            console.log(action.date)
            console.log(action.groupId)
            console.log(state[`${action.date}`])
            return {
                ...state, [action.date]: (state[`${action.date}`].map(elem => elem.id === action.groupId ?
                        {...elem, isFinished: !elem.isFinished} :
                        elem
                ))
            }
        }
        case "CHECK_VISIT": {
            console.log("I've got it")
            console.log(state)
            console.log(action.studentId, action.day, action.group)

            return {
                ...state, [action.date]: (state[`${action.date}`].map(elem => elem.id === action.group ? {
                            ...elem, students: elem.students.map(item => item.id === action.studentId ? {
                                ...item, isVisited: !item.isVisited} :
                                item
                        )
                } : elem
                ))
            }
        }
        default:
            return state
    }
}