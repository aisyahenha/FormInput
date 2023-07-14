
    // import fetch from "node_modules";
    // globalThis.fetch = fetch

    // const fetch = require("node-fetch");
    // import fetch from 'cross-fetch';

    const urlNegara = 'https://insw-dev.ilcs.co.id/n/negara?ur_negara='
    const urlPelabuhan = 'https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=' //SG&ur_pelabuhan='
    const urlDetail = 'https://insw-dev.ilcs.co.id/n/barang?hs_code='
    const urlTarif = 'https://insw-dev.ilcs.co.id/n/tarif?hs_code='
    
   let  apiUrl ;
   let kodeNegara= '';
   let dataCukai = 0;

    async function getDataNegara(e) {
      apiUrl= urlNegara+e
      console.log(e);
      if (e.length == 3){
      const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.code === "200") {
          const dataNegara =jsonResponse.data[0].ur_negara;
          console.log(dataNegara);
          kodeNegara=jsonResponse.data[0].kd_negara;
          console.log(kodeNegara);
          document.getElementById('lNegara').value =dataNegara ;
        }
      }
    } 
    
    async function getDataPelabuhan(e) {
      apiUrl= urlPelabuhan+kodeNegara+'&ur_pelabuhan='+e
      // apiUrl='https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=SG&ur_pelabuhan=jur'
      console.log(e);
      if (e.length == 3){
        const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.code === "200") {
          const dataPelabuhan =jsonResponse.data[0].ur_pelabuhan;
          console.log(dataPelabuhan);
          document.getElementById('lPelabuhan').value = dataPelabuhan ;
        }
      }
    } 

    async function getDataDetail(e){
      apiUrl=urlDetail+e
      const response = await fetch(apiUrl);
      const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.code === "200") {
          const dataDetail =jsonResponse.data[0].sub_header+' ' + jsonResponse.data[0].uraian_id;
          console.log(dataDetail);
          document.getElementById('lDetail').value = dataDetail ;
        }
        else{
          document.getElementById('lDetail').value = '' ; 
        }
        await getDataCukai(e)
    }

    async function getDataCukai(e){
      apiUrl=urlTarif+e
      const response = await fetch(apiUrl);
      const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.code === "200") {
          dataCukai =jsonResponse.data[0].bm;
          console.log(dataCukai);
          document.getElementById('lCukai').value = dataCukai ;
        }
        else{
          document.getElementById('lCukai').value = '' ; 
        }
    }

    async function getTotal(e){      
        dataTotal = e * dataCukai
        if (dataTotal) {
          document.getElementById('lTotal').value = dataTotal ;
        } else {
          document.getElementById('lTotal').value = '';
        }
        
      
      
    }