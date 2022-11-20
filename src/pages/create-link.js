import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import "./create-link.css"
import {Button} from "react-bootstrap";
import axios from "axios";

export const CreateLink = () => {
    const genMonths = () => {
        const res = []
        for (let i = 0; i < 12; i++) {
            res.push(<Dropdown.Item eventKey={i+1}>{i+1}</Dropdown.Item>)
        }
        return res
    }
    const [type, setType] = useState("One-time")
    const changeType = (e) => {
        setType(e)
    }

    const [month, setMonth] = useState("1")
    const changeMonth = (e) => {
        setMonth(e)
    }

    const [itemName, setItemName] = useState("")
    const changeItemName = (e) => {
        setItemName(e.target.value)
    }

    const [price, setPrice] = useState("")
    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const [id, setId] = useState("")

    const onCreate = () => {
        axios.post("https://kt4jv3uxq3.execute-api.ap-southeast-1.amazonaws.com/dev/create-link", {
            itemName,
            type,
            price: Number(price),
            period: Number(month)
        }).then((response) => {
           setId(response.data.data)
        })
    }
    return (
        <div className="wrapper">
            <div className="content">
                <div className="sub-content">
                    <Dropdown onSelect={changeType}>
                        <div className="itemWrapper">
                            <div className="itemTitle">Transaction Type</div>
                            <Dropdown.Toggle className="itemContent">
                                {type}
                            </Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu >
                            <Dropdown.Item eventKey="One-time">One-time</Dropdown.Item>
                            <Dropdown.Item eventKey="Subscription">Subscription</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {type === "Subscription" && <Dropdown onSelect={changeMonth}>
                        <div className="itemWrapper">
                            <div className="itemTitle">Every Months</div>
                            <Dropdown.Toggle className="itemContent">
                                {month}
                            </Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu>
                            {genMonths()}
                        </Dropdown.Menu>
                    </Dropdown>}
                </div>
                <Dropdown >
                    <div className="itemWrapper">
                        <div className="itemTitle">Item Name</div>
                        <Form.Control className="itemContent" onChange={changeItemName}/>
                    </div>
                </Dropdown>
                <Dropdown >
                    <div className="itemWrapper">
                        <div className="itemTitle">Price</div>
                        <Form.Control className="itemContent" onChange={changePrice} type="number"/>
                    </div>
                </Dropdown>
                <div className="itemWrapper">
                    {itemName === "" || price === "" ?
                        <Button className="createBtn" disabled>Create Link</Button> :
                        <Button className="createBtn" onClick={onCreate}>Create Link</Button>}
                </div>
            </div>
            <div className="content">
                {id !== "" && <a>https://main.d2bq7l37fni1o6.amplifyapp.com/payment/{id}</a>}
            </div>
        </div>
    )
}