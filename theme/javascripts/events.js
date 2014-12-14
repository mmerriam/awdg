(function() {
    $('.rsvp').click(function() {
        $.ajax({
            url: '/api/events/rsvp',
            type: 'POST',
            dataType: 'json',
            data: {
                userid: userid,
                eventid: _event._id
            }
        }).done(function(res) {
            console.log(res);
        }).fail(function(res) {
            console.log('fail');
        });
    });
}(jQuery));