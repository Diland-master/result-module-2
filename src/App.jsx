import { useState } from "react";
import styles from "./app.module.css";

const getFormattedDate = (date) => {
	const padTo2Digits = (num) => {
		return num.toString().padStart(2, "0");
	};

	const day = padTo2Digits(date.getDate());
	const month = padTo2Digits(date.getMonth() + 1);
	const year = date.getFullYear();
	const hours = padTo2Digits(date.getHours());
	const minutes = padTo2Digits(date.getMinutes());
	const seconds = padTo2Digits(date.getSeconds());

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

export function App() {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");
	const [isValueVaild, setIsValueVaild] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt("Введите значение").trim();
		if (!promptValue || promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа");
			setValue("");
			setIsValueVaild(false);
		} else {
			setValue(promptValue);
			setError("");
			setIsValueVaild(true);
		}
	};

	const onAddButtonClick = () => {
		if (value) {
			setList((prev) => [...prev, { id: Date.now(), currentDate: getFormattedDate(new Date()), value }]);
			setValue("");
			setError("");
			setIsValueVaild(false);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "
				<output className={styles["current-value"]}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles["buttons-container"]}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles["list-container"]}>
				{console.log(list)}
				{list.length > 0 ? (
					<>
						<h2 className={styles["list-heading"]}>Список:</h2>
						<ul className={styles.list}>
							{list.map((item) => (
								<li key={item.id} className={styles["list-item"]}>
									<span className={styles["list-item-text"]}>{item.value}</span>
									<span>{item.currentDate}</span>
								</li>
							))}
						</ul>
					</>
				) : (
					<p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
}
