
define(
    [
        'library/leq/base'
    ],
    function ( leq ) {
        var formatRegExp = /{(\d+)(:[^\}]+)?}/g,
            dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|'[^']*'|'[^']*'/g,
            standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
            literalRegExp = /["'].*?["']/g,
            exponentRegExp = /[eE][-+]?[0-9]+/,
            nonBreakingSpaceRegExp = /\u00A0/g,
            formatsSequence = ['G', 'g', 'd', 'F', 'D', 'y', 'm', 'T', 't'],
            PLACEHOLDER = '??',
            ENUS = 'en-us';

        /**
         * en-us culture definition
         */
        leq.extend(leq, {
            cultures: {
                'en-us': {
                    name: ENUS,
                    numberFormat: {
                        pattern: ['-n'],
                        decimals: 2,
                        ',': ',',
                        '.': '.',
                        groupSize: [3],
                        percent: {
                            pattern: ['-n %', 'n %'],
                            decimals: 2,
                            ',': ',',
                            '.': '.',
                            groupSize: [3],
                            symbol: '%'
                        },
                        currency: {
                            pattern: ['($n)', '$n'],
                            decimals: 2,
                            ',': ',',
                            '.': '.',
                            groupSize: [3],
                            symbol: '$'
                        }
                    },
                    calendars: {
                        standard: {
                            days: {
                                names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                                namesAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                                namesShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]
                            },
                            months: {
                                names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                namesAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            },
                            AM: [ 'AM', 'am', 'AM' ],
                            PM: [ 'PM', 'pm', 'PM' ],
                            patterns: {
                                d: 'M/d/yyyy',
                                D: 'dddd, MMMM dd, yyyy',
                                F: 'dddd, MMMM dd, yyyy h:mm:ss tt',
                                g: 'M/d/yyyy h:mm tt',
                                G: 'M/d/yyyy h:mm:ss tt',
                                m: 'MMMM dd',
                                M: 'MMMM dd',
                                s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                                t: 'h:mm tt',
                                T: 'h:mm:ss tt',
                                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                                y: 'MMMM, yyyy',
                                Y: 'MMMM, yyyy'
                            },
                            '/': '/',
                            ':': ':',
                            firstDay: 0
                        }
                    }
                }
            },

            getCulture: function ( ) {
                return leq.cultures.current;
            },

            setCulture: function ( name ) {
                if (name !== undefined) {
                    var cultures = leq.cultures,
                        culture = cultures[name] || cultures[ENUS];

                    culture.calendar = culture.calendars.standard;
                    cultures.current = culture;

                    // TODO?
                    //navigator.language
                    //navigator.userLanguage
                }
            }
        });

        // By default, the culture is 'en-us'
        leq.setCulture(ENUS);


        /*
         FORMATTING
         */
        function pad ( number ) {
            return number < 10 ? '0' + number : number;
        }

        function formatDate ( date, format ) {
            var calendar = leq.cultures.current.calendar,
                days = calendar.days,
                months = calendar.months;

            format = calendar.patterns[format] || format;

            return format.replace(dateFormatRegExp, function ( match ) {
                var result;

                if (match === 'd') {
                    result = date.getDate();
                } else if (match === 'dd') {
                    result = pad(date.getDate());
                } else if (match === 'ddd') {
                    result = days.namesAbbr[date.getDay()];
                } else if (match === 'dddd') {
                    result = days.names[date.getDay()];
                } else if (match === 'M') {
                    result = date.getMonth() + 1;
                } else if (match === 'MM') {
                    result = pad(date.getMonth() + 1);
                } else if (match === 'MMM') {
                    result = months.namesAbbr[date.getMonth()];
                } else if (match === 'MMMM') {
                    result = months.names[date.getMonth()];
                } else if (match === 'yy') {
                    result = pad(date.getFullYear() % 100);
                } else if (match === 'yyyy') {
                    result = date.getFullYear();
                } else if (match === 'h' ) {
                    result = date.getHours() % 12 || 12;
                } else if (match === 'hh') {
                    result = pad(date.getHours() % 12 || 12);
                } else if (match === 'H') {
                    result = date.getHours();
                } else if (match === 'HH') {
                    result = pad(date.getHours());
                } else if (match === 'm') {
                    result = date.getMinutes();
                } else if (match === 'mm') {
                    result = pad(date.getMinutes());
                } else if (match === 's') {
                    result = date.getSeconds();
                } else if (match === 'ss') {
                    result = pad(date.getSeconds());
                } else if (match === 'f') {
                    result = Math.floor(date.getMilliseconds() / 100);
                } else if (match === 'ff') {
                    result = Math.floor(date.getMilliseconds() / 10);
                } else if (match === 'fff') {
                    result = date.getMilliseconds();
                } else if (match === 'tt') {
                    result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
                }

                return result !== undefined ? result : match.slice(1, match.length - 1);
            });
        }

        function formatNumber ( number, format ) {
            var culture = leq.cultures.current,
                numberFormat = culture.numberFormat,
                groupSize = numberFormat.groupSize[0],
                groupSeparator = numberFormat[leq.COMMA],
                decimal = numberFormat[leq.POINT],
                precision = numberFormat.decimals,
                pattern = numberFormat.pattern[0],
                literals = [],
                symbol,
                isCurrency, isPercent,
                customPrecision,
                formatAndPrecision,
                negative = number < 0,
                integer,
                fraction,
                integerLength,
                fractionLength,
                replacement = leq.EMPTY,
                value = leq.EMPTY,
                idx,
                length,
                ch,
                decimalIndex,
                sharpIndex,
                zeroIndex,
                start = -1,
                end;

            // Return empty string if no number
            if (number === undefined) {
                return leq.EMPTY;
            }

            if (!isFinite(number)) {
                return number;
            }

            // If no format then return number.toString()
            // or number.toLocaleString() if culture.name is not defined
            if (!format) {
                return culture.name.length ? number.toLocaleString() : number.toString();
            }

            formatAndPrecision = standardFormatRegExp.exec(format);

            // Standard formatting
            if (formatAndPrecision) {
                format = formatAndPrecision[1].toLowerCase();

                isCurrency = format === 'c';
                isPercent = format === 'p';

                if (isCurrency || isPercent) {
                    // Get specific number format information if format is currency or percent
                    numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
                    groupSize = numberFormat.groupSize[0];
                    groupSeparator = numberFormat[leq.COMMA];
                    decimal = numberFormat[leq.POINT];
                    precision = numberFormat.decimals;
                    symbol = numberFormat.symbol;
                    pattern = numberFormat.pattern[negative ? 0 : 1];
                }

                customPrecision = formatAndPrecision[2];

                if (customPrecision) {
                    precision = +customPrecision;
                }

                // Return number in exponential format
                if (format === 'e') {
                    // toExponential() and toExponential(undefined) differ in FF #653438.
                    return customPrecision ? number.toExponential(precision) : number.toExponential();
                }

                // Multiply if format is percent
                if (isPercent) {
                    number *= 100;
                }

                number = number.toFixed(precision);
                number = number.split(leq.POINT);

                integer = number[0];
                fraction = number[1];

                // Exclude '-' if number is negative.
                if (negative) {
                    integer = integer.substring(1);
                }

                value = integer;
                integerLength = integer.length;

                // Add group separator to the number if it is longer enough
                if (integerLength >= groupSize) {
                    value = leq.EMPTY;
                    for (idx = 0; idx < integerLength; idx++) {
                        if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                            value += groupSeparator;
                        }
                        value += integer.charAt(idx);
                    }
                }

                if (fraction) {
                    value += decimal + fraction;
                }

                if (format === 'n' && !negative) {
                    return value;
                }

                number = leq.EMPTY;

                for (idx = 0, length = pattern.length; idx < length; idx++) {
                    ch = pattern.charAt(idx);

                    if (ch === 'n') {
                        number += value;
                    } else if (ch === '$' || ch === '%') {
                        number += symbol;
                    } else {
                        number += ch;
                    }
                }

                return number;
            }

            // Custom formatting
            //
            // Separate format by sections.
            format = format.split(';');
            if (negative && format[1]) {
                // Make number positive and get negative format
                number = -number;
                format = format[1];
            } else if (number === 0) {
                //format for zeros
                format = format[2] || format[0];
                if (format.indexOf(leq.SHARP) === -1 && format.indexOf(leq.ZERO) === -1) {
                    // Return format if it is string constant.
                    return format;
                }
            } else {
                format = format[0];
            }

            if (format.indexOf("'") > -1 || format.indexOf("\"") > -1) {
                format = format.replace(literalRegExp, function(match) {
                    literals.push(match);
                    return PLACEHOLDER;
                });
            }

            isCurrency = format.indexOf('$') !== -1;
            isPercent = format.indexOf('%') !== -1;

            // Multiply number if the format has percent
            if (isPercent) {
                number *= 100;
            }

            if (isCurrency || isPercent) {
                // Get specific number format information if format is currency or percent
                numberFormat = isCurrency ? numberFormat.currency : numberFormat.percent;
                groupSize = numberFormat.groupSize[0];
                groupSeparator = numberFormat[leq.COMMA];
                decimal = numberFormat[leq.POINT];
                precision = numberFormat.decimals;
                symbol = numberFormat.symbol;
            }

            decimalIndex = format.indexOf(leq.POINT);
            length = format.length;

            if (decimalIndex !== -1) {
                sharpIndex = format.lastIndexOf(leq.SHARP);
                zeroIndex = format.lastIndexOf(leq.ZERO);

                if (zeroIndex !== -1) {
                    value = number.toFixed(zeroIndex - decimalIndex);
                    number = number.toString();
                    number = number.length > value.length && sharpIndex > zeroIndex ? number : value;
                }
            } else {
                number = number.toFixed(0);
            }

            sharpIndex = format.indexOf(leq.SHARP);
            zeroIndex = format.indexOf(leq.ZERO);

            // Define the index of the first digit placeholder
            if (sharpIndex === -1 && zeroIndex !== -1) {
                start = zeroIndex;
            } else if (sharpIndex !== -1 && zeroIndex === -1) {
                start = sharpIndex;
            } else {
                start = sharpIndex > zeroIndex ? zeroIndex : sharpIndex;
            }

            sharpIndex = format.lastIndexOf(leq.SHARP);
            zeroIndex = format.lastIndexOf(leq.ZERO);

            // Define the index of the last digit placeholder
            if (sharpIndex === -1 && zeroIndex !== -1) {
                end = zeroIndex;
            } else if (sharpIndex !== -1 && zeroIndex === -1) {
                end = sharpIndex;
            } else {
                end = sharpIndex > zeroIndex ? sharpIndex : zeroIndex;
            }

            if (start === length) {
                end = start;
            }

            if (start !== -1) {
                value = number.toString().split(leq.POINT);
                integer = value[0];
                fraction = value[1] || leq.EMPTY;

                integerLength = integer.length;
                fractionLength = fraction.length;

                // Add group separator to the number if it is longer enough
                if (integerLength >= groupSize && format.indexOf(leq.COMMA) !== -1) {
                    value = leq.EMPTY;
                    for (idx = 0; idx < integerLength; idx++) {
                        if (idx > 0 && (integerLength - idx) % groupSize === 0) {
                            value += groupSeparator;
                        }
                        value += integer.charAt(idx);
                    }
                    integer = value;
                }

                number = format.substring(0, start);

                for (idx = start; idx < length; idx++) {
                    ch = format.charAt(idx);

                    if (decimalIndex === -1) {
                        if (end - idx < integerLength) {
                            number += integer;
                            break;
                        }
                    } else {
                        if (zeroIndex !== -1 && zeroIndex < idx) {
                            replacement = leq.EMPTY;
                        }

                        if ((decimalIndex - idx) <= integerLength && decimalIndex - idx > -1) {
                            number += integer;
                            idx = decimalIndex;
                        }

                        if (decimalIndex === idx) {
                            number += (fraction ? decimal : leq.EMPTY) + fraction;
                            idx += end - decimalIndex + 1;
                            continue;
                        }
                    }

                    if (ch === leq.ZERO) {
                        number += ch;
                        replacement = ch;
                    } else if (ch === leq.SHARP) {
                        number += replacement;
                    } else if (ch === leq.COMMA) {
                        continue;
                    }
                }

                if (end >= start) {
                    number += format.substring(end + 1);
                }

                // Replace symbol placeholders
                if (isCurrency || isPercent) {
                    value = leq.EMPTY;
                    for (idx = 0, length = number.length; idx < length; idx++) {
                        ch = number.charAt(idx);
                        value += (ch === '$' || ch === '%') ? symbol : ch;
                    }
                    number = value;
                }

                if (literals[0]) {
                    length = literals.length;
                    for (idx = 0; idx < length; idx++) {
                        number = number.replace(PLACEHOLDER, literals[idx]);
                    }
                }
            }

            return number;
        }

        function parseFloatValue ( value, culture ) {
            if (!value && value !== 0) {
                return null;
            }

            if (typeof value === leq.NUMBER) {
                return value;
            }

            value = value.toString();
            culture = leq.cultures[culture] || leq.cultures.current;

            var number = culture.numberFormat,
                percent = number.percent,
                currency = number.currency,
                symbol = currency.symbol,
                percentSymbol = percent.symbol,
                negative = value.indexOf('-') > -1,
                parts;

            // Handle exponential number
            if (exponentRegExp.test(value)) {
                value = parseFloat(value);
                if (isNaN(value)) {
                    value = null;
                }
                return value;
            }

            if (value.indexOf(symbol) > -1) {
                number = currency;
                parts = number.pattern[0].replace('$', symbol).split('n');

                if (value.indexOf(parts[0]) > -1 && value.indexOf(parts[1]) > -1) {
                    value = value.replace(parts[0], '').replace(parts[1], '');
                    negative = true;
                }
            } else if (value.indexOf(percentSymbol) > -1) {
                number = percent;
                symbol = percentSymbol;
            }

            value = value.replace('-', '')
                .replace(symbol, '')
                .replace(nonBreakingSpaceRegExp, ' ')
                .split(number[','].replace(nonBreakingSpaceRegExp, ' ')).join('')
                .replace(number['.'], '.');

            value = parseFloat(value);

            if (isNaN(value)) {
                value = null;
            } else if (negative) {
                value *= -1;
            }

            return value;
        }

        function parseIntValue ( value, culture ) {
            var result = parseFloatValue(value, culture);
            if (result) {
                result = result || null;
            }
            return result;
        }

        function outOfRange ( value, start, end ) {
            return !(value >= start && value <= end);
        }

        function parseExact (value, format, culture) {
            if (!value) {
                return null;
            }

            var lookAhead = function (match) {
                    var i = 0;
                    while (format[idx] === match) {
                        i++;
                        idx++;
                    }
                    if (i > 0) {
                        idx -= 1;
                    }
                    return i;
                },
                getNumber = function(size) {
                    var rg = new RegExp('^\\d{1,' + size + '}'),
                        match = value.substr(valueIdx, size).match(rg);

                    if (match) {
                        match = match[0];
                        valueIdx += match.length;
                        return parseInt(match, 10);
                    }
                    return null;
                },
                getIndexByName = function (names) {
                    var i = 0,
                        length = names.length,
                        name, nameLength;

                    for (; i < length; i++) {
                        name = names[i];
                        nameLength = name.length;

                        if (value.substr(valueIdx, nameLength) === name) {
                            valueIdx += nameLength;
                            return i + 1;
                        }
                    }
                    return null;
                },
                checkLiteral = function() {
                    if (value.charAt(valueIdx) === format[idx]) {
                        valueIdx++;
                    }
                },
                calendar = culture.calendar,
                year = null,
                month = null,
                day = null,
                hours = null,
                minutes = null,
                seconds = null,
                milliseconds = null,
                idx = 0,
                valueIdx = 0,
                literal = false,
                date = new Date(),
                defaultYear = date.getFullYear(),
                shortYearCutOff = 30,
                ch, count, AM, PM, pmHour, length, pattern;

            if (!format) {
                format = 'd'; // Shord date format
            }

            // If format is part of the patterns get real format
            pattern = calendar.patterns[format];
            if (pattern) {
                format = pattern;
            }

            format = format.split('');
            length = format.length;

            for (; idx < length; idx++) {
                ch = format[idx];

                if (literal) {
                    if (ch === "'") {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    if (ch === 'd') {
                        count = lookAhead('d');
                        day = count < 3 ? getNumber(2) : getIndexByName(calendar.days[count === 3 ? 'namesAbbr' : 'names']);

                        if (day === null || outOfRange(day, 1, 31)) {
                            return null;
                        }
                    } else if (ch === 'M') {
                        count = lookAhead('M');
                        month = count < 3 ? getNumber(2) : getIndexByName(calendar.months[count === 3 ? 'namesAbbr' : 'names']);

                        if (month === null || outOfRange(month, 1, 12)) {
                            return null;
                        }
                        month -= 1; // Because month is zero based
                    } else if (ch === 'y') {
                        count = lookAhead('y');
                        year = getNumber(count < 3 ? 2 : 4);
                        if (year === null) {
                            year = defaultYear;
                        }
                        if (year < shortYearCutOff) {
                            year = (defaultYear - defaultYear % 100) + year;
                        }
                    } else if (ch === 'h' ) {
                        lookAhead('h');
                        hours = getNumber(2);
                        if (hours === 12) {
                            hours = 0;
                        }
                        if (hours === null || outOfRange(hours, 0, 11)) {
                            return null;
                        }
                    } else if (ch === 'H') {
                        lookAhead('H');
                        hours = getNumber(2);
                        if (hours === null || outOfRange(hours, 0, 23)) {
                            return null;
                        }
                    } else if (ch === 'm') {
                        lookAhead('m');
                        minutes = getNumber(2);
                        if (minutes === null || outOfRange(minutes, 0, 59)) {
                            return null;
                        }
                    } else if (ch === 's') {
                        lookAhead('s');
                        seconds = getNumber(2);
                        if (seconds === null || outOfRange(seconds, 0, 59)) {
                            return null;
                        }
                    } else if (ch === 'f') {
                        count = lookAhead('f');
                        milliseconds = getNumber(count);
                        if (milliseconds === null || outOfRange(milliseconds, 0, 999)) {
                            return null;
                        }
                    } else if (ch === 't') {
                        count = lookAhead('t');
                        pmHour = getIndexByName(calendar.PM);
                    } else if (ch === "'") {
                        checkLiteral();
                        literal = true;
                    } else {
                        checkLiteral();
                    }
                }
            }

            if (pmHour && hours < 12) {
                hours += 12;
            }

            if (day === null) {
                day = 1;
            }

            return new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }

        function parseDate ( value, formats, culture ) {
            if (value instanceof Date) {
                return value;
            }

            var idx = 0,
                date = null,
                length,
                patterns;

            if (!culture) {
                culture = leq.getCulture();
            } else if (typeof culture === leq.STRING) {
                leq.setCulture(culture);
                culture = leq.getCulture();
            }

            if (!formats) {
                formats = [];
                patterns = culture.calendar.patterns;
                length = formatsSequence.length;

                for (; idx < length; idx++) {
                    formats[idx] = patterns[formatsSequence[idx]];
                }
                formats[idx] = 'ddd MMM dd yyyy HH:mm:ss';

                idx = 0;
            }

            formats = leq.isArray(formats) ? formats: [formats];
            length = formats.length;

            for (; idx < length; idx++) {
                date = parseExact(value, formats[idx], culture);
                if (date) {
                    return date;
                }
            }

            return date;
        }

        function toString ( value, format ) {
            if (format) {
                if (value instanceof Date) {
                    return formatDate(value, format);
                } else if (typeof value === leq.NUMBER) {
                    return formatNumber(value, format);
                }
            }

            return value !== undefined ? value : '';
        }

        leq.extend(leq, {
            /**
             * Converts a string to a JavaScript Date object
             * leq.parseDate("12/22/2000");                    // Fri Dec 22 2000
             * leq.parseDate("2000/12/22", "yyyy/MM/dd");      // Fri Dec 22 2000
             */
            parseDate: parseDate,

            /**
             * Parses a string for an integer
             *
             * Assumes that current culture defines decimal separator as "."
             * leq.parseInt("12.22");          // 12
             *
             * Assumes that current culture defines decimal separator as ",", group separator as "." and currency symbol as "€"
             * leq.parseInt("1.212,22 €");     // 1212
             *
             */
            parseInt: parseIntValue,

            /**
             * Parses a string for a float
             *
             * Assumes that current culture defines decimal separator as "."
             * leq.parseFloat("12.22");        // 12.22
             *
             * Assumes that current culture defines decimal separator as ",", group separator as "." and currency symbol as "€"
             * leq.parseFloat("1.212,22 €");   // 1212.22
             */
            parseFloat: parseFloatValue,

            /**
             * Number and Date fromatting
             *
             * NUMBER FORMAT USING STANDARD NUMBER FORMAT
             * leq.toString(10.12, "n");       // 10.12
             * leq.toString(10.12, "n0");      // 10
             * leq.toString(10.12, "n5");      // 10.12000
             * leq.toString(10.12, "c");       // $10.12
             * leq.toString(0.12, "p");        // 12.00 %
             *
             *  Formatting using "n" format (NUMBER)
             *  leq.setCulture("en-US");
             *  leq.toString(1234.567, "n");            // 1,234.57
             *
             *  leq.setCulture("de-DE");
             *  leq.toString(1234.567, "n3");           // 1.234,567
             *
             *  Formatting using "c" format (CURRENCY)
             *  leq.setCulture("en-US");
             *  leq.toString(1234.567, "c");            // $1,234.57
             *
             *  leq.setCulture("de-DE");
             *  leq.toString(1234.567, "c3");           // 1.234,567 €
             *
             *  Formatting using "p" format (PERCENTAGE)
             *  leq.setCulture("en-US");
             *  leq.toString(0.222, "p");               // 22.20 %
             *
             *  leq.setCulture("de-DE");
             *  leq.toString(0.22, "p3");               // 22.000 %
             *
             *  Formatting using "e" format (EXPONENTIAL)
             *  leq.toString(0.122, "e");               // 1.22e-1
             *  leq.toString(0.122, "e4");              // 1.2200e-1
             *
             * NUMBER FORMAT USING CUSTOM NUMBER FORMAT
             * leq.toString(19.12, "00##");    // 0019
             *
             *  "0" - zero placeholder
             *  Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string
             *  leq.toString(1234.5678, "00000");  // 01235
             *
             *  "#" - digit placeholder
             *  Replaces the pound sign with the corresponding digit if one is present; otherwise, no digit appears in the result string
             *  leq.toString(1234.5678, "#####");  // 1235
             *
             *  "." - Decimal placeholder
             *  Determines the location of the decimal separator in the result string
             *  leq.tostring(0.45678, "0.00");     // 0.46
             *
             *  "," - group separator placeholder
             *  Insert localized group separator between each group
             *  leq.tostring(12345678, "##,#");    // 12,345,678
             *
             *  "%" - percentage placeholder
             *  Multiplies a number by 100 and inserts a localized percentage symbol in the result string
             *
             *  "e" - exponential notation
             *  leq.toString(0.45678, "e0");       // 5e-1
             *
             *  ";" - section separator
             *  Defines sections wih separate format strings for positive, negative, and zero numbers
             *
             *  "string"/'string' - Literal string delimiter
             *  Indicates that the enclosed characters should be copied to the result string
             *
             * DATE FORMAT
             * leq.toString(new Date(2010, 9, 5), "yyyy/MM/dd" );          // "2010/10/05"
             * leq.toString(new Date(2010, 9, 5), "dddd MMMM d, yyyy" );   // "Tuesday October 5, 2010"
             * leq.toString(new Date(2010, 10, 10, 22, 12), "hh:mm tt" );  // "10:12 PM"
             *
             * STANDARD FORMAT SPECIFIERS
             *  "d" - short date pattern
             *  leq.toString(new Date(2000, 10, 6), "d");      // 11/6/2000
             *
             *  "D" - long date pattern
             *  leq.toString(new Date(2000, 10, 6), "D");      // Monday, November 06, 2000
             *
             *  "F" - Full date/time pattern
             *  leq.toString(new Date(2000, 10, 6), "F");      // Monday, November 06, 2000 12:00:00 AM
             *
             *  "g" - General date/time pattern (short time)
             *  leq.toString(new Date(2000, 10, 6), "g");      // 11/6/2000 12:00 AM
             *
             *  "G" - General date/time pattern (long time)
             *  leq.toString(new Date(2000, 10, 6), "G");      // 11/6/2000 12:00:00 AM
             *
             *  "M/m" - Month/day pattern
             *  leq.toString(new Date(2000, 10, 6), "m");      // November 06
             *
             *  "u" - Universal sortable date/time pattern
             *  leq.toString(new Date(2000, 10, 6), "u");      // 2000-11-06 00:00:00Z
             *
             *  "Y/y" - Year/month pattern
             *  leq.toString(new Date(2000, 10, 6), "y");      // November, 2000
             *
             * CUSTOM FORMAT SPECIFIERS
             *   @see calendars.patterns
             *
             */
            toString: toString,

            /**
             * Formats values using a template
             *
             * leq.format("{0} - {1}", 12, 24);        // 12 - 24
             * leq.format("{0:c} - {1:c}", 12, 24);    // $12.00 - $24.00
             *
             */
            format: function ( format ) {
                var values = arguments;

                return format.replace(formatRegExp, function( match, index, placeholderFormat ) {
                    var value = values[parseInt(index, 10) + 1];

                    return toString(value,
                        placeholderFormat ?
                            placeholderFormat.substring(1) :
                            ""
                    );
                });
            }
        });
    }
);