import moment from "moment";

export function compare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA,"MM/DD/YYYY");
    var momentB = moment(dateTimeB,"MM/DD/YYYY");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}