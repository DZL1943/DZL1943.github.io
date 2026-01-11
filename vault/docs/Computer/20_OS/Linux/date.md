---
created: 2025-05-29T20:00
modified: 2025-05-29T20:00
url:
  - https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html
---

# date

```shell
date '+%F %T'
date '+%x %X'
date '+%Y-%m-%dT%H:%M:%S%:z'
date -r $(date +%s) '+%Y-%m-%d %H:%M:%S %A %Z'
```

## time

- ‘%H’ | hour (‘00’…‘23’) 
- ‘%I’ | hour (‘01’…‘12’) 
- ‘%k’ | hour, space padded (‘ 0’…‘23’); equivalent to `%_H`. This is a GNU extension. 
- ‘%l’ | hour, space padded (‘ 1’…‘12’); equivalent to `%_I`. This is a GNU extension. 
- ‘%M’ | minute (‘00’…‘59’) 
- ‘%N’ | nanoseconds (‘000000000’…‘999999999’). This is a GNU extension. 
- ‘%p’ | locale’s equivalent of either ‘AM’ or ‘PM’; blank in many locales. Noon is treated as ‘PM’ and midnight as ‘AM’. 
- ‘%P’ | like ‘%p’, except lower case. This is a GNU extension. 
- ‘%r’ | locale’s 12-hour clock time (e.g., ‘11:11:04 PM’) 
- ‘%R’ | 24-hour hour and minute. Same as ‘%H:%M’. 
- ‘%s’ | seconds since the Epoch, i.e., since 1970-01-01 00:00 UTC. Leap seconds are not counted unless leap second support is available. See %s-examples, for examples. This is a GNU extension. 
- ‘%S’ | second (‘00’…‘60’). This may be ‘60’ if leap seconds are supported. 
- ‘%T’ | 24-hour hour, minute, and second. Same as ‘%H:%M:%S’. 
- ‘%X’ | locale’s time representation (e.g., ‘23:13:48’) 
- ‘%z’ | Four-digit numeric time zone, e.g., ‘-0600’ or ‘+0530’, or ‘-0000’ if no time zone is determinable. This value reflects the numeric time zone appropriate for the current time, using the time zone rules specified by the TZ environment variable. A time zone is not determinable if its numeric offset is zero and its abbreviation begins with ‘-’. The time (and optionally, the time zone rules) can be overridden by the --date option. 
- ‘%:z’ | Numeric time zone with ‘:’, e.g., ‘-06:00’ or ‘+05:30’), or ‘-00:00’ if no time zone is determinable. This is a GNU extension. 
- ‘%::z’ | Numeric time zone to the nearest second with ‘:’ (e.g., ‘-06:00:00’ or ‘+05:30:00’), or ‘-00:00:00’ if no time zone is determinable. This is a GNU extension. 
- ‘%:::z’ | Numeric time zone with ‘:’ using the minimum necessary precision (e.g., ‘-06’, ‘+05:30’, or ‘-04:56:02’), or ‘-00’ if no time zone is determinable. This is a GNU extension. 
- ‘%Z’ | alphabetic time zone abbreviation (e.g., ‘EDT’), or nothing if no time zone is determinable. See ‘%z’ for how it is determined. 

## date

- ‘%a’ | locale’s abbreviated weekday name (e.g., ‘Sun’) 
- ‘%A’ | locale’s full weekday name, variable length (e.g., ‘Sunday’) 
- ‘%b’ | locale’s abbreviated month name (e.g., ‘Jan’) 
- ‘%B’ | locale’s full month name, variable length (e.g., ‘January’) 
- ‘%c’ | locale’s date and time (e.g., ‘Thu Mar  3 23:05:25 2020’) 
- ‘%C’ | century. This is like ‘%Y’, except the last two digits are omitted. For example, it is ‘20’ if ‘%Y’ is ‘2019’, and is ‘-0’ if ‘%Y’ is ‘-001’. It is normally at least two characters, but it may be more. 
- ‘%d’ | day of month (e.g., ‘01’) 
- ‘%D’ | date; same as ‘%m/%d/%y’. Although commonly used in the US, this format is confusing elsewhere, and it is ambiguous for dates in different centuries. 
- ‘%e’ | day of month, space padded; same as `%_d`
- ‘%F’ | full date in ISO 8601 format; like ‘%+4Y-%m-%d’ except that any flags or field width override the ‘+’ and (after subtracting 6) the ‘4’. This is a good choice for a date format, as it is standard and is easy to sort in the usual case where years are in the range 0000…9999. 
- ‘%g’ | year corresponding to the ISO week number, but without the century (range ‘00’ through ‘99’). This has the same format and value as ‘%y’, except that if the ISO week number (see ‘%V’) belongs to the previous or next year, that year is used instead. This format is ambiguous for dates in different centuries. 
- ‘%G’ | year corresponding to the ISO week number. This has the same format and value as ‘%Y’, except that if the ISO week number (see ‘%V’) belongs to the previous or next year, that year is used instead. It is normally useful only if ‘%V’ is also used; for example, the format ‘%G-%m-%d’ is probably a mistake, since it combines the ISO week number year with the conventional month and day. 
- ‘%h’ | same as ‘%b’ 
- ‘%j’ | day of year (‘001’…‘366’) 
- ‘%m’ | month (‘01’…‘12’) 
- ‘%q’ | quarter of year (‘1’…‘4’) 
- ‘%u’ | day of week (‘1’…‘7’) with ‘1’ corresponding to Monday 
- ‘%U’ | week number of year, with Sunday as the first day of the week (‘00’…‘53’). Days in a new year preceding the first Sunday are in week zero. 
- ‘%V’ | ISO week number, that is, the week number of year, with Monday as the first day of the week (‘01’…‘53’). If the week containing January 1 has four or more days in the new year, then it is considered week 1; otherwise, it is week 53 of the previous year, and the next week is week 1. (See the ISO 8601 standard.) 
- ‘%w’ | day of week (‘0’…‘6’) with 0 corresponding to Sunday 
- ‘%W’ | week number of year, with Monday as first day of week (‘00’…‘53’). Days in a new year preceding the first Monday are in week zero. 
- ‘%x’ | locale’s date representation (e.g., ‘12/31/99’). This format can be ambiguous for dates in different centuries. 
- ‘%y’ | last two digits of year (‘00’…‘99’). This format is ambiguous for dates in different centuries. 
- ‘%Y’ | year. This is normally at least four characters, but it may be more. Year ‘0000’ precedes year ‘0001’, and year ‘-001’ precedes year ‘0000’. 
