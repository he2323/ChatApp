const Register = (props: any): JSX.Element => {
  return (
    <div>
      register
      <button onClick={() => props.toLogin()}>toLogin</button>
    </div>
  );
};

export default Register;
