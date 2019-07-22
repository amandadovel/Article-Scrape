$(document).ready(() => {
    $("#scrape").on("click", () => {
        $.getJSON("/scrape", response => {
            // alert(`Successfully Scraped ${response} articles`)
            window.location.reload();
        })
    });

    // When you click on the save article button
    $(".save").on("click", function (event) {

        let id = $(this).data("id");

        // Send put request with ajax
        $.ajax({
            method: "PUT",
            url: "/saved/" + id,
            data: { saved: true }
        }).then(() => {
            // Reload page to get the updated list
            location.reload();
        }).catch(err => {
            console.log(err);
        });
    });

    // Delete comment on click function
    $(".delete-comment-btn").on("click", function (event) {

        let id = $(this).data("id");

        //Send put request with ajax
        $.ajax({
            method: "DELETE",
            url: "/delete/" + id,
            data: { _id: id }
        }).then(() => {
            location.reload();
        }).catch(err => {
            console.log(err);
        });
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
