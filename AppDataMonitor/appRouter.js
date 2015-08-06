/**
 * Created by Subbu on 7/6/15.
 */

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log("server is running successfully");
        res.redirect("home");
    });

    app.get("/home", function (req, res) {
        console.log("loading index page");
        res.render("index.html");
    });

    app.get("/app/partials/deviceDetails", function (req, res) {
        console.log("loading device details page");
        res.render("deviceDetails.html");
    });

    app.get("/app/partials/dashBoard", function (req, res) {
        console.log("loading dashboard page");
        res.render("dashboard.html");
    });

};
