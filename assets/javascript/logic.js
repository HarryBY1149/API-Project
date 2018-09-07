$(document).ready(function () {

    var topics = ["Mario", "Luigi", "Yoshi", "Donkey Kong", "Princess Peach", "Bomberman",
        "Koopa Troopa", "Bowser", "Zelda", "Link", "Ganondorf", "Samus", "Kirby"];




    function genButtons() {
        $("#buttonDisplay").empty();
        for (i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("topic-button btn btn-info mx-1 mb-1");
            topicButton.attr("data-topic", topics[i]);
            topicButton.text(topics[i]);
            $("#buttonDisplay").append(topicButton);
        };
       
    };
   
    genButtons();

    $(document).on("click",".topic-button", function () {
        $("#gifDisplay").empty();
        var topic = $(this).attr("data-topic")
        var url = "https://api.giphy.com/v1/gifs/search?api_key=AHLrkkPuIsMOt9ym2MPRK9UVlIyIsH1A&q=" + topic + "&limit=10&rating=pg-13";
        $.ajax({
            url: url,
            method: "GET",
        }).then(function (response) {
            var results = response.data;
            for (j = 0; j < results.length; j++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("col-md-3 ml-2 mb-2");
                var p = $("<p>");
                p.addClass("ml-1 text-center bg-info text-light")
                p.text(results[j].rating);
                var gif = $("<img>");
                gif.addClass("gif");
                gif.attr("src", results[j].images.fixed_height_still.url)
                gif.attr("data-state", "still");
                gif.attr("data-still", results[j].images.fixed_height_still.url);
                gif.attr("data-animate", results[j].images.fixed_height.url);
                gifDiv.prepend(gif);
                gifDiv.prepend(p);
                $("#gifDisplay").append(gifDiv);
            }
        })
    });

    $(document).on("click",".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#submit").on("click", function () {
        var newTopic = $("#newTopic").val().trim();
        topics.push(newTopic);
        genButtons();
    })
})