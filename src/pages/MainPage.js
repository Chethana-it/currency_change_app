import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MainPage() {

//   state for the form field
    
const [date, setDate] = useState(null);
const [sourceCurrency, setSourceCurrency] = useState("");
const [targetCurrency, setTargetCurrency] = useState("");
const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    

    // create state for store currency names list

    const [currencyNames, setCurrencyNames ] = useState([])

    // handleSubmit method
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const responce = await axios.get(
                "http://localhost:5000/convert",
               {params: {
                   date, sourceCurrency, targetCurrency, amountInSourceCurrency
                }}
            );
            
            setAmountInTargetCurrency(responce.data);
        } catch (err) {
            console.error(err);
        }
    }

    // get currencies

    useEffect(() => {
        const getTheCurrencies = async () => {
          try {
            const responce = await axios.get(
              "http://localhost:5000/getAllCurrencies"
            );
              setCurrencyNames(responce.data);
          } catch (err) {
            console.error(err);
          }
        };
        getTheCurrencies();
      }, []);

  return (
    <div>
          <h1 className=' lg:mx-32 text-5xl font-bold text-green-500'>Convert Your Currencies</h1>
          <p className=' lg:mx-32 opacity-40 py-6'>The authors use data from the water supply system of the city of Franca, Brazil, to train and test the hybrid model. The results of the study show that the hybrid model is able to forecast water demand with an accuracy of up to 95%. This is significantly higher than the accuracy of traditional SVR models, which are typically only able to forecast water demand with an accuracy of around 80%.</p>          

          <div className=' mt-2 flex items-center justify-center flex-col'>
              <section className=' w-full lg:w-1/2'>
                  <form onSubmit={handleSubmit}>
                  <div>
                          <label htmlFor={date}    
                              className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                          <input
                              onChange={(e)=> setDate(e.target.value)}
                              type="Date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 mb-10"  />
                      </div>
                      
                      <div >
                          <label htmlFor={sourceCurrency} className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
                          <select
                              onChange={(e)=> setSourceCurrency(e.target.value)}
                              id={sourceCurrency} name={sourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500cmb-10 placeholder:sourcecurrency" >
                              <option value="">Select Source Currency</option>
                              {
                                  Object.keys(currencyNames).map((currency) => (
                                      <option className='p-1' key={currency} value={currency}>
                                          {currencyNames[currency]}
                                      </option>
                                  ))
                              }
                          </select>
                    
                      </div>
                      
                      <div>
                          <label htmlFor={targetCurrency} className="block mb-4 text-sm font-medium text-gray-900 dark:text-white mt-10">Target Currency</label>
                          <select
                              onChange={(e)=> setTargetCurrency(e.target.value)}
                              id={targetCurrency} name={targetCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500cmb-10 placeholder:sourcecurrency" >
                              <option value=''>Select Target Currency</option>
                              {
                                  Object.keys(currencyNames).map((currency) => (
                                      <option className='p-1' key={currency} value={currency}>
                                          {currencyNames[currency]}
                                      </option>
                                  ))
                              }
                          </select>    
                      </div>
                      
                      <div>
                    <label htmlFor={amountInSourceCurrency }className="mt-10 block mb-4 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                          <input
                              onChange={(e)=> setAmountInSourceCurrency(e.target.value)}
                              type="text" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 mb-10 "  />
                      </div>

                      <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'>
                          Get the Target Curency
                      </button>
                  </form>
              </section>
          </div>
        {amountInTargetCurrency}
      </div>
  )
}
