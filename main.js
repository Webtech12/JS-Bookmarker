// listen foir form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
   
    //get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;    

    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    let bookmark = {
        name : siteName,
        url : siteUrl
    }

    //local storage
    // localStorage.setItem('test', 'hello world');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    //test if
    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        //adds item
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        //get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmarks to array
        bookmarks.push(bookmark);
        //re-set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //refetch bookmarks
    fetchBookmarks();

    //prevents from submitting
    e.preventDefault();
}
//delete bookmark
function deleteBookmark(url) {
    //get bookmark
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop bookmarks
    for(let i= 0; i<bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove
            bookmarks.splice(i,1);
        }
    }
    //re-set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
    //get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    let bookmarksResults = document.getElementById('bookmarksResults');
    //build output
    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="border rounded">
        <h3>${name}</h3>
        <a class="btn btn-primary" target="_blank" href="${url}">Visit</a>
        <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">X</a>
        </div><br>`;
    }

}