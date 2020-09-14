import {Formik, Field} from "formik" 
import {Component} from 'react'


class Search_Gui extends Component {

    onSubmit=(values) =>{
        console.log=(values);
    }

    form= (props) => {
        return (<form onSubmit={props.handleSubmit}>
            <Field name="name" /> <br/>
            <hr></hr>
            <Field name="destenation"/> <br/>

            <button type="submit">Find Ride</button>
        </form>)
    }
    
  
    render(){
       return (<div className="SearchGui">
                    <Formik initialValues={{name:"Enter Origin",destenation:"Enter Destenation"}} 
                         onSubmit={this.onSubmit}
                         render={this.form} />

                </div>)
     }
  
  
   
    }


    export default Search_Gui