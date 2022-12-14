/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import './Passes.css'

const Passes = () => {
	const [data, setData] = useState([])

	const requestAPI = () => {
		let result = []
		return fetch('https://test.nvsu.ru/vehiclePass/user/529164083280772a2f1d99f81bc19b3ed5ee9341', {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((json) => {
				json.map((el) => {
					result.push(el)
				})
				setData(result)
			})
	}

	useEffect(() => {
		requestAPI()
	}, [])

	const Card = data.map((el) => {
		const url = el.codeLink
		return (
			<div className='card col-12 col-xl-3 me-5 mt-5 shadow p-3 '>
				<img src={url} class='card-img-top' alt='...'></img>
				<div className='card-body'>
					<a href={'/vehiclepass/' + el._id + '/' + el.vehicle_id} className='card-title'>
						{el.name}
					</a>
					<p className='card-text'>Маршрут: {el.ride}</p>
					<p className='card-text'>Тип маршрута: {el.driveType}</p>
					<p className='card-text'>
						Телефон владельца: <a href='tel:+1234567890'>+7{el.ownerPhone}</a>
					</p>
				</div>
			</div>
		)
	})

	return (
		<div className='container'>
			<div className='row'>{Card}</div>
		</div>
	)
}

export default Passes
