// Your code here

function createEmployeeRecord([firstName,familyName,title,payRate]) {
    return {'firstName':firstName,'familyName':familyName,'title':title,'payPerHour':payRate,'timeInEvents':[],'timeOutEvents':[]}
}

function createEmployeeRecords(arrayOfArrays) {
    let returnObjects = arrayOfArrays.forEach(array => createEmployeeRecord(array));
    return returnObjects
}

function createTimeInEvent(object,timestamp) {
    const dateTime = timestamp.split(' ')
    const hour = dateTime[1]
    const date = dateTime[0]
    object['timeInEvents'] = {'type':'TimeIn','hour':hour,'date':date}
}

function createTimeOutEvent(object,timestamp) {
    const dateTime = timestamp.split(' ')
    const hour = dateTime[1]
    const date = dateTime[0]
    object['timeInEvents'] = { 'type': 'TimeOut', 'hour': hour, 'date': date } 
}

function hoursWorkedOnDate(object,date) {
    const listTimeIn = object['timeInEvents']
    const listTimeOut = object['timeOutEvents']
    const timeIn = listTimeIn.forEach(timeEvent=>{if(timeEvent['date'] === date){return timeEvent['hour']}})
    const timeOut = listTimeOut.forEach(timeEvent=>{if(timeEvent['date'] === date){return timeEvent['hour']}})

    const hours = timeOut - timeIn

    return hours
}

function wagesEarnedOnDate(object,date) {
    const hours = hoursWorkedOnDate(object,date)
    const payRate = object['payPerHour']

    const payOwed = hours * payRate

    return payOwed
}


function allWagesFor(object) {
    const datesWorked = []
    datesWorked.push(object['timeInEvents'].forEach(timeEvent=>timeEvent['date']))

    let allWages = 0
    allWages += datesWorked.forEach(date=>wagesEarnedOnDate(object,date))
    
    return allWages
}


function calculatePayroll(arrayOfRecords) {
    let sumOfAllPayOwed = 0

    sumOfAllPayOwed += arrayOfRecords.forEach(record => allWagesFor(record))

    return sumOfAllPayOwed
}