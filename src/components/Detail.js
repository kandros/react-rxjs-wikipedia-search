import React, {PropTypes} from 'react';

const Detail = ({title, detail}) => (
    <div style={{marginTop: 16}}>
        <div style={{marginBottom: 16}}>{title}</div>
        <div dangerouslySetInnerHTML={{__html: detail}}/>
    </div>
)

Detail.propTypes = {
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired
}
export default Detail