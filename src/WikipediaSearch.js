// @flow
import React, {Component, PropTypes} from 'react'
import axios from 'axios'

const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch='
import {Subject, Observable} from 'rxjs'

type InputEvent = {target: HTMLInputElement} & Event
type ResultItem = {title: string, size: number, wordCount: number}

class WikipediaSearch extends Component {
    search$: Subject
    state: {
        firstChange: boolean,
        query: string
        results: ResultItem[]
    }
    state = {
        firstChange: false,
        query: '',
        results: []
    }

    constructor() {
        super()
        this.search$ = new Subject()

        this.search$
            .debounceTime(200)
            .distinctUntilChanged()
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

        if (!this.state.firstChange) {
            this.setState({firstChange: true})
        }

        if (query) {
            this.setState(
                {query},
                this._textChanged
            )
        }
    }

    _textChanged = ({query}) => {
        this.search$.next(query)
    }

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    render() {
        const {results, firstChange, text} = this.state
        const noResults = !firstChange && results.length === 0 && text.length === 0

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