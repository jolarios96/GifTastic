var topics = ['games', 'coffee', 'coding', 'music', 'penguins', 'deer', 'confusion'];

for (var i = 0; i < topics.length; i++){
    var newElement = $('<button>');
    newElement.attr( 'data-topic', topics[i]);
    newElement.addClass('topic-btn');
    newElement.text(topics[i]);
    $('#btn-wrapper').append(newElement);
    console.log('Created button ' + i + ':  ' + topics[i]);
}

// Goal: inside element of '#btn-wrapper, on click btn of class='topic-btn', get button's id
$('#btn-wrapper').on('click', '.topic-btn', function(){
    console.log('You clicked');
    console.log(this);
    console.log($(this).data('topic'));

    getGifs($(this).data('topic'));
})

// ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######  
// ##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## ##    ## 
// ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##       
// ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######  
// ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ## 
// ##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### ##    ## 
// ##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ######  

function getGifs(topic){

}