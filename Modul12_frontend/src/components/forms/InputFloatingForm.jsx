import { Form, FloatingLabel } from "react-bootstrap"; 

const InputFloatingForm = (props) => { 
    
    return ( 
        <Form.Group className="mb-3" controlId={props.name}> 
            <FloatingLabel className="fw-bold text-dark" label={props.label}> 
                <Form.Control 
                className="text-dark bg-transparent border-secoondary" 
                placeholder={props.placeholder || props.label} 
                {...props} // menambahkan semua props lain yang ada di input 
                /> 
            </FloatingLabel> 
        </Form.Group> 
    ); 
}; 
 
export default InputFloatingForm; 
