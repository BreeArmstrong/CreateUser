//Create a get and set method for creating or updating a user
const modelHandler = {
  set: function (obj, prop, newValue) {
    // console.log(`You are trying to set the ${prop} on the object ${obj} to the new value ${newValue}`, prop, obj, newValue  );
    obj[prop] = newValue;
    renderUsers();
    return true;
  }
};


//Create User - Model
const modelTarget = {
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
  users: {
    'Brianna': {
      firstName: 'Brianna',
      lastName: 'Grizell',
      dateOfBirth: '2019-01-01'
    },
    'Krithika': {
      firstName: 'Krithika',
      lastName: 'Swaminathan',
      dateOfBirth: '2019-02-01'
    },
    'Priya': {
      firstName: 'Priya',
      lastName: 'Ravi',
      dateOfBirth: '2019-03-01'
    }
  }
};
const model = new Proxy(modelTarget, modelHandler);

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
      model.users = {
        ...model.users,
        [user.firstName]: user
      };
      console.log('Updated the users array: ', model.users);
    }
  });
  renderUsers();
};

const compareFn = (prop, a, b) => {
  if (a[prop] < b[prop]) {
    return -1;
  } else if (a[prop] > b[prop]) {
    return 1;
  } else return 0;
};

const thClickHandler = function (e) {
  //Replace the firstName with generic
  const users = Object.values(model.users);
  const {prop} = e.currentTarget.dataset;
  users.sort(compareFn.bind(null, prop));
  model.users = users.reduce((usersObj, user) => {
    usersObj[user.firstName] = user;
    return usersObj;
  }, {});
};

const sortUsersControllerInit = () => {
  //Adding in an event listener for each th element
  const th = Array.from(document.querySelectorAll('th'));
  th.forEach(th => {
    th.addEventListener('click', thClickHandler)
  });
};


const initController = () => {
  createUserControllerInit();
  sortUsersControllerInit();
};

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    initController();
  }
});




