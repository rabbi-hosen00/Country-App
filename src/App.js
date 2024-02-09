import React, {useState, useEffect} from 'react';



import Countries from './components/Countries';
import "./App.css"
import Search from './components/Search';



const url = "https://restcountries.com/v3.1/all"


const App = () => {

const [isLoading, setIsLoading] = useState(true)
const [error, setIError] = useState(null)
const [countries, setCountries] = useState([]);
const [filterCountries, setFilterCountries] = useState(countries);

const fetchData = async(url) => {
    setIsLoading(true)
   try {
    const response = await fetch(url);
    const data = await response.json();
    setCountries(data);
    setFilterCountries(data);
    setIsLoading(false);
    setIError(null);
   } catch (error) {
    setIsLoading(false);
    setIError(error);
   }
}

useEffect (() => {
    fetchData(url)

}, []);

const handleRemoveCountry = (name) => {
    const filter = filterCountries.filter((country) => country.name.common !== name);
    setFilterCountries(filter);
}

 const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((country) => {
        const counTryName = country.name.common.toLowerCase();
        return counTryName.startsWith(value);
    })
    setFilterCountries(newCountries);
 }


  return <>
      <h1> Country App</h1>
      <Search onSearch={handleSearch}/>
      {isLoading && <h2> Loading....</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && < Countries
       countries ={filterCountries}
      onRemoveCountry={handleRemoveCountry} /> }
  </>
}

export default App;

