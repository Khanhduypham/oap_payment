import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./payment.css"
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

import {NumberFormatBase, PatternFormat, usePatternFormat} from 'react-number-format';
import axios from "axios";
import {
    useParams,
    redirect
} from "react-router-dom";

export const Payment = () => {
    const {id} = useParams()

    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiredDate, setExpiredDate] = useState("")
    const [cvc, setCvc] = useState("")
    const [isError, setIsError] = useState(true)

    const [price, setPrice] = useState(0)
    const [isExist, setIsExist] = useState(false)
    useEffect(() => {
        axios.get(`https://kt4jv3uxq3.execute-api.ap-southeast-1.amazonaws.com/dev/${id}`).then((response) => {
            setPrice(response.data.data.price)
            setIsExist(true)
        }).catch(error => {
            if (error.response.data.messageKey === 'NOT_EXIST') {
                setIsExist(false)
            }
        })
    }, [])
    const handleSubmit = () => {
        const newCardNumber = cardNumber.replaceAll(" ", "")
        const payload = {
            expiredDate: "20" + expiredDate.split("/")[1] + "-" + expiredDate.split("/")[0],
            cardNumber: newCardNumber,
            cvc
        }
        axios.post(`https://kt4jv3uxq3.execute-api.ap-southeast-1.amazonaws.com/dev/${id}`, payload).then((response) => {
            console.log(response)
        }).catch(error => {
            console.log(error.response.data)
        })
    };
    const handleChange = (type, val) => {
        let err = false

        let tempName = name
        let tempExpiredDate = expiredDate.replace(" ", "")
        let tempCvc = cvc.replace(" ", "")
        let tempCardNumber = cardNumber

        if (type === "name") {
            tempName = val
        } else if (type === "cardNumber") {
            tempCardNumber = val
        } else if (type === "cvc") {
            tempCvc = val.replace(" ", "")
        } else if (type === "expiredDate") {
            tempExpiredDate = val.replace(" ", "")
        }

        if (tempName.length === 0 ||
            tempCardNumber.length !== 19 ||
            tempExpiredDate.length !== 5 ||
            tempCvc.length !== 3) {
            err = true
        }
        console.log(tempName.length, tempCardNumber.length, tempExpiredDate.length, tempCvc.length, err)
        setIsError(err)
    }
    const CardExpiry = (props) => {
        const { format, ...rest } = usePatternFormat({ ...props, format: '####' });

        const _format = (val) => {
            let month = val.substring(0, 2);
            const year = val.substring(2, 4);

            if (month.length === 1 && month[0] > 1) {
                month = "";
            } else if (month.length === 2) {
                // set the lower and upper boundary
                if (Number(month) === 0) {
                    month = '0';
                } else if (Number(month) > 12) {
                    month = '1';
                }
            }

            return format(`${month}${year}`);
        };

        return <NumberFormatBase format={_format} {...rest} />;
    }
    return (
        isExist ? <div className="wrapper">
            <Form className="form">
                <Row className="mb-3">
                    <Form.Group className="cardholder-wrapper" as={Col} md="12">
                        <Form.Label>Card holder</Form.Label>
                        <Form.Control
                                    className={"nameInput"}
                                    placeholder="Name"
                                      type="text"
                                      onChange={(e) => {
                                          setName(e.target.value)
                                          handleChange("name", e.target.value)
                                      }}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="card-number-wrapper">
                        <Form.Label>Card number</Form.Label>
                        <div>
                            <div className="cardWrapper">
                                <PatternFormat className="largeInput"
                                               placeholder="1234 1234 1234 1234"
                                               valueIsNumericString
                                               format="#### #### #### ####"
                                               mask=" "
                                               onChange={(e) => {
                                                   setCardNumber(e.target.value)
                                                   handleChange("cardNumber", e.target.value)
                                               }}
                                />
                                <div className="cardImage">
                                    <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#191E6E" d="M13.967 13.837c-.766 0-1.186-.105-1.831-.37l-.239-.109-.271 1.575c.466.192 1.306.357 2.175.37 2.041 0 3.375-.947 3.391-2.404.016-.801-.51-1.409-1.621-1.91-.674-.325-1.094-.543-1.094-.873 0-.292.359-.603 1.109-.603a3.602 3.602 0 0 1 1.455.269l.18.08.271-1.522-.047.01a5.053 5.053 0 0 0-1.74-.297c-1.92 0-3.275.954-3.285 2.321-.012 1.005.964 1.571 1.701 1.908.757.345 1.01.562 1.008.872-.005.471-.605.683-1.162.683zm8.461-5.655h-1.5c-.467 0-.816.125-1.021.583l-2.885 6.44h2.041l.408-1.054 2.49.002c.061.246.24 1.052.24 1.052H24l-1.572-7.023zM20.03 12.71l.774-1.963c-.01.02.16-.406.258-.67l.133.606.449 2.027H20.03zM8.444 15.149h1.944l1.215-7.026H9.66v-.002zM4.923 12.971l-.202-.976v.003l-.682-3.226c-.117-.447-.459-.579-.883-.595H.025L0 8.325c.705.165 1.34.404 1.908.697a.392.392 0 0 1 .18.234l1.68 5.939h2.054l3.061-7.013H6.824l-1.901 4.789z"/></svg>
                                    <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF5F00" d="M15.245 17.831h-6.49V6.168h6.49v11.663z"/><path fill="#EB001B" d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"/><path fill="#F79E1B" d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="-150 -249.37925 1300 1496.2755"><path d="M0 0h997.517v538.49l-49.375 77.147 49.375 68.661v313.219H0v-507.63l30.859-35.488L0 420.454z" fill="#016fd0"/><path d="M193.64 695.099v-156.61h165.82l17.791 23.193 18.38-23.193h601.886V684.3s-15.74 10.643-33.945 10.8H630.295l-20.058-24.688V695.1h-65.73v-42.142s-8.979 5.882-28.39 5.882h-22.373v36.26h-99.52l-17.766-23.69-18.038 23.69zM0 420.454l37.393-87.177h64.668l21.22 48.833v-48.833h80.388l12.633 35.295 12.247-35.295h360.858v17.744s18.97-17.744 50.146-17.744l117.085.41 20.854 48.193v-48.603h67.273l18.515 27.683v-27.683h67.89v156.61h-67.89l-17.744-27.774v27.773h-98.838l-9.94-24.687h-26.57l-9.779 24.687h-67.028c-26.826 0-43.974-17.381-43.974-17.381v17.381H488.343L468.285 465.2v24.687H92.481L82.548 465.2H56.06l-9.86 24.686H0z" fill="#fff"/><path d="M50.628 352.584L.193 469.848h32.836l9.306-23.482h54.1l9.257 23.482h33.56L88.863 352.584zm18.66 27.29l16.49 41.034H52.75zm73.435 89.954V352.564l46.661.173 27.14 75.605 26.49-75.778h46.289v117.264h-29.316v-86.405l-31.076 86.405h-25.71l-31.162-86.405v86.405zm166.638 0V352.564h95.663v26.23h-66.038v20.058h64.495v24.688h-64.495v20.83h66.038v25.458zm112.636-117.244v117.264h29.316v-41.66h12.343l35.15 41.66h35.826l-38.574-43.203c15.831-1.336 32.161-14.923 32.161-36.018 0-24.676-19.368-38.043-40.984-38.043zm29.316 26.23h33.51c8.04 0 13.887 6.288 13.887 12.343 0 7.79-7.577 12.344-13.452 12.344h-33.945zm118.807 91.014h-29.933V352.564h29.933zm70.975 0h-6.46c-31.262 0-50.243-24.63-50.243-58.15 0-34.349 18.768-59.114 58.246-59.114h32.402v27.773h-33.586c-16.026 0-27.36 12.507-27.36 31.63 0 22.71 12.96 32.248 31.63 32.248h7.715zm63.792-117.244l-50.435 117.264h32.836l9.305-23.482h54.1l9.258 23.482h33.559l-50.387-117.264zm18.66 27.29l16.49 41.034h-33.029zm73.386 89.954V352.564h37.272l47.59 73.676v-73.676h29.317v117.264h-36.067l-48.796-75.604v75.604zM213.699 675.04V557.776h95.662v26.23h-66.038v20.059h64.495v24.687h-64.495v20.83h66.038v25.458zm468.748 0V557.776h95.662v26.23h-66.038v20.059h64.187v24.687H712.07v20.83h66.038v25.458zm-369.373 0l46.578-57.908-47.687-59.356H348.9l28.4 36.693 28.497-36.693h35.488l-47.06 58.632 46.663 58.632H403.96l-27.576-36.114-26.905 36.114zM444.37 557.796V675.06h30.087v-37.03h30.859c26.111 0 45.903-13.853 45.903-40.792 0-22.317-15.523-39.442-42.094-39.442zm30.087 26.52h32.498c8.436 0 14.465 5.17 14.465 13.5 0 7.826-5.999 13.501-14.561 13.501h-32.402zm89.491-26.54V675.04h29.316v-41.66h12.344l35.15 41.66h35.825l-38.573-43.202c15.83-1.336 32.16-14.924 32.16-36.019 0-24.676-19.368-38.043-40.984-38.043zm29.316 26.23h33.511c8.039 0 13.887 6.288 13.887 12.344 0 7.79-7.577 12.343-13.453 12.343h-33.945zm198.423 91.034v-25.458h58.671c8.681 0 12.44-4.692 12.44-9.837 0-4.93-3.747-9.913-12.44-9.913h-26.513c-23.045 0-35.88-14.04-35.88-35.121 0-18.803 11.753-36.935 46-36.935h57.088l-12.343 26.385h-49.375c-9.438 0-12.343 4.952-12.343 9.682 0 4.86 3.59 10.222 10.8 10.222h27.773c25.69 0 36.838 14.572 36.838 33.655 0 20.517-12.422 37.32-38.236 37.32zm107.597 0v-25.458h58.67c8.682 0 12.44-4.692 12.44-9.837 0-4.93-3.746-9.913-12.44-9.913h-26.512c-23.046 0-35.88-14.04-35.88-35.121 0-18.803 11.753-36.935 45.999-36.935h57.089l-12.344 26.385h-49.374c-9.438 0-12.344 4.952-12.344 9.682 0 4.86 3.59 10.222 10.801 10.222h27.773c25.69 0 36.838 14.572 36.838 33.655 0 20.517-12.422 37.32-38.236 37.32z" fill="#016fd0"/></svg>
                                    <svg width="30px" viewBox="0 -140 780 780" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="M54.992 0C24.627 0 0 24.63 0 55.004v390.992C0 476.376 24.619 501 54.992 501h670.016C755.373 501 780 476.37 780 445.996V55.004C780 24.624 755.381 0 725.008 0H54.992z" fill="#4D4D4D"/><path d="M327.152 161.893c8.837 0 16.248 1.784 25.268 6.09v22.751c-8.544-7.863-15.955-11.154-25.756-11.154-19.264 0-34.414 15.015-34.414 34.05 0 20.075 14.681 34.196 35.37 34.196 9.312 0 16.586-3.12 24.8-10.857v22.763c-9.341 4.14-16.911 5.776-25.756 5.776-31.278 0-55.582-22.596-55.582-51.737 0-28.826 24.951-51.878 56.07-51.878zm-97.113.627c11.546 0 22.11 3.72 30.943 10.994l-10.748 13.248c-5.35-5.646-10.41-8.028-16.564-8.028-8.853 0-15.3 4.745-15.3 10.989 0 5.354 3.619 8.188 15.944 12.482 23.365 8.044 30.29 15.176 30.29 30.926 0 19.193-14.976 32.553-36.32 32.553-15.63 0-26.994-5.795-36.458-18.872l13.268-12.03c4.73 8.61 12.622 13.222 22.42 13.222 9.163 0 15.947-5.952 15.947-13.984 0-4.164-2.055-7.734-6.158-10.258-2.066-1.195-6.158-2.977-14.2-5.647-19.291-6.538-25.91-13.527-25.91-27.185 0-16.225 14.214-28.41 32.846-28.41zm234.723 1.728h22.437l28.084 66.592 28.446-66.592h22.267l-45.494 101.686h-11.053l-44.687-101.686zm-397.348.152h30.15c33.312 0 56.534 20.382 56.534 49.641 0 14.59-7.104 28.696-19.118 38.057-10.108 7.901-21.626 11.445-37.574 11.445H67.414V164.4zm96.135 0h20.54v99.143h-20.54V164.4zm411.734 0h58.252v16.8H595.81v22.005h36.336v16.791h-36.336v26.762h37.726v16.785h-58.252V164.4zm71.858 0h30.455c23.69 0 37.265 10.71 37.265 29.272 0 15.18-8.514 25.14-23.986 28.105l33.148 41.766h-25.26l-28.429-39.828h-2.678v39.828h-20.515V164.4zm20.515 15.616v30.025h6.002c13.117 0 20.069-5.362 20.069-15.328 0-9.648-6.954-14.697-19.745-14.697h-6.326zM87.94 181.199v65.559h5.512c13.273 0 21.656-2.394 28.11-7.88 7.103-5.955 11.376-15.465 11.376-24.98 0-9.499-4.273-18.725-11.376-24.681-6.785-5.78-14.837-8.018-28.11-8.018H87.94z" fill="#FFF"/><path d="m415.13 161.21c30.941 0 56.022 23.58 56.022 52.709v0.033c0 29.13-25.081 52.742-56.021 52.742s-56.022-23.613-56.022-52.742v-0.033c0-29.13 25.082-52.71 56.022-52.71zm364.85 127.15c-26.05 18.33-221.08 149.34-558.75 212.62h503.76c30.365 0 54.992-24.63 54.992-55.004v-157.62z" fill="#F47216"/></g></svg>

                                </div>
                            </div>
                            <div style={{display:'flex'}}>
                                <PatternFormat className="smallInputLeft"
                                               placeholder="MM/YY"
                                               valueIsNumericString
                                               format={"##/##"}
                                               onChange={(e) => {
                                                   if (e.target.value !== "") {
                                                       setExpiredDate(e.target.value)
                                                       handleChange("expiredDate", e.target.value)
                                                   }
                                               }}/>
                                <PatternFormat className="smallInputRight"
                                               placeholder="CVC"
                                               valueIsNumericString
                                               format="###"
                                               onChange={(e) => {
                                                   setCvc(e.target.value)
                                                   handleChange("cvc", e.target.value)
                                               }}/>
                            </div>
                        </div>
                    </Form.Group>
                </Row>
                {isError ?
                    <Button className="payBtn" onClick={handleSubmit} disabled>Pay ${price}</Button> :
                    <Button className="payBtn" onClick={handleSubmit}>Pay ${price}</Button>
                }
            </Form>
        </div> : "Wrong link"
    )

}