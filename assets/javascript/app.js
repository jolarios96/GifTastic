var topics = ['games', 'coffee', 'coding', 'music', 'penguins', 'deer', 'confusion'];

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
})

// ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######  
// ##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## ##    ## 
// ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##       
// ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######  
// ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ## 
// ##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### ##    ## 
// ##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ######  

function getGifs(topic) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='
        + topic
        + '&limit=10_&api_key=pDexbJg488nIkdEvMYtFMAflgSFFYRLA';

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < 10; i++) {

                var rating = results[i].rating;
                var p = $('<p>').text('Rating: ' + rating);

                var newImg = $('<img>');
                newImg.attr('src', results[i].images.fixed_height.url);

                var newDiv = $('<div>');
                newDiv.append(p);
                newDiv.append(newImg);

                $('#gif-wrapper').append(newDiv);

                console.log('Gif-' + (i + 1) + ' Get!');
            }
            console.log(response.data);
        })
}