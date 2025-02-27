import { useState } from "react";
import styles from "./app.module.css";
import { data } from "./data";

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleClickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const handleClickNext = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const handleClickReset = () => {
		setActiveIndex(0);
	};

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				{steps.length > 0 && (
					<div className={styles.steps}>
						<div className={styles["steps-content"]}>
							{steps[activeIndex].content}
						</div>
						<ul className={styles["steps-list"]}>
							{steps.map((step, index) => (
								<li
									key={step.id}
									className={
										styles["steps-item"] +
										(activeIndex >= index ? ` ${styles.done}` : "") +
										(activeIndex === index ? ` ${styles.active}` : "")
									}
								>
									<button
										className={styles["steps-item-button"]}
										onClick={() => setActiveIndex(index)}
									>
										{index + 1}
									</button>
									{step.title}
								</li>
							))}
						</ul>
						<div className={styles["buttons-container"]}>
							<button
								className={styles.button}
								onClick={handleClickBack}
								disabled={isFirstStep}
							>
								Назад
							</button>
							<button
								className={styles.button}
								onClick={isLastStep ? handleClickReset : handleClickNext}
							>
								{isLastStep ? "Начать сначала" : "Далее"}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
