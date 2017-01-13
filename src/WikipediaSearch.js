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
        results: Object[]
    }
    state = {
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
        console.log(results)
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
        if (query) {
            this.search$.next(query)
        }
    }

    _getRelativelyUniqueId = (result: ResultItem) => {
        return result.wordCount + result.size + result.title
    }

    render() {
        const {results} = this.state
        return (
            <div className="searchbox-wrapper">
                {/*<label>*/}
                    {/*Search on Wikipedia*/}
                    <input
                        className="search-input"
                        type="text" onChange={this._handleChange}/>
                {/*// </label>*/}

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