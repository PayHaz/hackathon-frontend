/* eslint-disable array-callback-return */
import React, { useRef, useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table } from 'antd'
import Highlighter from 'react-highlight-words'
import './CarPark.css'

const CarPark = () => {
	const [data, setData] = useState([])
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')

	const requestAPI = () => {
		let result = []
		return fetch('https://test.nvsu.ru/vehicles/529164083280772a2f1d99f81bc19b3ed5ee9341', { method: 'POST' })
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

	const searchInput = useRef(null)
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}
	const handleReset = (clearFilters) => {
		clearFilters()
		setSearchText('')
	}
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Поиск ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							})
							setSearchText(selectedKeys[0])
							setSearchedColumn(dataIndex)
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close()
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})
	const columns = [
		{
			title: 'Номер машины',
			dataIndex: 'number',
			key: 'number',
			width: '10%',
			...getColumnSearchProps('number'),
		},
		{
			title: 'Модель ТС',
			dataIndex: 'model',
			key: 'model',
			...getColumnSearchProps('model'),
		},
		{
			title: 'Год выпуска',
			dataIndex: 'year',
			key: 'year',
			...getColumnSearchProps('year'),
		},
		{
			title: 'Вид ТС',
			dataIndex: 'vehicleKind',
			key: 'formFactor',
			width: '20%',
			...getColumnSearchProps('formFactor'),
		},
		{
			title: 'Тип ТС',
			dataIndex: 'vehicleType',
			key: 'typeFactor',
			width: '20%',
			...getColumnSearchProps('typeFactor'),
		},
	]
	return (
		<div class='card text-center shadow-sm'>
			<Table pagination={{ pageSize: 10 }} columns={columns} dataSource={data} />
		</div>
	)
}
export default CarPark
