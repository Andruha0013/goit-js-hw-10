import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs={
    searchInput:    document.querySelector("#search-box"),
    list:           document.querySelector(".country-list"),
    outPutElement:  document.querySelector(".country-info"),
};

refs.searchInput.addEventListener("input",debounce(()=>{

    fetchCountries(refs.searchInput.value.trim())
    .then(countries=>{
        if(countries.length>=2 && countries.length<10){
            refs.outPutElement.innerHTML="";
            getCountriesList(countries,refs.list);
        }
        else if(countries.length==1){
            refs.list.innerHTML="";
            console.log(countries.length);
            getCountiesInfo(countries,refs.outPutElement);
        }
        else{
            console.log(`countries = ${countries}`);
            if(countries===404){
                Notify.failure("Oops, there is no country with that name");
            }
            else{
                refs.outPutElement.innerHTML="";
                refs.list.innerHTML="";
                Notify.info("Too many matches found. Please enter a more specific name.");
            }
            
        }
    });
    //console.log(countries);
}),DEBOUNCE_DELAY);

function getCountriesList(countries,listElement){
    let items="";
    countries.map(country => {
        items+=`<li>
        <img width="50px" 
            src='${country.flags.svg}'
        </img>
        ${country.name}
        </li>`;
    });
    listElement.innerHTML=items;
}

function getCountiesInfo(countries,outPutElement){
    let info="";
    countries.map(country=>{
        info+=`<h1>
            <img width="50px" 
                src='${country.flags.svg}'
            </img>
            ${country.name}
        </h1>
        <ul>
            <li>Capital:${country.capital}</li>
            <li>Population:${country.population}</li>
            <li>languages:${country.languages.map(lang=>{return lang.name})}</li>
        </ul>`;
    });
    console.log(info);
    outPutElement.innerHTML=info;
}
