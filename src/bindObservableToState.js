import React, {Component, PropTypes} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function (options) {
    return function (Wrapped) {
        class Wrapper extends Component {
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

        return hoistNonReactStatics(Wrapper, Wrapped)
    }
}

