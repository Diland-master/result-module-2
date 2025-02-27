import { useState } from "react";
import styles from "./App.module.css";

export const App = () => {
	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");
	const [isResult, setIsResult] = useState(false);

	const NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	const handleClickOperand = (e) => {
		const value = e.target.textContent;

		if (isResult) {
			setOperand1(value);
			setIsResult(false);
			return;
		}

		if (operator) {
			setOperand2((prev) => prev + value);
		} else {
			setOperand1((prev) => prev + value);
		}
	};

	const handleClickOperator = (e) => {
		setIsResult(false);
		setOperator(e.target.textContent);
	};

	const handleClickEqual = () => {
		switch (operator) {
			case "+":
				setOperand1(Number(operand1) + Number(operand2));
				break;
			case "-":
				setOperand1(Number(operand1) - Number(operand2));
				break;
			default:
				break;
		}
		setOperand2("");
		setOperator("");
		setIsResult(true);
	};

	const handleClickClear = () => {
		setOperand1("");
		setOperand2("");
		setOperator("");
		setIsResult(false);
	};

	return (
		<div className={styles.app}>
			<div className={styles.calculator}>
				<div
					className={
						styles["calculator-display"] +
						(isResult ? " " + styles["calculator-display-result"] : "")
					}
				>
					{`${operand1} ${operator} ${operand2}`}
				</div>
				<div className={styles["calculator-keys"]}>
					<div className={styles["calculator-numbers"]}>
						{NUMS.map((num) => (
							<button
								key={num}
								className={styles["calculator-btn"]}
								onClick={handleClickOperand}
							>
								{num}
							</button>
						)).reverse()}
					</div>
					<div className={styles["calculator-operators"]}>
						<button
							className={styles["calculator-btn"]}
							onClick={handleClickClear}
						>
							C
						</button>
						<button
							className={styles["calculator-btn"]}
							onClick={handleClickOperator}
						>
							+
						</button>
						<button
							className={styles["calculator-btn"]}
							onClick={handleClickOperator}
						>
							-
						</button>
						<button
							className={styles["calculator-btn"]}
							onClick={handleClickEqual}
						>
							=
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
