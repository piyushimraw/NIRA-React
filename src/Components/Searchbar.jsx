import React, { Component } from 'react'

import Suggestions from './Suggestions'
import * as SearchActions from '../actions/searchActions';

import './Searchbar.css'

let rivers = [{name : 'item1'},{name : 'item2'},{name : 'item3'},{name : 'item4'},{name : 'ganga'},{name : 'yamuna'},
              {name : 'kaveri'},{name : 'ganges'|| "Ganga"},{name : 'indus' || "Indus"},{name : 'oxygen'},{name : 'alkanity'}];
class Searchbar extends Component {
 state = {
   query: '',
   results:[]
 }



 getInfo = (query) => {
        this.setState({
          results: rivers.filter(function(data){
            return data.name.includes(query.toLowerCase());
          })
          })



  }


  handleInputChange = () => {
     this.setState({
       query: this.search.value
     }, () => {
       if (this.state.query && this.state.query.length > 0) {

           this.getInfo(this.search.value)

       }
     })
   }

   handleSubmit = (e) => {
      e.preventDefault();
      // console.log('event handled')
      SearchActions.searchRiver(this.search.value);
   }


 render() {
   return (
     <div>
     <form className="search-form hidden-sm hidden-xs" onSubmit={this.handleSubmit}>
       <input
         type="text"
         className="search-bar"
         placeholder="Enter River"
         ref={input => this.search = input}
         onChange={this.handleInputChange}
         />
       <span className="fa fa-search search-span"></span>
       <Suggestions results={this.state.results} />
     </form>
   </div>
   )
 }
}

export default Searchbar
