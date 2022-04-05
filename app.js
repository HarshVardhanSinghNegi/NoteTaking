// console.log("App.js");

showNotes();

// If user adds a note add it to the local storage
let addNotesBtn=document.getElementById('addNotesBtn');


addNotesBtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    // console.log(addTxt);
    //Add Title Object
    let titles=localStorage.getItem('titles');
    if(titles==null){
        titleObj=[];
    }else{
        titleObj=JSON.parse(titles);
    }
    titleObj.push(addTitle.value);
    
    //add Note Object
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    //update local storage
    localStorage.setItem('titles',JSON.stringify(titleObj));
    addTitle.value='';    
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value='';
    // console.log(notesObj);
    showNotes();
})

//function to delete a note
function deleteNote(index){
    // console.log("Deleting",index);

    //deleting Title
    let titles=localStorage.getItem('titles');
    if(titles==null){
        titleObj=[];
    }else{
        titleObj=JSON.parse(titles);
    }
    titleObj.splice(index,1);
    localStorage.setItem('titles',JSON.stringify(titleObj));

    //deleting note
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
} 

//function to show elements from local storage
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    let titles=localStorage.getItem('titles');
    if(titles==null){
        titleObj=[];
    }else{
        titleObj=JSON.parse(titles);
    }
    

    let html='';
    notesObj.forEach(function(element,index) {
        html+=`
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${titleObj[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
                </div>
              `;
    });
    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`No notes present use Add Note to add notes.`;
    }
}

//search notes
let searchTxt=document.getElementById('searchTxt');
searchTxt.addEventListener("input",function(){
    let inputTxt=searchTxt.value.toLowerCase();
    // console.log("input event fired",inputTxt);
    let noteCard=document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        let cardTitle=element.getElementsByTagName('h5')[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.toLowerCase().includes(inputTxt)||cardTitle.toLowerCase().includes(inputTxt)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})
