import React from "react";

export default function currencyRow(props) {
	const { symbols, selectedCurrency, onChangeFunc, handleChange, amount } =
		props;
	return (
		<div className="space-x-4 flex">
			<input
				className="border-2 border-blue-300 outline-blue-500 rounded-lg py-3 px-2"
				type="number"
				name="currency"
				onChange={handleChange}
				value={amount}
			/>

			<select
				className="border-2 border-blue-300 outline-blue-500 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-4 py-2"
				name="dropdownCurrency"
				onChange={onChangeFunc}
				value={selectedCurrency}
			>
				{symbols.map((symbol) => (
					<option key={symbol} value={symbol}>
						{symbol}
					</option>
				))}
			</select>
		</div>
	);
}
