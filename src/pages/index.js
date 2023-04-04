import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const inter = Inter({ subsets: ['latin'] })

function Countdown() {
	const [inputTime, setInputTime] = useState('')
	const [time, setTime] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		setTime(parseInt(inputTime) * 60)
	}

	useEffect(() => {
		if (time === null) return

		const interval = setInterval(() => {
			setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime))
		}, 1000)

		return () => clearInterval(interval)
	}, [time])

	const minutes = time ? Math.floor(time / 60) : 0
	let seconds = time ? time % 60 : 0
	seconds = seconds < 10 ? '0' + seconds : seconds

	const handleInputChange = (e) => {
		const inputTime = e.target.value
		if (!isNaN(inputTime)) {
			setInputTime(inputTime)
		}
	}

	return (
		<div>
			{time === null ? (
				<div className="timeForm">
					<form onSubmit={handleSubmit}>
						<label>
							Enter the time (in minutes):
							<input
								type="numeric"
								value={inputTime}
								onChange={handleInputChange}
							/>
						</label>
						<button type="submit">Start Countdown</button>
					</form>
				</div>
			) : (
				<>
					{time === 0 ? (
						<p>"Time is up!"</p>
					) : (
						<h2 className="countdownTimer">
							{minutes}:{seconds}
						</h2>
					)}
				</>
			)}
		</div>
	)
}

function TodoList() {
	const [todos, setTodos] = useState([])
	const [newTodo, setNewTodo] = useState('')
	const [animationParent] = useAutoAnimate()
	function handleAddTodo() {
		if (newTodo.trim() !== '') {
			setTodos([...todos, newTodo.trim()])
			setNewTodo('')
		}
	}

	function handleDelete(index) {
		setTodos(todos.filter((_, i) => i !== index))
	}

	return (
		<div className="todoList ">
			<h1 className="todoListTitle">Todo List</h1>
			<div>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Add new todo"
				/>
				<button onClick={handleAddTodo}>Add</button>
			</div>
			<ul ref={animationParent}>
				{todos.map((todo, index) => (
					<li key={index}>
						<div>
							{todo}
							<button onClick={() => handleDelete(index)}>Delete</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default function Home() {
	return (
		<>
			<Head>
				<title>Chronia</title>
				<meta
					name="description"
					content="Take back control of your time, excel in studies"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter&family=Montserrat+Alternates&family=Poppins&family=Roboto&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<main>
				<div className="countdown">
					<div className="flex col">
						<div className="flex start">
							<h1 className="countdownTextTitle">Chronia</h1>
						</div>
						<div className="flex end">
							<h1 className="countdownTextTimer">Timer</h1>
						</div>
					</div>
					<Countdown />
				</div>
				<hr />
				<TodoList />
			</main>
		</>
	)
}
