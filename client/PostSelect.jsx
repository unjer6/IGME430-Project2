const { v4: uuidv4 } = require('uuid');

// special select element for PostForm
const PostSelect = ({ id, options, value, onChange }) => {
    return (
        <select id={id} className="form-select" value={value} onChange={onChange}>
            <option key={uuidv4()} value=""></option>
            {options?.map(option => <option key={uuidv4()} value={option}>{option}</option>)}
        </select>
    )
}

module.exports = PostSelect;