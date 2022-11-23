# unnest-folders
Unnest folders that contain only one item. Javascript version in this repo.

## Shell scripts

```sh
// flatten directories containing single directory
find . -type d -execdir bash -c '
    for file in "$1"/*; do
        (( $((++filesCount)) > 1 )) && exit 1;
    done;
    ((filesCount==1)) && mv "$file" "${file##*/}" && rm -r "$1"
' _ {} \; 2>/dev/null

```
