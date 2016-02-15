export default function pluralize(value, _1, _2, _3, returnString = false) {
    let retval;

    if (value > 10 && value < 20)  {
        retval = _3;
    } else {
        let last = value % 10;

        if (last === 1) {
            retval = _1;
        } else if (last > 1 && last < 5) {
            retval = _2;
        } else {
            retval = _3;
        }
    }

    return returnString ? value + ' ' + retval : retval;
}