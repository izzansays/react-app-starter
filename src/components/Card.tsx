import { ReactNode } from "react";
import { css } from "../../styled-system/css";

interface CardProps {
	title?: string;
	description?: string;
	children: ReactNode;
}

const Card = ({ title, description, children }: CardProps) => {
	return (
		<div
			className={css({
				rounded: "lg",
				border: "base",
				bg: "card",
				color: "card.foreground",
				shadow: "sm",
				m: "6",
			})}
		>
			<div
				className={css({
					display: "flex",
					flexDirection: "column",
					spaceY: "1.5",
					p: "6",
				})}
			>
				<h3
					className={css({
						textStyle: "2xl",
						fontWeight: "semibold",
						lineHeight: "none",
						letterSpacing: "tight",
					})}
				>
					{title}
				</h3>
				<p
					className={css({
						textStyle: "sm",
						color: "muted.foreground",
					})}
				>
					{description}
				</p>
			</div>
			<div
				className={css({
					p: "6",
					pt: "0",
				})}
			>
				{children}
			</div>
		</div>
	);
};

interface FooterProps {
	children: ReactNode;
}

const Footer = ({ children }: FooterProps) => {
	return (
		<div
			className={css({
				display: "flex",
				alignItems: "center",
				pt: "6",
			})}
		>
			{children}
		</div>
	);
};

Card.Footer = Footer;

export default Card;
