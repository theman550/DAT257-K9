import React from 'react'
import {Formik, Field} from "formik" 
import {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const Form = styled.form`
box-sizing: border-box;
font-family: "Roboto", sans-serif;
width: 1000px;
height: 550px;
border-radius: 5px;
background:#262626;
box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
padding: 20px;
text-align: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-size: cover;
border-radius: 5px;
font-size: medium;
`;

const Input = styled(Field)`
border: none;
border-bottom: 1px solid #333;
background-color: #262626;
margin-bottom: 50px;
width: 100%;
font-size: 18px;
line-height: 1.2;
outline: none;
color: #9677D9;
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #9677D9;
  font-size: medium;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  opacity: 0.3;
}
`;

const Label = styled.label`
    color: #9677D9;
    font-size: large;
`;

const Button=styled.button `
position: relative;
    margin: 15px 0 5px 0;
    margin-top: 0px;
    left: 30%;
    transform: translateX(-50%);
    background: #9677D9;
    border: none;
    border-radius: 5px;
    padding: 10px;
    color: white;
    width: 60%;
    font-family: "Noto Sans", sans-serif;
    font-size: 14px;
    cursor: pointer;
    `;

const Icon = styled(FontAwesomeIcon)`
    color: #9677D9;
    font-size: large;
    position: absolute;
    right: 20px;
`;

export default class Addtrip extends Component{

onSubmit = (values) => {
    console.log(values);
}

form = (props) => {
    return (
    <div className="Addtrip">
    <Form onSubmit={props.handleSubmit} className="Form">
       <Icon icon={faMapMarkerAlt} className="icon" /> 
       <Input  name="origin" placeholder="Origin" className="input"/>
        <Icon icon={faMapMarkerAlt} className="icon" /> 
        <Input name="destenation" placeholder="Destenation" className="input"/>
        <div className="seats">
          <Label>Seats</Label>
          <br/>
        <Input name="seats" component="select" className="seats">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Input>
        </div>
       
        <div >
        <Label>Date</Label>
        <br/>
        <Input name="date" type="date" className="input">
        </Input>
        </div>
        <div>
        <Label>Time</Label>
        <br/>
        <Input name="time" type="time" className="input"></Input>
        </div>
        <i class="fal fa-bus-alt"></i>
        <Button data-testid= "add-button" type="submit" className="Modal">ADD Ride</Button>
        
    </Form>
    </div>)
}

  render(){ 
   return ( 
    <div className="SearchGui">
                <Formik data-testid="form"initialValues={{origin:"",destenation:"",seats:"1",date:"",time:""}} 
                     onSubmit={this.onSubmit}
                     render={this.form} />
            </div>)
 }
  }
 