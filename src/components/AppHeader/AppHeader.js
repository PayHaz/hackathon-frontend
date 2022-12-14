import React, { useState } from 'react'
import { Menu } from 'antd'
import './AppHeader.css'
import Statement from './MenuContent/Statement'
import logo from './hm.svg'
import CarPark from './MenuContent/CarPark'
import Passes from './MenuContent/Passes'

const AppHeader = () => {
	const [selectedMenu, setSelectedMenu] = useState('one')

	const onClick = (e) => {
		switch (e.key) {
			case 'one':
				setSelectedMenu('one')
				break
			case 'two':
				setSelectedMenu('two')
				break
			case 'three':
				setSelectedMenu('three')
				break
			case 'four':
				setSelectedMenu('four')
				break
			default:
				console.log('one')
		}
	}

	const MenuContent = () => {
		console.log(selectedMenu)
		switch (selectedMenu) {
			case 'one':
				return <Statement />
			case 'two':
				return <CarPark />
			case 'three':
				return <Passes />
			case 'four':
				return <h1>four</h1>
			default:
				return <h1>first</h1>
		}
	}

	return (
		<div className='container'>
			<div className='d-flex flex-wrap justify-content-center py-3 mb-4'>
				<a
					href='/'
					className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'
				>
					<img src={logo} width='300' height='80' alt=''></img>
				</a>
				<ul className='nav nav-pills'>
					<Menu className='menu-nav' onClick={onClick} mode='horizontal' defaultSelectedKeys={['one']}>
						<Menu.Item key='one'>Подача заявки</Menu.Item>
						<Menu.Item key='two'>Автопарк</Menu.Item>
						<Menu.Item key='three'>Пропуска</Menu.Item>
						<Menu.Item key='four'>Персонал</Menu.Item>
					</Menu>
				</ul>
			</div>
			{MenuContent()}
		</div>
	)
}

export default AppHeader
