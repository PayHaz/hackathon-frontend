/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './VehiclePass.css'

const VehiclePass = () => {
	const { id, vehicle_id } = useParams()
	const [data, setData] = useState([])
	const [dataSecond, setDataSecond] = useState([])

	async function requestFitstAPI() {
		let result = []
		return fetch('https://test.nvsu.ru/vehiclePass/' + id + '/529164083280772a2f1d99f81bc19b3ed5ee9341', {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((json) => {
				result.push(json)
				setData(result)
			})
	}

	async function requestSecondAPI() {
		let result = []
		return fetch('https://test.nvsu.ru/vehicle/' + vehicle_id, {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((json) => {
				result.push(json)
				setDataSecond(result)
			})
	}

	useEffect(() => {
		requestFitstAPI()
		requestSecondAPI()
	}, [])

	const Additional = dataSecond.map((el) => {
		return (
			<div>
				<p className='card-text'>Модель: {el.model}</p>
				<p className='card-text'>Тип ТС: {el.vehicleType}</p>
				<p className='card-text'>Вид ТС: {el.vehicleKind}</p>
				<p className='card-text'>Тип топлива: {el.fuelType}</p>
				<p className='card-text'>Страна: {el.country}</p>
				<p className='card-text'>Год выпуска: {el.year}</p>
				<p className='card-text'>Основание владения: {el.ownership}</p>
				<p className='card-text'>Качество: {el.quality}</p>
			</div>
		)
	})

	const Card = data.map((el) => {
		const url = el.codeLink
		return (
			<div className='container mt-5'>
				<div className='card text-center'>
					<div className='card-header'>Информация по заявке</div>
					<div className='card-body'>
						<h5 className='card-title'>{el.name}</h5>
						<p className='card-text'>Маршрут: {el.ride}</p>
						<p className='card-text'>Количество поездок: {el.tripCount}</p>
						<p className='card-text'>Срок начала действия: {el.dateStart}</p>
						<p className='card-text'>Срок конца действия: {el.dateEnd}</p>
						<p className='card-text'>Тип перевозки: {el.driveType}</p>
						<p className='card-text'>Номер телефона владельца: +7{el.ownerPhone}</p>
						{Additional}
						<img src={url} class='card-img-top' alt='...'></img>
					</div>
				</div>
			</div>
		)
	})

	return <div>{Card}</div>
}

export default VehiclePass
