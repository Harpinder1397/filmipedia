import { Input, InputNumber, Select } from "antd";
import './formFields.less';

const FormInput = ({
	type,
	name,
	placeholder,
	value,
	onChange = () => {},
	onKeyUp = () => {},
	disabled = false,
	required = false,
	maxLength,
	minLength,
	validationError,
	label,
	addonBefore
}) => {

	return (
		<div className="input-container">
			<div className="label-container">
				<span className="required">
					{ required ? '*' : null }
				</span>
				<span className="label">
					{ label }
				</span>
			</div>
			<div className="input-field-container">
				{type == "num" ? (
					<Input.Group compact>
					<InputNumber value={value} name={name} onChange={onChange} placeholder="Mobile Number" />
				</Input.Group>
				): ( 
					<Input
					type={type}
					addonBefore={addonBefore}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyUp={onKeyUp}
					disabled={disabled}
					required={required}
					className={`input-field ${validationError && 'error'}`}
					maxLength={maxLength}
					minLength={minLength}
				/>
				)}
					
				<div className="error-msg">
					{
						validationError ? validationError : null 
					}
				</div>
			</div>
		</div>
		
	)
}

export default FormInput