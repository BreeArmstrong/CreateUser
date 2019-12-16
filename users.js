  
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
  
  
  
  //Create User - UI Update - View
  function renderUsers() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; //Clear whatever inner html is there.
    const props = Object.keys(model.props); // [firstName, lastName, dateOFBirth ]
    Object.values(model.users).forEach(user => {
      const tr = document.createElement('tr'); //TODO read up on create element in MDN
      props.forEach(prop => {
        const td = document.createElement('td');
        td.innerHTML = user[prop];
        tr.appendChild(td)
      });
        tbody.appendChild(tr);
      });
    };
  
  //Create User - Controller
  const createUserControllerInit = () => {
    const button = document.querySelector(model.createButton.selector);
    const props = Object.keys(model.props);
    const inputElements = props.map(
      propName => document.querySelector(model.props[propName].selector)
    );
    console.log(inputElements);
    button.addEventListener('click', () => {
      const user = props.reduce((obj, propName, index) => {
        obj[propName] = inputElements[index].value;
        return obj;
      }, {});
      if (user.firstName.length && user.dateOfBirth.length) {
        //code to generate uuid for the user
        model.users[user.firstName] = user;
        console.log('Updated the users array: ', model.users);
      }
    });
  };
  const sortUsersControllerInit = () => {
    //Adding in an event listener for each th element
    const th = Array.from(document.querySelectorAll('th'));
    th.forEach(th => {
      th.addEventListener('click', function (e) {
        console.log(e, th);
        
        
        // model.users.sort(compareFn.bind(null, 'firstName'))
      })
    });
  };
  const initController = () => {
    createUserControllerInit();
    sortUsersControllerInit();
  };
  
  document.addEventListener('readystatechange', () => {
    if(document.readyState === 'interactive') {
      initController();
    }
  });
  
  
 
  
