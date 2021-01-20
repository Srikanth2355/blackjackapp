function ageindays(){
    var birthyear = parseInt(prompt("what is your birth year"));
    var days = (2021 - birthyear) * 365;
    
    document.getElementById("ageindays").innerText = 'You are '+ days + ' days old.';
}

function reset() {
    document.getElementById('ageindays').remove();
    // document.getElementById('ageindays').innerText = null;

}