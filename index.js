// Your code here

function createEmployeeRecord([firstName,familyName,title,payRate]) {
    return {firstName:firstName,familyName:familyName,title:title,payPerHour:payRate,timeInEvents:[],timeOutEvents:[]}
}

function createEmployeeRecords(arrayOfArrays) {
    // let returnObjects = []
    // arrayOfArrays.forEach(array => returnObjects.push(createEmployeeRecord(array)))
    let returnObjects = arrayOfArrays.map(array => createEmployeeRecord(array))
    return returnObjects
}

function createTimeInEvent(object,timestamp) {
    const dateTime = timestamp.split(' ')
    const hour = parseInt(dateTime[1])
    const date = dateTime[0]

    object.timeInEvents.push({type:'TimeIn',hour:hour,date:date})

    return object
}

function createTimeOutEvent(object,timestamp) {
    const dateTime = timestamp.split(' ')
    const hour = parseInt(dateTime[1])
    const date = dateTime[0]

    object.timeOutEvents.push({ type: 'TimeOut', hour: hour, date: date })

    return object
}

function hoursWorkedOnDate(object,date) {
    const listTimeIn = object.timeInEvents
    const listTimeOut = object.timeOutEvents
    const timeIn = []
    listTimeIn.forEach(timeEvent=>{if(timeEvent.date === date){timeIn.push(timeEvent.hour)}})

    const timeOut = []
    listTimeOut.forEach(timeEvent=>{if(timeEvent.date === date){timeOut.push(timeEvent.hour)}})

    const hours = timeOut - timeIn

    return hours/100
}

function wagesEarnedOnDate(object,date) {
    const hours = hoursWorkedOnDate(object,date)
    const payRate = object.payPerHour

    const payOwed = hours * payRate

    return payOwed
}


function allWagesFor(object) {
    let datesWorked = []
    // object.timeInEvents.forEach(timeEvent=>datesWorked.push(timeEvent['date']))
    datesWorked = object.timeInEvents.map(timeEvent=>timeEvent.date)

    // let allWages = 0
    // datesWorked.forEach(date=>allWages += wagesEarnedOnDate(object,date))
    let allWages = datesWorked.reduce((accumulator,date)=> accumulator + wagesEarnedOnDate(object,date),0)
    
    return allWages
}


function calculatePayroll(arrayOfRecords) {
    // let sumOfAllPayOwed = 0
    // arrayOfRecords.forEach(record => sumOfAllPayOwed += allWagesFor(record))
    let sumOfAllPayOwed = arrayOfRecords.reduce((accumulator,record)=> accumulator + allWagesFor(record),0)

    return sumOfAllPayOwed
}