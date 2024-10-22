import Button from './Button';
const LoginForm = ({
  handelSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form
      onSubmit={(e) => {
        handelSubmit(e);
      }}
    >
      <div>
        username:
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button>login</Button>
    </form>
  );
};

export default LoginForm;
