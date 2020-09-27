import React from 'react';
import { Formik, Field } from 'formik';
import { MapPin } from 'react-feather';
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
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: cover;
  border-radius: 5px;
  font-size: medium;

  @media(min-width:320px) and (max-width:640px)
  {
    width: 400px;
    height: 550px;
  }


`;

const BG = styled.div`
  background: linear-gradient(to top right, #060628, #1F245A, #682359);
  position: fixed;
  top: 2;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Discription = styled(Field)`
  background-color: #262626;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  color:white;
  font-size: large;
  @media(min-width:320px) and (max-width:640px)
  {
    width: 400px;
    height: 550px;
  }
`;

const Div = styled.div`
  width: 30.3%;
  font-size: 18px;
  line-height: 1.2;
  float:left;
  border-radius: 20px;
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
    border-radius: 5px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  }
`;

const Seats = styled(Input)`
  width: 20%;
  line-height: 1.2;
`;

const Price = styled(Input)`
  width: 20%;
  line-height: 1.2;
  border-style:ridge;
  color:white;
  border-radius: 5px;
  border-color: #9677D9;
`;

const Option = styled(Input)`
  width: 70%;
  font-size: 18px;
  line-height: 1.2;
`;

const Dis = styled(Div)`
  width: 70%;
  font-size: 18px;
  line-height: 1.2;
  float:left;
  margin-top:-100px;
  margin-left:-40px;
`;

const Label = styled.label`
  color: #9677D9;
  font-size: large;
`;

const Button = styled.button`
  position: relative;
  margin: 15px 0 5px 0;
  margin-top: 20px;
  left: 10%;
  transform: translateX(-50%);
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width: 30%;
  font-family: "Noto Sans", sans-serif;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #d0d0d0;
  color: #B8B8B8;
    
  &:before,
  &:after {
    content: '';
    border-style: solid;
    position: absolute;
    z-index: 5;
    border-radius: 3px;
    box-sizing: content-box;
    @extend .animate;
  }
  
  &:before {
    width: 0;
    height: 100%;
    border-width: 1px 0 1px 0;
    top: -1px;
    left: 0;
    transition-delay: 0.05s;
  }
  
  &:after {
    width: 100%;
    height: 0;
    border-width: 0 1px 0 1px;
    top: 0;
    left: -1px;
  }
  
  &:hover {
    &:before {
      width: 100%;
    }
    
    &:after {
      height: 100%;
    }
  }
  
  &:before,
  &:after {
    border-color: #9677D9;
  }
  
  &:hover {
    border-color: #9677D9;
    color: White;
  }
`;

const Icon = styled(MapPin)`
  color: #9677D9;
  font-size: large;
  position: absolute;
  right: 20px;
`;

const onSubmit = () => {
  // console.log(JSON.stringify(values));
};

const form = (props) => (
  <div>

    <BG />
    <Form onSubmit={props.handleSubmit} className="Form">
      <Icon size={17} className="icon" />
      <Input name="startLocation" placeholder="Origin" className="input" />
      <Icon size={17} className="icon" />
      <Input name="destination" placeholder="Destenation" className="input" />
      <Div className="seats">
        <Label>Seats</Label>
        <br />
        <br />
        <Seats name="seatsAvailable" component="select" className="seats">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Seats>
      </Div>

      <Div>
        <Label>Date</Label>
        <br />
        <br />
        <Option name="startTime" type="date" />
      </Div>
      <Div>
        <Label>Time</Label>
        <br />
        <br />
        <Option name="time" type="time" />
      </Div>

      <Div>
        <Label>Price</Label>
        <br />
        <br />
        <Price name="price" />
        <Label> SEK </Label>
      </Div>

      <Dis>
        <Label>Description</Label>
        <br />
        <br />

        <Discription name="description" component="textarea" rows="7" cols="50" />

      </Dis>

      <i className="fal fa-bus-alt" />
      <Button data-testid="add-button" type="submit" className="Modal">ADD Ride</Button>
    </Form>

  </div>

);
const AddTrip = () => (
  <div className="SearchGui">
    <Formik
      data-testid="form"
      initialValues={{
        startLocation: '', destination: '', seatsAvailable: '1', startTime: '', time: '', price: '', description: '',
      }}
      onSubmit={onSubmit}
    >
      {form}
    </Formik>
  </div>
);

export default AddTrip;
