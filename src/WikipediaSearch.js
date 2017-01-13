// @flow
import React, {Component, PropTypes} from 'react'
import axios from 'axios'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch='
import {Subject, Observable} from 'rxjs'

type InputEvent = {target: HTMLInputElement} & Event
type ResultItem = {title: string, size: number, wordCount: number}

type State = {
    alreadyTouched: boolean,
    text: string,
    results: ResultItem[]
}
type Props = {}

class WikipediaSearch extends Component {
    search$: Subject

    state: State = {
        alreadyTouched: false,
        text: '',
        results: []
    }
    props: Props

    constructor() {
        super()
        this.search$ = new Subject()

        this.search$
            .debounceTime(200)
            .distinctUntilChanged()
            .filter(Boolean)
            .switchMap(this._searchWikipedia)
            .subscribe(this._setResults)
    }

    _setResults = (results: Array<ResultItem>) => {
        this.setState({results})
    }

    _searchWikipedia = (query: string): Observable => {
        const url = BASE_URL + query
        return Observable
            .fromPromise(axios.get(url))
            .map(results => results.data.query.search)
    }

    _handleChange = (e: InputEvent) => {
        const query = e.target.value

        if (!this.state.alreadyTouched) {
            this.setState({alreadyTouched: true})
        }

        this.setState({
            text: query
        })
    }

    componentWillUpdate(_nextProps: Props, nextState: State) {

        if (this.state.text !== nextState.text) {
            this._handleTextChange(nextState.text)
        }
    }

    _handleTextChange(nextText: string) {
        this.search$.next(nextText)
    }

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    render() {
        const {results, alreadyTouched, text} = this.state
        const noResults = alreadyTouched && results.length === 0 && text.length === 0

        return (
            <div className="searchbox-wrapper">
                {/*<label>*/}
                {/*Search on Wikipedia*/}
                <input
                    className="search-input"
                    value={text}
                    type="text" onChange={this._handleChange}/>
                {/*// </label>*/}

                {noResults && (
                    <div style={{
                            padding: 30
                        }}
                    >No results found :(</div>
                )}

                <ul>
                    {results.map((result) => (
                        <li key={this._getRelativelyUniqueId(result)}>
                            {result.title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default WikipediaSearch