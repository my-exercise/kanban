import React from 'react';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        // Tracking `editing` state
        this.state = {
            editing: false
        };
    }

    render() {

        // Render the component differently based on state.
        if (this.state.editing)
            return this.renderEdit();

        return this.renderNote();
    }

    renderEdit = () => {
        return <input type="text"
                      ref={ element => element ?
                      element.selectionStart =
                      this.props.task.length : null}
                      autoFocus={true}
                      defaultValue={this.props.task}
                      onBlur={this.finishEdit}
                      onKeyPress={this.checkEnter}/>;
    };

    renderNote = () => {
        // If user clicks a normal note,
        // trigger editing logic.
        const onDelete = this.props.onDelete;
        return <div onClick={this.edit}>
            <span>{this.props.task}</span>
            {onDelete ? this.renderDelete() : null}
        </div>;
    };

    renderDelete = () => {
        return <button onClick={this.props.onDelete}>x</button>;
    };

    edit = () => {
        // Enter edit mode
        this.setState({
            editing: true
        });
    };

    checkEnter = (e) => {
        // The user hit *Enter*, let's
        // finish up
        if (e.key === "Enter")
            this.finishEdit(e);
    };

    finishEdit = (e) => {
        // `Note` will trigger an optional `onEdit` callback
        // once it has a new value.
        //
        // We'll use this to communicate the change to `App`
        const value = e.target.value;

        if (this.props.onEdit) {
            this.props.onEdit(value);
            // Exit edit mode
            this.setState({
                editing: false
            });
        }
    };
}