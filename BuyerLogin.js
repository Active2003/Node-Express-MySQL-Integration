import Layout from './Layout';
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

function BLogin() {
  const [justifyActive, setJustifyActive] = useState('tab1');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };




// Inside the handleLoginSubmit function in BLogin.js
const handleLoginSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5001/BuyerLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      console.log('Buyer Login data submitted successfully!');
      // Perform any necessary actions upon successful submission
    } else {
      console.error('Failed to submit Buyer Login data.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};



  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle registration form submission and send data to the server
    console.log('Registration data:', registerData);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prevData) => {
      if (type === 'checkbox') {
        return {
          ...prevData,
          [name]: checked,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <Layout>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-25 w-md-25">
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>
            <form onSubmit={handleLoginSubmit}>
              <MDBInput wrapperClass='mb-4' label='Email address' id='login-form-email' type='email' name='email' value={loginData.email} onChange={handleLoginInputChange} />
              <MDBInput wrapperClass='mb-4' label='Password' id='login-form-password' type='password' name='password' value={loginData.password} onChange={handleLoginInputChange} />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='rememberMe' value='true' id='login-form-rememberMe' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn type="submit" className="mb-4 w-100" style={{ height: '40px' }}>Sign in</MDBBtn>
              <p className="text-center">Not a member? <a href="#!">Register</a></p>
            </form>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            <form onSubmit={handleRegisterSubmit}>
              <MDBInput wrapperClass='mb-4' label='Name' id='register-form-name' type='text' name='name' value={registerData.name} onChange={handleRegisterInputChange} />
              <MDBInput wrapperClass='mb-4' label='Username' id='register-form-username' type='text' name='username' value={registerData.username} onChange={handleRegisterInputChange} />
              <MDBInput wrapperClass='mb-4' label='Email' id='register-form-email' type='email' name='email' value={registerData.email} onChange={handleRegisterInputChange} />
              <MDBInput wrapperClass='mb-4' label='Password' id='register-form-password' type='password' name='password' value={registerData.password} onChange={handleRegisterInputChange} />

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='agreeToTerms' id='register-form-agreeToTerms' label='I have read and agree to the terms' />
              </div>

              <MDBBtn type="submit" className="mb-4 w-100" style={{ height: '40px' }}>Sign up</MDBBtn>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </Layout>
  );
}

export default BLogin;
