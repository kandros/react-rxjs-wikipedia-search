// @flow
import React, {Component, PropTypes} from 'react';
import {
    Panel,
    PanelHeading,
    PanelTabs,
    PanelBlock,
    Button,
    Container
} from 're-bulma';
import type {ResultItem} from './WikipediaSearch';

type Props = {
    items: ResultItem[]
}

class ResultList extends Component {
    props: Props

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    _handleItemClick = (e) => {
        e.target.classList.toggle('isOpen');
    }

    render() {
        const {items} = this.props;

        if (!items.length) return null;

        return (
            <Container style={{maxWidth: 500}}>
                <Panel>
                    <PanelHeading>
                        Results
                    </PanelHeading>
                    {items.map(item => (
                        <PanelBlock
                            onClick={this._handleItemClick}
                            className="ResultList__Item"
                            key={this._getRelativelyUniqueId(item)}>
                            {item.title}
                        </PanelBlock>
                    ))}
                </Panel>
            </Container>
        );
    }
}

export default ResultList;