
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-preethi/events`;
//const URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b/events`;

const state = {
  events : []
};

const eventList = document.getElementById('party-list');
const partyForm = document.getElementById('party-form');

console.log('partyForm::',partyForm);

partyForm.addEventListener('submit', createEvent);


async function render() {
  await getAllEvents();
  renderEvents();
}

render();


async function getAllEvents() {
  try{ 
    const response = await fetch(API_URL);
    const events = await response.json();
    console.log('Length:', events.data.length);
    state.events = events.data;
  }catch(err) {
    console.error(err);
  }
}

function renderEvents() {
  const eventCard = state.events.map(e => {
    const deleteBtn = document.createElement('button');
    const listItem = document.createElement('li');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', deleteEvent);
    deleteBtn.param = e.id;
    listItem.innerHTML = `
      <h3>${e.name}</h3>
      <p>${e.description}</p>
      <p>${e.location}</p>
    `;
    listItem.append(deleteBtn);
    return listItem;
  });
  eventList.replaceChildren(...eventCard);
} 

async function createEvent(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const date = `${document.getElementById('date').value}:00.000Z`;
  const location = document.getElementById('location').value;

  try{
    const response = await fetch(API_URL, {
      method : 'POST',
      headers : {'content-type' : 'application/json'},
      body: JSON.stringify({
               name, description, date, location
      })
    });
    render();
    window.alert(` Event - ${name} Created Successfully!`);
  }catch(err){
    console.error(err.message);
  }
}

 


async function deleteEvent(e) {

  const id = e.target.param;
  try{
  const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
  }catch (err){
    console.error(err.message);
  }
  render();
}