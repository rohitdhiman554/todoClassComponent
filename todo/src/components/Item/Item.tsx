import React, { Component } from "react";
import { BsCircle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import "./Item.css";

type ItemProp = {
  key: string;
  id: string;
  done: boolean;
  text: string;
  onDelete: (id: string) => void;
  onEdit: (updatedData: string, id: string) => void;
  onComplete: (id: string) => void;
};

type ItemState = {
  edit: boolean;
  data: string;
};

class Item extends Component<ItemProp, ItemState> {
  constructor(props: ItemProp) {
    super(props);

    this.state = {
      edit: false,
      data: this.props.text,
    };
  }

  handleComplete = () => {
    this.props.onComplete(this.props.id);
  };

  editInput = () => {
    this.setState({ edit: true });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  editHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("edit handler");
    this.setState({ data: e.target.value });
  };

  editSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("hello");
      this.props.onEdit(this.state.data, this.props.id);
      this.setState({ edit: false });
    }
  };

  render() {
    let inputField = (
      <input
        id="edit-input"
        value={this.state.data}
        onChange={this.editHandler}
        onKeyPress={this.editSubmit}
      ></input>
    );
    return (
      <>
        <div className="item-div">
          <div className="complete-div">
            {this.props.done === true ? (
              <BsCheckCircle
                className="complete_icon"
                onClick={this.handleComplete}
              />
            ) : (
              <BsCircle
                className="complete_icon"
                onClick={this.handleComplete}
              />
            )}
          </div>
          <div
            id="todo-text"
            className={`${this.props.done === true ? "complete" : ""}`}
            onDoubleClick={this.editInput}
          >
            {this.state.edit ? inputField : this.props.text}
          </div>
          <div id="delete-div">
            <AiOutlineDelete onClick={this.handleDelete} id="delete_icon" />
          </div>
        </div>
        <hr></hr>
      </>
    );
  }
}

export default Item;
