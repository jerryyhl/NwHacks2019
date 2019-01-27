import React, { Component } from 'react';

export class SelectionBox extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value)
    };

    render() {
        if (!Array.isArray(this.props.labels)) {
            throw new Error("Options are not filled out");
        }
        return (
            <div>
                <select className="form-control" onChange={this.handleChange} value={this.props.value}>
                    {
                        this.props.labels.map((label) =>
                            <option key={label.toString()}>
                                {label}
                            </option>
                    )}
                </select>
            </div>
        );
    }
}
