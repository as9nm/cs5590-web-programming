function getGithubInfo(user) {
}

function showUser(user) {


}

function getGithubInfo(user) {
    var url="https://api.github.com/users/"+username;//"https://api.github.com/users/"+user
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    return xhttp;
}

function showUser(user) {
    $('#profile h2').html(user.login+' has ID #'+user.id);

    $('.avatar').html('<img src="'+user.avatar_url+'" style="width:100px;height:100px;">');

    $('.information').html('<a href="'+user.html_url+'">'+username+'</a>');

}

function noSuchUser(username) {
    $('#profile h2').html("No user " + username);

}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        if (e.which == 13) {
            username = $(this).val();
            $(this).val("");
            response = getGithubInfo(username);
            if (response.status === 200) {
                showUser(JSON.parse(response.responseText));
            } else {
                noSuchUser(username);
            }
        }
    })
});