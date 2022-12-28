function fetchCountries(name){
    const url="https://restcountries.com/v2/name/";
    const filters="?fields=name,capital,population,flags,languages";
    let query=url+name+filters;
    //console.log(url+country);
    try{
        return fetch(query)
        .then(respons=>{
            //console.log(respons);
            if(!respons.ok){
                return respons.status;
            }
            return respons.json();
        })
        .catch(error=>{
            //console.log(error);
            return error;
        });
    }
    catch(eror){
        return eror;
    }
    
}

export {fetchCountries};