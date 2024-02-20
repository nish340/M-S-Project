import Form from 'react-bootstrap/Form';

function CheckExample() {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`default-${type}`}
            label={"I accept Terms and Conditions" }/>
        </div>
      ))}
    </Form>
  );
}

export default CheckExample;