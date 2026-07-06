import { Component } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonVariant = "primary" | "secondary" | "danger" | "warning";

interface ButtonProps {
  label?: string;
  type?: ButtonVariant;
  outline?: boolean;
  className?: string;
  onClick?: () => void;
}

export default class Button extends Component<ButtonProps> {
  static defaultProps: Partial<ButtonProps> = {
    label: "test",
    type: "primary",
    outline: false,
  };

  render() {
    const { label, type, outline, className, onClick } = this.props;

    const buttonClass = clsx(
      styles.btn,
      outline ? styles[`btn-outline-${type}`] : styles[`btn-${type}`],
      className,
    );

    return (
      <div className={buttonClass} onClick={onClick}>
        {label}
      </div>
    );
  }
}
