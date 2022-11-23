# unnest-folders
Unnest folders that contain only one item. Javascript version in this repo or use the shell scripts below

## Shell scripts
flatten directories with single item (move item up)
```sh
find . -type d -execdir bash -c '
    for file in "$1"/*; do
        [[ -f "$file" ]] && (( $((++filesCount)) > 1 )) && exit 1;
    done;
    ((filesCount==1)) && mv -v "$file" "${file%/*}.${file##*.}"
' _ {} \; 2>/dev/null
```
Flatten directories containing single directory
```sh
find . -type d -execdir bash -c '
    for file in "$1"/*; do
        (( $((++filesCount)) > 1 )) && exit 1;
    done;
    ((filesCount==1)) && mv "$file" "${file##*/}"
' _ {} \; 2>/dev/null

```
Delete empty dirs

```
find . -empty -type d -delete
```
