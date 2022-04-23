const { v4: uuidv4 } = require('uuid');

// special select element for PostForm
const PostSelect = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            <option key={uuidv4()} value=""></option>
            {options?.map(option => <option key={uuidv4()} value={option}>{option}</option>)}
        </select>
    )
}

module.exports = PostSelect;