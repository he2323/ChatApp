const Login = (props: any): JSX.Element => {
  return (
    <div>
      login
      <button onClick={() => props.toRegister()}>toRegister</button>
    </div>
  );
};

export default Login;
