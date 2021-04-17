import React, { useState, StrictMode } from 'react';
import { render } from "react-dom";

const initialGlobalState = {
	pcfg: 0
};

const GlobalStateContext = React.createContext(initialGlobalState);
const DispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(state, newValue) => ({ ...state, ...newValue }),
		initialGlobalState
	);

	console.log(state);

	return (
	<GlobalStateContext.Provider value={state}>
		<DispatchStateContext.Provider value={dispatch}>
			{children}
		</DispatchStateContext.Provider>
	</GlobalStateContext.Provider>
	);
};

const useGlobalState = () => [
	React.useContext(GlobalStateContext),
	React.useContext(DispatchStateContext)
];

const PCfgComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<label htmlFor="pcfg" className="col-sm-2 col-form-label">Pin Configuration</label>
	<div className="col-sm-4">
		<input type="text" className="form-control"
			onChange={event => {
				var num = parseInt(event.target.value, 16);

				if (!isNaN(num))
					dispatch({ pcfg: parseInt(event.target.value, 16) });
				else
					dispatch({ pcfg: state.pcfg });
			}}
			value={state.pcfg.toString(16)}
		/>
	</div>
</div>
	);
});

const HYSComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div className="col-sm-2">Hysteresis</div>
	<div className="col-sm-4">
		<div className="form-check" >
			<input className="form-check-input" type="checkbox" id="hys"
				checked={state.pcfg & (1 << 16)}
				onChange={event => {
					var pcfg = state.pcfg;

					if (event.target.checked)
						pcfg |= (1 << 16);
					else
						pcfg &= ~(1 << 16);

					dispatch({ pcfg: pcfg });
				}}
			/>
			<label className="form-check-label" htmlFor="hys">Hysteresis Enabled</label>
		</div>
	</div>
</div>
	);
});

const PUSComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div class="row mb-3">
		<div class="col-sm-2">Pull Up/Down Configuration</div>
		<div class="col-sm-4">
			<select className="form-select"
				value={ (state.pcfg & (((1 << 2) - 1) << 14)) >> 14 }
				onChange={event => dispatch({ pcfg: (state.pcfg & ~(((1 << 2) - 1) << 14)) | (event.target.value << 14) })}
			>
				<option value="0">100K Ohm Pull Down</option>
				<option value="1">47K Ohm Pull Up</option>
				<option value="2">100K Ohm Pull Up</option>
				<option value="3">22K Ohm Pull Up</option>
			</select>
		</div>
	</div>
</div>
	);
});

const PUEComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div class="row mb-3">
		<div class="col-sm-2">Pull/Keep Select</div>
		<div class="col-sm-4">
			<select className="form-select"
				value={(state.pcfg & (1 << 13)) >> 13}
				onChange={event => dispatch({ pcfg: (state.pcfg & ~(1 << 13)) | (event.target.value << 13) })}
			>
				<option value="0">Keeper</option>
				<option value="1">Pull</option>
			</select>
		</div>
	</div>
</div>
	);
});

const PKEComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div className="col-sm-2">Pull/Keep</div>
	<div className="col-sm-4">
		<div className="form-check" >
			<input className="form-check-input" type="checkbox" id="pke"
				checked={state.pcfg & (1 << 12)}
				onChange={event => {
					var pcfg = state.pcfg;

					if (event.target.checked)
						pcfg |= (1 << 12);
					else
						pcfg &= ~(1 << 12);

					dispatch({ pcfg: pcfg });
				}}
			/>
			<label className="form-check-label" htmlFor="pke">Pull/Keeper Enabled</label>
		</div>
	</div>
</div>
	);
});

const ODEComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div className="col-sm-2">Open Drain</div>
	<div className="col-sm-4">
		<div className="form-check" >
			<input className="form-check-input" type="checkbox" id="ode"
				checked={state.pcfg & (1 << 11)}
				onChange={event => {
					var pcfg = state.pcfg;

					if (event.target.checked)
						pcfg |= (1 << 11);
					else
						pcfg &= ~(1 << 11);

					dispatch({ pcfg: pcfg });
				}}
			/>
			<label className="form-check-label" htmlFor="ode">Open Drain Enabled</label>
		</div>
	</div>
</div>
	);
});

const SPDComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div class="row mb-3">
		<div class="col-sm-2">Speed</div>
		<div class="col-sm-4">
			<select className="form-select"
				value={ (state.pcfg & (((1 << 2) - 1) << 6)) >> 6 }
				onChange={event => dispatch({ pcfg: (state.pcfg & ~(((1 << 2) - 1) << 6)) | (event.target.value << 6) })}
			>
				<option value="0">low (50MHz)</option>
				<option value="1">medium (100MHz)</option>
				<option value="2">medium (100MHz)</option>
				<option value="3">max (200MHz)</option>
			</select>
		</div>
	</div>
</div>
	);
});

const DSEComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div class="row mb-3">
		<div class="col-sm-2">Drive Strength</div>
		<div class="col-sm-4">
			<select className="form-select"
				value={ (state.pcfg & (((1 << 3) - 1) << 3)) >> 3 }
				onChange={event => dispatch({ pcfg: (state.pcfg & ~(((1 << 3) - 1) << 3)) | (event.target.value << 3) })}
			>
				<option value="0">output driver disabled</option>
				<option value="1">R0 (260 Ohm @ 3.3V, 150 Ohm@1.8V, 240 Ohm for DDR)</option>
				<option value="2">R0/2</option>
				<option value="3">R0/3</option>
				<option value="4">R0/4</option>
				<option value="5">R0/5</option>
				<option value="6">R0/6</option>
				<option value="7">R0/7</option>
			</select>
		</div>
	</div>
</div>
	);
});

const SREComponent = React.memo(() => {
	const [state, dispatch] = useGlobalState();

	return (
<div className="row mb-3">
	<div class="row mb-3">
		<div class="col-sm-2">Slew Rate</div>
		<div class="col-sm-4">
			<select className="form-select"
				value={state.pcfg & (1 << 0)}
				onChange={event => dispatch({ pcfg: (state.pcfg & ~(1)) | event.target.value })}
			>
				<option value="0">Slow</option>
				<option value="1">Fast</option>
			</select>
		</div>
	</div>
</div>
	);
});

const rootElement = document.getElementById("root");
render(
<GlobalStateProvider>
	<form>
		<PCfgComponent/>
		<HYSComponent/>
		<PUSComponent/>
		<PUEComponent/>
		<PKEComponent/>
		<ODEComponent/>
		<SPDComponent/>
		<DSEComponent/>
		<SREComponent/>
	</form>
</GlobalStateProvider>
	, rootElement);
