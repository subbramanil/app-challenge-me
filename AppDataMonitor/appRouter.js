/**
 * Created by Subbu on 7/6/15.
 */

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log("server is running successfully");
        res.redirect("home");
    });

    app.get("/home", function (req, res) {
        console.log();
        res.render("index2.html");
    });

};