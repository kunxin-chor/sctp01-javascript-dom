// The data layer is for responsible for processing of data
async function find(searchTerms, lat, lng, radius=1000) {

    const response = await axios.get("https://api.foursquare.com/v3/places/search",{
        params: {
            query: searchTerms, 
            ll: lat+","+lng, 
            radius: radius,
            limit: 50
        },
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3jhVKTC5HY3RD1RoOpjxNLUSVMxf122XO4sUGIqpAA2w='
            }
    });
    return response.data;
}

