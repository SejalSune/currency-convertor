let BASE_URL='https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const dropdown=document.querySelectorAll('.drop select');
let btn=document.querySelector('button');

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector('.msg');

for (let select of dropdown){
    for (currcode in countryList){
        let NewO=document.createElement('option');
        NewO.innerText=currcode;
        NewO.value=currcode;
        if (select.name=="from" && currcode=="USD"){
            NewO.selected='selected';
        } else if (select.name=="to" && currcode=="INR"){
            NewO.selected='selected';
        }
        select.append(NewO);
    }

    select.addEventListener('change',(evt) =>{
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode=element.value;
    let countryCode = countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newSrc;
}

btn.addEventListener('click', async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector('input');
    let amtvalue=amount.value;
    if (amtvalue=="" || amtvalue<1){
        amtvalue=1;
    }


    const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    console.log(rate);

    let finalamount=amount*rate;
    msg.innerText=`${amtvalue} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
});