var topics = ['hamster', 'games', 'coffee', 'coding', 'music', 'penguins', 'deer', 'confusion'];

for (var i = 0; i < topics.length; i++) {
    var newElement = $('<button>');
    newElement.attr('data-topic', topics[i]);
    newElement.addClass('topic-btn');
    newElement.text(topics[i]);
    $('#btn-wrapper').append(newElement);
    console.log('Created button ' + i + ':  ' + topics[i]);
}

// Goal: inside element of '#btn-wrapper, on click btn of class='topic-btn', get button's id
$('#btn-wrapper').on('click', '.topic-btn', function () {
    console.log("Requesting GIFS of topic: " + $(this).data('topic'));

    getGifs($(this).data('topic'));
});

$('#gif-wrapper').on('click', '.gif-preview', function () {
    var tmp;

    console.log('stored original src in tmp');
    tmp = $(this).attr('src');

    console.log('overwriting original src with data("src")');
    $(this).attr('src', $(this).data('src'));
    
    console.log('storing tmp in data("src")')
    $(this).data('src', tmp);
    console.log ('data = ' + $(this).data('src'));


});

// ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######  
// ##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## ##    ## 
// ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##       
// ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######  
// ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ## 
// ##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### ##    ## 
// ##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ######  

function getGifs(topic) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?'
        + 'q=' + topic
        + '&limit=10'
        + '&lang = en'
        + '&api_key=TQzeL4gjMxH9FaCG1Bl4ywCXFOxyTl6Y'
        ;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating;
                var p = $('<p>').text('Rating: ' + rating);

                var newImg = $('<img>');
                newImg.attr('src', results[i].images.fixed_height_still.url);
                newImg.attr('data-src', results[i].images.fixed_height.url)
                newImg.attr('id', 'img-' + i);
                newImg.addClass('gif-preview')

                var newDiv = $('<div>');
                newDiv.addClass('gif-container');
                newDiv.append(p);
                newDiv.append(newImg);

                $('#gif-wrapper').append(newDiv);

                console.log('Gif-' + i + ' Get!');
            }

            console.log(response.data);
        })

    // .then(function (response) {
    //     console.log(response.data);

    // })
}