---
cssclasses: wide
---
~~~~note-gallery     #           default | options
query: 'file: .png'  # optional: anything you'd put into an obsidian search query
                     # make sure to wrap into single quotes for any regex e.g.: '/\d/'
debugQuery: false    # optional: false | true - display native search results to debug
path: Attachments          # optional: current note folder | path/to/folder - you don't **need**
                     # to use path if you are using query, path will source additional notes
recursive: true      # optional: true | false
limit: 0            # optional: 0 | any number
sort: desc           # optional: desc | asc
sortBy: mtime        # optional: mtime | ctime | name
fontSize: 6pt        # optional: 6pt | NUMBERpt | NUMBERpx
showTitle: true      # optional: true | false
breakpoints:         # optional: allows to set breakpoints for number of columns
  default: 4
  100000: 10
  4000: 9
  3500: 8
  3000: 7
  2500: 6
  2000: 5
  1300: 4
  1000: 3
  800: 2
  500: 1
~~~~
