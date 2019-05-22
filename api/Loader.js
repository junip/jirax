/**
 * Simple loader showing on Cli tool during data loading or any use case
 */

module.exports = Loader;

function Loader() {
    // loader logic 
    this.showLoader = function() {
        console.log("logging")
    }
}