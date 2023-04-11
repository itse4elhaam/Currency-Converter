import { useState, useEffect } from "react";
import "./tailwind.css";
import CurrencyRow from "./currencyRow";

const apiKey = "5c3ab3c721bbd2036239261d";

function App() {
	const [symbols, setSymbols] = useState([]);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("PKR");
	const [amount, setAmount] = useState(1);
	const [amntInFromCurrency, setAmntInFromCurrency] = useState(true);
	const [exchangeRate, setExchangeRate] = useState()


	let fromAmount, toAmount;

	if (amntInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;

	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	async function fetchData() {
		//base Currency will be my from current
		//then I will fetch the conversion rate from the api json
		// I'll multiply the amount with the fetched rate as the base currency is the from currency
		const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
		try {
			const response = await fetch(url);
			const result = await response.json();
			return result;
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	useEffect(() => {
		const symbolUpdater = async () => {
			const data = await fetchData();
			setSymbols(Object.keys(data.conversion_rates));
		};
		symbolUpdater();
	}, []);

	useEffect(() => {
		const converter = async () => {
			const data = await fetchData();
			console.log(data.conversion_rates[toCurrency]);
			setExchangeRate(data.conversion_rates[toCurrency]);

			// !TO BE FIXED
			// setAmount(amount * conversionRate);
			// console.log(amount);
		};
		converter();
		console.log("changed");
	}, [fromCurrency, toCurrency]);


	function handleFromChange(e) {
		setAmount(e.target.value);
		setAmntInFromCurrency(true);
	}
	function handleToChange(e) {
		setAmount(e.target.value);
		setAmntInFromCurrency(false);
	}

	return (
		<div className="flex justify-center items-center flex-col min-h-screen gap-10 bg-gradient-to-br from-blue-200 to-blue-100">
			<h1 className="text-6xl text-gray-700">Convert</h1>
			<CurrencyRow
				selectedCurrency={fromCurrency}
				symbols={symbols}
				onChangeFunc={(e) => setFromCurrency(e.target.value)}
				handleChange={handleFromChange}
				amount={fromAmount}
			/>
			<div className="text-6xl text-gray-700">=</div>
			<CurrencyRow
				selectedCurrency={toCurrency}
				symbols={symbols}
				onChangeFunc={(e) => setToCurrency(e.target.value)}
				handleChange={handleToChange}
				amount={toAmount}
			/>
		</div>
	);
}

export default App;
