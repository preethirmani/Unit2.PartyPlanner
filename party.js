
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-preeti/events`;


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
    state.events = events.data;
  }catch(err) {
    console.log('Sorry not able to fetch all the events!');
  }
}

function renderEvents() {
  if(state.events.length <= 0) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>Sorry No Events to show...</h3>`;
    eventList.appendChild(listItem);
  } else {
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
    console.log(`Sorry! Unable to create the event${name}`);
  }
}

 


async function deleteEvent(e) {

  const id = e.target.param;
  try{
  const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
  }catch (err){
    console.error(`Sorry event deletion is not successfull!`);
  }
  render();
}