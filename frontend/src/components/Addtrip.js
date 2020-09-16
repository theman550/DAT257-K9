
import React from 'react'
import {Formik, Field} from "formik" 
import {Component} from 'react'
import '../style/Addtrip.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


class Addtrip extends Component{

onSubmit=(values) =>{
    console.log(values);
}


form = (props) => {
    return (
    <div className="Addtrip">
    <form onSubmit={props.handleSubmit} className="Form">
       <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> 
       <Field name="origin" placeholder="Origin" className="input"/>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> 
        <Field name="destenation" placeholder="Destenation" className="input"/>
        <div className="seats">
          <label>Seats</label>
          <br/>
        <Field name="seats" component="select" className="seats">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Field>
        </div>
       
        <div >
        <label>Date</label>
        <br/>
        <Field name="date" type="date" className="input">
        </Field>
        </div>
        <div>
        <label>Time</label>
        <br/>
        <Field name="time" type="time" className="input"></Field>
        </div>
        <i class="fal fa-bus-alt"></i>
        <button type="submit" className="Modal">ADD Ride</button>
        
    </form>
    </div>)
}

  render(){ 
   return ( 
    <div className="SearchGui">
                <Formik initialValues={{origin:"",destenation:"",seats:"1",date:"",time:""}} 
                     onSubmit={this.onSubmit}
                     render={this.form} />
            </div>)
 }
  }
 

    export default Addtrip