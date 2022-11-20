import Form from 'react-bootstrap/Form';
import "./payment.css"
import {Button} from "react-bootstrap";
export const Payment = () => {
    return (
        <div className="wrapper">
            <Form className="form">
                <Form.Group className="cardholder-wrapper">
                    <Form.Label htmlFor="cardholder">Card holder</Form.Label>
                    <Form.Control id="cardholder" placeholder="Name" />
                </Form.Group>
                <Form.Group className="card-number-wrapper">
                    <Form.Label htmlFor="card-number">Card number</Form.Label>
                    <div>
                        <Form.Control id="card-number" placeholder="1234 1234 1234 1234" className="largeInput"/>
                        <div style={{display:'flex'}}>
                            <Form.Control className="smallInputLeft" placeholder="MM/YY"/>
                            <Form.Control className="smallInputRight" placeholder="CVC"/>
                        </div>
                    </div>
                </Form.Group>
            </Form>
            <Button className="payBtn">Pay $0</Button>
        </div>
    )
}