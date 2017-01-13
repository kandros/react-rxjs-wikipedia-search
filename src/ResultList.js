import React, {Component, PropTypes} from 'react';
import {
    Panel,
    PanelHeading,
    PanelTabs,
    PanelBlock,
    Button,
    Container
} from 're-bulma';

class ResultList extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    render() {
        const {items} = this.props;

        if (!items.length) return null;

        return (
            <Container style={{maxWidth: 700}}>
                <Panel>
                    <PanelHeading>
                        Results
                    </PanelHeading>
                    {items.map(item => (
                        <PanelBlock key={this._getRelativelyUniqueId(item)}>
                            {item.title}
                        </PanelBlock>
                    ))}
                </Panel>
            </Container>
        );
    }
}

export default ResultList;