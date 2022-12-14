/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import './Footer.css'

const Footer = () => {
	return (
		<div className='background-footer'>
			<div className='container text-white'>
				<footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
					<p className='col-md-4 mb-0 text-white'>&copy; 2022 IT-завод, Хакатонище</p>

					<a
						href='/'
						className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none'
					></a>

					<ul className='nav col-md-4 justify-content-end'>
						<li className='nav-item'>
							<a href='src/components#' className='nav-link px-2 text-white'>
								Страничечка
							</a>
						</li>
						<li className='nav-item'>
							<a href='src/components#' className='nav-link px-2 text-white'>
								Страничечка
							</a>
						</li>
						<li className='nav-item'>
							<a href='src/components#' className='nav-link px-2 text-white'>
								Страничечка
							</a>
						</li>
						<li className='nav-item'>
							<a href='src/components#' className='nav-link px-2 text-white'>
								Ссылочка
							</a>
						</li>
					</ul>
				</footer>
			</div>
		</div>
	)
}

export default Footer
