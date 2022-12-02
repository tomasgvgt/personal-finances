console.log('hi');

const userForm = document.getElementById('user-form');

const createUser = async (e) => {
  e.preventDefault();
  console.log(e.target.elements['first-name'].value);
  const { elements } = e.target;

  // TODO: validate form
  const data = {
    firstName: elements['first-name'].value,
    lastName: elements['last-name'].value,
    email: elements['email'].value,
    password: elements['password'].value,
  };

  try {
    const response = await fetch('/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    throw new Error(error);
  }
};

userForm.addEventListener('submit', createUser);
