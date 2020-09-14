import React from 'react'
import {Formik, Field} from "formik" 
import {Component} from 'react'
import './Form.css'




 class App extends Component {
    
  onSubmit=(values) =>{
    console.log(values);
}

form = (props) => {
    return (<form onSubmit={props.handleSubmit} className="Form">
      
        <Field name="origin" placeholder="Enter Origin" className="input"/> 
        <Field name="destenation" placeholder="Enter Destenation" className="input"/>
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
       
        <div className="input">
        <label>Date</label>
        <br/>
        <Field name="date" type="date" id="date1">
          
        </Field>

        </div>
        
        
        <div className="input">
        <label>Time</label>
        <br/>
        <Field name="time" type="time"></Field>
        </div>
        
        <button type="submit" className="Modal">Find Ride</button>
    </form>)
}


render(){
   return (<div className="SearchGui">
                <Formik initialValues={{origin:"",destenation:"",seats:"1",date:"",time:""}} 
                     onSubmit={this.onSubmit}
                     render={this.form} />

            </div>)
 }



}


 
  



 
 







export default App
