(function() {
    $('.rsvp').click(function() {
        console.log('rsvp for event');
        $.ajax({
            url: '/api/events/rsvp',
            type: 'POST',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: {
                userid: userid,
                eventid: event._id
            }
        }).done(function(res) {
           console.log(res);
        }).fail(function(res) {
            console.log('fail');
        });
    });
}(jQuery));