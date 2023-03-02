
import { useState, ChangeEvent, FormEvent } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import { getData } from "./utils/data-utils";
import FormInput from './components/form-input/form-input';

import './App.css';

// TypeScript declarations
type User = {
  id: number,
  name: string,
  mail: string,
  password: string,
  last_login: Date,
  is_activated: boolean,
  created_at: Date,
  updated_at: Date,
  
}

const defaultFormFields = {
  mail: '',
  password: '',
}

const App = () => {
  // react hooks
  const [user, setUser] = useState<User | null>()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { mail, password } = formFields

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // make the API call
      const res: any = await getData(
        'http://localhost:8000/login', mail, password
      )
      setUser(res.user);
      resetFormFields()
    } catch (error) {
      alert('User Sign In Failed: '+ error);
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields()
  };

  return (
    <div className='App-header'>
      <h1>
        {user && `Welcome! ${user.name}`}
      </h1>
      <div className="card">
        <Logo className="logo" />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="mail"
            value={mail}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type='password'
            required
            name='password'
            value={password}
            onChange={handleChange}
          />
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;