/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import './Statement.css'
import { Select, Button, Input, Form, message, Upload, DatePicker, Modal } from 'antd'
import { MaskedInput } from 'antd-mask-input'
const { RangePicker } = DatePicker
const { Dragger } = Upload
const { Option } = Select

const props = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info) {
		const { status } = info.file
		if (status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`)
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files)
	},
}

const Statement = () => {
	const [data, setData] = useState([])
	const [selectedItems, setSelectedItems] = useState([])
	const [amountOfTrips, setAmountOfTrips] = useState('')
	const [telephoneNumberInput, setTelephoneNumberInput] = useState('')
	const [dates, setDates] = useState([])
	const [typeDrive, setTypeDrive] = useState('Внутренний')
	const [routOfRide, setRoutOfRide] = useState('')

	async function requestAPI() {
		let result = []
		return fetch('https://test.nvsu.ru/vehicles/all')
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

	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}

	const onClick = () => {
		fetch('http://test.nvsu.ru/user/auth', {
			method: 'POST',
			credentials: 'include',
			SameSite: 'None',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login: 'subcontractor1',
				passwordHash: '21012bfa0829c94a5ad96b4a3688b72adea7ff4001e736ab47c4b9e69d2c9877',
			}),
		})
			.then((response) => console.log(response))
			.catch((error) => console.log(error))

		fetch(`https://test.nvsu.ru/vehiclePass/insert/529164083280772a2f1d99f81bc19b3ed5ee9341`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				vehicle_id: selectedItems,
				driveType: typeDrive,
				tripCount: amountOfTrips,
				dateStart: dates[0],
				dateEnd: dates[1],
				ownerPhone: telephoneNumberInput,
				ride: routOfRide,
			}),
		}).then((response) => {
			console.log('response', response.json())
			if (response.status === 204) {
				return new Promise((resolve) => resolve(null))
			}
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			if (response.ok) {
				showModal()
			}
			return response.json()
		})
	}

	const prefixSelector = (
		<Form.Item name='prefix' noStyle>
			<Select
				value='+7'
				defaultValue='7'
				style={{
					width: 70,
				}}
			>
				<Option value='7'>+7</Option>
			</Select>
		</Form.Item>
	)

	const handleChange = (value) => {
		setSelectedItems(value)
	}

	const dataArray = []
	const onRangeChange = (value) => {
		value.map((el) => dataArray.push(el.toISOString()))
		setDates(dataArray)
	}

	const onTypeDrive = (value) => {
		setTypeDrive(value)
	}

	return (
		<div className='card text-center shadow-sm'>
			<div className='card-header'>Подача заявления на выдачу разрешения движения тяжелого транспорта</div>
			<div className='card-body'>
				<h5 className='card-title'>Форма заявления</h5>
				<Form
					name='basic'
					initialValues={{
						remember: true,
					}}
					autoComplete='off'
				>
					<div className='card-text pt-1'>
						<Form.Item
							label='Выберите транспортное средство'
							name='car'
							rules={[{ required: true, message: 'Пожалуйста, выберите ТС' }]}
						>
							<Select
								showSearch
								style={{ width: '100%' }}
								placeholder='Введите значение для поиска'
								optionFilterProp='children'
								onChange={handleChange}
								filterOption={(input, option) => (option?.label ?? '').includes(input)}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? '')
										.toLowerCase()
										.localeCompare((optionB?.label ?? '').toLowerCase())
								}
								options={(data || []).map((d) => ({
									value: d._id,
									label: d.model + ' ' + d.number,
								}))}
							/>
						</Form.Item>
					</div>
					<Form.Item label='Выберите тип поездки' name='onTypeDrive'>
						<Select
							defaultValue={{
								value: 'Внутренний',
								label: 'Внутренний',
							}}
							style={{
								width: '100%',
							}}
							onChange={onTypeDrive}
							options={[
								{
									value: 'Внутренний',
									label: 'Внутренний',
								},
								{
									value: 'Региональный',
									label: 'Региональный',
								},
							]}
						/>
					</Form.Item>
					<Form.Item
						label='Введите количество поездок'
						name='fullName'
						rules={[{ required: true, message: 'Пожалуйста, количество поездок' }]}
					>
						<Input
							value={amountOfTrips}
							text-align='center'
							onChange={(event) => setAmountOfTrips(event.target.value)}
						/>
					</Form.Item>
					<Form.Item
						label='Введите маршрут поездки'
						name='routOfRide'
						rules={[{ required: true, message: 'Пожалуйста, введите маршрут поездки' }]}
					>
						<Input onChange={(event) => setRoutOfRide(event.target.value)} />
					</Form.Item>
					<Form.Item
						name='driverLicense'
						label='Выберите период поездок'
						rules={[
							{
								required: true,
								message: 'Пожалуйста, выберите период поездок',
							},
						]}
					>
						<RangePicker
							placeholder={['Выберите дату начала поездок', 'Выберите дату конца поездок']}
							style={{ width: '100%' }}
							onChange={onRangeChange}
						/>
					</Form.Item>
					<Form.Item
						name='phone'
						label='Введите номер телефона владельца ТС'
						rules={[
							{
								required: true,
								message: 'Пожалуйста, введите номер телефона владельца ТС',
							},
						]}
					>
						<MaskedInput
							addonBefore={prefixSelector}
							mask='(000)000-00-00'
							placeholder='Введите номер телефона'
							style={{
								width: '100%',
							}}
							onChange={(event) => setTelephoneNumberInput(event.target.value)}
						/>
					</Form.Item>
					<Form.Item>
						<Dragger {...props}>
							<p className='ant-upload-drag-icon'>
								<InboxOutlined />
							</p>
							<p className='ant-upload-text'>Нажмите сюда, для того, чтобы выбрать файлы для загрузки</p>
							<p className='ant-upload-hint'>Или перетащите сюда файлы для их загрузки на сервер.</p>
						</Dragger>
					</Form.Item>
					<Form.Item className='submit'>
						<Button className='sendStatementButton mt-3' type='primary' onClick={onClick} htmlType='submit'>
							Отправить заявление
						</Button>
						<Modal title='Basic Modal' open={isModalOpen} onOk={handleOk}>
							<p>Заявление успешно отправлено</p>
						</Modal>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Statement
