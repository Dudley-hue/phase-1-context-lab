function parseTimestamp(timestamp) {
    const [date, time] = timestamp.split(' '); // Sectionise date and time parts
    const [year, month, day] = date.split('-').map(Number); // Parse the date parts as numbers
    const hour = Number(time) / 100; //converts time to hours
    return { year, month, day, hour };
  }
  
  function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [4],
        timeOutEvents: [5]
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // createTimeInEvent function
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // createTimeOutEvent function
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  // Export the functions for use in other modules
  module.exports = {
    createTimeInEvent,
    createTimeOutEvent
  };
  
  //  hoursWorkedOnDate function
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  //  wagesEarnedOnDate function
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
  }
  
  // allWagesFor function
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  
  //  calculatePayroll function
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((acc, employeeRecord) => acc + allWagesFor(employeeRecord), 0);
    return totalPayroll;
  }
  
  // Export the functions for use in other modules
  module.exports = {
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };


