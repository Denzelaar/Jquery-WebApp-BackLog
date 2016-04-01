var selected_index = 0;
var detailName = "";
var detailGenre = "";

function add() {
    // Retrieve the entered form data
    var Name = $('[name="name"]').val();
    var Genre = $('[name="genre"]').val();
    var Category = $('input[name=category]:checked').val();

    // Fetch the existing objects
    var objects = getObjects(objects);

    objects.push({
        Name: Name,
        Genre: Genre,
        Category: Category
    });

    // Store the new list
    saveObjects(objects);
    // Reload the page to show the new objects
    window.location.reload();
}

function getObjects(objects) {
    // See if objects is inside localStorage
    if (localStorage.getItem("objects")) {
        // If yes, then load the objects
        objects = JSON.parse(localStorage.getItem("objects"));
    } else {
        // Make a new array of objects
        objects = new Array();

    }
    return objects;
}

function saveObjects(objects) {
    // Save the list into localStorage
    localStorage.setItem("objects", JSON.stringify(objects));
}

function homepage() {
    // Fetch the existing objects
    objects = getObjects();

    // Clear the list
    $('#logItems').find('li').remove();

    // Add every object to the objects list
    $.each(objects, function (index, item) {

        element = '<li onclick="soloItem(this);">' + '<a href="#itemDetail">' + '<h2>' + item.Name + '</h2>' + '<p>' + item.Genre + '</p>' + '</a>' + '</li>';

        $('#logItems').append(element);

    });

    $('#logItems').listview();
    $('#logItems').listview("refresh");

}

function deletelast() {
    objects = getObjects();
    objects.pop();

    // Store the new list
    saveObjects(objects);
    // Reload the page to show the new objects
    window.location.reload();
};

function soloItem(listitem) {

    selected_index = $(listitem).index();

    objects = getObjects();

    $('#detailname').val("");
    $('#detailgenre').val("");

    $.each(objects, function (index, item) {
        if (index === selected_index) {
            $('#detailname').val(item.Name);
            $('#detailgenre').val(item.Genre);

            detailName = item.Name;
            detailGenre = item.Genre;

        }

    });

}

function update() {
    var dName = $('[name="dname"]').val();
    var dGenre = $('[name="dgenre"]').val();

    objects = getObjects();

    $.each(objects, function (index, item) {
        if (index === selected_index) {
            item.Name = dName;
            item.Genre = dGenre;

            // Store the new list
            saveObjects(objects);
            // Reload the page to show the new objects
            window.location.reload();
        }


    });
}

function deleteSolo() {
    objects = getObjects();

    $.each(objects, function (index, item) {
        if (index === selected_index) {
            objects.splice(index, 1);

            saveObjects(objects);

        }
    });

}


$(document).on('pagebeforeshow', '#home', function (event) {
    homepage();

});


$(document).on('pagebeforeshow', '#itemDetail', function (event) {
    $('#detailname').val(detailName);
    $('#detailgenre').val(detailGenre);
});

