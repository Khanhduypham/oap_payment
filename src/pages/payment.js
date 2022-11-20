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
                        <div className="cardWrapper">
                            <Form.Control id="card-number" placeholder="1234 1234 1234 1234" className="largeInput"/>
                            <div className="cardImage">
                                <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#191E6E" d="M13.967 13.837c-.766 0-1.186-.105-1.831-.37l-.239-.109-.271 1.575c.466.192 1.306.357 2.175.37 2.041 0 3.375-.947 3.391-2.404.016-.801-.51-1.409-1.621-1.91-.674-.325-1.094-.543-1.094-.873 0-.292.359-.603 1.109-.603a3.602 3.602 0 0 1 1.455.269l.18.08.271-1.522-.047.01a5.053 5.053 0 0 0-1.74-.297c-1.92 0-3.275.954-3.285 2.321-.012 1.005.964 1.571 1.701 1.908.757.345 1.01.562 1.008.872-.005.471-.605.683-1.162.683zm8.461-5.655h-1.5c-.467 0-.816.125-1.021.583l-2.885 6.44h2.041l.408-1.054 2.49.002c.061.246.24 1.052.24 1.052H24l-1.572-7.023zM20.03 12.71l.774-1.963c-.01.02.16-.406.258-.67l.133.606.449 2.027H20.03zM8.444 15.149h1.944l1.215-7.026H9.66v-.002zM4.923 12.971l-.202-.976v.003l-.682-3.226c-.117-.447-.459-.579-.883-.595H.025L0 8.325c.705.165 1.34.404 1.908.697a.392.392 0 0 1 .18.234l1.68 5.939h2.054l3.061-7.013H6.824l-1.901 4.789z"/></svg>
                                <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF5F00" d="M15.245 17.831h-6.49V6.168h6.49v11.663z"/><path fill="#EB001B" d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"/><path fill="#F79E1B" d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"/></svg>
                            </div>
                        </div>
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