import { Component } from "react";
import { Dispatch } from "redux";
import Input from "../Input/Input";
import Item from "../Item/Item";
import "./List.css";
import { connect } from "react-redux";

interface TodoState {
  todo: {
    text: string;
    id: string;
    done: boolean;
  }[];
  display: string;
  handleSubmit: (data: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (updatedData: string, id: string) => void;
  handleComplete: (id: string) => void;
  allDone: (check: boolean) => void;
  showAll: () => void;
  showActive: () => void;
  showComplete: () => void;
  handleClear: () => void;
}

type ShowArr = {
  text: string;
  id: string;
  done: boolean;
}[];

class List extends Component<TodoState> {
  render() {
    let arr: ShowArr = [];
    if (this.props.display === "all") {
      arr = this.props.todo;
    } else if (this.props.display === "active") {
      arr = this.props.todo.filter((ele) => ele.done === false);
    } else if (this.props.display === "complete")
      arr = this.props.todo.filter((ele) => ele.done === true);

    return (
      <>
        <div id="overall-div">
          <Input
            onSubmit={this.props.handleSubmit}
            onAllComplete={this.props.allDone}
          ></Input>
          {arr.length > 0 ? <hr id="first"></hr> : <></>}
          <div id="todo-div">
            {arr.map((ele) => (
              <Item
                key={ele.id}
                id={ele.id}
                done={ele.done}
                text={ele.text}
                onDelete={this.props.handleDelete}
                onEdit={this.props.handleEdit}
                onComplete={this.props.handleComplete}
              ></Item>
            ))}
          </div>

          {this.props.todo.length > 0 ? (
            <div id="button-div">
              <div id="remaining" className="button">
                {this.props.todo.filter((ele) => ele.done === false).length}
                Items left
              </div>

              <div id="all-div" className="button">
                <button
                  className={`${
                    this.props.display === "all" ? "clicked" : "all-button"
                  }`}
                  onClick={this.props.showAll}
                >
                  All
                </button>
              </div>

              <div id="active-div" className="button">
                <button
                  className={`${
                    this.props.display === "active"
                      ? "clicked"
                      : "active-button"
                  }`}
                  onClick={this.props.showActive}
                >
                  Active
                </button>
              </div>

              <div id="completed-div" className="button">
                <button
                  className={`${
                    this.props.display === "complete"
                      ? "clicked"
                      : "complete-button"
                  }`}
                  onClick={this.props.showComplete}
                >
                  Complete
                </button>
              </div>

              <div id="clear-div" className="button">
                <button id="clear-button" onClick={this.props.handleClear}>
                  Clear Completed Task
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: TodoState) => {
  return {
    todo: state.todo,
    display: state.display,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleSubmit: (data: string) =>
      dispatch({ type: "SUBMIT", payload: { data: data } }),

    handleDelete: (id: string) =>
      dispatch({ type: "DELETE", payload: { id: id } }),

    handleEdit: (updatedData: string, id: string) =>
      dispatch({ type: "EDIT", payload: { data: updatedData, id: id } }),

    handleComplete: (id: string) =>
      dispatch({ type: "COMPLETE_TASK", payload: { id: id } }),

    allDone: (check: boolean) =>
      dispatch({ type: "ALL_DONE", payload: { check: check } }),

    showAll: () => dispatch({ type: "SHOW", payload: { display: "all" } }),

    showActive: () =>
      dispatch({ type: "ACTIVE", payload: { display: "active" } }),

    showComplete: () =>
      dispatch({ type: "COMPLETE", payload: { display: "complete" } }),

    handleClear: () => dispatch({ type: "CLEAR" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
