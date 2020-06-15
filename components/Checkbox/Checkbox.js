import "./checkbox.css";

function Checkbox({ entity, handleChange, handleChecked }) {
    return (
        <React.Fragment>
            <label htmlFor={entity.name} className="checkboxContainer">{entity.name}
                <input
                    onChange={handleChange(entity._id)}
                    checked={handleChecked && handleChecked(entity._id)}
                    type="checkbox"
                    id={entity.name}
                    name={entity.name}
                />
                <span className="checkmark"></span>
            </label>
        </React.Fragment>
    )
}

export default Checkbox;