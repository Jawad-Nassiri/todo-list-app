// const createButton = document.querySelector(".create-button");
// const closeModalBtn = document.querySelector(".close");
// const closeXBtn = document.querySelector(".close-x-btn");
// const modal = document.querySelector(".modal-screen");
// const textarea = document.querySelector("textarea");
// const createNoteBtn = document.querySelector(".continue");
// const colorsBoxes = document.querySelectorAll(".color-box");
// const notesContainer = document.querySelector(".notes-container");

// let mainColor;

// function showModal() {
//   modal.classList.remove("hidden");
// }

// function hideModal() {
//   modal.classList.add("hidden");
// }

// function addNote() {
//   const note = textarea.value;

//   const parentArticleElem = document.createElement("article");
//   parentArticleElem.classList.add("note");

//   const noteContentElem = document.createElement("p");
//   noteContentElem.classList.add("note-content");
//   noteContentElem.innerHTML = note;

//   const trashParentDiv = document.createElement("div");
//   const noteTrashElem = document.createElement("i");
//   noteTrashElem.className = "fa-solid fa-trash delete";

//   trashParentDiv.append(noteTrashElem);
//   parentArticleElem.append(noteContentElem);
//   parentArticleElem.append(trashParentDiv);

//   notesContainer.append(parentArticleElem);
//   hideModal();
//   textarea.value = "";
// }

// colorsBoxes.forEach(function (colorBox) {
//   colorBox.addEventListener("click", function (event) {
//     mainColor = event.target.dataset.color;
//   });
// });

// createButton.addEventListener("click", showModal);
// closeModalBtn.addEventListener("click", hideModal);
// closeXBtn.addEventListener("click", hideModal);
// createNoteBtn.addEventListener("click", addNote);
// document.body.addEventListener("keyup", function (event) {
//   if (event.key === "Escape") {
//     hideModal();
//   }
// });


//?

const $ = document
const createTaskBtn = $.querySelector('.create-button')
const modalScreen = $ .querySelector('.modal-screen')
const modal = $ .querySelector('.modal')
const closeXBtn = $.querySelector('.close-x-btn')
const closeBtn = $.querySelector('.close')
const textareaElem = $.querySelector('textarea')
const createNodeBtn = $.querySelector('.continue')
const colorBoxes = $.querySelectorAll('.color-box')
const notesContainer= $.querySelector('.notes-container')
const inputElem = $.querySelector('input')
const searchIcon = $.querySelector('.search-icon')



createTaskBtn.addEventListener('click', openModalScreen)
closeXBtn.addEventListener('click', closeModalScreen)
closeBtn.addEventListener('click', closeModalScreen)
createNodeBtn.addEventListener('click', createNewNode)
searchIcon.addEventListener('click', searchNodeHandler)


let selectedColor = '';

function openModalScreen() {
  modalScreen.classList.remove('hidden')
}

function closeModalScreen() {
  modalScreen.classList.add('hidden')
}

$.addEventListener('keydown', (event) => {
  if(event.key === "Escape") {
    closeModalScreen()
  }
})

$.addEventListener('click', (event) => {
  if(!modal.contains(event.target) && !createTaskBtn.contains(event.target)) {
    closeModalScreen()
  }
})

colorBoxes.forEach(colorBox => {

  colorBox.addEventListener('click', () => {
    
    let selectedColorElem = $.querySelector('.selected')

    selectedColorElem.classList.remove('selected')
    colorBox.classList.add('selected')
    
    selectedColor = colorBox.dataset.color;
  })

})

function createNewNode( ) {
  let nodeValue = textareaElem.value

  if(textareaElem.value !== "") {
    notesContainer.insertAdjacentHTML('beforeend', 
    `
      <article class="note" style="background-color: ${selectedColor};">
        <p class="note-content">${nodeValue}</p>
        <div>
          <i class="fa-solid fa-trash delete" onclick="deleteNodeHandler(event)"></i>
        </div>
      </article>

    `
    )

    textareaElem.value = ''

    closeModalScreen()

  }
  


}

function deleteNodeHandler(event) {
  let articleElem = event.target.closest('article')

  articleElem.remove()
}

function searchNodeHandler() {
  const searchedNote = inputElem.value.trim().toLowerCase();
  const notes = $.querySelectorAll('.note-content');

  let matchFound = false;

  notes.forEach(note => {
    const noteText = note.textContent.toLowerCase();

    if (searchedNote === "" || noteText.includes(searchedNote)) {
      note.parentElement.style.display = 'flex';
      matchFound = true;
    } else {
      note.parentElement.style.display = 'none';
      inputElem.value = searchedNote;
    }
  });

  if (!matchFound) {
    notes.forEach(note => {
      note.parentElement.style.display = 'flex';
    });
  }

  inputElem.value = "";
}
