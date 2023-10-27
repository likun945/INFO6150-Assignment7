$(document).ready(() => {
    // Get the username from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // Display the username on the second page
    if (username) {
        $('#usernameDisplay').text(`Logged-in User: ${username}`);
    } else {
        // Handle the case when no username is provided
        $('#usernameDisplay').text('No user logged in.');
    }
});
