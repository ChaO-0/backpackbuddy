import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import toTitleCase from 'to-title-case';
import setAxiosConfig from '../../../utils/axios-config';
import { setCurrentUserInfo } from '../../../utils/user-info';

function LoginForm () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = {
    username: useRef(null),
    password: useRef(null),
    rememberMe: useRef(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      username: inputRef.username.current.value,
      password: inputRef.password.current.value,
      remember_me: inputRef.rememberMe.current.checked
    }

    try {
      const res = await axios.post('/login', data);
      const { access_token, expires_at } = await res.data;

      setCookie(null, 'user_token', access_token, {
        path: '/',
        expires: new Date(expires_at)
      });

      // refresh token header config
      setAxiosConfig();

      // save the current user info
      const user = await axios.get('/current-user');
      setCurrentUserInfo(await user.data);

      router.back();

    } catch (err) {
      const { errors, message } = err.response.data;
      setError({ ...errors, message });
    } finally {
      setLoading(false);
    }
  }

  const inputAttributes = [
    {
      label: 'Username atau Email',
      name: 'username',
      placeholder: 'Masukkan username atau email'
    },
    {
      name: 'password',
      type: 'password'
    }
  ]

  return (
    <Form onSubmit={submitHandler} method="POST">
      {error?.message && <Alert variant="danger">{error.message}</Alert>}
      {inputAttributes.map(({ label, name, type, placeholder }) => (
        <Form.Group key={name} controlId={`input${toTitleCase(name)}`}>
          <Form.Label>{label || toTitleCase(name)}</Form.Label>
          <Form.Control
            key={name}
            type={type || 'text'}
            name={name}
            disabled={loading}
            ref={inputRef[name]}
            isInvalid={Boolean(error?.[name])}
            placeholder={placeholder || `Masukkan ${name}`}
          />
          {error?.[name] &&
            <Form.Control.Feedback type="invalid">
              {error[name].map(err => <div>{err}</div>)}
            </Form.Control.Feedback>}
        </Form.Group>
      ))}
      <Form.Group controlId="rememberMe">
        <Form.Check
          type="checkbox"
          ref={inputRef.rememberMe}
          disabled={loading}
          label="&nbsp;Ingat Saya"
        />
      </Form.Group>
      <Button
        className="d-block w-100"
        disabled={loading}
        variant="primary"
        type="submit"
      >
        {loading ? 'Sedang memproses' : 'Masuk'}
      </Button>
    </Form>
  );
}

export default LoginForm;
