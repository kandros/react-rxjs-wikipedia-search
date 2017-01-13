import React, {Component, PropTypes} from 'react'

export default function (options) {
    return function (Wrapped) {
        return class Wrapper extends Component {
            constructor() {
                super()
            }

            render() {
                return (
                    <div>
                        <Wrapped {...this.props} {...this.state}/>
                    </div>
                )
            }
        }
    }
}

