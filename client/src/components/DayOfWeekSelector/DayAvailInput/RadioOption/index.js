import './RadioOption.css';

export default function RadioOption({ children, setOption, isSelected }) {
    return (
        <div className="radio_option" onClick={setOption} >
            <i className={`bi ${isSelected ? 'bi-record-circle' : 'bi-circle'}`}></i>
            { children }
        </div>
    )
}