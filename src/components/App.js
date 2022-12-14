import React from 'react'
import AppHeader from './AppHeader/AppHeader'
import Footer from './Footer/Footer'
import VehiclePass from './VehiclePass/VehiclePass'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route index element={<AppHeader />} />
				<Route path='/vehiclepass/:id/:vehicle_id' element={<VehiclePass />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
