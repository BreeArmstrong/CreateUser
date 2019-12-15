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
  const th = (document.querySelectorAll('th'));
  const headers = Array.prototype.slice.call(th);
  const tbody = document.querySelector('tbody');
  
  const header = {
    firstName: headers[0].innerText,
    lastName: headers[1].innerText,
    birthDate: headers[2].innerText
  };
  
  //Functions
  function createTrElement(user) {
    const tr = document.createElement('tr'); //TODO read up on create element in MDN
    tbody.appendChild(tr);
    Object.values(user).forEach(val => {
      const td = document.createElement('td');
      td.innerHTML = val;
      tr.appendChild(td)
    });
    
  }
  
  function sortBy(users, prop) {
    const newUsersArray = [...users];
    if (headers.innerText.includes('(asc)')) {
      
      newUsersArray.reverse();
      headers.innerText.replace('(asc)', '(desc)')
    } else {
      newUsersArray.sort();
      headers.innerText.replace('(desc)', '(asc)')
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
  
  headers.forEach(th.addEventListener)
  
}