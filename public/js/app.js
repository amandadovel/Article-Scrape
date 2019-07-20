$(document).ready(() => {
    $("#scrape").on("click",() => {
        $.getJSON("/scrape", response => {
            // alert(`Successfully Scraped ${response} articles`)
            window.location.reload();
        })
    });
    
    // When you click on the save article button
    $(".save").on("click", function (event)  {

        let id = $(this).data("id");

        // Send put request with ajax
        $.ajax({
            method: "PUT",
            url: "/saved/" + id,
            data: {saved: true}
        }).then(() => {
            // Reload page to get the updated list
            location.reload();
        }).catch(err => {
            console.log(err);
        });
    });

    // When you click the comment button
    $(".comment").on("click", function (event) {
        // Grab the id associated with the article from the submit button
        let thisId = $(this).data("id");

        // Send put request
        $.ajax({
            method: "POST",
            url:"/api/comment",
            data: {
                // Value taken from note text area
                _id: thisId,
                commentText: $("#comment").val().trim()
            }
        })



        // Run a post request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/article"
        });
    });

    // Clear button
    $("#clear").on("click", (event) => {
           $.get("api/clear")
            .then(data => {
                $(".container").empty();
                location.reload();
            });
    });
});
