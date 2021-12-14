const fs = require("fs");
const path = require('path')
const mvdir = require("mvdir");

var myArgs = process.argv.slice(2);

// Give it some folders and it will look inside each folder
// if that folder contains no files and one subfolder
// move the subfolder's contents to the given folder

if (!myArgs.length) {
  console.error("need argument for folders");
  return;
}

myArgs.forEach((folder) => flatten(folder));

function flatten(folderRoot) {
  let contents;
  try{
    contents = fs.readdirSync(folderRoot, { withFileTypes: true });
  } catch(e) {
    // console.error(e)
    console.log("skip:", folderRoot)
    return
  }

  const subfolders = contents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const subfiles = contents.filter((dirent) => !dirent.isDirectory());
  // console.log({ subfolders, subfiles });

  if (subfiles.length === 0 && subfolders.length === 1) {
    const moveFrom = folderRoot +'/'+ subfolders[0];
    const moveTo = folderRoot;
    console.log({ moveFrom, moveTo });

    // return;
    mvdir(moveFrom, moveTo).then((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else if (subfiles.length === 1 && subfolders.length === 0) {
    const moveFrom = folderRoot +'/'+ contents[0].name;
    const moveTo = folderRoot +'/../'+ contents[0].name
    console.log({ moveFrom, moveTo });
    fs.rename(moveFrom, moveTo, () => null)
    fs.rmdir(folderRoot, () => null)
  } else if (subfiles.length === 0 && subfolders.length === 0) {
    console.log("delete:", folderRoot)
    fs.rmdir(folderRoot, () => null)
  }
}
