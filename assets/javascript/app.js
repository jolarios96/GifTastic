var topics = [
    'dogs',
    'cats',
    'hamsters',
    'squirrels',
    'whales',
    'capybara',
    'mouse',
    'birds',
    'axelotl',
    'chipmunks',
    'dolphins',
    'fish',
    'flamingo',
];

renderButtons();

//  #####    ##       ####  ######  ##    ##         ######## ##     ## ######## ##    ## ########  ######  
// ##    ##  ##        ##  ##    ## ##   ##          ##       ##     ## ##       ###   ##    ##    ##    ## 
// ##        ##        ##  ##       ##  ##           ##       ##     ## ##       ####  ##    ##    ##       
// ##        ##        ##  ##       #####    ####### ######   ##     ## ######   ## ## ##    ##     ######  
// ##        ##        ##  ##       ##  ##           ##        ##   ##  ##       ##  ####    ##          ## 
// ##    ##  ##        ##  ##    ## ##   ##          ##         ## ##   ##       ##   ###    ##    ##    ## 
//  ######   ######## ####  ######  ##    ##         ########    ###    ######## ##    ##    ##     ######  

// Goal: inside element of id '#buttons-container, on click btn of class='topic-btn', get button's id
$('#buttons-container').on('click', '.topic-btn', function () {
    console.log("Requesting GIFS of topic: " + $(this).data('topic'));

    getGifs($(this).data('topic'));
});

$('#gifs').on('click', '.gif-preview', function () {
    // swaps static image with animated gif and vise versa;
    console.log('\n----- ' + $(this).data('title') + ' -----',
        'Current Attributes',
        "attr('src'): " + $(this).attr('src'),
        "data('stored-src')" + $(this).data('stored-src')
    );

    // swap attr('src') with data('stored-src') //
    var tmp = $(this).attr('src');
    $(this).attr('src', $(this).data('stored-src'));
    $(this).data('stored-src', tmp);

    console.log('Updated Attributes -----',
        "attr('src'): " + $(this).attr('src'),
        "data('stored-src')" + $(this).data('stored-src')
    );
});

$('#add-tag').on('click', function () {
    // prevent default behavior (submit form);
    event.preventDefault();
    // gets text value, with excess whitespace trimmed off
    var tag = $('#tag-input').val().trim();

    // push tag into array
    topics.push(tag);
    console.log(tag);
    // reconstruct buttons
    renderButtons();
})

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
                p.addClass('rating');

                var newImg = $('<img>');
                newImg.attr({
                    'src': results[i].images.fixed_height_still.url,
                    'data-stored-src': results[i].images.fixed_height.url,
                    'data-title': results[i].title,
                    'id': ('img-' + i)
                });
                newImg.addClass('gif-preview')


                var newDiv = $('<div>');
                newDiv.addClass('gif-container');
                newDiv.append(p);
                newDiv.append(newImg);

                $('#gifs').append(newDiv);

                console.log('Gif-' + i + ' Get!');
            }

            console.log(response.data);
        })
}

function renderButtons() {
    $('#buttons-container').empty();

    for (var i = 0; i < topics.length; i++) {
        var newElement = $('<button>');
        newElement.attr('data-topic', topics[i]);
        newElement.addClass('topic-btn');
        newElement.text(topics[i]);
        $('#buttons-container').append(newElement);
        console.log('Created button ' + i + ':  ' + topics[i]);
    }
}