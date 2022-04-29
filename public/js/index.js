const fetchData= async ()=>{
    const response = await fetch(`/api/v1/venta?option=totalvanta`);
    const data = await response.json();
    return data;
}

const responseFetch = document.getElementById('resfetch');
async function btnCustomer(){
    let result = await fetchData();
    console.log(result);
}

function btnSale(){

}