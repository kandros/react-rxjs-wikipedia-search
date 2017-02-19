// @flow
import React, {Component} from 'react'
import {
    Panel,
    PanelHeading,
    PanelBlock,
    Container
} from 're-bulma'
import type {ResultItem} from './WikipediaSearch'

type Props = {
    items: ResultItem[]
}

type State = {
    selectedIndex: number
}

class ResultList extends Component {
    props: Props
    state: State = {
        selectedIndex: -1
    }

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    _handleItemClick = (index: number) => {
        this.setState({
            selectedIndex: index
        })
    }

    _isOpen = (index: number) => {
        return this.state.selectedIndex === index ? 'isOpen' : ''
    }

    render() {
        const {items} = this.props

        if (!items.length) return null

        return (
            <Container style={{maxWidth: 500}}>
                <Panel>
                    <PanelHeading>
                        Results
                    </PanelHeading>
                    {items.map((item, index) => (
                        <PanelBlock
                            onClick={() => this._handleItemClick(index)}
                            className={["ResultList__Item", this._isOpen(index)].join(' ')}
                            key={this._getRelativelyUniqueId(item)}>
                            {item.title}
                        </PanelBlock>
                    ))}
                </Panel>
            </Container>
        )
    }
}

export default ResultList