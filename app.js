// Hide the UpperCase Keyboard when page loads
$('#keyboard-upper-container').hide();

// Some minor styling to get the yellow box and target letter lined up well
$('#yellow-block').css('padding-left', '0');
$('#yellow-block').css('margin-left', '1px');
$('#target-letter').css('display', 'block');
$('#target-letter').css('bottom', '1rem');


// Holding down Shift shows the uppercase keyboard, keyup reverts back to lowercase keyboard
$(document).keydown(function (e) {
    if (e.which == 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
    $(document).keyup(function (e) {
        if (e.which == 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }

    });

});

// Hightlights the key you press (create a CSS class in styles.css for 'highlights')
$(document).keypress(function (e) {
    $(`#${e.which}`).addClass('highlights')
    $(document).keyup(function (e) {
        $('.highlights').removeClass('highlights')
    })
});


// Settiing up the sentences other other variables for the typing game
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceNumber = 0;
let letterNumber = 0;
let mistakeCount = 0;

// Place the first sentence on the page at the time of page load
$('#sentence').append(`<div>${sentences[sentenceNumber]}</div>`);

// Shows the letter you need to type in the div with the #target-letter id.
$('#target-letter').append(String.fromCharCode(sentences[sentenceNumber].charCodeAt(letterNumber)));

//setting initial variables for tracking time
let start = (new Date).getTime();
let clockStart = false;

$(document).keypress(function (e) {
    // Set up the clock to begin counting when the first key is pressed
    if (clockStart === false) {
        start;
        clockStart = true;
    }

    // Sets up what happens when the right or wrong key is pressed
    // If it's the right key, the yellow block highlightes the next letter, the letter displayed in #target-letter div goes to the next one in line, and a green check mark is displayed
    // if it's the wrong key, a X mark is displayed to show an incorrect attempt, and a mistake is saved in mistakeCount
    if (e.which == sentences[sentenceNumber].charCodeAt(letterNumber)) {
        $('#yellow-block').css('left', '+=17.3px');
        $('#feedback').html('<span class="glyphicon glyphicon-ok"></span>');
        letterNumber++;
        $('#target-letter').text(String.fromCharCode(sentences[sentenceNumber].charCodeAt(letterNumber)));
    } else {
        $('#feedback').html('<span class="glyphicon glyphicon-remove"></span>');
        mistakeCount++;
    }

    // Set up the next line of text to appear, and get the yellow highlighted area to follow
    if (letterNumber == sentences[sentenceNumber].length) {
        sentenceNumber++;
        letterNumber = 0;
        $('#feedback').empty();
        $('#sentence').append(`<div>${sentences[sentenceNumber]}</div>`);
        $('#yellow-block').css({
            'left': '14px',
            'top': '+=34px'
        })
    }

    // Calculates the words per minute, and create a confirm box to appear at the end, allowing you to play again and reset the game if desired.
    if (sentenceNumber == sentences.length) {
        let end = (new Date).getTime();
        let minutes = (end - start) / 60000;
        console.log((end - start) / 60000)
        wordsPerMinute = Math.round(54 / minutes - 2 * mistakeCount);
        let confirmBox = confirm(
            `You type at ${wordsPerMinute} words per minute! Play Again?`
        );
        if (confirmBox == true) {
            location.reload();
        } else {
            alert(`TOO BAD`)
            location.reload();
        }
    }

});


