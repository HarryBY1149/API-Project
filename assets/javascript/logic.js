$(document).ready(function(){

var topics=["Mario", "Luigi", "Yoshi", "Donkey Kong", "Princess Peach", "Bomberman",
"Nes", "Bowser", "King Boo", "Zelda", "Link", "Ganondorf", "Samus", "Kirby"];




function genButtons(){
    $("#buttonDisplay").empty();
    for(i=0;i<topics.length;i++){
        var topicButton = $("<button>");
        topicButton.addClass("topic-button btn btn-info");
        topicButton.attr("data-topic", topics[i]);
        topicButton.text(topics[i]);
        $("#buttonDisplay").append(topicButton);
    }
};
genButtons();

$(".topic-button").on("click", function(){
    $("#gifDisplay").empty();
    var topic = $(this).attr("data-topic")
    var url = "https://api.giphy.com/v1/gifs/search?api_key=AHLrkkPuIsMOt9ym2MPRK9UVlIyIsH1A&q="+topic+"&limit=10&rating=pg-13";
    $.ajax({
        url: url,
        method: "GET",
    }).then(function(response){
        var results = response.data;
        for(j=0;j<results.length;j++){
            var gifDiv=$("<div>");
                gifDiv.addClass("col-md-4 ml-2 mb-2");
            var p=$("<p>");
                p.text(results[j].rating);
            var gif= $("<img>");
            gif.addClass("img-fluid gif");
            gif.attr("src", results[j].images.fixed_height_still.url)
            gif.attr("state", "still");
            gif.attr("still-url", results[j].images.fixed_height_still.url);
            gif.attr("animate-url", results[j].images.fixed_height.url);
            gifDiv.prepend(gif);
            gifDiv.prepend(p);
            $("#gifDisplay").append(gifDiv);
        }
    })
});

})