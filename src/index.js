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
//=======================event==================================
refs.searchInput.addEventListener("input",debounce(()=>{

    fetchCountries(refs.searchInput.value.trim())
    .then(countries=>{
        if(countries.length>=2 && countries.length<10){
            clearElementsInnerHtml([refs.list, refs.outPutElement]);
            refs.list.innerHTML=getCountriesList(countries);
        }
        else if(countries.length==1){
            clearElementsInnerHtml([refs.list, refs.outPutElement]);
            //console.log(countries.length);
            refs.outPutElement.innerHTML=getCountiesInfo(countries);
        }
        else{
            //console.log(`countries = ${countries}`);
            if(countries==404){

                Notify.failure("Oops, there is no country with that name");
                clearElementsInnerHtml([refs.list, refs.outPutElement]);
            }
            else{
                clearElementsInnerHtml([refs.list, refs.outPutElement]);
                Notify.info("Too many matches found. Please enter a more specific name.");
            }
            
        }
    })
    .catch((error)=>{
        //console.log(error);
    });
    //console.log(countries);
}),DEBOUNCE_DELAY);

function getCountriesList(countries){
    return  countries.map(country => 
        `<li>
        <img width="50px" 
            src='${country.flags.svg}'
        </img>
        ${country.name}
        </li>`
    ).join("");
}

function getCountiesInfo(countries){
    return countries.map(country=>
        `<h1>
            <img width="50px" 
                src='${country.flags.svg}'
            </img>
            ${country.name}
        </h1>
        <ul class='country-infoList list'>
            <li class='country-infoList__item'><span class='contry-infoList__item-header'>Capital:</span><span class='country-infoList__item-info'>${country.capital}</span></li>
            <li class='country-infoList__item'><span class='contry-infoList__item-header'>Population:</span><span class='country-infoList__item-info'>${country.population}</span></li>
            <li class='country-infoList__item'><span class='contry-infoList__item-header'>languages:</span><span class='country-infoList__item-info'>${country.languages.map(lang=>{return lang.name})}</span></li>
        </ul>`
    ).join("");
}

function clearElementsInnerHtml(elementsArray){
    elementsArray.map((element)=>{
        element.innerHTML="";
    });
}