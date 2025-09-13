import { Divider } from "../../main";
import styles from "./Tokens.module.css";

const colors = ["primary", "secondary", "success", "danger", "warning", "info"];
const colorOpacity = [
	"text",
	"content",
	"soft",
	"subtle",
	"outline",
	"base",
	"hover",
	"disabled",
	"background",
	"light",
	"dark",
	"opacity",
];

export const Tokens = () => {
	return (
		<section className={styles["tokens"]}>
			<h1 className={styles["tokens-title"]}>Tokens</h1>
			<Divider color="secondary" />
			<div className={styles["tokens-subtitle-container"]}>
				<h2 className={styles["tokens-subtitle"]}>Colors</h2>
				<Divider color="secondary" />
				<div className={styles["tokens-colors"]}>
					{colors.map((value) => (
						<div key={value} className={styles["tokens-color"]}>
							<div className={styles["tokens-color-key"]}>{value}</div>
							{colorOpacity.map((opacity) => (
								<div key={opacity} className={styles["tokens-color-variant"]}>
									<div className={styles["tokens-color-opacity-key"]}>{opacity}</div>
									<div
										className={styles["tokens-color-opacity-value"]}
										style={{
											backgroundColor: `var(--${value}-${opacity}-color)`,
										}}
									></div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
