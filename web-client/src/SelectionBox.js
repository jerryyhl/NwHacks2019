import React, { Component } from 'react';

export class SelectionBox extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value)
    };

    render() {
        return (
            <div>
                <select className="form-control" onChange={this.handleChange} value={this.props.value}>
                    {
                        this.props.labels.map((label) => {
                            return label === "" ? null : <option key={label.toString()}>
                                {label}
                            </option>
                        }
                    )}
                </select>
            </div>
        );
    }
}
