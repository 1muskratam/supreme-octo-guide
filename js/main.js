function ShowModal(modal)
{
    modal = document.getElementById(modal);
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
}
function HideModal(modal)
{
    modal = document.getElementById(modal);
    modal.style.display = "none";
    document.body.style.overflowY = "scroll";
}
function Message(value){
    window.confirm(value);
}