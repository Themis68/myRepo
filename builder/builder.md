- gestion de l'updateFile

https://stackoverflow.com/questions/3521122/html-input-type-file-apply-a-filter
https://en.wikipedia.org/wiki/Media_type


Update: It seems at least some version of every major browser on Windows now provides at least some support for the accept attribute. (Even IE supports it, as of version 10.) However, it's still a bit early yet to rely on it, as IE 8 and 9 still don't support it. And support in general is a bit spotty.

Chrome seems to have full support. It uses its own built-in list of types as well as the system's...so if either one defines the type, Chrome knows which files to show.
IE 10 supports file extensions beautifully, and MIME types decently. It seems to use only the system's mapping of MIME type to extensions, though...which basically means if something on the user's computer didn't register those extensions with the right MIME types, IE won't show files of those MIME types.
Opera only seems to support MIME types -- to the point where extensions actually disable the filter -- and the UI for the file selector sucks. You have to select a type in order to see the files of that type.
Firefox appears to support only a limited set of types, and ignore other types as well as extensions.

accept="image/jpeg"
accept="image/*"