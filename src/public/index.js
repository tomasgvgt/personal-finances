console.log('hi');

const userForm = document.getElementById('user-form');

const createUser = async (e) => {
  e.preventDefault();
  const { elements } = e.target;

  // TODO: validate form
  const data = {
    firstName: elements['first-name'].value,
    lastName: elements['last-name'].value,
    userName: elements['user-name'].value,
    email: elements['email'].value,
    password: elements['password'].value,
  };

  try {
    const response = await fetch('/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.token) {
      localStorage.setItem('token', responseData.token);
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    console.error(error);
  }
};

userForm.addEventListener('submit', createUser);
