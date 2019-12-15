document.addEventListener('readystatechange', function () {
  if (document.readyState === 'interactive') {
    init();
  }
});

function init() {
  //Constants
  const button = document.querySelector('button');
  const inputElements = document.querySelectorAll('input');
  const users = [];
  
  
  //Create a get and set method for creating or updating a user
  const usersHandler = {
    get: function (obj, prop) {
      console.log(`You are trying to access the ${prop} on the object ${obj}`);
      return obj[prop];
    },
    set: function (obj, prop, newValue) {
      console.log(`You are trying to set the ${prop} on the object ${obj} to the new value ${newValue}`);
      obj[prop] = newValue;
      renderUsers();
      console.log('Envoked renderUsers again');
      return true;
    }
  };
  
  //Create User - Model
  const model = {
    props: {
      firstName: {
        selector: 'input.first-name',
        sortState: undefined //Is it asc or desc? default undefined until sort is called the first time
      },
      lastName: {
        selector: 'input.last-name',
        sortState: undefined
      },
      dateOfBirth: {
        selector: 'input.date-of-birth',
        sortState: undefined
      }
    },
    createButton: {
      selector: '.create-user button'
    },
    users: new Proxy({}, usersHandler)
  };
  
  //Adding in an event listener for each th element
  const th = Array.from(document.querySelectorAll('th'));
  th.forEach(th => {
    th.addEventListener('click', function (e) {
      console.log(e, th);
    })
  });
  
  //Create User - UI Update - View
  function renderUser() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; //Clear whatever inner html is there.
    const props = Object.keys(model.props); // [firstName, lastName, dateOFBirth ]
    Object.values(model.users).forEach(user => {
      const tr = document.createElement('tr'); //TODO read up on create element in MDN
      props.forEach(props => {
        const td = document.createElement('td');
        td.innerHTML = user[prop];
        tr.appendChild(td)
      });
        tbody.appendChild(tr);
      });
    };
  
  
  
  function sortBy(users, prop) {
    const newUsersArray = [...users];
    if (th.innerText.includes('(asc)')) {
      
      newUsersArray.reverse();
      th.innerText.replace('(asc)', '(desc)')
    } else {
      newUsersArray.sort();
      th.innerText.replace('(desc)', '(asc)')
    }
    console.log(newUsersArray);
    return newUsersArray;
    
  }
  
  
  //Events
  button.addEventListener('click', function () {
    //Target the section for create user
    const user = {
      firstName: inputElements[0].value,
      lastName: inputElements[1].value,
      dob: inputElements[2].value
    };
    createTrElement(user);
    console.log(user);
    users.push(user);
    console.log(users);
  });
  
 
  
}