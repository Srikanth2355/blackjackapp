function ageindays(){
    var birthyear = parseInt(prompt("what is your birth year"));
    var days = (2021 - birthyear) * 365;
    
    document.getElementById("ageindays").innerText = 'You are '+ days + ' days old.';
}

function reset() {
    document.getElementById('ageindays').remove();
    // document.getElementById('ageindays').innerText = null;
}

function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}