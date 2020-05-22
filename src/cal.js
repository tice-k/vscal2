// user-defined parameters
const numMonthsToShowBefore = 1;
const numMonthsToShowAfter = 2;
const numMonthsPerRow = 4;
const extraHorizontalSpace = 1;
const extraVerticalSpace = 1;

const now = new Date();
const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const lastDayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const createMonthTag = (month, year, now) => {
    if (month === now.getMonth()) {return `      [${months[month]}]${year}       `;}
    else {return `       ${months[month]} ${year}       `;}
};
const createDaysTag = () => {
    let tag = ' ';
    days.forEach(day => {
        tag += day + ' ';
    });
    return tag;
};
const createWeekRow = (week, month, year) => {
    if (week < 0 || week > 5) {return '        ERROR         ';}
    const premier = new Date();
    premier.setFullYear(year, month, 1);
    let text = ' ';
    if (week === 0) {
        for(let i = 0; i < 7; i++) {
            text += i < premier.getDay() ? '   ' : addSpaceToDate(i + 1 - premier.getDay(), month, year);
        }
    } else {
        let firstDateOfWeek = 1 - premier.getDay() + 7 * week;
        for(let i = firstDateOfWeek; i < firstDateOfWeek + 7; i++) {
            if (month === 1 && isLeapYear(year)) {
                if (i <= 29) {text += addSpaceToDate(i, month, year);}
                else {text += '   ';}
            } else {
                if (i <= lastDayOfMonth[month]) {text += addSpaceToDate(i, month, year);}
                else {text += '   ';}
            }
        }
    }
    return text;
};
const addSpaceToDate = (date, month, year) => {
    if (date === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
        return date <= 9 ? `[${date}]` : `${date}]`;
    } else if (date + 1 === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
        if (date + 1 <= 9) {return date <= 9 ? ` ${date} ` : `${date} `;}
        else {return date <= 9 ? ` ${date}[` : `${date}[`;}
    } else {
        return date <= 9 ? ` ${date} ` : `${date} `;
    }
};
const isLeapYear = (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
const getYearOfMonth = (monthDiff) => now.getFullYear() + Math.floor((now.getMonth() + monthDiff) / 12);
const createRowOfCalendars = (padding, start, end) => {
    let data = '';
    for (let i = start; i <= end; i++) {
        data += createMonthTag((now.getMonth() + i + 12) % 12, getYearOfMonth(i), now) + padding;
    }
    data += '\n';
    for (let i = start; i <= end; i++) {
        data += createDaysTag() + padding;
    }
    data += '\n';
    for(let j = 0; j < 6; j++) {
        for (let i = start; i <= end; i++) {
            data += createWeekRow(j, (now.getMonth() + i + 12) % 12, getYearOfMonth(i)) + padding;
        }
        data += '\n';
    }
    return data;
};
exports.createFile = (numMonthsToShowBefore, numMonthsToShowAfter, numMonthsPerRow, extraHorizontalSpace, extraVerticalSpace) => {
    let horiPadding = '';
    for (let i = 0; i < extraHorizontalSpace; i++) {horiPadding += ' ';}
    let vertPadding = '';
    for (let i = 0; i < extraVerticalSpace; i++) {vertPadding += '\n';}

    let data = '';
    for (let i = -numMonthsToShowBefore; i <= numMonthsToShowAfter; i += numMonthsPerRow) {
        data += createRowOfCalendars(horiPadding, i, i + numMonthsPerRow - 1);
        data += vertPadding;
    }

    const fs = require('fs');
    fs.writeFile('cal.md', data, (err) => {
        if (err) {throw err;}
    });
    return data;
};

// exports.createFile(numMonthsToShowBefore, numMonthsToShowAfter, numMonthsPerRow, extraHorizontalSpace, extraVerticalSpace);